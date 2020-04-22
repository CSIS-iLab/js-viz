// Create Leaflet Map
const map = L.map("map").setView([10, 124], 4);
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
  "https://api.mapbox.com/styles/v1/ilabmedia/ck909nhog00nz1iqp7gximt6s/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw",
  {
    maxZoom: 18,
  }
).addTo(map);

// Add basemap of *only* country labels from Mapbox using Third
// Party CARTO Integration URL. Specify pane as 'labels' so above
// getPane will take effect, putting labels on top of everything else
L.tileLayer(
  "https://api.mapbox.com/styles/v1/ilabmedia/ck8rn1khs0k691inz8zh0ejdd/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw",
  {
    maxZoom: 18,
    pane: "labels",
  }
).addTo(map);

//Update footer to attribute the program
map.attributionControl.addAttribution(
  '<a href="https://www.csis.org/programs/southeast-asia-program">CSIS Southeast Asia Program</a>'
);

// Defining a carto.Client, the entry point to CARTO.js which
// handles communication between app and CARTO account
const client = new carto.Client({
  apiKey: "5QG-UzbQNxyNreqAyYCckw",
  username: "csis",
});

// Define carto.source.Dataset to use the sea_covid19_tracker_map dataset
const dataSource = new carto.source.SQL(`
      SELECT *,
      sum(total_cases) AS total_cases_sum
      FROM map_data_coronavirus_covid19_cases_in_sea
      GROUP BY cartodb_id
    `);

// Style the total_cases data
let dataStyle = new carto.style.CartoCSS(setLayerStyle("total_cases"));

// Combine total_cases source and style
const dataLayer = new carto.layer.Layer(dataSource, dataStyle, {
  featureOverColumns: ["country", "total_cases", "total_deaths"],
});

// Notify carto.Client that the layers exist. The client
// is responsible for grouping layers into a single Leaflet layer.
client.addLayer(dataLayer);

// Add layer to map
client.getLeafletLayer().addTo(map);

// Calculate Total Cases & Deaths
const total_cases = new carto.dataview.Formula(dataSource, "total_cases", {
  operation: carto.operation.SUM,
});
total_cases.on("dataChanged", (data) => {
  sum_total_cases = data.result;
  document.getElementById("total_cases").innerHTML = data.result.toLocaleString(
    "en-us"
  );
});
client.addDataview(total_cases);

const total_deaths = new carto.dataview.Formula(dataSource, "total_deaths", {
  operation: carto.operation.SUM,
});
total_deaths.on("dataChanged", (data) => {
  sum_total_deaths = data.result;
  document.getElementById(
    "total_deaths"
  ).innerHTML = data.result.toLocaleString("en-us");
});
client.addDataview(total_deaths);

// Switch datasets by clicking on buttons
const totalCasesButton = document.getElementById("total-cases-button");
const totalDeathsButton = document.getElementById("total-deaths-button");

totalCasesButton.addEventListener("click", function () {
  toggleActiveDataset("total_cases");
  updateLegend("total_cases");
  toggleActiveButton("totalCases");
});

totalDeathsButton.addEventListener("click", function () {
  toggleActiveDataset("total_deaths");
  updateLegend("total_deaths");
  toggleActiveButton("totalDeaths");
});

function toggleActiveDataset(activeDataset) {
  dataStyle.setContent(setLayerStyle(activeDataset));
}

function setLayerStyle(activeDataset) {
  let max = 150;
  let bins = 500;
  let bg = "#0064a3";
  let border = "#025488";

  if (activeDataset === "total_deaths") {
    max = 50;
    bins = 10;
    bg = "#6A2248";
    border = "#480e2c";
  }

  return `
        #layer {
          marker-width: ramp([${activeDataset}], range(10, ${max}), equal(${bins}));
          marker-fill: ${bg};
          marker-fill-opacity: 0.6;
          marker-allow-overlap: true;
          marker-line-width: 1;
          marker-line-color: ${border};
          marker-line-opacity: 1;

          [${activeDataset} = 0] {
            marker-width: 0;
          }
        }
      `;
}

const legend = document.getElementById("legend");
const legendItems = legend.querySelectorAll("li");
function updateLegend(activeDataset) {
  let values = ["10", "1,000", ">10,000"];

  if (activeDataset === "total_deaths") {
    values = ["1", "100", ">1,000"];
  }

  legend.setAttribute("data-type", activeDataset);

  legendItems.forEach((li, i) => (li.innerHTML = values[i]));
}

function toggleActiveButton(activeButton) {
  if (activeButton == "totalCases") {
    totalCasesButton.classList.add("active");
    totalDeathsButton.classList.remove("active");
  } else {
    totalCasesButton.classList.remove("active");
    totalDeathsButton.classList.add("active");
  }
}

const popup = L.popup({ closeButton: false });
dataLayer.on(carto.layer.events.FEATURE_OVER, (event) => {
  popup.setLatLng(event.latLng);

  if (!popup.isOpen()) {
    var data = event.data;
    var content = "<div>";

    var keys = ["country", "total_cases", "total_deaths"];

    content += `
          <h2 class="popup__title"> 
          ${data.country}
          </h2>
          <p class="popup__values">
          Total Cases: <span>${data.total_cases.toLocaleString(
            "en-us"
          )}</span><br />
          Total Deaths: <span>${data.total_deaths.toLocaleString(
            "en-us"
          )}</span>
          </p>
        `;
    popup.setContent("" + content);
    popup.openOn(map);
  }
});

dataLayer.on(carto.layer.events.FEATURE_OUT, (event) => {
  popup.removeFrom(map);
});
