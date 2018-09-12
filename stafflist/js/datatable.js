$(document).ready(function() {
  let url = "js/HR_staffList.csv";

  fetch(url)
    .then(resp => resp.json())
    .then(json => {
      return (completedParse = new Promise(resolve => {
        let table = {
          rows: [],
          columns: []
        };
        json.forEach((row, i) => {
          if (i === 0) {
            Object.keys(row).forEach(column => {
              $("thead tr").append(`<th>${column}</th`);
              table.columns.push({ data: column, defaultContent: "" });
            });
          }
          table.rows.push(row);
          if (table.rows.length === json.length) {
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
          dataSrc: "Work Group"
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
        }
      });
    });
});
