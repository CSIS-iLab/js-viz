const threat_countries = {"98": {"30": {"inclination": 30, "china_min": 0, "china_max": 0, "north_korea_min": 0, "north_korea_max": 0, "russia_min": 0, "russia_max": 0, "iran_min": 0, "iran_max": 0 }, "45": {"inclination": 45, "china_min": 0, "china_max": 0, "north_korea_min": 0, "north_korea_max": 0, "russia_min": 0, "russia_max": 0, "iran_min": 0, "iran_max": 0 }, "60": {"inclination": 60, "china_min": 0, "china_max": 0, "north_korea_min": 0, "north_korea_max": 0, "russia_min": 0, "russia_max": 0, "iran_min": 0, "iran_max": 0 }, "90": {"inclination": 90, "china_min": 0, "china_max": 0, "north_korea_min": 0, "north_korea_max": 0, "russia_min": 0, "russia_max": 0, "iran_min": 0, "iran_max": 0 } }, "496": {"30": {"inclination": 30, "china_min": 0, "china_max": 4, "north_korea_min": 0, "north_korea_max": 0, "russia_min": 0, "russia_max": 0, "iran_min": 0, "iran_max": 4 }, "45": {"inclination": 45, "china_min": 0, "china_max": 4, "north_korea_min": 3, "north_korea_max": 4, "russia_min": 0, "russia_max": 4, "iran_min": 1, "iran_max": 3 }, "60": {"inclination": 60, "china_min": 0, "china_max": 2, "north_korea_min": 1, "north_korea_max": 1, "russia_min": 0, "russia_max": 4, "iran_min": 0, "iran_max": 1 }, "90": {"inclination": 90, "china_min": 0, "china_max": 0, "north_korea_min": 0, "north_korea_max": 0, "russia_min": 0, "russia_max": 7, "iran_min": 0, "iran_max": 0 } }, "1012": {"30": {"inclination": 30, "china_min": 0, "china_max": 9, "north_korea_min": 0, "north_korea_max": 0, "russia_min": 0, "russia_max": 0, "iran_min": 0, "iran_max": 9 }, "45": {"inclination": 45, "china_min": 0, "china_max": 8, "north_korea_min": 7, "north_korea_max": 8, "russia_min": 0, "russia_max": 8, "iran_min": 2, "iran_max": 8 }, "60": {"inclination": 60, "china_min": 2, "china_max": 7, "north_korea_min": 2, "north_korea_max": 3, "russia_min": 0, "russia_max": 7, "iran_min": 2, "iran_max": 3 }, "90": {"inclination": 90, "china_min": 2, "china_max": 3, "north_korea_min": 2, "north_korea_max": 2, "russia_min": 2, "russia_max": 17, "iran_min": 2, "iran_max": 2 } }, "1484": {"30": {"inclination": 30, "china_min": 0, "china_max": 14, "north_korea_min": 0, "north_korea_max": 0, "russia_min": 0, "russia_max": 0, "iran_min": 0, "iran_max": 13 }, "45": {"inclination": 45, "china_min": 0, "china_max": 13, "north_korea_min": 9, "north_korea_max": 13, "russia_min": 0, "russia_max": 12, "iran_min": 5, "iran_max": 13 }, "60": {"inclination": 60, "china_min": 3, "china_max": 12, "north_korea_min": 4, "north_korea_max": 4, "russia_min": 0, "russia_max": 13, "iran_min": 4, "iran_max": 5 }, "90": {"inclination": 90, "china_min": 2, "china_max": 4, "north_korea_min": 2, "north_korea_max": 3, "russia_min": 3, "russia_max": 25, "iran_min": 2, "iran_max": 3 } }, "2013": {"30": {"inclination": 30, "china_min": 0, "china_max": 19, "north_korea_min": 0, "north_korea_max": 0, "russia_min": 0, "russia_max": 0, "iran_min": 0, "iran_max": 19 }, "45": {"inclination": 45, "china_min": 0, "china_max": 18, "north_korea_min": 14, "north_korea_max": 18, "russia_min": 0, "russia_max": 18, "iran_min": 7, "iran_max": 16 }, "60": {"inclination": 60, "china_min": 4, "china_max": 7, "north_korea_min": 5, "north_korea_max": 5, "russia_min": 5, "russia_max": 33, "iran_min": 4, "iran_max": 5 }, "90": {"inclination": 90, "china_min": 4, "china_max": 7, "north_korea_min": 5, "north_korea_max": 5, "russia_min": 5, "russia_max": 33, "iran_min": 4, "iran_max": 5 } } }
const widgetDom = document.querySelector('#filterWidget');
let currentInclination = 45
let currentSatellitesNum = 496
const map = L.map('map').setView([15, 25], 2.4);
// map.scrollWheelZoom.disable();
map.zoomControl.setPosition('topright')

// Carto
//https://api.mapbox.com/styles/v1/ilabmedia/cjhux052501oe2slrii14wz3j/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw

// Leaflet
//https://api.mapbox.com/styles/v1/ilabmedia/cjhux052501oe2slrii14wz3j/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw

L.tileLayer('https://api.mapbox.com/styles/v1/ilabmedia/cjhw4r6kx0sia2spem2u2o8fu/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw').addTo(map);

map.attributionControl.addAttribution('<a href="https://aerospace.csis.org">CSIS Aerospace Security</a>')

const client = new carto.Client({
  apiKey: 'yyH22tYmbYA8DzKt2Ggnyg',
  username: 'csis'
});

const satelliteData = new carto.source.SQL(`
  SELECT *
  FROM aerospace_satellite_map_data
  WHERE number_satellites='${currentSatellitesNum}' AND inclination='${currentInclination}'
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
    updateThreatCountries(currentInclination, currentSatellitesNum);
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
    updateThreatCountries(currentInclination, currentSatellitesNum);
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

updateThreatCountries(currentInclination, currentSatellitesNum) // Call once on initial load
function updateThreatCountries(inclination, satellitesNum) {
  let threat_countries_current_coverage = threat_countries[satellitesNum][inclination]
  const valueElements = document.querySelectorAll('.value-changed')
  valueElements.forEach(function(el) {
    let value = el.dataset.country
    el.innerHTML = threat_countries_current_coverage[value]
  })
}

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