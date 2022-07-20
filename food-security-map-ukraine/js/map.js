var basemap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/ilabmedia/cl4r8xsu6000215p70wd971j7/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw",
  {}
);

var map = L.map("map", {
  center: [48.2, 32.6],
  zoom: 6,
  maxZoom: 8,
  scrollWheelZoom: true,
  minZoom: 2,
  zoomControl: true,
  scrollWheelZoom: true,
  layers: [basemap],
  attributionControl: false,
});

const client = new carto.Client({
  apiKey: "pOSAMV9KS76W7Pn-5OXeYQ",
  username: "csis",
});

var selectedMarkerId = -1;

var sql = 'SELECT * FROM edodd_attacks_on_ukraine_agriculture_food_supply_chain_1';

const mapSource = new carto.source.SQL(sql);   
const filter = new carto.filter.Category('cartodb_id', { notEq: selectedMarkerId });
mapSource.addFilter(filter);

const mapSource2 = new carto.source.SQL(sql);
const filter2 = new carto.filter.Category('cartodb_id', { eq: selectedMarkerId });
mapSource2.addFilter(filter2);

const mapStyle = new carto.style.CartoCSS(`
#layer {
  marker-width: 20;
  marker-fill: ramp([marker_color], (#482d9e, #e32c31, #005e38, #376dc2, #3cc954, #444444, #cc1b15, #ffcc00), ("#482d9e", "#e32c31", "#005e38", "#376dc2", "#3cc954", "#444444", "#cc1b15", "#ffcc00"), "=");
  marker-fill-opacity: 0.75;
  marker-file: url('https://s3.amazonaws.com/com.cartodb.users-assets.production/production/csis/assets/20220622193635location-pin.svg');
  marker-allow-overlap: true;
  marker-line-width: 0;
  marker-line-color: #FFFFFF;
  marker-line-opacity: 1;
}
`);
const mapStyle2 = new carto.style.CartoCSS(`
#layer {
  marker-width: 40;
  marker-fill: ramp([marker_color], (#482d9e, #e32c31, #005e38, #376dc2, #3cc954, #444444, #cc1b15, #ffcc00), ("#482d9e", "#e32c31", "#005e38", "#376dc2", "#3cc954", "#444444", "#cc1b15", "#ffcc00"), "=");
  marker-fill-opacity: 0.9;
  marker-file: url('https://s3.amazonaws.com/com.cartodb.users-assets.production/production/csis/assets/20220622193635location-pin.svg');
  marker-allow-overlap: true;
  marker-line-width: 1;
  marker-line-color: #fff;
  marker-line-opacity: 1;
}
`);

const mapLayer = new carto.layer.Layer(mapSource, mapStyle, {
  featureOverColumns: [
    "cartodb_id",
    "title",
    "description",
    "url",
    "media_url",
    "marker_color",
    "tweethtml"
  ],
});
const mapLayer2 = new carto.layer.Layer(mapSource2, mapStyle2, {
  featureOverColumns: [
    "cartodb_id",
    "title",
    "description",
    "url",
    "media_url",
    "marker_color",
    "tweethtml"
  ],
});

client.addLayer(mapLayer);
client.addLayer(mapLayer2);

var leafletLayer = client.getLeafletLayer();
leafletLayer.bringToFront().addTo(map);

const sidePanel = L.popup({ closeButton: true });

mapLayer.on(carto.layer.events.FEATURE_CLICKED, createSidePanel);

function showSelectedMarker(id) {
  selectedMarkerId = id;
  filter.set('notEq', selectedMarkerId);
  filter2.set('eq', selectedMarkerId);
}

mapLayer.on('featureClicked', featureEvent => {
  if (selectedMarkerId != featureEvent.data.cartodb_id) {
    showSelectedMarker(featureEvent.data.cartodb_id);
  }
});

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
      ${data.title}
    </h2>
    <p class="side-panel-value"><span>${data.description}</span></p>
    `
    if (data.tweethtml) {
      content += `<div class="tweetContainer">${data.tweethtml}</div>`
    }
    if (data.url) {
      content +=
      `
      <p class="side-panel-link">For more details, click <a href="${data.url}" target="_blank">here</a>.</p>
      `;
    }
    panelContent.innerHTML = content;
  }
}

const closeBtn = document.querySelector('.close-btn');
closeBtn.addEventListener('click', function(e) {
  const panel = document.querySelector('.panel');
  panel.classList.remove('open');
  showSelectedMarker(-1);
})

L.control
  .attribution({
    position: "bottomright",
  })
  .setPrefix(
    '<a href="https://www.csis.org/programs/global-food-security-program">CSIS Global Food Security Program</a>, <a href="https://leafletjs.com/">Leaflet</a>'
  )
  .addTo(map);
