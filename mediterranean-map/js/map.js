// var basemap = L.tileLayer(
//   "https://api.mapbox.com/styles/v1/ilabmedia/ckfcrds6o1yxu1aqxezval4dr/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw",
//   {}
// );

// var map = L.map("map", {
//   center: [41.14, 18.67],
//   zoom: 4,
//   maxZoom: 6,
//   scrollWheelZoom: true,
//   minZoom: 4,
//   zoomControl: true,
//   scrollWheelZoom: true,
//   layers: [basemap],
//   attributionControl: false,
// });
// // polygon-fill: ramp([${activeIndicator}], (#87424a, #9a5e62, #ac7a7c, #be9697, #d0b3b4),
// // polygon-fill: ramp([${activeIndicator}], (#b34f58, #bf6a6f, #c98486, #d29d9e, #dab7b7),

// // let apiKey = "PVhh0XtYMR948oTXFV0vMQ";
// let client = new carto.Client({
//   apiKey: "PVhh0XtYMR948oTXFV0vMQ",
//   username: "csis",
// });

// const riskDataSource = new carto.source.SQL(
//   `SELECT * FROM mediterranean_risk_1`
// );

// let activeIndicator = "risk_value";

// const mapStyle = new carto.style.CartoCSS(setLayerStyle());

// let columns =
//   activeIndicator === "risk_value"
//     ? ["country", "risk_level", "risk_value", "risk_type"]
//     : ["country", "u_s_ability_to_influence", "ability_level", "risk_type"];

// const mapLayer = new carto.layer.Layer(riskDataSource, mapStyle, {
//   featureOverColumns: columns,
// });

// client.addLayer(mapLayer);

// client.getLeafletLayer().bringToFront().addTo(map);

// // Switch datasets by clicking on buttons
// const riskButton = document.getElementById("risk-button");
// const influenceButton = document.getElementById("influence-button");

// riskButton.addEventListener("click", function () {
//   // updateLegend("total_cases");
//   toggleActiveButton("Risk");
// });

// influenceButton.addEventListener("click", function () {
//   // updateLegend("total_deaths");
//   toggleActiveButton("Influence");
//   toggleActiveDataset();
// });

// function toggleActiveDataset() {
//   mapStyle.setContent(setLayerStyle(mapLayer));
// }

// function setLayerStyle() {
//   return `
//       #layer {
//         polygon-fill: ramp([${activeIndicator}], (#be6769, #c98281, #d49c9b, #ddb6b5, #e5d0d0), quantiles);
//         polygon-opacity: 0.8;
//       }
//       #layer::outline {
//         line-width: 1;
//         line-color: #FFFFFF;
//         line-opacity: 0.5;
//       }
//       `;
// }

// function toggleActiveButton(activeButton) {
//   console.log(activeButton);
//   if (activeButton == "Risk") {
//     activeIndicator === "risk_value";
//     riskButton.classList.add("active");
//     influenceButton.classList.remove("active");
//   } else {
//     activeIndicator === "ability_level";
//     riskButton.classList.remove("active");
//     influenceButton.classList.add("active");
//   }
// }

// const popup = L.popup({ closeButton: true });

// mapLayer.on(carto.layer.events.FEATURE_CLICKED, createPopup);

// function createPopup(event) {
//   popup.setLatLng(event.latLng);

//   if (!popup.isOpen()) {
//     var data = event.data;
//     console.log(event.data);
//     console.log(activeIndicator);
//     var content = "<div>";

//     let popEntry1 =
//       activeIndicator === "risk_value"
//         ? `Risk Level: ${data.risk_level}`
//         : `U.S. Ability to Influence: ${data.u_s_ability_to_influence}`;

//     let popEntry2 =
//       activeIndicator === "risk_value"
//         ? `Risk Value: ${data.risk_value}`
//         : `Ability Value: ${data.ability_level}`;

//     content +=
//       `
//     <h2 class="popupHeaderStyle">
//       ${data.country}
//     </h2>
//     <p class="popupEntryStyle">
//     Risk Type: ${data.risk_type}
//     </p>
//     <p class="popupEntryStyle">
//     ` +
//       popEntry1 +
//       `
//     </p>
//     <p class="popupEntryStyle">
//     ` +
//       popEntry2 +
//       `
//     </p>
//     `;
//     popup.setContent("" + content);
//     popup.openOn(map);
//   }
// }

// L.control
//   .attribution({
//     position: "bottomright",
//   })
//   .setPrefix(
//     '<a href="">CSIS Europe Program</a>, <a href="https://leafletjs.com/">Leaflet</a>'
//   )
//   .addTo(map);

// Create Leaflet Map
const map = L.map("map").setView([41.14, 18.67], 4.4);
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
  "https://api.mapbox.com/styles/v1/ilabmedia/ckfcrds6o1yxu1aqxezval4dr/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw",
  {
    maxZoom: 18,
  }
).addTo(map);

//Update footer to attribute the program
map.attributionControl.addAttribution(
  '<a href="https://www.csis.org/programs/southeast-asia-program">CSIS Southeast Asia Program</a>'
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
  console.log(popup);
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

function setLayerStyle(activeDataset) {
  return `
  #layer {
    polygon-fill: ramp([${activeDataset}], (#be6769, #c98281, #d49c9b, #ddb6b5, #e5d0d0), quantiles);
        polygon-opacity: 0.8;
      }
      #layer::outline {
        line-width: 1;
        line-color: #FFFFFF;
        line-opacity: 0.5;
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

//   legend.setAttribute("data-type", activeDataset);

//   legendItems.forEach((li, i) => (li.innerHTML = values[i]));
// }

function toggleActiveButton(activeButton) {
  if (activeButton === "risk") {
    riskButton.classList.add("active");
    riskButton.classList.remove("active");
  } else {
    influenceButton.classList.remove("active");
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
      <p>
        Risk Type: 
        <span>
          ${data.risk_type}
        </span>
      </p>
      <p>
        Risk Level: 
        <span>
          ${data.risk_label}
        </span>
      </p>
      <p>
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
      <p>
        Risk Type: 
        <span>
          ${data.risk_type}
        </span>
      </p>
      <p>
        US Ability to Influence: 
        <span>
          ${data.u_s_ability_to_influence}
        </span>
      </p>
      <p>
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
