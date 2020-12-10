// Create Leaflet Map
const map = L.map("map").setView([40.14, 25.67], 4.4);
map.scrollWheelZoom.disable();

// Create separate pane in Leaflet and set zIndex to bring it to
// the front, while telling it to ignore pointerEvents so it doesn't
// mistake user actions as clicking on country labels
map.createPane("labels");
map.getPane("labels").style.zIndex = 650;
map.getPane("labels").style.pointerEvents = "none";

// Add basemap of countries with no labels from Mapbox using
// Third Party CARTO Integration URL
L.tileLayer(
  "https://api.mapbox.com/styles/v1/ilabmedia/ckg87941h0c2o19o9gmknigfd/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw",
  {
    maxZoom: 10,
  }
).addTo(map);

//Update footer to attribute the program
map.attributionControl.addAttribution(
  '<a href="https://www.csis.org/programs/europe-program">CSIS Europe Program</a>'
);

// Defining a carto.Client, the entry point to CARTO.js which
// handles communication between app and CARTO account
const client = new carto.Client({
  apiKey: "PVhh0XtYMR948oTXFV0vMQ",
  username: "csis",
});

// Define carto.source.Dataset to use the sea_covid19_tracker_map dataset
const riskDataSource = new carto.source.SQL(`
  SELECT * FROM mediterranean_risk_1
`);

// Style the total_cases data
let dataStyle = new carto.style.CartoCSS(setLayerStyle("risk_value"));

// Combine total_cases source and style
const dataLayer = new carto.layer.Layer(riskDataSource, dataStyle, {
  featureOverColumns: [
    "country",
    "instability_markers",
    "risk_level",
    "risk_value",
    "influence_type",
    "risk_level_2",
    "risk_value_2"
  ],
});

// Notify carto.Client that the layers exist. The client
// is responsible for grouping layers into a single Leaflet layer.
client.addLayer(dataLayer);

// Add layer to map
client.getLeafletLayer().addTo(map);

// Switch datasets by clicking on buttons
const riskButton = document.getElementById("risk-button");
const influenceButton = document.getElementById("influence-button");

riskButton.addEventListener("click", function () {
  toggleActiveDataset("risk_value");
  activeIndicator = "risk_level";
  toggleActiveButton("risk");
  popup.removeFrom(map);
});

influenceButton.addEventListener("click", function () {
  toggleActiveDataset("risk_value_2");
  activeIndicator = "ability_level";
  toggleActiveButton("influence");
  popup.removeFrom(map);
});

function toggleActiveDataset(activeDataset) {
  dataStyle.setContent(setLayerStyle(activeDataset));
}

function setLayerStyle(activeDataset) {
  return `
    #layer {
      polygon-fill: ramp([${activeDataset}], (#EED8D9, #D0ADB0, #BA8C91, #A46C72, #87424a), (1, 2, 3, 4, 5, ), "=", category);
    
      polygon-opacity: 0.8;
     
    }
    #layer::outline {
      line-width: 1;
      line-color: #fff;
      line-opacity: 1;
    }
    #layer::labels {
      text-name: [country];
      text-face-name: 'Open Sans Regular';
      text-size: 14;
      text-fill: #000;
      text-label-position-tolerance: 0;
      text-halo-radius: 1;
      text-halo-fill: #fff;
      text-dy: -2;
      text-allow-overlap: false;
      text-placement: point;
      text-transform: uppercase;
      text-placement-type: dummy;
    }
  `;
}

function toggleActiveButton(activeButton) {
  if (activeButton === "risk") {
    influenceButton.classList.remove("active");
    riskButton.classList.add("active");
  } else {
    riskButton.classList.remove("active");
    influenceButton.classList.add("active");
  }
}

let activeIndicator = "risk_level";

const popup = L.popup({ closeButton: false });
dataLayer.on(carto.layer.events.FEATURE_CLICKED, (event) => {
  popup.setLatLng(event.latLng);

  if (!popup.isOpen()) {
    var data = event.data;
    var content = "<div>";

    let riskPopup = `
      <h2 class="popup__title"> 
        ${data.country}
      </h2>
      <p class="popup__values">
        Instability Markers: 
        <span>
          ${data.instability_markers}
        </span>
      </p>
      <p class="popup__values">
        Risk Level: 
        <span>
          ${data.risk_level}
        </span>
      </p>
      <p class="popup__values">
        Risk Value: 
        <span>
          ${data.risk_value}
        </span>
      </p>
    `;

    let influencePopup = `
      <h2 class="popup__title"> 
        ${data.country}
      </h2>
      <p class="popup__values">
        Influence Type: 
        <span>
          ${data.influence_type}
        </span>
      </p>
      <p class="popup__values">
        Risk Level: 
        <span>
          ${data.risk_level_2}
        </span>
      </p>
      <p class="popup__values">
        Risk Value: 
        <span>
          ${data.risk_value_2}
        </span>
      </p>
    `;

    activeIndicator === "risk_level"
      ? (content += riskPopup)
      : (content += influencePopup);

    popup.setContent("" + content);
    popup.openOn(map);
  }
});
