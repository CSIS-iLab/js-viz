var basemap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/ilabmedia/ckkodcqt23pki17o38njhn5r4/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw",
  {}
);

var map = L.map("map", {
  center: [56, -31],
  zoom: 3,
  maxZoom: 5,
  scrollWheelZoom: false,
  minZoom: 3,
  zoomControl: true,
  scrollWheelZoom: true,
  zoomsliderControl: true,
  layers: [basemap],
  attributionControl: false,
});

const client = new carto.Client({
  apiKey: "WX4o71DZeW92xrMXN3GReQ",
  username: "csis",
});

const mapSource = new carto.source.SQL(
  `SELECT * FROM arctic_tracker`
);

const mapStyle = new carto.style.CartoCSS(
  `
  #layer {
    marker-width: 12;
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
  featureOverColumns: ["date", "location" , "type_of_activity", "type_of_capability", "county_countries_participating", "source", "hyperlink", "additional_information"],
});

client.addLayer(mapLayer);

client.getLeafletLayer().bringToFront().addTo(map);

const popup = L.popup({ closeButton: true });

mapLayer.on(carto.layer.events.FEATURE_CLICKED, createPopup);

function createPopup(event) {
  popup.setLatLng(event.latLng);

  if (!popup.isOpen()) {
    var data = event.data;
    var content = `<div class="popupContainer">`;

    content += `
    <div class="popupHeaderStyle">
      ${data.date}
    </div>
    <div class="popupEntryStyle">
      <p>Location: ${data.location}</p>
      <p>Type: ${data.type_of_activity}</p>
      <p>Capability: ${data.type_of_capability}</p>
      <p>Countries Participating: ${data.county_countries_participating}</p>
      <p>Source: <a class="link" href="${data.hyperlink}" target="_blank">${data.source}</a></p>
      <p>${data.additional_information}</p>
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
    '<a href="https://www.csis.org/programs/europe-russia-and-eurasia-program">CSIS Europe, Russia, and Eurasia Program </a>, <a href="https://leafletjs.com/">Leaflet</a>'
  )
  .addTo(map);
