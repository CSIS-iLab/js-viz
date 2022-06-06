var basemap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/ilabmedia/ckvber5pm07gr14rq5v9ichdy/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw",
  {}
);

var map = L.map("map", {
  center: [0, 0],
  zoom: 3,
  maxZoom: 7,
  scrollWheelZoom: true,
  minZoom: 1,
  zoomControl: true,
  scrollWheelZoom: true,
  layers: [basemap],
  attributionControl: false,
});

const client = new carto.Client({
  apiKey: "FK_3OfeISE22vRNHv48JBQ",
  username: "csis",
});

const mapSource = new carto.source.SQL(`SELECT * FROM russia_btg_map`);

const mapStyle = new carto.style.CartoCSS(`
#layer {
  marker-width: 7;
  marker-fill: ramp([country], ("#7F3C8D", "#11A579", "#3969AC"), ("Russia", "Ukraine", "Russia "), '=');
  marker-fill-opacity: 0.9;
  marker-allow-overlap: true;
  marker-line-width: 1;
  marker-line-color: #FFFFFF;
  marker-line-opacity: 1;
}
`);

const mapLayer = new carto.layer.Layer(mapSource, mapStyle, {
  featureOverColumns: ["short_form_name", "type_symbol", "formation_symbol2", "hq_tail2", "country", "source", "formal_name"],
});

client.addLayer(mapLayer);

client.getLeafletLayer().bringToFront().addTo(map);

const popup = L.popup({ closeButton: true });

mapLayer.on(carto.layer.events.FEATURE_CLICKED, createPopup);

function createPopup(event) {
  popup.setLatLng(event.latLng);

  if (!popup.isOpen()) {
    var data = event.data;
    console.log(event.data);
    var content = "<div>";

    content += `
    <div class="popupHeaderStyle">
      ${data.short_form_name}
    </div>
    <div class="popupEntryStyle">
      ${data.formal_name}
    </div>
    `;
    popup.setContent("" + content);
    popup.openOn(map);
  }
}

L.control
  .attribution({
    position: "bottomright",
  })
  .setPrefix(
    '<a href="https://www.csis.org/programs/PROGRAMNAME">CSIS PROGRAM</a>, <a href="https://leafletjs.com/">Leaflet</a>'
  )
  .addTo(map);
