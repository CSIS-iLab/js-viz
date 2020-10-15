// Create Leaflet Map
const map = L.map("map").setView([46.14, 15.67], 4.4);
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
let dataStyle = new carto.style.CartoCSS(setLayerStyle("risk_level"));

// Combine total_cases source and style
const dataLayer = new carto.layer.Layer(riskDataSource, dataStyle, {
  featureOverColumns: [
    "country",
    "risk_level",
    "risk_label",
    "risk_type",
    "u_s_ability_to_influence",
    "ability_level",
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
  toggleActiveDataset("risk_level");
  // updateLegend("total_cases");
  activeIndicator = "risk_level";
  toggleActiveButton("risk");
  popup.removeFrom(map);
});

influenceButton.addEventListener("click", function () {
  toggleActiveDataset("ability_level");
  // updateLegend("total_deaths");
  activeIndicator = "ability_level";
  toggleActiveButton("influence");
  popup.removeFrom(map);
});

function toggleActiveDataset(activeDataset) {
  dataStyle.setContent(setLayerStyle(activeDataset));
}

// polygon-fill: ramp([${activeDataset}], (#e5d0d0, #ddb6b5, #d49c9b, #c98281, #be6769, #cacdd3), (1, 2, 3, 5, 4, ), "=", category);

// polygon-fill: ramp([${activeDataset}], (#cf9899, #c67f82, #bc676c, #b14d56, #a53041, #cacdd3), (1, 2, 3, 5, 4, ), "=", category);

// polygon-fill: ramp([${activeDataset}],
//   (#dab7b7, #d29d9e, #c98486,#bf6a6f,#b34f58), (1, 2, 3, 5, 4, ), "=", category);

function setLayerStyle(activeDataset) {
  // console.log(activeDataset);
  return `
    #layer {
        polygon-fill: ramp([${activeDataset}], (#dab7b7, #d29d9e, #c98486, #bf6a6f, #b34f58), (1, 2, 3, 4, 5), "=", category);
    
      polygon-opacity: 0.9;
    }
    #layer::outline {
      line-width: 1;
      line-color: #fff;
      line-opacity: 1;
    }
  `;
}

// const legend = document.getElementById("legend");
// const legendItems = legend.querySelectorAll("li");
// function updateLegend(activeDataset) {
//   let values = ["10", "1,000", ">10,000"];

//   if (activeDataset === "total_deaths") {
//     values = ["1", "100", ">1,000"];
//   }

// }

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
        Risk Type: 
        <span>
          ${data.risk_type}
        </span>
      </p>
      <p class="popup__values">
        Risk Level: 
        <span>
          ${data.risk_label}
        </span>
      </p>
      <p class="popup__values">
        Risk Value: 
        <span>
          ${data.risk_level}
        </span>
      </p>
    `;

    let influencePopup = `
      <h2 class="popup__title"> 
        ${data.country}
      </h2>
      <p class="popup__values">
        Risk Type: 
        <span>
          ${data.risk_type}
        </span>
      </p>
      <p class="popup__values">
        US Ability to Influence: 
        <span>
          ${data.u_s_ability_to_influence}
        </span>
      </p>
      <p class="popup__values">
        Influence Value: 
        <span>
          ${data.ability_level}
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
