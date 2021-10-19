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
          polygon-fill: #E28801;
          polygon-opacity: .25;
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

const sidePanel = L.popup({ closeButton: true });

mapLayer.on(carto.layer.events.FEATURE_CLICKED, createSidePanel);

function createSidePanel(event) {
  sidePanel.setLatLng(event.latLng);

  const panel = document.querySelector('.panel');
  const panelContent = document.querySelector('.panel-content')
  panel.classList.add('open');

  if (!sidePanel.isOpen()) {
    var data = event.data;
   
    var content = "";

    content += `
    <h2 class="sidePanelHeaderStyle">
      ${data.country}
    </h2>
      <p class="side-panel-value">Description: <span>${data.description}</span> </p>
      <p class="side-panel-value">ODA for Government and Civil Society 2019 in USD (millions): <span>${data.oda_for_government_and_civil_society_2019_in_usd_millions}</span> </p>
      <p class="side-panel-value">Focus Areas: <span>${data.focus_areas}</span> </p>
      <p class="side-panel-value">Major Recipients: <span>${data.major_recipients}</span> </p>
    `;
      // ${data.african_sister_cities
      //   ? `<p class="side-panel-value">African Sister City: <span>${data.african_sister_cities}</span></p>`
      //   : ""
      // }
      // <p class="side-panel-desc">${data.sidebar} ${data.linked_commentary
      //       ? `<a href="${data.linked_commentary}" target="_blank"> Read More</a> </p>`
      //       : ""
      //     }</p>`;
    panelContent.innerHTML = content;
  }
}

const closeBtn = document.querySelector('.close-btn')
closeBtn.addEventListener('click', function(e) {
  const panel = document.querySelector('.panel');
  panel.classList.remove('open');
})

L.control
  .attribution({
    position: "bottomright",
  })
  .setPrefix(
    '<a href="https://www.csis.org/programs/japan-chair">CSIS Japan Chair</a>, <a href="https://leafletjs.com/">Leaflet</a>'
  )
  .addTo(map);