function init() {
  Papa.parse(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSZFRhr0NZxBCN9BGqjOYhQCrK7Ke6LM4SbI_vQPFITRpVNtuVAHmJmwhqU91lsq0i5HEYgM2iArpF3/pub?output=csv",
    {
      download: true,
      header: true,
      complete: function (results) {
        var data = results.data;
        let lastUpdated = data
          .map((d) => d["Last Updated"])
          .find((d) => d != "");
        showInfo(data, lastUpdated);
      },
    }
  );
}

function showInfo(data, lastUpdated) {
  let lastUpdatedEl = document.getElementById("lastUpdated");
  lastUpdatedEl.innerHTML = lastUpdated;
  displayInfo(data);
}

/*function to use Datatables to display data */
function displayInfo(dataset) {
  $("#table").DataTable({
    responsive: true,
    data: dataset,
    columns: [
      { title: "Country", data: "Country" },
      {
        title: "Cases",
        data: "Total Cases",
        className: "dt-body-right",
        render: $.fn.dataTable.render.number(",", ".", 0),
      },
      {
        title: "Cases Last 24hr",
        data: "Cases Last 24hr",
        className: "dt-body-right",
        render: $.fn.dataTable.render.number(",", ".", 0),
      },
      {
        title: "Deaths",
        data: "Total Deaths",
        className: "dt-body-right",
        render: $.fn.dataTable.render.number(",", ".", 0),
      },
      {
        title: "Total Fully Vaccinated",
        data: "# Fully Vaccinated",
        className: "dt-body-right",
        render: $.fn.dataTable.render.number(",", ".", 0),
      },
      {
        title: "Percent Fully Vaccinated",
        data: "% Fully Vaccinated",
        className: "dt-body-right",
        render: $.fn.dataTable.render.number(",", ".", 1, "", "%"),
      },
      {
        title: "Cases per Million",
        data: "Cases per Million",
        className: "dt-body-right",
        render: $.fn.dataTable.render.number(",", ".", 0),
      },
      {
        title: "Population",
        data: "Total Population",
        className: "dt-body-right",
        render: $.fn.dataTable.render.number(",", ".", 0),
      },
    ],
    paging: false,
    searching: false,
    info: false,
    order: [[7, "desc"]],
  });
}

window.addEventListener("DOMContentLoaded", init);
