var basemap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/ilabmedia/ckfcrds6o1yxu1aqxezval4dr/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw",
  {}
);

var map = L.map("map", {
  center: [41.14, 18.67],
  zoom: 4,
  maxZoom: 6,
  scrollWheelZoom: true,
  minZoom: 4,
  zoomControl: true,
  scrollWheelZoom: true,
  layers: [basemap],
  attributionControl: false,
});
// polygon-fill: ramp([risk_value], (#c18b8e, #a96a6f, #914a52, #5e001d, #672044), quantiles);

// polygon-fill: ramp([risk_value], (#98002e, #a53544, #b0545b, #b97073, #c18b8c), quantiles);
const client = new carto.Client({
  apiKey: "PVhh0XtYMR948oTXFV0vMQ",
  username: "csis",
});

const riskDataSource = new carto.source.SQL(
  `SELECT * FROM mediterranean_risk_1`
);

const mapStyle = new carto.style.CartoCSS(`
#layer {
  polygon-fill: ramp([risk_value], (#980005, #af271a, #c6412d, #de5841, #f56f56), quantiles);
  polygon-opacity: 0.8;
}
#layer::outline {
  line-width: 1;
  line-color: #FFFFFF;
  line-opacity: 0.5;
}
      `);

const mapLayer = new carto.layer.Layer(riskDataSource, mapStyle, {
  featureOverColumns: ["country", "risk_level", "risk_value", "risk_type"],
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
      ${data.country}
    </div>
    <div class="popupEntryStyle">
      Risk Level: ${data.risk_level}
    </div>
    <div class="popupEntryStyle">
      Risk Type: ${data.risk_type}
    </div>
    <div class="popupEntryStyle">
      Risk Value: ${data.risk_value}
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
    '<a href="">CSIS Europe Program</a>, <a href="https://leafletjs.com/">Leaflet</a>'
  )
  .addTo(map);
