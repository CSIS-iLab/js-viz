const widgetDom = document.querySelector('#filterWidget');
const map = L.map('map').setView([15, 25], 2.4);
// map.scrollWheelZoom.disable();
map.zoomControl.setPosition('topright')

// Carto
//https://api.mapbox.com/styles/v1/ilabmedia/cjhux052501oe2slrii14wz3j/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw

// Leaflet
//https://api.mapbox.com/styles/v1/ilabmedia/cjhux052501oe2slrii14wz3j/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw

L.tileLayer('https://api.mapbox.com/styles/v1/ilabmedia/ck909nhog00nz1iqp7gximt6s/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw').addTo(map);

map.attributionControl.addAttribution('<a href="https://www.csis.org/programs/southeast-asia-program">CSIS Southeast Asia Program/a>')

const client = new carto.Client({
  apiKey: 'PXpBveKGMqDPVQLCJ4DRmg', 
  username: 'csis'
});

const covidData = new carto.source.SQL(`
  SELECT *
  FROM carto_test 
  WHERE total_cases='${totalCases}' AND total_deaths='${totalDeaths}'
  `);
  
const satelliteStyle = new carto.style.CartoCSS(`
  #layer {
    polygon-fill: ramp([coverage], (#fde0c5, #facba6, #f8b58b, #f59e72, #f2855d, #ef6a4c, #eb4a40), quantiles);
    polygon-opacity: 0.7;
  }
  #layer::outline {
    line-width: 0;
  }
  `);
const satelliteLayer = new carto.layer.Layer(satelliteData, satelliteStyle, {
  featureOverColumns: ['coverage']
});

client.addLayer(satelliteLayer);
client.getLeafletLayer().addTo(map);

const popup = L.popup({ closeButton: false });
satelliteLayer.on(carto.layer.events.FEATURE_OVER, featureEvent => {
  const coverage = featureEvent.data.coverage.toString()
  popup.setLatLng(featureEvent.latLng);
  popup.setContent(`
    Latitude: <strong>${round(featureEvent.latLng.lat, 0.5)}&deg</strong><br />
    Number of Interceptors Within Range at All Times: <strong>${coverage}</strong>`);
  if (!popup.isOpen()) {
    popup.openOn(map);
  }
});

satelliteLayer.on(carto.layer.events.FEATURE_OUT, featureEvent => {
  popup.removeFrom(map);
});

/*----------  Legend  ----------*/
satelliteLayer.on('metadataChanged', function(event) {
  event.styles.forEach(function (styleMetadata) {
    renderLegend(styleMetadata)
  });
});

function renderLegend(metadata) {
  document.getElementById('legend-min').innerHTML = metadata.getMin();
  document.getElementById('legend-max').innerHTML = metadata.getMax();
  if ( metadata.getMin() ) {
    document.getElementById('legend-bar').classList.remove('is-hidden')
    document.getElementById('constellation-details').classList.remove('is-hidden')
    document.getElementById('noCoverage').classList.add('is-hidden')
  } else {
    document.getElementById('legend-bar').classList.add('is-hidden')
    document.getElementById('constellation-details').classList.add('is-hidden')
    document.getElementById('noCoverage').classList.remove('is-hidden')
  }
}


/*----------  Inclination Widget  ----------*/
const inclinationDataview = new carto.dataview.Category(satelliteData, 'inclination', {
  limit: 100
});

inclinationDataview.on('dataChanged', data => {
  const inclinationsDom = filterWidget.querySelector('.js-inclinations');

  inclinationsDom.onchange = event => {
    currentInclination = event.target.value;
    filterByInclinationAndSatelliteNum(currentInclination, currentSatellitesNum);
  };
});

/*----------  Sizes Widget  ----------*/
const sizeDataview = new carto.dataview.Category(satelliteData, 'number_satellites', {
  limit: 100
});

sizeDataview.on('dataChanged', data => {
  const sizesDom = filterWidget.querySelector('.js-size');

  sizesDom.onchange = event => {
    currentSatellitesNum = event.target.value;
    filterByInclinationAndSatelliteNum(currentInclination, currentSatellitesNum);
  };
});

function filterByInclinationAndSatelliteNum(inclination, satellitesNum) {
  let query = `
  SELECT *
  FROM aerospace_satellite_map_data
  WHERE number_satellites='${satellitesNum}' AND inclination='${inclination}'
  `;
  satelliteData.setQuery(query);
}

client.addDataviews([sizeDataview, inclinationDataview]);



/*----------  More Information  ----------*/
const buttons = document.querySelectorAll('.toggle-panels')
buttons.forEach(function(button) {
  button.addEventListener("click", function() {
    document.getElementById('panel-primary').classList.toggle('is-hidden')
    document.getElementById('panel-secondary').classList.toggle('is-hidden')
  })
})

function round(value, step) {
    step || (step = 1.0);
    var inv = 1.0 / step;
    return Math.round(value * inv) / inv;
}