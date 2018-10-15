$(document).ready(function() {
  let spreadsheetID = "1MNuSvAUGRJXOdaVVNjgSm0ZBlHw2cSJtP7eq9sdu1b8";
  let URL = `https://spreadsheets.google.com/feeds/list/${spreadsheetID}/od6/public/values?alt=json`;
  let keyID = "1mY0xpbQyMMbMm1ERP8ZFl1J_2fGzK0Q3lI0lfC-3YsY";
  let keyURL = `https://spreadsheets.google.com/feeds/list/${keyID}/od6/public/values?alt=json`;

  function format(d) {
    // `d` is the original data object for the row
    return `
      <div class="details">
        <div class="action-taken">
          <div class="heading">ACTION TAKEN</div>
          <div>${d["gsx$actiontaken"]}</div>
        </div>

        <div class="specific-targets">
          <div class="heading">SPECIFIC TARGETS</div>
          <div>${d["gsx$specifictargets"]}</div>
        </div>

        <div class="stated-intent">
          <div class="heading">STATED INTENT</div>
          <div>${d["gsx$statedintent"]}</div>
        </div>

        <div class="impact">
          <div class="heading">IMPACT</div>
          <div>${d["gsx$impact"]}</div>
        </div>

        <div class="ht-lift">
          <div class="heading">HOW TO LIFT</div>
          <div>${d["gsx$howtoliftmechanically"]}</div>
        </div>

        <div class="resources">
          <div class="heading">RESOURCES</div>
          <div><ul><li>${d["gsx$resources"]
            .split(/,|;/)
            .map(l => `<a href="${l}" target="_blank">${l}</a>`)
            .join("</li><li>")}</li></ul></div>
        </div>
      </div>
      `;
  }

  function makeFilter(table, array) {
    array.forEach(c => {
      let label = c.header().textContent;
      let labelSlug = label
        .toLowerCase()
        .replace(/[!@#\$%\^\&*\)\(+=.,_-]/g, "")
        .replace(/\s/g, "_");

      var datalist = $(`<datalist id="${labelSlug}"></datalist>`).prependTo(
        ".dataTables_filter"
      );

      var input = `<input class="filter ${labelSlug}" list="${labelSlug}" >`;

      datalist
        .wrap("<div></div>")
        .before(`<label>${label}:</label>`)
        .before(input);

      $(`.${labelSlug}`).on("change", function() {
        var val = $.fn.dataTable.util.escapeRegex($(this).val());
        c.search(val ? "^" + val + "$" : "", true, false).draw();
      });

      $(`.${labelSlug}`).on("focus", function() {
        this.value = "";
      });

      let newArray = [].concat.apply(
        [],
        c.data().map(d =>
          d
            .replace(/(\<ul\>|<\/ul\>)/g, "")
            .split("</li><li>")
            .map(d => d.replace(/(\<li\>|<\/li\>)/g, ""))
        )
      );
      $([...new Set(newArray)])
        .sort()
        .each(function(j, d) {
          datalist.append('<option value="' + d + '">' + d + "</option>");
        });
      document.querySelector(
        `.${labelSlug}`
      ).placeholder = `filter by ${label.toLowerCase()}`;
    });
  }

  fetch(keyURL)
    .then(resp => resp.json())
    .then(json => {
      return new Promise(resolve => {
        let keys = {};
        json.feed.entry.forEach((row, x) => {
          let index = Object.keys(row);
          Object.keys(row).forEach((column, y) => {
            if (column.includes("gsx$") && y % 2 === 0) {
              keys[column] = {};

              key = row[Object.keys(row)[y]]["$t"];
              keys[column][key] = row[Object.keys(row)[y + 1]]["$t"];
            }
          });
        });

        console.log(keys);
        if (Object.keys(keys) > 10) {
          resolve(keys);
        }
      });
    });

  fetch(URL)
    .then(resp => resp.json())
    .then(json => {
      return new Promise(resolve => {
        let table = {
          rows: [],
          columns: []
        };

        json.feed.entry.filter((row, x) => {
          let newRow = {};
          Object.keys(row).forEach((column, y) => {
            if (column.includes("gsx$")) {
              if (x !== 0) {
                if ([0, 1, 2, 3, 4, 5, 6, 16, 19].includes(y)) {
                  newRow[column] = row[column]["$t"];
                } else {
                  newRow[column] = `<ul><li>${row[column]["$t"]
                    .trim()
                    .replace(/(\s,|,\s)/g, ",")
                    .split(/[;|,]/g)
                    .join("</li><li>")}</li></ul>`;
                }
              }

              if (
                !Object.values(table.columns.map(c => c.data)).includes(column)
              ) {
                table.columns.push({ data: column, defaultContent: "" });

                $("thead tr").append(`<th>${row[column]["$t"]}</th>`);
              }
            }
          });
          if (x !== 0) {
            table.rows.push(newRow);
          }

          if (table.rows.length === json.feed.entry.length - 2) {
            $("thead tr").prepend(`<th></th>`);

            resolve(table);
          }
        });
      });
    })
    .then(table => {
      $("#example").DataTable({
        data: table.rows,
        columns: [
          {
            className: "details-control",
            orderable: false,
            data: null,
            defaultContent: ""
          },
          ...table.columns
        ],
        paging: false,
        order: [[1, "asc"]],
        columnDefs: [
          { targets: [6, 9, 10, 11, 12, 13, 14, 15], visible: false },
          {
            targets: Array(16)
              .fill({})
              .map((v, i) => i)
              .slice(2),
            orderable: false
          }
        ],

        initComplete: function() {
          let table = this.api();
          let filterColumns = [2, 3, 4, 5, 7, 8].map(c => table.column(c));
          makeFilter(table, filterColumns);

          let searchField = document.querySelector("input[type='search']");
          $(searchField).after("<button>reset</button>");

          searchField.placeholder = "search";

          document
            .querySelector("button")
            .addEventListener("click", function() {
              filterColumns.forEach(fc => fc.search("", true, false).draw());

              searchField.value = "";
              [...document.querySelectorAll(".filter")].forEach(
                f => (f.value = "")
              );
            });

          searchField.addEventListener("keydown", function() {
            filterColumns.forEach(fc => fc.search("", true, false).draw());

            [...document.querySelectorAll(".filter")].forEach(
              f => (f.value = "")
            );
          });
          $("tr").hover(function() {
            this.classList.toggle("hover");
          });
          $("#example tbody").on("click", "td.details-control", function() {
            var tr = $(this).closest("tr");
            var row = table.row(tr);

            if (row.child.isShown()) {
              row.child.hide();
              tr.removeClass("shown");
            } else {
              row.child(format(row.data())).show();
              tr.addClass("shown");
            }
          });
          let searchText = document.querySelector(
            ".dataTables_filter>label:first-of-type"
          );
          searchText.innerHTML = searchText.innerHTML.replace("Search:", "");
        }
      });
    });
});
