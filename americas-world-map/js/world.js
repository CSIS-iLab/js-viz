var basemap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/ilabmedia/cke3betua01e51ars02wx7zrt/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw",
  {}
);

var map = L.map("map", {
  center: [18.83, 9.34],
  zoom: 2,
  maxZoom: 7,
  scrollWheelZoom: true,
  minZoom: 1,
  zoomControl: false,
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
          #geonames_stats{
            polygon-fill: #672044;
            polygon-opacity: 0.9;
            line-color: #FFF;
            line-width: 0.5;
            line-opacity: 0.5;
          }
          #geonames_stats [ number_of_immigrants <= 100000] {
              polygon-fill: #93345d;
          }
          #geonames_stats [ number_of_immigrants <= 30000] {
              polygon-fill: #b95073;
          }
          #geonames_stats [ number_of_immigrants <= 10000] {
              polygon-fill: #da7489;
          }
          #geonames_stats [ number_of_immigrants <= 5000] {
            polygon-fill: #f29ca3;
          }
          #geonames_stats [ number_of_immigrants <= 1000] {
          polygon-fill: #ffc6c4;
          }
        }
        #layer::outline {
          line-width: 0.5;
          line-color: #FFF;
          line-opacity: 0.5;
        }
      `);

const mapLayer = new carto.layer.Layer(mapSource, mapStyle, {
  featureOverColumns: ["destination", "number_of_immigrants"],
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
      ${data.destination}
    </div>
    <div class="popupEntryStyle">
      ${data.number_of_immigrants}
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
    '<a href="https://www.csis.org/programs/americas-program">CSIS Americas Program</a>, <a href="https://leafletjs.com/">Leaflet</a>'
  )
  .addTo(map);
