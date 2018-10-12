$(document).ready(function() {
  let spreadsheetID = "1B5MgCuTzL0Br5K8ZXXVAnwPb6qCXtwZegRIyr1aRmuQ";
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
            console.log(table);
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
        order: [[1, "asc"]],
        rowGroup: {
          dataSrc: "gsx$ofacsanctionslistdesignation"
        },

        columnDefs: [
          { targets: [1, 8, 9, 10, 11, 12, 13, 14], visible: false },
          {
            targets: Array(15)
              .fill({})
              .map((v, i) => i)
              .slice(1),
            orderable: false
          }
        ],

        initComplete: function() {
          let page = this.api().page.info().page + 1;
          let display = this.api().page.info().recordsDisplay - 1;
          let total = this.api().page.info().recordsTotal - 1;

          $("#example_info").html(
            `Showing ${page * display -
              display +
              1} to ${display} of ${total} entries`
          );

          let sourceColumn = this.api().column(3);
          var sourceSelect = $('<select><option value=""></option></select>')
            .appendTo(".dataTables_filter")
            .on("change", function() {
              var val = $.fn.dataTable.util.escapeRegex($(this).val());
              sourceColumn
                .search(val ? "^" + val + "$" : "", true, false)
                .draw();
            });
          sourceSelect
            // .prepend('<option value="">--choose--</option>')
            .wrap("<div class='select'></div>")
            .before("<label>Source:</label>");

          sourceColumn
            .data()
            .unique()
            .sort()
            .each(function(d, j) {
              sourceSelect.append(
                '<option value="' + d + '">' + d + "</option>"
              );
            });

          let sectorColumn = this.api().column(7);
          var sectorSelect = $('<select><option value=""></option></select>')
            .appendTo(".dataTables_filter")
            .on("change", function() {
              var val = $.fn.dataTable.util.escapeRegex($(this).val());
              sectorColumn
                .search(val ? "^" + val + "$" : "", true, false)
                .draw();
            });

          sectorSelect
            // .prepend('<option value="">--choose--</option>')
            .wrap("<div class='select'></div>")
            .before("<label>Sector:</label>");

          sectorColumn
            .data()
            .unique()
            .sort()
            .each(function(d, j) {
              sectorSelect.append(
                '<option value="' + d + '">' + d + "</option>"
              );
            });
          // debugger;
          sourceSelect
            .find("option:first-of-type")
            .text("filter by source")
            .attr("disabled", "disabled");
          sectorSelect
            .find("option:first-of-type")
            .text("filter by sector")
            .attr("disabled", "disabled");

          let searchField = document.querySelector("input[type='search']");

          searchField.placeholder = "search target or description";

          searchField.addEventListener("keydown", function() {
            sourceSelect.search("", true, false).draw();
            sectorSelect.search("", true, false).draw();
            document.querySelector("select").value = "";
          });
          $("tr").hover(function() {
            this.classList.toggle("hover");
          });
        }
      });
    });
});
