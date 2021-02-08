/*Use Tabletop and Datatables to read Google Spreadsheet*/

var publicSpreadsheetUrl =
  "https://docs.google.com/spreadsheets/d/1WEjSLfF19_OX4GtskW6rjb_e2PYzidcEZAz6tx_pcvg/edit#gid=0";
  

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
      { 
        width: "20%",
        title: "Bill",
        data: null,
        render: function (data, type) {
          if ( type === "display") {
            data = '<a href="' + data.URL + '">' + data.Bill + "</a>";
          }
          return data;
        }
      },
      {
        title: "Date Introduced",
        data: "Date Introduced",
      },
      {
        title: "Sponsor(s)",
        data: "Sponsor(s)",
      },
      {
        title: "Co-Sponsor(s)",
        data: "Co-Sponsor(s)",
      },
      {
        title: "Status",
        data: "Status",
      },
    ],
    paging: false,
    searching: true,
    info: false,
    order: []
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
