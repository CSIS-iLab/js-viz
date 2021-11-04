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
    "financial_support",
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
    var content = '';
    let description = '';
    let financial_support ='';
    // Format data.description into 2 spans | only used to explain Taiwan situation.
    const indexAt = data.description.lastIndexOf('*');
    // Format Source from the column financial_support
    // Need to find source then from the word source make a new sentence to put in a tag and add some margin and a diferent color
    let indexWordSource = data.financial_support.indexOf('Source');
    
    if (indexWordSource != -1) {
      const financialSupportFirst = data.financial_support.slice(0, indexWordSource);
      const financialSupportSecond = data.financial_support.substring(indexWordSource);
      financial_support = `<span>${financialSupportFirst}</span> <span class='second'>${financialSupportSecond}</span>`
    } else {
      financial_support = `<span>${data.financial_support}</span>`
    }

    content += `
    <h2 class="sidePanelHeaderStyle">
      ${data.country}
    </h2>
    <p class="side-panel-value">Description: <span>${data.description}</span> </p>
    <p class="side-panel-value">Financial Support: <span>${financial_support}</span> </p>
    <p class="side-panel-value">Focus Areas: <span>${data.focus_areas}</span> </p>
    <p class="side-panel-value">Major Recipients: <span>${data.major_recipients}</span> </p>
    <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vQkwD7rYDN3TMwOVYdkuTc-T0a_LLN8chUU3jYUrLv42ckCWlBJYY83WNPpi6b_snNJTpz22u1VYwGu/pubhtml" target="_blank">See the file</a>
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
    '<a href="https://www.csis.org/programs/japan-chair">CSIS Japan Chair</a>, <a href="https://leafletjs.com/">Leaflet</a>'
  )
  .addTo(map);
