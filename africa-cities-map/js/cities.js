var basemap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/ilabmedia/cki50ienk256w19qnswqh0p2v/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw",
  {}
);

var map = L.map("map", {
  center: [40, -98],
  zoom: 5,
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
    marker-width: 13;
    marker-fill: #66C6CB;
    marker-fill-opacity: 0.8;
    marker-allow-overlap: true;
    marker-line-width: 1;
    marker-line-color: #566377;
    marker-line-opacity: 1;
  }    
  `
);

const mapLayer = new carto.layer.Layer(mapSource, mapStyle, {
  featureOverColumns: ["city_name", "african_sister_cities" , "theme", "ssa_diaspora_population_by_state", "state_exports_to_africa_2018", "continental_imports_to_us_states", "linked_commentary", "sidebar"],
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
   
    var content = "<div>";

    content += `
    <h2 class="sidePanelHeaderStyle">
      ${data.city_name}
    </h2>
    <hr>
    <div class="sidePanelEntryStyle">
      ${data.african_sister_cities
          ? `<p><b>African Sister City:</b> ${data.african_sister_cities} </p>`
          : ""
      }
      <p><b>Theme:</b> ${data.theme} </p>
      <p><b>SSA Diaspora Population by State:</b> ${data.ssa_diaspora_population_by_state} </p>
      <p><b>State Exports to Africa 2018:</b> ${data.state_exports_to_africa_2018} </p>
      <p><b>Continental Imports to The United States:</b> ${data.continental_imports_to_us_states} </p>
      ${data.linked_commentary
          ? `<p><b>Linked Commentary:</b> <a href="${data.linked_commentary}" target="_blank">View Commentary</a> </p>`
          : ""
      }
      ${data.sidebar
          ? `<p><b>Description:</b> ${data.sidebar}</p>`
          : ""
      }
    </div>
    `;

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
    '<a href="https://www.csis.org/programs/americas-program">CSIS Africa Program</a>, <a href="https://leafletjs.com/">Leaflet</a>'
  )
  .addTo(map);
