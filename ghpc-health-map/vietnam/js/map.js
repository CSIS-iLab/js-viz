var basemap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/ilabmedia/ckvber5pm07gr14rq5v9ichdy/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw",
  {}
);

var map = L.map("map", {
  center: [15.5, 105.4],
  zoom: 6,
  maxZoom: 8,
  scrollWheelZoom: true,
  minZoom: 5,
  zoomControl: true,
  scrollWheelZoom: true,
  layers: [basemap],
  attributionControl: false,
});

const client = new carto.Client({
  apiKey: "UmfpOJfsKpgmSGIsUOHerA",
  username: "csis",
});

const mapSource = new carto.source.SQL(`SELECT * FROM 
vietnam_health_map`);

const mapStyle = new carto.style.CartoCSS(`
  #layer {
    polygon-fill: #86AC20;
    polygon-opacity: 0.6;
    ::outline {
      line-color: #86AC20;
      line-width: 1;
      line-opacity: 1;
    }
  }
`);

const mapLayer = new carto.layer.Layer(mapSource, mapStyle, {
  featureOverColumns: ['country', 'vietnam_overall', 'middle_income', 'east_asia_and_pacific'],
});

client.addLayer(mapLayer);

client.getLeafletLayer().bringToFront().addTo(map);

const sidePanel = L.popup({ closeButton: true });

mapLayer.on(carto.layer.events.FEATURE_CLICKED, createSidePanel);

function createSidePanel(event) {
  sidePanel.setLatLng(event.latLng);

  const panel = document.querySelector('.panel');
  const panelContent = document.querySelector('.panel-content');
  panel.classList.add('open');

  if (!sidePanel.isOpen()) {
    var data = event.data;
    var content = '<div>';

    content += `
    <h2 class="sidePanelHeaderStyle">
      ${data.country}
    </h2>
    <p class="side-panel-value">
      <span>Vietnam Overall:</span> ${data.vietnam_overall}
    </p>
    <p class="side-panel-value">
    <span>Middle Income Countries:</span> ${data.middle_income}
    </p>
    <p class="side-panel-value">
      <span>East Asia & Pacific:</span> ${data.east_asia_and_pacific}
    </p>
    `;
    panelContent.innerHTML = content;
  }
}

const closeBtn = document.querySelector('.close-btn');
closeBtn.addEventListener('click', function(e) {
  const panel = document.querySelector('.panel');
  panel.classList.remove('open');
})

L.control
  .attribution({
    position: "bottomright",
  })
  .setPrefix(
    '<a href="https://www.csis.org/programs/americas-program">CSIS Global Health Program</a>, <a href="https://leafletjs.com/">Leaflet</a>'
  )
  .addTo(map);
