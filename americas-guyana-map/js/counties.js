var basemap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/ilabmedia/cjrawc1zs2bzc2sq3y9wvt22t/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw",
  {}
);

var map = L.map("map", {
  center: [40, -98],
  zoom: 5,
  maxZoom: 7,
  scrollWheelZoom: true,
  minZoom: 5,
  zoomControl: true,
  scrollWheelZoom: true,
  layers: [basemap],
  attributionControl: false,
});

const client = new carto.Client({
  // apiKey: "3wBLygnVR609O76Bedwl9g",
  apiKey: "axez8RM8WGdHVdLh4lGcng",
  username: "csis",
});

const mapSource = new carto.source.SQL(`SELECT * FROM guyana_counties`);

const mapStyle = new carto.style.CartoCSS(`
        #layer {
          marker-width: ramp([value], range(10, 60), quantiles(5));
          marker-fill: #6a2248;
          marker-fill-opacity: 0.2;
          marker-allow-overlap: true;
          marker-line-width: 4;
          marker-line-color: #6a2248;
          marker-line-opacity: 1;
        }
      `);

const mapLayer = new carto.layer.Layer(mapSource, mapStyle, {
  featureOverColumns: ["value", "county_state"],
});

client.addLayer(mapLayer);

client.getLeafletLayer().bringToFront().addTo(map);

const popup = L.popup({ closeButton: true });

mapLayer.on(carto.layer.events.FEATURE_CLICKED, createPopup);

function createPopup(event) {
  popup.setLatLng(event.latLng);

  if (!popup.isOpen()) {
    var data = event.data;
    console.log(event.data);
    var content = "<div>";

    content += `
    <div class="popupHeaderStyle">
      ${data.county_state}
    </div>
    <div class="popupEntryStyle">
      ${data.value}
    </div>
    `;
    popup.setContent("" + content);
    popup.openOn(map);
  }
}

L.control
  .attribution({
    position: "bottomright",
  })
  .setPrefix(
    'Data by <a href="" target="_blank">CSIS</a>, Leaflet contributors'
  )
  .addTo(map);

// var checks = Array.from(
//   document.querySelectorAll(".type_of_asset ul input")
// ).map(function (checkbox) {
//   return checkbox.name;
// });

// var filter_checks = new carto.filter.Category("type_of_asset", {
//   notIn: checks,
// });

// document
//   .querySelector(".type_of_asset ul")
//   .addEventListener("click", function (e) {
//     var checkbox = e.target.type === "checkbox" ? e.target : null;

//     if (checkbox) {
//       var checked = Array.from(
//         document.querySelectorAll(".type_of_asset ul input:checked")
//       ).map(function (checkbox) {
//         return checkbox.name;
//       });

//       var notChecked = checks.filter(function (name) {
//         return checked.indexOf(name) < 0;
//       });

//       var filter_checked = new carto.filter.Category("type_of_asset", {
//         in: checked,
//       });

//       var filter_notChecked = new carto.filter.Category("type_of_asset", {
//         notIn: notChecked,
//       });

//       var filters =
//         checkbox.name === "OTHERS" && checkbox.checked
//           ? [filter_checks, filter_checked]
//           : checkbox.name === "OTHERS" && !checkbox.checked
//           ? [filter_checked]
//           : [filter_notChecked];

//       mapSource.getFilters().forEach(function (f) {
//         mapSource.removeFilter(f);
//       });

//       mapSource.addFilter(new carto.filter.OR(filters));
//     }
// });
