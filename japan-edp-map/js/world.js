var basemap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/ilabmedia/ckueiy0314zwg17n3bpxf433q/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw",
  {}
);

var map = L.map("map", {
  center: [11.02, 115.81],
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
  apiKey: "NAE-JNLX0tn0aiNtG9iHzQ",
  username: "csis",
});

const mapSource = new carto.source.SQL(`SELECT * FROM edpinteractivemap`);

const mapStyle = new carto.style.CartoCSS(`
        #layer {
          polygon-fill: ramp([country],
            (#5F4690, #1D6996, #38A6A5, #0F8554, #73AF48),
            ("China, Taiwan Province of", "India", "Indonesia", "Japan", "South Korea"),
            "=");
          polygon-opacity: 0.9;
          line-color: #FFF;
          line-width: 0.5;
          line-opacity: 0.5;
        }
        #layer::outline {
          line-width: 0.5;
          line-color: #FFF;
          line-opacity: 0.5;
        }
      `);

const mapLayer = new carto.layer.Layer(mapSource, mapStyle, {
  featureOverColumns: ["country",
    "iso",
    "region",
    "description",
    "oda_for_government_and_civil_society_2019_in_usd_millions",
    "focus_areas",
    "major_recipients"
  ],
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
      ${data.description}
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