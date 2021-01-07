var basemap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/ilabmedia/cki50ienk256w19qnswqh0p2v/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw",
  {}
);

var map = L.map("map", {
  center: [40, -98],
  zoom: 5,
  maxZoom: 6,
  scrollWheelZoom: false,
  minZoom: 4,
  zoomControl: true,
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
    marker-line-color: #0a8672;
    marker-line-opacity: 1;
  }
  #layer::labels {
    text-name: [city_name];
    text-face-name: 'Open Sans Regular';
    text-size: 14;
    text-fill: #FFFFFF;
    text-label-position-tolerance: 10;
    text-halo-radius: 1;
    text-halo-fill: #000;
    text-dy: -10;
    text-allow-overlap: false;
    text-placement: point;
    text-placements: 'N,E,S,W';
    text-placement-type: simple;
  }
  `
);

const mapLayer = new carto.layer.Layer(mapSource, mapStyle, {
  featureOverColumns: ["city_name", "african_sister_cities" , "theme", "ssa_immigrant_population_by_u_s_state", "u_s_state_exports_to_ssa_2018", "u_s_state_imports_from_ssa_2018", "linked_commentary", "sidebar"],
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
      ${data.city_name}
    </h2>
      <p class="side-panel-value">Theme: <span>${data.theme}</span> </p>
      <p class="side-panel-value">SSA Immigrant Population by U.S. State: <span>${data.ssa_immigrant_population_by_u_s_state}</span> </p>
      <p class="side-panel-value">U.S. State Exports to SSA (2018): <span>${data.u_s_state_exports_to_ssa_2018}</span> </p>
      <p class="side-panel-value">U.S. State Imports from SSA (2018): <span>${data.u_s_state_imports_from_ssa_2018}</span> </p>
      ${data.african_sister_cities
        ? `<p class="side-panel-value">African Sister City: <span>${data.african_sister_cities}</span></p>`
        : ""
      }
      <p class="side-panel-desc">${data.sidebar} ${data.linked_commentary
            ? `<a href="${data.linked_commentary}" target="_blank"> Read More</a> </p>`
            : ""
          }</p>`;
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
