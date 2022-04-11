var basemap = L.tileLayer(
  // "https://api.mapbox.com/styles/v1/ilabmedia/cl1v71wcz003g14qtjxx8fgoi/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw"
  
  "https://api.mapbox.com/styles/v1/ilabmedia/ckvber5pm07gr14rq5v9ichdy/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw",
  {}
);

var map = L.map("map", {
  center: [8.5, -0.5],
  zoom: 7,
  maxZoom: 8,
  scrollWheelZoom: true,
  minZoom: 5,
  zoomControl: true,
  scrollWheelZoom: true,
  layers: [basemap],
  attributionControl: false,
});

const client = new carto.Client({
  apiKey: "DKPLqaEcXdj6bum5WnHO0g",
  username: "csis",
});

const mapSource = new carto.source.SQL(`SELECT * FROM 
phc_longform_map`);

const mapStyle = new carto.style.CartoCSS(`
  #layer {
    polygon-fill: #C0311A;
    polygon-opacity: 0.6;
    ::outline {
      line-color: #C0311A;
      line-width: 1;
      line-opacity: 1;
    }
  }
`);

const mapLayer = new carto.layer.Layer(mapSource, mapStyle, {
  featureOverColumns: ['country', 'ghana_overall', 'lower_middle_income', 'sub_saharan_africa'],
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
      ${data.country}
    </div>
    <p class="popupEntryStyle">
      <span>Ghana Overall:</span> ${data.ghana_overall}
    </p>
    <p class="popupEntryStyle">
    <span>SubSaharan Africa:</span> ${data.sub_saharan_africa}
    </p>
    <p class="popupEntryStyle">
      <span>Lower Middle Income:</span> ${data.lower_middle_income}
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
    '<a href="https://www.csis.org/programs/americas-program">CSIS Global Health Program</a>, <a href="https://leafletjs.com/">Leaflet</a>'
  )
  .addTo(map);
