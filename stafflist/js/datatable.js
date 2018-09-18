$(document).ready(function() {
  let spreadsheetID = "1hTYUOZxwgorQCJumu7bV2wHiaRfgwCOOEORLbfDjMio";
  let url = `https://spreadsheets.google.com/feeds/list/${spreadsheetID}/od6/public/values?alt=json`;

  fetch(url)
    .then(resp => resp.json())
    .then(json => {
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
          table.rows.push(newRow);
          if (table.rows.length === json.feed.entry.length) {
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
        order: [[2, "asc"]],
        columnDefs: [2].map(i => {
          return { targets: [i], orderable: false };
        }),
        rowGroup: {
          dataSrc: "gsx$workgroup"
        },

        initComplete: function() {
          let page = this.api().page.info().page + 1;
          let display = this.api().page.info().recordsDisplay - 1;
          let total = this.api().page.info().recordsTotal - 1;

          $("#example_info").html(
            `Showing ${page * display -
              display +
              1} to ${display} of ${total} entries`
          );

          let column = this.api().column(2);

          var select = $('<select><option value=""></option></select>')
            .appendTo($(column.header()))
            .on("change", function() {
              var val = $.fn.dataTable.util.escapeRegex($(this).val());
              column.search(val ? "^" + val + "$" : "", true, false).draw();
            });

          column
            .data()
            .unique()
            .sort()
            .each(function(d, j) {
              select.append('<option value="' + d + '">' + d + "</option>");
            });

          let searchField = document.querySelector("input[type='search']");
          searchField.addEventListener("keydown", function() {
            column.search("", true, false).draw();
          });
          $("tr").hover(function() {
            this.classList.toggle("hover");
          });
        }
      });
    });
});
