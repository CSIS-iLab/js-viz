var basemap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/ilabmedia/cjrawc1zs2bzc2sq3y9wvt22t/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw",
  {}
);

var map = L.map("map", {
  center: [40, -98],
  zoom: 5,
  maxZoom: 7,
  scrollWheelZoom: true,
  minZoom: 4,
  zoomControl: true,
  scrollWheelZoom: true,
  layers: [basemap],
  attributionControl: false,
});

const client = new carto.Client({
  apiKey: "QrVFzfR1yEJrtXK_MszfWg",
  username: "csis",
});

const mapSource = new carto.source.SQL(`SELECT * FROM 
guyana_graphic_world_2019`);

const mapStyle = new carto.style.CartoCSS(`
        #layer {
          marker-width: ramp([value], range(10, 60), quantiles(5));
          marker-fill: #6a2248;
          marker-fill-opacity: 0.2;
          marker-allow-overlap: true;
          marker-line-width: 4;
          marker-line-color: #6a2248;
          marker-line-opacity: 1;
        }
      `);

const mapLayer = new carto.layer.Layer(mapSource, mapStyle, {
  featureOverColumns: ["value", "county_state"],
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
      ${data.county_state}
    </div>
    <div class="popupEntryStyle">
      ${data.value}
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
    'Data by <a href="" target="_blank">CSIS</a>, Leaflet contributors'
  )
  .addTo(map);
