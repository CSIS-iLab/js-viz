$(document).ready(function() {
  let spreadsheetID = "1MNuSvAUGRJXOdaVVNjgSm0ZBlHw2cSJtP7eq9sdu1b8";
  let URL = `https://spreadsheets.google.com/feeds/list/${spreadsheetID}/1/public/values?alt=json`;
  let keyURL = `https://spreadsheets.google.com/feeds/list/${spreadsheetID}/2/public/values?alt=json`;
  let targetsURL = `https://spreadsheets.google.com/feeds/list/${spreadsheetID}/3/public/values?alt=json`;
  let page, display, total;
  function format(keys, d) {
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
          <div style="padding-left:24px">${d["gsx$statedintent"]}</div>
        </div>

        <div class="impact">
          <div class="heading">Activities Linked to</div>
          <div>${d["gsx$activitieslinkedto"]}</div>
        </div>

        <div class="impact">
          <div class="heading">IMPACT</div>
          <div style="padding-left:24px">${d["gsx$impact"]}</div>
        </div>

        <div class="ht-lift">
          <div class="heading">HOW TO LIFT</div>
          <div style="padding-left:24px">${
            keys["gsx$howtoliftmechanically"][d["gsx$howtoliftmechanically"]]
          }</div>
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

      var input = `<input type="search" class="filter ${labelSlug}" list="${labelSlug}" >`;

      datalist
        .wrap("<div></div>")
        .before(`<label>${label}:</label>`)
        .before(input);

      $(`.${labelSlug}`).on("change", function() {
        var val = $.fn.dataTable.util.escapeRegex($(this).val());
        c.search(val ? "" + val + "" : "", true, false).draw();

        $(".view-all")
          .removeClass("down")
          .addClass("up")
          .find("span")
          .text("Hide");

        $(this).blur();
        $("table").removeClass("hide");
        $(".dataTables_info").removeClass("hide");

        $(".dataTables_info").text((i, d) => {
          return `Showing ${table.page.info().end ? 1 : 0} to ${
            table.page.info().end
          } of ${total} entries`;
        });
        table.responsive.recalc();
      });

      $(".sorting_asc").on("click", function() {
        $(".dataTables_info").text((i, d) => {
          return `Showing ${table.page.info().end ? 1 : 0} to ${
            table.page.info().end
          } of ${total} entries`;
        });
      });

      $(`.${labelSlug}`).on("focus", function() {
        // this.value = "";
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
      ).placeholder = `search ${label.toLowerCase()}`;
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
              keys[column] = keys[column] || {};
              let key = row[Object.keys(row)[y]]["$t"].trim();
              keys[column][key] = row[Object.keys(row)[y + 1]]["$t"].trim();
            }
          });
        });

        if (Object.keys(keys).length > 8) {
          resolve(keys);
        }
      });
    })
    .then(keys => {
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
                    if ([7, 15, 16, 18, 19].includes(y)) {
                      newRow[column] = row[column]["$t"];
                    } else {
                      newRow[column] = `<ul><li>${row[column]["$t"]
                        .trim()
                        .replace(/(\s,|,\s)/g, ",")
                        .split(/[;|,]/g)
                        .map(c => {
                          return Object.keys(keys).includes(column)
                            ? `${keys[column][c]}`
                            : c;
                        })
                        .join("</li><li>")}</li></ul>`;
                    }
                  }

                  if (
                    !Object.values(table.columns.map(c => c.data)).includes(
                      column
                    )
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
            responsive: { details: false },
            paging: false,
            order: [[2, "asc"]],
            columnDefs: [
              { targets: [8, 9, 10, 11, 12, 13, 14, 15], visible: false },
              {
                targets: Array(16)
                  .fill({})
                  .map((v, i) => i)
                  .filter((v, i) => i !== 2),
                orderable: false
              }
            ],

            initComplete: function() {
              let table = this.api();

              page = table.page.info().page + 1;
              display = table.page.info().recordsDisplay + 1;
              total = table.page.info().recordsTotal + 1;

              var companyDatalist = $(
                `<datalist id="companies"></datalist>`
              ).prependTo(".dataTables_filter");

              var companyInput = `<input type="search" class="filter companies" list="companies" placeholder="search company">`;

              companyDatalist
                .wrap("<div></div>")
                .before(`<label>Targeted Companies:</label>`)
                .before(companyInput);

              var individualDatalist = $(
                `<datalist id="individuals"></datalist>`
              ).prependTo(".dataTables_filter");

              var individualInput = `<input type="search" class="filter companies" list="individuals" placeholder = "search individual">`;

              individualDatalist
                .wrap("<div></div>")
                .before(`<label>Targeted Individuals:</label>`)
                .before(individualInput);

              fetch(targetsURL)
                .then(resp => resp.json())
                .then(json => {
                  json.feed.entry.forEach(e => {
                    $(companyDatalist).append(
                      '<option value="' +
                        e["gsx$individuals"]["$t"] +
                        '">' +
                        e["gsx$individuals"]["$t"] +
                        "</option>"
                    );
                    $(individualDatalist).append(
                      '<option value="' +
                        e["gsx$companies"]["$t"] +
                        '">' +
                        e["gsx$companies"]["$t"] +
                        "</option>"
                    );
                  });
                });

              let filterColumns = [7, 5, 3, 6, 4, 1].map(c => table.column(c));
              makeFilter(table, filterColumns);

              let searchField = document.querySelector(
                "label input[type='search']"
              );

              $(searchField).after(`<button class="reset">reset</button>`);

              $(".dataTables_filter > label").after(
                `<button class="view-all down"><span>View all</span> sanctions</button>`
              );

              searchField.placeholder = "search";
              $(".view-all").on("click", function() {
                $("table").toggleClass("hide");

                $(this)
                  .toggleClass("down")
                  .toggleClass("up")
                  .find("span")
                  .html(function(i, t) {
                    return t === "View all" ? "Hide all" : "View all";
                  });

                $(".dataTables_info").toggleClass("hide");

                filterColumns.forEach(fc => fc.search("", true, false).draw());

                searchField.value = "";
                [...document.querySelectorAll(".filter")].forEach(
                  f => (f.value = "")
                );

                $(".dataTables_info").text((i, d) => {
                  return `Showing ${
                    table.page.info().end ? 1 : 0
                  } to ${display} of ${total} entries`;
                });

                table.responsive.recalc();
              });

              $(".reset").on("click", function() {
                filterColumns.forEach(fc => fc.search("", true, false).draw());

                searchField.value = "";
                [...document.querySelectorAll(".filter")].forEach(
                  f => (f.value = "")
                );
                $(".dataTables_info").text((i, d) => {
                  return `Showing ${
                    table.page.info().end ? 1 : 0
                  } to ${display} of ${total} entries`;
                });
                table.responsive.recalc();
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
                  row.child(format(keys, row.data())).show();
                  tr.addClass("shown");
                }
              });

              $(".dataTables_info").toggleClass("hide");
            }
          });
        });
    });
});
