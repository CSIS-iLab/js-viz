var basemap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/ilabmedia/cj84s9bet10f52ro2lrna50yg/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw",
  {}
);

var map = L.map("map", {
  center: [12.95, 77.49],
  zoom: 3,
  maxZoom: 12,
  scrollWheelZoom: true,
  minZoom: 3,
  zoomControl: true,
  scrollWheelZoom: true,
  layers: [basemap],
  attributionControl: false,
});

const client = new carto.Client({
  apiKey: "-zz8CT9UmMschCuI96Mnug",
  username: "csis",
});

const populatedPlacesSource = new carto.source.SQL(
  "SELECT * FROM ior_feature_descriptions_11132019_1"
);
const populatedPlacesStyle = new carto.style.CartoCSS(`
        #layer {
          marker-width: 12;
          marker-fill: ramp([type_of_asset], (#3969ac, #f2b701, #7f3c8d, #11a579, #e73f74), ("Coastal Surveillance Radar Systems", "Indian Offshore Military Facility", "Commercial/Dual-use Facilities", "Foreign Military Facilities w/ Indian Access"), "=");
          marker-fill-opacity: 1;
          marker-allow-overlap: true;
          marker-line-width: 0.5;
          marker-line-color: #fff;
          marker-line-opacity: 0.5;
        }
      `);

const populatedPlacesLayer = new carto.layer.Layer(
  populatedPlacesSource,
  populatedPlacesStyle,
  {
    featureOverColumns: ["name_of_asset", "location", "description"],
  }
);

client.addLayer(populatedPlacesLayer);

client.getLeafletLayer().bringToFront().addTo(map);

const popup = L.popup({ closeButton: true });

populatedPlacesLayer.on(carto.layer.events.FEATURE_CLICKED, createPopup);

function createPopup(event) {
  popup.setLatLng(event.latLng);

  if (!popup.isOpen()) {
    var data = event.data;
    var content = "<div>";

    var keys = ["name_of_asset", "location", "description"];

    content += `
    <div class="popupHeaderStyle"> 
      ${data.name_of_asset}
    </div> 
    <div class="popupEntryStyle"> 
      ${data.location}
    </div>
    <p class="popupEntryStyle"> 
      ${data.description}
    </p>
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
    'Data by <a href="https://amti.csis.org" target="_blank">CSIS AMTI</a>, Leaflet contributors'
  )
  .addTo(map);

var checks = Array.from(
  document.querySelectorAll(".type_of_asset ul input")
).map(function (checkbox) {
  return checkbox.name;
});

var filter_checks = new carto.filter.Category("type_of_asset", {
  notIn: checks,
});

document
  .querySelector(".type_of_asset ul")
  .addEventListener("click", function (e) {
    var checkbox = e.target.type === "checkbox" ? e.target : null;

    if (checkbox) {
      var checked = Array.from(
        document.querySelectorAll(".type_of_asset ul input:checked")
      ).map(function (checkbox) {
        return checkbox.name;
      });

      var notChecked = checks.filter(function (name) {
        return checked.indexOf(name) < 0;
      });

      var filter_checked = new carto.filter.Category("type_of_asset", {
        in: checked,
      });

      var filter_notChecked = new carto.filter.Category("type_of_asset", {
        notIn: notChecked,
      });

      var filters =
        checkbox.name === "OTHERS" && checkbox.checked
          ? [filter_checks, filter_checked]
          : checkbox.name === "OTHERS" && !checkbox.checked
          ? [filter_checked]
          : [filter_notChecked];

      populatedPlacesSource.getFilters().forEach(function (f) {
        populatedPlacesSource.removeFilter(f);
      });

      populatedPlacesSource.addFilter(new carto.filter.OR(filters));
    }
  });
