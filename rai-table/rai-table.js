/*Use Papa parse and Datatables to read Google Spreadsheet*/

let publicSpreadsheetUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS4crrNyYOywjtF4L4QqO9Zlr1YUs16jowFE5EDI-YqhNF06VskZiIWNI9KKtmVAh9ZGbSulXiZyFSv/pub?output=csv";
  
/* Papa parse */
function init() {
  Papa.parse(publicSpreadsheetUrl, {
      download: true,
      header: true,
      complete: showInfo
    })
}

function showInfo(results) {
  let data = results.data
  displayInfo(data);
}

/*function to use Datatables to display data */
function displayInfo(dataset) {
  $("#table").DataTable({
    responsive: true,
    data: dataset,
    columns: [
      {
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
    order: [],
    columnDefs: [
      { width: "10%", targets: [1, 2, 3, 4] }
    ]
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
