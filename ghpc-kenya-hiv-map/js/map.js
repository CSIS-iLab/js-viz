var basemap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/ilabmedia/ckvber5pm07gr14rq5v9ichdy/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw",
  {}
);

var map = L.map("map", {
  center: [0.0236, 37.9062],
  zoom: 6,
  maxZoom: 7,
  scrollWheelZoom: true,
  minZoom: 3,
  zoomControl: true,
  scrollWheelZoom: true,
  layers: [basemap],
  attributionControl: false,
});

const client = new carto.Client({
  apiKey: "MWxXR3EBPrF_H_i7I3U9xg",
  username: "csis",
});

const mapSource = new carto.source.SQL(`SELECT * FROM ghpc_children_hiv_keyna_2017`);

const colors = ["#d1eeea", "#96d0d1", "#68abb8", "#45829b", "#2a5674"]

const mapStyle = new carto.style.CartoCSS(`
#layer {
    polygon-opacity: 1;
    line-color: #808080;
    line-width: .5;
    line-opacity: .5;
    #geonames_stats {
        polygon-fill: ${colors[0]};
    }
    #geonames_stats [number_of_children_living_with_hiv_0_14 >= 600] {
        polygon-fill: ${colors[1]};
    }
    #geonames_stats [number_of_children_living_with_hiv_0_14 >= 2000]{
        polygon-fill: ${colors[2]};
    }
    #geonames_stats [number_of_children_living_with_hiv_0_14 >= 4000]{
        polygon-fill: ${colors[3]};
    }
    #geonames_stats [number_of_children_living_with_hiv_0_14 >= 6000]{
        polygon-fill: ${colors[4]};
    }
}`);

const mapLayer = new carto.layer.Layer(mapSource, mapStyle, {
  featureOverColumns: ["number_of_children_living_with_hiv_0_14", "county"],
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
      County: ${data.county}
    </div>
    <div class="popupEntryStyle">
      Number of Pediatric HIV cases: ${data.number_of_children_living_with_hiv_0_14}
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
    '<a href="https://www.csis.org/programs/PROGRAMNAME">CSIS PROGRAM</a>, <a href="https://leafletjs.com/">Leaflet</a>'
  )
  .addTo(map);

