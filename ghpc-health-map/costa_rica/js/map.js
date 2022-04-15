var basemap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/ilabmedia/ckvber5pm07gr14rq5v9ichdy/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw",
  {}
);

var map = L.map("map", {
  center: [10, -84.5],
  zoom: 8,
  maxZoom: 8,
  scrollWheelZoom: true,
  minZoom: 5,
  zoomControl: true,
  scrollWheelZoom: true,
  layers: [basemap],
  attributionControl: false,
});

const client = new carto.Client({
  apiKey: "o3e4yrQW5gQWroesARMNZg",
  username: "csis",
});

const mapSource = new carto.source.SQL(`SELECT * FROM 
costa_rica_health_map`);

const mapStyle = new carto.style.CartoCSS(`
  #layer {
    polygon-fill: #B74D95;
    polygon-opacity: 0.6;
    ::outline {
      line-color: #B74D95;
      line-width: 1;
      line-opacity: 1;
    }
  }
`);

const mapLayer = new carto.layer.Layer(mapSource, mapStyle, {
  featureOverColumns: ['country', 'costa_rica_overall', 'text', 'sources'],
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
    var content = "<div>";

    content += `
    <h2 class="sidePanelHeaderStyle">
      ${data.country}
    </h2>
    <!-- Todo: remove this commented block if not needed
    <p class="side-panel-value">
      <span>Costa Rica Overall:</span> ${data.costa_rica_overall}
    </p> -->
    <p class="side-panel-value">
    <span>Text:</span> ${data.text}
    </p>
    <p class="side-panel-value"><span class="source">${data.sources}</span> </p>
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
