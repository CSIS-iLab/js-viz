/*Use Tabletop and Datatables to read Google Spreadsheet*/

var publicSpreadsheetUrl =
  "https://docs.google.com/spreadsheets/d/1dGbB1eOJOPGsdqeZ0bvttNmnqP7UE8Tp9ZXltwDtapA/edit#gid=0";

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
  displayInfo(data);
}

/*function to use Datatables to display data */
function displayInfo(dataset) {
  $("#table").DataTable({
    dom:
      "<'row'<'col-md-12'Bf>>" +
      "<'row'<'col-md-12't>>" +
      "<'row table-footer'<'col-md-6'l><'col-md-6'ip>>",
    lengthMenu: [[5,10, 25, 50, -1], [5,10, 25, 50, "All"]],
    responsive: true,
    data: dataset,
    columns: [
      { title: "Date", data: "Date" },
      {
        title: "Location",
        data: "Location",
        className: "dt-body-right",
      },
      {
        title: "Type of Activity",
        data: "Type of Activity",
        className: "dt-body-right",
      },
      {
        title: "Type of Capability",
        data: "Type of Capability",
        className: "dt-body-right",
      },
      {
        title: "Source",
        data: "Hyperlink",
        render: function (data, type, columns) {
          if (type === "display") {
            data =
              '<a href="' +
              data +
              ' "target="_blank">' +
              columns.Source +
              "</a>";
          }

          return data;
        },
        className: "dt-body-right",
      },
      {
        title: "Additional Information",
        data: "Additional Information",
        className: "dt-body-right",
      },
    ],
    paging: true,
    responsive: true,
    searching: true,
    info: false,
    order: [],
    columnDefs: [
      {
        targets: [1, 2, 3, 4, 5],
        orderable: false,
      },
    ],
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
