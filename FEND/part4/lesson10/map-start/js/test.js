/*globals
google
*/
class Map {
  constructor () {
    this.home = {lat: 55.813044, lng: 37.572087};
    this.markers = [];
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
      zoom: 17,
      mapTypeControlOptions: {
        mapTypeIds: ['roadmap', 'styled_map']
      }
    });
    this.map.mapTypes.set('styled_map', this.styledMapType);
    // this.map.setMapTypeId('styled_map');
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
    const marker = this.markers.find(elem => elem.name === name);

    if (this.infoWindow.marker === marker.marker) {return;}

    this.infoWindow.marker = marker.marker;
    this.infoWindow.setContent(
      `<h4>${marker.caption}: ${marker.marker.getPosition().lat()}, ${marker.marker.getPosition().lng()}</h4>`);
    this.infoWindow.open(this.map, marker.marker);
    this.infoWindow.addListener('closeclick', () => {this.infoWindow.marker = null;});

  }

  showMarkers () {
    this.markers.forEach(elem => elem.marker.setMap(this.map));
  }

  hideMarkers () {
    this.markers.forEach((elem => elem.marker.setMap(null)));
  }
}

function initMap () {
  const map = new Map();
  $('#btn-show').click(() => map.showMarkers());
  $('#btn-hide').click(() => map.hideMarkers());
  map.addMarker('home', 55.813044, 37.572087, 'Home');
  map.addMarker('work', 55.696986, 37.625556, 'Work');
  map.fit();
}
