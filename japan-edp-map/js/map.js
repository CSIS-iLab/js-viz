var basemap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/ilabmedia/ckueiy0314zwg17n3bpxf433q/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw",
  {}
);

var map = L.map("map", {
  center: [11.02, 107.81],
  zoom: 4,
  maxZoom: 7,
  scrollWheelZoom: true,
  minZoom: 1,
  zoomControl: true,
  scrollWheelZoom: true,
  layers: [basemap],
  attributionControl: false,
});

const client = new carto.Client({
  apiKey: "NAE-JNLX0tn0aiNtG9iHzQ",
  username: "csis",
});

const mapSource = new carto.source.SQL(`SELECT * FROM edpinteractivemap`);

const mapStyle = new carto.style.CartoCSS(`
  #layer {
    polygon-fill: #E28801;
    polygon-opacity: .25;
    line-color: #FFF;
    line-width: 0.5;
    line-opacity: 0.5;
  }
  #layer::outline {
    line-width: 0.5;
    line-color: #FFF;
    line-opacity: 0.5;
  }
`);

const mapLayer = new carto.layer.Layer(mapSource, mapStyle, {
  featureOverColumns: ["country",
    "iso",
    "region",
    "description",
    "financial_support",
    "source",
    "focus_areas",
    "major_recipients"
  ],
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
    var content = '';

    content += `
    <h2 class="sidePanelHeaderStyle">
      ${data.country}
    </h2>
    <p class="side-panel-value">Description: <span>${data.description}</span> </p>
    <p class="side-panel-value">Financial Support: <span>${data.financial_support}</span> </p>
    `
    if (data.source) {
      content += `<p class="side-panel-value"><span class="source">${data.source}</span> </p>`
    }
    content +=
    `
    <p class="side-panel-value">Focus Areas: <span>${data.focus_areas}</span> </p>
    <p class="side-panel-value">Major Recipients: <span>${data.major_recipients}</span> </p>
    <p class="side-panel-link">For more details, click <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vTxYNVcd_DsRaJzHo6c3dN78Y9uOypX2jX4VzEaJZpgX_t9qXFfCzNENobD7aFXB-HeVawqjFXtslKI/pubhtml" target="_blank">here</a>.</p>
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
    '<a href="https://www.csis.org/programs/japan-chair">CSIS Japan Chair</a>, <a href="https://leafletjs.com/">Leaflet</a>'
  )
  .addTo(map);
