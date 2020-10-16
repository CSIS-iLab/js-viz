var basemap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/ilabmedia/cke3betua01e51ars02wx7zrt/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw",
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
  apiKey: "3wBLygnVR609O76Bedwl9g",
  username: "csis",
});

const mapSource = new carto.source.SQL(
  `SELECT * FROM guyana_graphic_counties_2018`
);

const mapStyle = new carto.style.CartoCSS(
  `    
    #layer {
      #geonames_stats{
        polygon-fill: #672044;
        polygon-opacity: 0.9;
        line-color: #FFF;
        line-width: 0.5;
        line-opacity: 0.5;
      }
      #geonames_stats [ value <= 30000] {
          polygon-fill: #93345d;
      }
      #geonames_stats [ value <= 10000] {
          polygon-fill: #b95073;
      }
      #geonames_stats [ value <= 1000] {
          polygon-fill: #da7489;
      }
      #geonames_stats [ value <= 500] {
        polygon-fill: #f29ca3;
      }
      #geonames_stats [ value <= 100] {
      polygon-fill: #ffc6c4;
      }
    }
    #layer::outline {
      line-width: 0.5;
      line-color: #FFFFFF;
      line-opacity: 0.5;
    }
  `
);

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
    '<a href="https://www.csis.org/programs/americas-program">CSIS Americas Program</a>, <a href="https://leafletjs.com/">Leaflet</a>'
  )
  .addTo(map);
