/*globals
google
*/
class Map {
  constructor () {
    this.home = {lat: 55.813044, lng: 37.572087};
    this.markers = [];
    this.polygon = null;
    this.radius = 30;
    this.pitch = 10;
    this.zoom = 17;
    this.clickedMarker = null;
    this.streetViewService = new google.maps.StreetViewService();
    this.drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_LEFT,
        drawingModes: [
          google.maps.drawing.OverlayType.POLYGON
        ]
      }
    });
    this.drawingManager.addListener('overlaycomplete', (event) => {this.drawComplete(event);});
    this.infoWindow = new google.maps.InfoWindow();
    this.bounds = new google.maps.LatLngBounds();
    this.styledMapType = new google.maps.StyledMapType(
      [
        {
          featureType: 'landscape.man_made',
          elementType: 'geometry.fill',
          stylers: [
            {'color': '#ff0000'},
            {'saturation': -50}
          ]
        },
        {
          featureType: 'water',
          elementType: 'geometry.fill',
          stylers: [{color: '#00ff00'}]
        }
      ],
      {name: 'Красивый стиль'}
    );
    this.map = new google.maps.Map($('#map').get(0), {
      center: this.home,
      zoom: this.zoom,
      mapTypeControlOptions: {
        mapTypeIds: ['roadmap', 'styled_map']
      }
    });
    this.map.mapTypes.set('styled_map', this.styledMapType);
  }

  addMarker (name, lt, ln, caption) {
    const len = this.markers.push({
      name: name,
      caption: caption,
      marker: new google.maps.Marker({
        position: {lat: lt, lng: ln},
        animation: google.maps.Animation.DROP
      })
    });
    const marker = this.markers[len - 1].marker;
    marker.addListener('click', () => {this.markerClick(name);});
    this.bounds.extend(marker.position);
  }

  fit () {
    this.map.fitBounds(this.bounds);
  }

  markerClick (name) {
    this.clickedMarker = this.markers.find(elem => elem.name === name);

    if (this.infoWindow.marker === this.clickedMarker.marker) {return;}

    this.infoWindow.marker = this.clickedMarker.marker;
    this.infoWindow.setContent('');
    this.infoWindow.addListener('closeclick', () => {this.infoWindow.marker = null;});
    this.streetViewService.getPanoramaByLocation(
      this.clickedMarker.marker.position,
      this.radius,
      (data, status) => {this.getStreetView(data, status);});
    this.infoWindow.open(this.map, this.clickedMarker.marker);
  }

  getStreetView (data, status) {
    if (status !== google.maps.StreetViewStatus.OK) {
      this.infoWindow.setContent(
        `<h4>${this.clickedMarker.caption}: ${this.clickedMarker.marker.getPosition().lat()}, ${this.clickedMarker.marker.getPosition().lng()}</h4>
       <p>No Street View Found!</p>`);
      return;
    }

    const nearStreetViewLocation = data.location.latLng;
    const heading = google.maps.geometry.spherical.computeHeading(
      nearStreetViewLocation, this.clickedMarker.marker.position);
    this.infoWindow.setContent(
      `<h4>${this.clickedMarker.caption}: ${this.clickedMarker.marker.getPosition().lat()}, ${this.clickedMarker.marker.getPosition().lng()}</h4>
       <div id="pano"></div>`);
    const panoramaOptions = {
      position: nearStreetViewLocation,
      pov: {
        heading: heading,
        pitch: this.pitch
      }
    };
    console.log(panoramaOptions);
    const panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), panoramaOptions);
    panorama.setVisible(true);
  }

  showMarkers () {
    this.markers.forEach(elem => {
      if (!this.polygon ||
        !this.polygon.getMap() ||
        google.maps.geometry.poly.containsLocation(elem.marker.position, this.polygon)) {
        elem.marker.setMap(this.map);
      }
    });
  }

  hideMarkers () {
    this.markers.forEach((elem => elem.marker.setMap(null)));
  }

  showDrawer () {
    if (!this.drawingManager.map) {
      this.drawingManager.setMap(this.map);
    } else {
      this.drawingManager.setMap(null);
      if (this.polygon !== null) {
        this.polygon.setMap(null);
      }
    }
  }

  drawComplete (event) {
    if (this.polygon) {
      this.polygon.setMap(null);
      this.hideMarkers();
    }

    this.drawingManager.setDrawingMode(null);
    this.polygon = event.overlay;
    this.polygon.setEditable(true);
    this.searchWithinPolygon();
    this.polygon.getPath().addListener('set_at', () => {this.searchWithinPolygon();});
    this.polygon.getPath().addListener('insert_at', () => {this.searchWithinPolygon();});
  }

  searchWithinPolygon () {
    this.markers.forEach((elem) => {
      if (google.maps.geometry.poly.containsLocation(elem.marker.position, this.polygon)) {
        elem.marker.setMap(this.map);
      } else {
        elem.marker.setMap(null);
      }
    });
  }

  calcArea () {
    if (!this.polygon || !this.polygon.getMap()) {
      alert('There is no polygons on the map');
    } else {
      const area = google.maps.geometry.spherical.computeArea(this.polygon.getPath());
      alert(`The area of the polygon is ${area} square meters`);
    }
  }

  centerMap () {
    const geocoder = new google.maps.Geocoder();
    const address = $('#address').val();
    if (!address) {
      alert('Enter the address');
    } else {
      geocoder.geocode({
        address: address,
        componentRestrictions: {locality: 'Moscow'}
      }, (results, status) => {
        console.log(status);
        if (status !== google.maps.GeocoderStatus.OK) {
          alert('The entered address cannot be found');
        } else {
          const address = $('#address');
          address.siblings('p').remove();
          address.after(
            `<p>${results[0].formatted_address}</p>
             <p>${results[0].geometry.location.lat()}, ${results[0].geometry.location.lng()}</p>`);
          this.map.setCenter(results[0].geometry.location);
          this.map.setZoom(this.zoom);
        }
      });
    }
  }

  searchWithinTime () {
    const distanceMatrixService = new google.maps.DistanceMatrixService();
    const address = $('#search-within-time-text').val();
    if (!address) {
      alert('You must enter the address');
      return;
    }

    this.hideMarkers();
    distanceMatrixService.getDistanceMatrix({
      origins: this.markers.map( elem => elem.marker.position ),
      destinations: [address],
      travelMode: $('#mode').val(),
      unitSystem: google.maps.UnitSystem.METRIC
    }, (response, status) => {this.displayMarkersWithinTime(response, status);});
  }

  displayMarkersWithinTime(response, status) {
    console.log(response, status);
  }
}

function initMap () {
  const map = new Map();
  $('#btn-show').click(() => map.showMarkers());
  $('#btn-hide').click(() => map.hideMarkers());
  $('#btn-draw').click(() => map.showDrawer());
  $('#btn-calc').click(() => map.calcArea());
  $('#btn-geo').click(() => map.centerMap());
  $('#btn-matrix').click(() => map.searchWithinTime());
  map.addMarker('home', 55.813044, 37.572087, 'Home');
  map.addMarker('work', 55.696986, 37.625556, 'Work');
  map.fit();
}
