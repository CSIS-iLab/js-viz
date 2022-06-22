var basemap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/ilabmedia/cl0gx7j87000b14qv3eley6g7/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw",
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
  apiKey: "mLKZ_fUJ6GlelNbfkALecQ",
  username: "csis",
});

const mapSource = new carto.source.SQL(`SELECT * FROM edodd_attacks_on_ukraine_agriculture_food_supply_chain_1`);

const mapStyle = new carto.style.CartoCSS(`
#layer {
  marker-width: 20;
  marker-fill: ramp([marker_color], (#482d9e, #e32c31, #005e38, #376dc2, #3cc954, #444444, #cc1b15, #ffcc00), ("#482d9e", "#e32c31", "#005e38", "#376dc2", "#3cc954", "#444444", "#cc1b15", "#ffcc00"), "=");
  marker-fill-opacity: 0.75;
  marker-file: ramp([marker_color], (url('https://s3.amazonaws.com/com.cartodb.users-assets.production/production/csis/assets/20220622193635location-pin.svg'), url('https://s3.amazonaws.com/com.cartodb.users-assets.production/production/csis/assets/20220622193635location-pin.svg'), url('https://s3.amazonaws.com/com.cartodb.users-assets.production/production/csis/assets/20220622193635location-pin.svg'), url('https://s3.amazonaws.com/com.cartodb.users-assets.production/production/csis/assets/20220622193635location-pin.svg'), url('https://s3.amazonaws.com/com.cartodb.users-assets.production/production/csis/assets/20220622193635location-pin.svg'), url('https://s3.amazonaws.com/com.cartodb.users-assets.production/production/csis/assets/20220622193635location-pin.svg'), url('https://s3.amazonaws.com/com.cartodb.users-assets.production/production/csis/assets/20220622193635location-pin.svg'), url('https://s3.amazonaws.com/com.cartodb.users-assets.production/production/csis/assets/20220622193635location-pin.svg')), ("#482d9e", "#e32c31", "#005e38", "#376dc2", "#3cc954", "#444444", "#cc1b15", "#ffcc00"), "=");
  marker-allow-overlap: true;
  marker-line-width: 0;
  marker-line-color: #000000;
  marker-line-opacity: 1;
}
`);

const mapLayer = new carto.layer.Layer(mapSource, mapStyle, {
  featureOverColumns: ["title",
    "description",
    "_group",
    "url",
    "media_url",
    "marker_color"
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
