/*globals
google
*/
class Map {
  constructor () {
    this.home = {lat: 55.813044, lng: 37.572087};
    this.markers = [];
    this.placeMarkers = [];
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
    this.zoomAutocomplete = new google.maps.places.Autocomplete(
      $('#address').get(0)
    );
    this.zoomAutocomplete.bindTo('bounds', this.map);
    this.timeAutoComplete = new google.maps.places.Autocomplete(
      $('#search-within-time-text').get(0)
    );
    this.searchBox = new google.maps.places.SearchBox(
      $('#places-search').get(0)
    );
    this.map.addListener('bounds_changed', () => this.searchBox.setBounds(this.map.getBounds()));
    this.searchBox.addListener('places_changed', () => this.searchBoxPlaces());
  }

  searchBoxPlaces () {
    console.log(this.searchBox.bounds);
    Map.HideMarkers(this.placeMarkers);
    const places = this.searchBox.getPlaces();
    console.log(places);
    if (places.length === 0) {
      alert('We did not find any places matching the search');
    } else {
      this.createMarkersForPlaces(places);
    }
  }

  textSearchPlaces () {
    const searchText = $('#places-search').val();
    if (!searchText) {
      alert('Enter the search string');
      return;
    }
    Map.HideMarkers(this.placeMarkers);
    new google.maps.places.PlacesService(this.map)
      .textSearch({
        query: searchText,
        bounds: this.map.getBounds()
      },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.createMarkersForPlaces(results);
        }
      });
  }

  createMarkersForPlaces (places) {
    const bounds = new google.maps.LatLngBounds();
    places.forEach(place => {
      const marker = new google.maps.Marker({
        map: this.map,
        icon: {
          url: place.icon,
          size: new google.maps.Size(35, 35),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(15, 34),
          scaledSize: new google.maps.Size(25, 25)
        },
        title: place.name,
        position: place.geometry.location,
        id: place.id
      });
      this.placeMarkers.push(marker);
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
      this.map.fitBounds(bounds);
    });
  }

  addMarker (name, lt, ln, caption) {
    const len = this.markers.push({
      name: name,
      caption: caption,
      origin: null,
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

  static HideMarkers (markers) {
    markers.forEach((elem => {
      if (elem.marker) {
        elem.marker.setMap(null);
      } else {
        elem.setMap(null);
      }
    }));

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
      Map.HideMarkers(this.markers);
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

    Map.HideMarkers(this.markers);
    distanceMatrixService.getDistanceMatrix({
      origins: this.markers.map(elem => elem.marker.position),
      destinations: [address],
      travelMode: $('#mode').val(),
      unitSystem: google.maps.UnitSystem.METRIC
    }, (response, status) => {this.displayMarkersWithinTime(response, status);});
  }

  displayMarkersWithinTime (response, status) {
    let oneFound = false;
    this.markers.forEach((elem) => {elem.origin = null;});
    if (status !== google.maps.DistanceMatrixStatus.OK) {
      alert('The distance was measured with error ' + status);
    } else {
      for (let i = 0; i < response.rows.length; i++) {
        const marker = this.markers[i];
        marker.origin = response.originAddresses[i];
        response.rows[i].elements.forEach((elem) => {
          if (elem.status === 'OK' && elem.duration.value <= $('#max-duration').val() * 60) {
            marker.marker.setMap(this.map);
            const infoWindow = new google.maps.InfoWindow({
              content: `
                ${elem.duration.text} away, ${elem.distance.text}
                <div><input class="btn-route button" type="button" value="View Route" id="${marker.name}"></div>
                `
            });
            infoWindow.open(this.map, this.markers[i].marker);
            this.markers[i].infoWindow = infoWindow;
            google.maps.event.addListener(this.markers[i].marker, 'click', () => {infoWindow.close();});
            oneFound = true;
          } else {
            this.markers[i].marker.setMap(null);
          }
        });
      }
      if (!oneFound) {
        alert('No places within the distance');
      }
    }
  }

  static DisplayDirections (map, origin) {
    if (!origin) {
      alert('No original addresses are given');
      return;
    }

    const directionsService = new google.maps.DirectionsService();
    const destinationAddress = $('#search-within-time-text').val();
    const mode = $('#mode').val();

    directionsService.route(
      {
        origin: origin,
        destination: destinationAddress,
        travelMode: google.maps.TravelMode[mode]
      },
      function (response, status) {
        if (status !== google.maps.DirectionsStatus.OK) {
          alert('Direction request failed due to ' + status);
        } else {
          const directionsDisplay = new google.maps.DirectionsRenderer({
            map: map,
            directions: response,
            draggable: true,
            polylineOptions: {strokeColor: 'green'}
          });
        }
      });
  }

  routeClick (event) {

    const map = event.data.ref;

    Map.HideMarkers(map.markers);
    Map.DisplayDirections(
      map.map,
      map.markers.find(elem => elem.name === $(event.target).attr('id')).origin
    );
  }
}

function initMap () {
  const map = new Map();
  $('#btn-show').click(() => map.showMarkers());
  $('#btn-hide').click(() => Map.HideMarkers(map.markers));
  $('#btn-draw').click(() => map.showDrawer());
  $('#btn-calc').click(() => map.calcArea());
  $('#btn-geo').click(() => map.centerMap());
  $('#btn-matrix').click(() => map.searchWithinTime());
  $('#btn-places').click(() => map.textSearchPlaces());
  $('.map').on('click', '.btn-route', {ref: map}, map.routeClick);
  map.addMarker('home', 55.813044, 37.572087, 'Home');
  map.addMarker('work', 55.696986, 37.625556, 'Work');
  map.fit();
}
