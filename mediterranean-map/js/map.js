var basemap = L.tileLayer("", {});

var map = L.map("map", {
  center: [40, -98],
  zoom: 4,
  maxZoom: 6,
  scrollWheelZoom: true,
  minZoom: 4,
  zoomControl: true,
  scrollWheelZoom: true,
  layers: [basemap],
  attributionControl: false,
});

const client = new carto.Client({
  apiKey: "",
  username: "csis",
});

const mapSource = new carto.source.SQL(`SELECT * FROM `);

const mapStyle = new carto.style.CartoCSS(`
      
      `);

const mapLayer = new carto.layer.Layer(mapSource, mapStyle, {
  // featureOverColumns: [],
});

client.addLayer(mapLayer);

client.getLeafletLayer().bringToFront().addTo(map);

// const popup = L.popup({ closeButton: true });

// mapLayer.on(carto.layer.events.FEATURE_CLICKED, createPopup);

// function createPopup(event) {

// }

L.control
  .attribution({
    position: "bottomright",
  })
  .setPrefix(
    '<a href="">CSIS Europe Program</a>, <a href="https://leafletjs.com/">Leaflet</a>'
  )
  .addTo(map);
