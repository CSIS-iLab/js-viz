/*Use Tabletop and Datatables to read Google Spreadsheet*/

var publicSpreadsheetUrl =
  "https://docs.google.com/spreadsheets/d/1VZZ5p_aIuVVCfXGR1iuULBfF9MJGKih4wJgZY9HXJbs/edit#gid=0";

/*init() and showInfo() are from Tabletop, with the addition of displayInfo to use Datatables*/
function init() {
  Tabletop.init({
    key: publicSpreadsheetUrl,
    callback: showInfo,
    parseNumbers: true,
    simpleSheet: true,
  });
}

function showInfo(data, tabletop) {
  console.log(data, tabletop);
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
      { title: "Mainland Counterpart", data: "Mainland Counterpart" },
      {
        title: "Region",
        data: "Xinjiang Region",
        className: "dt-body-right",
      },
      {
        title: "Prioritized Industry",
        data: "Prioritized Industry",
        className: "dt-body-right",
      },
      {
        title: "Affiliated Pairing Companies",
        data: "Affiliated Pairing Companies",
        className: "dt-body-right",
      },
      {
        title: "Linked Infrastructure Projects",
        data: "Linked Infrastructure Projects",
        className: "dt-body-right",
      },
    ],
    paging: false,
    searching: false,
    info: false,
    order: [],
    columnDefs: [
      {
        targets: [1, 2, 3, 4],
        orderable: false,
      },
    ],
  });
  console.log("hello")
  $("#table tfoot th").each(function () {
    var title = $("#table thead th").eq($(this).index()).text();
    $(this).html('<input type="text" placeholder="Search ' + title + '" />');
  });
  // DataTable
  var table = $("#table").DataTable();
  // Apply the search
  table.columns().every(function () {
    var that = this;
    $("input", this.footer()).on("keyup change", function () {
      that.search(this.value).draw();
    });
  });
}

window.addEventListener("DOMContentLoaded", init);
