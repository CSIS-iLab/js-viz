const data_file = "05122020-data.json";
let impactCategories = {};
let impactObjects = {};

function reqListener() {
  let title = document.createElement("h1");
  title.setAttribute("id", "title");
  title.innerHTML =
    "Countries with Food Price Increases (January - March 2020)";
  document.body.appendChild(title);
  let data = JSON.parse(this.responseText);

  data.forEach((row) => {
    let impact = row.impact;
    let country = row.country;

    // Create object for each impact level
    impactCategories[impact] = impactCategories[impact] || {
      name: impact,
      countries: [],
    };

    // Add countries to array in impact object
    impactCategories[impact].countries.push(country);
  });

  // Remove object keys
  impactObjects = Object.values(impactCategories);

  impactObjects.forEach((impact) => {
    impact.countries.sort();
    let impactID = impact.name.split(" ")[0].toLowerCase();
    let width = "25";
    let height = "25";
    let containerWidth = (impact.countries.length + 1) * width + 110 + "px";

    let tip =
      '<h3 class="tooltip-header">' +
      impact.name +
      '</h3><p class="tooltip-country">' +
      impact.countries.join(", ") +
      "</p>";

    // Create div for each impact level
    let newDiv = document.createElement("div");
    newDiv.setAttribute("id", impactID);
    newDiv.setAttribute("class", "impact-container");
    newDiv.setAttribute("tabindex", "0");
    newDiv.setAttribute("data-tippy-content", tip);
    newDiv.style.maxWidth = containerWidth;

    // Add impact level as header to div
    let newH2 = document.createElement("h2");
    newH2.innerHTML = impact.name;
    newDiv.appendChild(newH2);

    // Create ul for countries
    let list = document.createElement("ul");

    // Add li/div for each country in this impact level
    impact.countries.forEach((country, i) => {
      let item = document.createElement("li");
      item.setAttribute("class", " list country");
      item.setAttribute("id", country.toLowerCase());
      item.style.width = width + "px";
      item.style.height = height + "px";
      list.appendChild(item);
    });

    // Add total to list
    let total = document.createElement("li");
    total.setAttribute("class", "list total");
    total.innerHTML = "<span>" + impact.countries.length + " countries</span>";
    total.style.height = height + "px";
    list.appendChild(total);

    // Add list to impact div
    newDiv.appendChild(list);

    // Add impact divs to body
    document.body.appendChild(newDiv);
  });
  tippy("[data-tippy-content]", {
    delay: [100, 200],
    allowHTML: true,
    placement: "bottom",
    theme: "light",
    arrow: false,
  });

  let source = document.createElement("div");
  source.setAttribute("class", "source");
  source.innerHTML =
    "CSIS Global Food Security Program | Source: World Food Programme";
  document.body.appendChild(source);
}

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", data_file);
oReq.send();
