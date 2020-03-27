/*Use Tabletop and Datatables to read Google Spreadsheet*/

var publicSpreadsheetUrl =
  "https://docs.google.com/spreadsheets/d/1FaJQvGn-DjUNyFPyAkurQrBlVULRJ2GHFDEJ0cjolHw/edit?usp=sharing";

/*init() and showInfo() are from Tabletop, with the addition of displayInfo to use Datatables*/
function init() {
  Tabletop.init({
    key: publicSpreadsheetUrl,
    callback: showInfo,
    parseNumbers: true,
    simpleSheet: true
  });
}

function showInfo(data, tabletop) {
  let lastUpdatedEl = document.getElementById("lastUpdated");
  lastUpdatedEl.innerHTML = tabletop.modelNames[0];
  displayInfo(data);
}

/*function to use Datatables to display data */
function displayInfo(dataset) {
  $("#table").DataTable({
    responsive: true,
    data: dataset,
    columns: [
      { title: "Country", data: "Country" },
      { title: "Cases", data: "Total Cases", className: "dt-body-right" },
      {
        title: "Cases Last 24hr",
        data: "Cases Last 24hr",
        className: "dt-body-right"
      },
      { title: "Deaths", data: "Total Deaths", className: "dt-body-right" },
      { title: "Tests", data: "# Tests", className: "dt-body-right" },
      { title: "Recovered", data: "# Recovered", className: "dt-body-right" },
      {
        title: "Cases per Million",
        data: "Cases per Million",
        className: "dt-body-right"
      },
      {
        title: "Population",
        data: "Total Population",
        className: "dt-body-right"
      }
    ],
    paging: false,
    searching: false,
    info: false,
    order: [[1, 'asc']]
  });
}

window.addEventListener("DOMContentLoaded", init);
