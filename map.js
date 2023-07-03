var map
var layerControlDiv;
var layerOptions;

function initMap() {
   map = new google.maps.Map(document.getElementById('map'), {
    center: {lat:  8.4962, lng:  4.676}, // unilorin coordinate
    zoom: 15,
    mapTypeId: 'hybrid'
  });

  const drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.POINT,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [
        // google.maps.drawing.OverlayType.MARKER,
        google.maps.drawing.OverlayType.CIRCLE,
        google.maps.drawing.OverlayType.POLYGON,
        google.maps.drawing.OverlayType.POLYLINE,
        google.maps.drawing.OverlayType.RECTANGLE,
      ],
    },
    markerOptions: {
      icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    },
    circleOptions: {
      fillColor: "#0000FF",
      fillOpacity: 1,
      strokeWeight: 5,
      clickable: false,
      editable: true,
      zIndex: 1,
    },
  });

  drawingManager.setMap(map);

  createLayerControl();
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(layerControlDiv);

  const geojsonLayer = new google.maps.Data();
  geojsonLayer.loadGeoJson('test.geojson');
  geojsonLayer.setMap(map);

  const geojsonLayerpoint = new google.maps.Data();
  geojsonLayer.loadGeoJson('serviceLineUTM.geojson');
  geojsonLayer.setMap(map);
  




  geojsonLayer.addListener('click', function(event) {
    const feature = event.feature;
    const attribute1 = feature.getProperty("Route"); // Replace 'attribute1' with the actual attribute name in your GeoJSON
    const attribute2 = feature.getProperty("Length_Km"); // Replace 'attribute2' with the actual attribute name in your GeoJSON
  

    let content = `<div class="info-window">
    <h3 class="info-window__title">Attributes:</h3>
    <p class="info-window__attribute"><strong>Route:</strong> ${attribute1}</p>
     `
    
    if(attribute2) {
      content += ` <p class="info-window__attribute"><strong>Length in Km:</strong> ${attribute2}</p>`

    }
    content += `</div>`
    

    // Create and open info window with the attribute information
    const infoWindow = new google.maps.InfoWindow({
      content: content
    });
    infoWindow.setPosition(event.latLng);
    infoWindow.open(map);
  });


  function createLayerControl() {
    layerControlDiv = document.createElement('div');
    layerControlDiv.classList.add('custom-layer-control');
  
    layerOptions = [
      { label: 'Roadmap', value: 'roadmap', image: 'roadmap.png' },
      { label: 'Satellite', value: 'satellite', image: 'satellite.png' },
      { label: 'Hybrid', value: 'hybrid', image: 'hybrid.png' },
      { label: 'Terrain', value: 'terrain', image: 'terrain.png' }
    ];
  
    layerOptions.forEach(function (layerOption) {
      var layerOptionDiv = document.createElement('div');
      layerOptionDiv.classList.add('layer-option');
      layerOptionDiv.addEventListener('click', function () {
        setMapType(layerOption.value);
      });
  
     
  
      var layerLabel = document.createElement('span');
      layerLabel.textContent = layerOption.label;
      layerOptionDiv.appendChild(layerLabel);
  
      layerControlDiv.appendChild(layerOptionDiv);
    });
  }
  
  function setMapType(mapType) {
    map.setMapTypeId(mapType);
  }
  
  
  
  
  
  


  
}
window.initMap = initMap;

setTimeout(function() {
  // Hide the preload div
  document.getElementById('preload').style.display = 'none';

  // Initialize the map
  
}, 4000);

const iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    icon: iconBase + 'parking_lot_maps.png'
  });



