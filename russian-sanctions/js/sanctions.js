"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

$(document).ready(function () {
  $(".copyright-year").text(new Date().getFullYear());
  var spreadsheetID = "1MNuSvAUGRJXOdaVVNjgSm0ZBlHw2cSJtP7eq9sdu1b8";
  var URL = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/1/public/values?alt=json";
  var keyURL = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/2/public/values?alt=json";
  var companiesURL = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/3/public/values?alt=json";
  var individualsURL = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/4/public/values?alt=json";
  var sheet = void 0,
      table = void 0,
      page = void 0,
      display = void 0,
      total = void 0;
  var companyVal = "";
  var individualVal = "";

  fetch(keyURL).then(function (resp) {
    return resp.json();
  }).then(function (json) {
    return new Promise(function (resolve) {
      var keys = {};
      json.feed.entry.forEach(function (row, x) {
        var index = Object.keys(row);
        Object.keys(row).forEach(function (column, y) {
          if (column.includes("gsx$") && y % 2 === 0) {
            keys[column] = keys[column] || {};
            var key = row[Object.keys(row)[y]]["$t"].trim();
            keys[column][key] = row[Object.keys(row)[y + 1]]["$t"].trim();
          }
        });
      });
      if (Object.keys(keys).length > 8) {
        resolve(keys);
      }
    });
  }).then(function (keys) {
    fetch(URL).then(function (resp) {
      return resp.json();
    }).then(function (json) {
      return new Promise(function (resolve) {
        sheet = {
          rows: [],
          columns: []
        };

        json.feed.entry.filter(function (row, x) {
          var newRow = {};
          Object.keys(row).forEach(function (column, y) {
            if (column.includes("gsx$")) {
              if (x !== 0) {
                if ([7, 15, 16, 18, 19].includes(y)) {
                  newRow[column] = row[column]["$t"];
                } else {
                  newRow[column] = "<ul><li>" + row[column]["$t"].trim().replace(/(\s,|,\s)/g, ",").split(/[;|,]/g).map(function (c) {
                    return Object.keys(keys).includes(column) ? "" + keys[column][c] : c;
                  }).join("</li><li>") + "</li></ul>";
                }
              }

              if (!Object.values(sheet.columns.map(function (c) {
                return c.data;
              })).includes(column)) {
                sheet.columns.push({ data: column, defaultContent: "" });

                $("thead tr").append("<th>" + row[column]["$t"] + "</th>");
              }
            }
          });

          if (x !== 0) {
            sheet.rows.push(newRow);
          }

          if (sheet.rows.length === json.feed.entry.length - 2) {
            $("thead tr").prepend("<th></th>");
            resolve(sheet);
          }
        });
      });
    }).then(function (sheet) {
      $("#sanctions").DataTable({
        data: sheet.rows,
        columns: [{
          className: "details-control",
          orderable: false,
          data: null,
          defaultContent: ""
        }].concat(_toConsumableArray(sheet.columns)),
        fixedHeader: true,
        responsive: { details: false },
        paging: false,
        order: [[2, "asc"]],
        columnDefs: [{ targets: [8, 9, 10, 11, 12, 13, 14, 15], visible: false }, {
          targets: Array(16).fill({}).map(function (v, i) {
            return i;
          }).filter(function (v, i) {
            return i !== 2;
          }),
          orderable: false
        }],
        initComplete: function initComplete() {
          table = this.api();

          page = table.page.info().page + 1;
          display = table.page.info().recordsDisplay + 1;
          total = table.page.info().recordsTotal + 1;

          var companyDatalist = $("<select class=\"companies\"></select>").prependTo(".dataTables_filter");

          var companyInput = "<input type=\"text\" data-list-filter=\"^\" data-wslist=\"companies\" class=\"filter companies\" list=\"companies\">";

          companyDatalist.wrap("<div></div>").before("<label>Targeted Companies:</label>").before(companyInput);

          var individualDatalist = $("<select class=\"individuals\"></select>").prependTo(".dataTables_filter");

          var individualInput = "<input type=\"text\" data-list-filter=\"^\" data-wslist=\"individuals\" class=\"filter individuals\" list=\"individuals\">";

          individualDatalist.wrap("<div></div>").before("<label>Targeted Individuals:</label>").before(individualInput);

          $("select.companies").wrap("<datalist id=\"companies\"></datalist>");
          $("select.individuals").wrap("<datalist id=\"individuals\"></datalist>");

          fetch(companiesURL).then(function (resp) {
            return resp.json();
          }).then(function (json) {
            json.feed.entry.forEach(function (e) {
              $(companyDatalist).append('<option value="' + e["gsx$companies"]["$t"] + '"></option>');
            });
          }).then(function (then) {
            fetch(individualsURL).then(function (resp) {
              return resp.json();
            }).then(function (json) {
              json.feed.entry.forEach(function (e) {
                $(individualDatalist).append('<option value="' + e["gsx$individuals"]["$t"] + '"></option>');
              });
              if (window.webshims) {
                webshims.setOptions("forms", {
                  customDatalist: true
                });
                webshims.polyfill("forms");
              }
            });
          });

          $("input.companies").change(function () {
            companyVal = $.fn.dataTable.util.escapeRegex($(this).val());
            if (companyVal.trim()) {
              searchTargets("company", companyVal);
            }
          });

          $("input.individuals").change(function () {
            individualVal = $.fn.dataTable.util.escapeRegex($(this).val());
            if (individualVal.trim()) {
              searchTargets("individual", individualVal);
            }
          });

          var filterColumns = [7, 5, 3, 6, 4, 1].map(function (c) {
            return table.column(c);
          });
          makeFilter(table, filterColumns);

          var searchField = document.querySelector("label input[type='search']");

          $(searchField).after("<button class=\"reset\">reset</button>");

          $(".dataTables_filter > label").after("<button class=\"view-all down\"><span>View all</span> sanctions</button>");

          // searchField.placeholder = "search";

          $(".view-all").on("click", function () {
            toggleTable();
            toggleButton();

            filterColumns.forEach(function (fc) {
              return fc.search("", true, false).draw();
            });

            searchField.value = "";
            [].concat(_toConsumableArray(document.querySelectorAll(".filter"))).forEach(function (f) {
              return f.value = "";
            });

            rerender();
          });

          $(".reset").on("click", function () {
            [].concat(_toConsumableArray(filterColumns), [table.column(12)]).forEach(function (fc) {
              return fc.search("", true, false).draw();
            });

            searchField.value = "";
            [].concat(_toConsumableArray(document.querySelectorAll(".filter"))).forEach(function (f) {
              return f.value = "";
            });
            rerender();
          });

          searchField.addEventListener("keydown", function () {
            filterColumns.forEach(function (fc) {
              return fc.search("", true, false).draw();
            });

            [].concat(_toConsumableArray(document.querySelectorAll(".filter"))).forEach(function (f) {
              return f.value = "";
            });

            $("button.view-all").removeClass("down").addClass("up").find("span").html("Hide all");

            $("table,.dataTables_info").removeClass("hide");
          });

          $("tr").hover(function () {
            this.classList.toggle("hover");
          });

          $("#sanctions tbody").on("click", "td.details-control", function () {
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

          toggleTable();
        }
      });
    });

    function toggleTable() {
      $("table,.dataTables_info").toggleClass("hide");
    }

    function toggleButton() {
      $("button.view-all").toggleClass("down").toggleClass("up").find("span").html(function (i, t) {
        return t === "View all" ? "Hide all" : "View all";
      });
    }

    function rerender() {
      var results = table.page.info().end;
      $(".dataTables_info").text(function (i, d) {
        return "Showing " + (results ? 1 : 0) + " to " + (results + 1 === total ? total : results) + " " + (results + 1 === total ? "" : "of " + results);
      });
      table.responsive.recalc();
    }

    function searchTargets(target, value) {
      // let terms = [individualVal, companyVal].filter(t => !!t.trim());
      // terms = terms.map(t => `${t}*`).join("|");

      if (target === "company") {
        $("input.individuals").val("");
      } else {
        $("input.companies").val("");
      }

      table.column(12).search("(" + value + "*)", true, false).draw();

      rerender();

      $("table,.dataTables_info").removeClass("hide");
      $(".view-all").removeClass("down").addClass("up").find("span").text("Hide");
    }

    function makeFilter(table, array) {
      array.forEach(function (c) {
        var label = c.header().textContent;
        var labelSlug = label.toLowerCase().replace(/[!@#\$%\^\&*\)\(+=.,_-]/g, "").replace(/\s/g, "_");

        var datalist = $("<datalist data-list-filter=\"^\" id=\"" + labelSlug + "\"></datalist>").prependTo(".dataTables_filter");

        var input = "<input data-list-focus=\"true\" type=\"search\" class=\"filter " + labelSlug + "\" list=\"" + labelSlug + "\" >";

        datalist.wrap("<div></div>").before("<label>" + label + ":</label>").before(input);

        $("." + labelSlug).on("change", function () {
          var val = $.fn.dataTable.util.escapeRegex($(this).val());
          c.search(val ? "" + val + "" : "", true, false).draw();

          $(".view-all").removeClass("down").addClass("up").find("span").text("Hide");

          $(this).blur();
          $("table").removeClass("hide");
          $(".dataTables_info").removeClass("hide");
          rerender();
        });

        $(".sorting_asc").on("click", function () {
          rerender();
        });

        var newArray = [].concat.apply([], c.data().map(function (d) {
          return d.replace(/(\<ul\>|<\/ul\>)/g, "").split("</li><li>").map(function (d) {
            return d.replace(/(\<li\>|<\/li\>)/g, "");
          });
        }));

        $([].concat(_toConsumableArray(new Set(newArray)))).sort().each(function (j, d) {
          datalist.append('<option value="' + d + '">' + d + "</option>");
        });

        // document.querySelector(
        //   `.${labelSlug}`
        // ).placeholder = `search ${label.toLowerCase()}`;
      });
    }

    function format(keys, d) {
      return "\n          <div class=\"details\">\n            <div class=\"action-taken\">\n              <div class=\"heading\">ACTION TAKEN</div>\n              <div>" + d["gsx$actiontaken"] + "</div>\n            </div>\n\n            <div class=\"specific-targets\">\n              <div class=\"heading\">SPECIFIC TARGETS</div>\n              <div>" + d["gsx$specifictargets"] + "</div>\n            </div>\n\n            <div class=\"stated-intent\">\n              <div class=\"heading\">STATED INTENT</div>\n              <div style=\"padding-left:24px\">" + d["gsx$statedintent"] + "</div>\n            </div>\n\n            <div class=\"activities\">\n              <div class=\"heading\">Activities Linked to</div>\n              <div>" + d["gsx$activitieslinkedto"] + "</div>\n            </div>\n\n            <div class=\"ht-lift\">\n              <div class=\"heading\">HOW TO LIFT</div>\n              <div style=\"padding-left:24px\">" + keys["gsx$howtoliftmechanically"][d["gsx$howtoliftmechanically"]] + "</div>\n            </div>\n\n            <div class=\"resources\">\n              <div class=\"heading\">RESOURCES</div>\n              <div><ul><li>" + d["gsx$resources"].split(/,|;/).map(function (l) {
        return "<a href=\"" + l + "\" target=\"_blank\">" + l + "</a>";
      }).join("</li><li>") + "</li></ul></div>\n            </div>\n          </div>\n          ";
    }
  });
});
