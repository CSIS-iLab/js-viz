$(document).ready(function() {
  $(".copyright-year").text(new Date().getFullYear());
  const spreadsheetID = "1MNuSvAUGRJXOdaVVNjgSm0ZBlHw2cSJtP7eq9sdu1b8";
  const URL = `https://spreadsheets.google.com/feeds/list/${spreadsheetID}/1/public/values?alt=json`;
  const keyURL = `https://spreadsheets.google.com/feeds/list/${spreadsheetID}/2/public/values?alt=json`;
  const companiesURL = `https://spreadsheets.google.com/feeds/list/${spreadsheetID}/3/public/values?alt=json`;
  const individualsURL = `https://spreadsheets.google.com/feeds/list/${spreadsheetID}/4/public/values?alt=json`;
  let table, page, display, total;

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
            sheet = {
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
                    !Object.values(sheet.columns.map(c => c.data)).includes(
                      column
                    )
                  ) {
                    sheet.columns.push({ data: column, defaultContent: "" });

                    $("thead tr").append(`<th>${row[column]["$t"]}</th>`);
                  }
                }
              });

              if (x !== 0) {
                sheet.rows.push(newRow);
              }

              if (sheet.rows.length === json.feed.entry.length - 2) {
                $("thead tr").prepend(`<th></th>`);
                resolve(sheet);
              }
            });
          });
        })
        .then(sheet => {
          $("#sanctions").DataTable({
            data: sheet.rows,
            columns: [
              {
                className: "details-control",
                orderable: false,
                data: null,
                defaultContent: ""
              },
              ...sheet.columns
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
              table = this.api();

              page = table.page.info().page + 1;
              display = table.page.info().recordsDisplay + 1;
              total = table.page.info().recordsTotal + 1;

              var companyDatalist = $(
                `<select class="companies"></select>`
              ).prependTo(".dataTables_filter");

              var companyInput = `<input type="text" data-list-filter="^" data-wslist="companies" class="filter companies" list="companies" placeholder="search company">`;

              companyDatalist
                .wrap("<div></div>")
                .before(`<label>Targeted Companies:</label>`)
                .before(companyInput);

              var individualDatalist = $(
                `<select class="individuals"></select>`
              ).prependTo(".dataTables_filter");

              var individualInput = `<input type="text" data-list-filter="^" data-wslist="individuals" class="filter individuals" list="individuals" placeholder="search individual">`;

              individualDatalist
                .wrap("<div></div>")
                .before(`<label>Targeted Individuals:</label>`)
                .before(individualInput);

              $("select.companies").wrap(
                `<datalist id="companies"></datalist>`
              );
              $("select.individuals").wrap(
                `<datalist id="individuals"></datalist>`
              );

              fetch(companiesURL)
                .then(resp => resp.json())
                .then(json => {
                  json.feed.entry.forEach(e => {
                    $(companyDatalist).append(
                      '<option value="' +
                        e["gsx$companies"]["$t"] +
                        '"></option>'
                    );
                  });
                })
                .then(then => {
                  fetch(individualsURL)
                    .then(resp => resp.json())
                    .then(json => {
                      json.feed.entry.forEach(e => {
                        $(individualDatalist).append(
                          '<option value="' +
                            e["gsx$individuals"]["$t"] +
                            '"></option>'
                        );
                      });
                      if (window.webshims) {
                        webshims.setOptions("forms", {
                          customDatalist: true
                        });
                        webshims.polyfill("forms");
                      }
                    });
                });

              $(".companies").change(function() {
                var val = $.fn.dataTable.util.escapeRegex($(this).val());
                filterColumns.forEach(fc =>
                  fc.search(val ? "" + val + "" : "", true, false).draw()
                );
                toggleTable();
              });

              $(".individuals").change(function() {
                var val = $.fn.dataTable.util.escapeRegex($(this).val());
                filterColumns.forEach(fc =>
                  fc.search(val ? "" + val + "" : "", true, false).draw()
                );
                toggleTable();
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
                toggleTable();

                $(this)
                  .toggleClass("down")
                  .toggleClass("up")
                  .find("span")
                  .html(function(i, t) {
                    return t === "View all" ? "Hide all" : "View all";
                  });

                filterColumns.forEach(fc => fc.search("", true, false).draw());

                searchField.value = "";
                [...document.querySelectorAll(".filter")].forEach(
                  f => (f.value = "")
                );

                rerender();
              });

              $(".reset").on("click", function() {
                filterColumns.forEach(fc => fc.search("", true, false).draw());

                searchField.value = "";
                [...document.querySelectorAll(".filter")].forEach(
                  f => (f.value = "")
                );
                rerender();
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

              $("#sanctions tbody").on(
                "click",
                "td.details-control",
                function() {
                  var tr = $(this).closest("tr");
                  var row = table.row(tr);

                  if (row.child.isShown()) {
                    row.child.hide();
                    tr.removeClass("shown");
                  } else {
                    row.child(format(keys, row.data())).show();
                    tr.addClass("shown");
                  }
                }
              );

              toggleTable();
            }
          });
        });

      function toggleTable() {
        $("table").toggleClass("hide");
        $(".dataTables_info").toggleClass("hide");
        $("footer")
          .toggleClass("bottom")
          .detach()
          .appendTo(
            ((i, e) => {
              return $(this)
                .parent()
                .hasClass("dataTables_wrapper")
                ? "body"
                : ".dataTables_wrapper";
            })()
          );
      }

      function rerender() {
        $(".dataTables_info").text((i, d) => {
          return `Showing ${
            table.page.info().end ? 1 : 0
          } to ${display} of ${total} entries`;
        });
        table.responsive.recalc();
      }

      function makeFilter(table, array) {
        array.forEach(c => {
          let label = c.header().textContent;
          let labelSlug = label
            .toLowerCase()
            .replace(/[!@#\$%\^\&*\)\(+=.,_-]/g, "")
            .replace(/\s/g, "_");

          var datalist = $(
            `<datalist  data-list-filter="^" id="${labelSlug}"></datalist>`
          ).prependTo(".dataTables_filter");

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
            rerender();
          });

          $(".sorting_asc").on("click", function() {
            rerender();
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
                keys["gsx$howtoliftmechanically"][
                  d["gsx$howtoliftmechanically"]
                ]
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
    });
});
