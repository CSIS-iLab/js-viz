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
    responsive: true,
    data: dataset,
    columns: [
      { title: "Date", data: "Date"},
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
        data: "Source",
        className: "dt-body-right",
      },
      {
        title: "Hyperlink",
        data: "Hyperlink",
        render: function (data, type) {
          if (type === "display") {
            data = '<a href="' + data + '">' + data + "</a>";
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
    paging: false,
    searching: true,
    info: false,
    order: [],
    columnDefs: [
      {
        targets: [1, 2, 3, 4, 5, 6],
        orderable: false,
      },
    ],
  });

  
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
