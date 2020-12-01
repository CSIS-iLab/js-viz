var basemap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/ilabmedia/cki50ienk256w19qnswqh0p2v/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw",
  {}
);

var map = L.map("map", {
  center: [40, -98],
  zoom: 4,
  maxZoom: 8,
  scrollWheelZoom: false,
  minZoom: 4,
  zoomControl: false,
  scrollWheelZoom: true,
  zoomsliderControl: true,
  layers: [basemap],
  attributionControl: false,
});

const client = new carto.Client({
  apiKey: "weRQmCyhs8QtOadnY-blbg",
  username: "csis",
});

const mapSource = new carto.source.SQL(
  `SELECT * FROM africa_cities_map`
);

const mapStyle = new carto.style.CartoCSS(
  `
  #layer {
    marker-width: 7;
    marker-fill: #EE4D5A;
    marker-fill-opacity: 0.9;
    marker-allow-overlap: true;
    marker-line-width: 1;
    marker-line-color: #FFFFFF;
    marker-line-opacity: 1;
  }    
  `
);

const mapLayer = new carto.layer.Layer(mapSource, mapStyle, {
  featureOverColumns: ["city_name", "african_sister_cities" , "theme", "ssa_diaspora_population_by_state", "state_exports_to_africa_2018", "continental_imports_to_us_states", "linked_commentary", "sidebar"],
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
      ${data.city_name}
    </div>
    <div class="popupEntryStyle">
      African Sister City: ${data.african_sister_cities} <br>
      Theme: ${data.theme} <br>
      SSA Diaspora Population by State: ${data.ssa_diaspora_population_by_state} <br>
      State Exports to Africa 2018: ${data.state_exports_to_africa_2018} <br>
      Continental Imports to The United States: ${data.continental_imports_to_us_states} <br>
      Linked Commentary: <a href="${data.linked_commentary}" target="_blank">Link</a> <br>
      Description: ${data.sidebar} <br>
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
    '<a href="https://www.csis.org/programs/americas-program">CSIS Africa Program</a>, <a href="https://leafletjs.com/">Leaflet</a>'
  )
  .addTo(map);
