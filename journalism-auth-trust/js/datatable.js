$(document).ready(function() {
  const spreadsheetID = "1XN5GjcV__I6Vu_DK4PmMxMye3UHK9P2tQLm_rlBifUg";

  let URL = `https://spreadsheets.google.com/feeds/list/${spreadsheetID}/1/public/values?alt=json`;

  fetch(URL)
    .then(resp => resp.json())
    .then(json => {
      console.log(json);
      return (completedParse = new Promise(resolve => {
        let table = {
          rows: [],
          columns: []
        };

        json.feed.entry.filter((row, i) => {
          let newRow = {};
          Object.keys(row).forEach(column => {
            if (column.includes("gsx$")) {
              newRow[column] = row[column]["$t"];
              if (
                !Object.values(table.columns.map(c => c.data)).includes(column)
              ) {
                table.columns.push({ data: column, defaultContent: "" });
                if (i === 0) {
                  $("thead tr").append(`<th>${row[column]["$t"]}</th`);
                }
              }
            }
          });
          if (i !== 0) table.rows.push(newRow);

          if (table.rows.length === json.feed.entry.length - 1) {
            resolve(table);
          }
        });
      }));
    })
    .then(table => {
      $("#example").DataTable({
        data: table.rows,
        columns: table.columns,
        paging: false,
        order: [[0, "asc"]],
        columnDefs: [
          { targets: [6, 7, 8, 9, 10, 11], visible: false },
          {
            targets: Array(12)
              .fill({})
              .map(function(v, i) {
                return i;
              })
              .filter(function(v, i) {
                return i !== 0;
              }),
            orderable: false
          }
        ],

        initComplete: function() {
          let searchField = document.querySelector("input[type='search']");
          searchField.addEventListener("keydown", function() {
            column.search("", true, false).draw();
            document.querySelector("select").value = "";
          });
          $("tr").hover(function() {
            this.classList.toggle("hover");
          });
        }
      });
    });
});
