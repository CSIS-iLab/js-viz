const basemapURL =
  "https://api.mapbox.com/styles/v1/ilabmedia/cldyvf17x007q01mtr5gwbo19/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw";

const cartoKeyMarkers = "6KgYkqFnDfk6hEgC3TGvIw";

const cartoSourceMarkers = "russia_btg_map_all_time_data";

// Get all markers from images dir
// https://stackoverflow.com/questions/18480550/how-to-load-all-the-images-from-one-of-my-folder-into-my-web-page-using-jquery
function getImages() {
  return new Promise((resolve, reject) => {
    let url = "http://127.0.0.1:5503/tnt-russia-btg-map/map/js/markers.json";
    // let url = 'https://feat-tnt-russia-ukraine-map--csis-js-viz.netlify.app/tnt-russia-btg-map/map/js/markers.json';
    fetch(url)
      .then((res) => res.json())
      .then((markers) => {
        let markerIcon = "";
        let IconBase = L.Icon.extend({
          options: {
            iconSize: [25, 25],
            iconAnchor: [12, 12],
            popupAnchor: [3, 0],
          },
        });
        let markerArr = [];
        // Loop through the marker json file and create a marker object for each type
        for (let x in markers) {
          x = x.toLowerCase();
          let fullUrl =
            "http://127.0.0.1:5503/tnt-russia-btg-map/map/images/" + x + ".svg";
          // let fullUrl = "https://feat-tnt-russia-ukraine-map--csis-js-viz.netlify.app/tnt-russia-btg-map/map/images/" + x + ".svg";
          let filename2 = x
            .substring(x.lastIndexOf("/") + 1)
            .replace(/\.[^/.]+$/, ""); // File name no ext
          markerIcon = new IconBase({
            iconUrl: fullUrl,
            iconName: filename2,
          });
          markerArr.push(markerIcon);
        }
        resolve(markerArr);
      });
    // .catch(err => { throw err });
  });
}

let markersByDate = {};
let layerGroups = [];
let dates = [];

Promise.all([getImages()]).then((markerArr) => {
  const dataRows = theData(markerArr);

  function theData(markerArr) {
    let sql = new cartodb.SQL({ user: "csis" });
    sql
      .execute("SELECT * FROM csis." + cartoSourceMarkers)
      .done(function (data) {
        const rows = data.rows;
        // Loop through each battlement
        let latLngArr = [];
        rows.forEach((row) => {
          let latLongObj = {
            rowLat: row.lat,
            rowLong: row.long,
          };
          let latLong = row.lat + ", " + row.long;
          // Check if lat long combo is a duplicate and add a small number if it is
          if (!latLngArr.includes(latLong)) {
            latLngArr.push(latLong);
          } else {
            row.lat = row.lat + 0.05;
            latLongObj.rowLat = row.lat;
            latLong = row.lat + ", " + row.long;

            latLngArr.push(latLong);
          }
          let markerName = row.type.toLowerCase();
          // Get marker icon object for the specific battlement type
          const foundItem = markerArr[0].find((marker) => {
            return marker.options.iconName == markerName;
          });
          // If we have a matching marker, use it to mark the battlement on the map
          if (foundItem) {
            let marker = L.marker([row.lat, row.long], {
              icon: foundItem,
              riseOnHover: true,
              riseOffset: 1000,
            });
            marker.data = row;
            // .bindPopup(
            // 	'<h2>' + row.formal_name + '</h2>' +
            // 	'<a href="' + row.source + '" target="_blank">Source</a>'
            // );

            if (row.date in markersByDate) {
              markersByDate[row.date];
            } else {
              markersByDate[row.date] = [marker];
            }
            markersByDate[row.date].push(marker);

            //map.addLayer(marker);
            oms.addMarker(marker);
          }
          // else {
          // 	console.log("No marker for " + row.type)
          // }
        });
        console.log(dates);
        for (array in markersByDate) {
          console.log(array);
          array = L.layerGroup(markersByDate[array]);
          layerGroups.push(array);
        }
        console.log(markersByDate);
        console.log(layerGroups);
        map.addLayer(layerGroups[1]);

        oms.addListener("click", function (marker) {
          // console.log("bounds:" + bounds + "; marker latlng:" + marker.getLatLng())
          popup.setContent(marker.data.formal_name + " " + marker.data.type);
          popup.setLatLng(marker.getLatLng());
          map.openPopup(popup);
        });

        oms.addListener("spiderfy", function (markers) {
          map.closePopup();
        });
      })
      .error(function (errors) {
        // errors contains a list of errors
        console.log("errors:" + errors);
      });
  }
});

const client = new carto.Client({
  apiKey: cartoKeyMarkers,
  username: "csis",
});

const clientJun22Line = new carto.Client({
  apiKey: "gICLO39dWYQi_l5UoPgp9A",
  username: "csis",
});

const clientSep22Line = new carto.Client({
  apiKey: "jrX_1lk57KE-Zi8cHXGdYA",
  username: "csis",
});

const clientFeb23Line = new carto.Client({
  apiKey: "r5WQgBp1JyitwLiTV5_vMQ",
  username: "csis",
});

const jun22LineSource = new carto.source.SQL(
  `SELECT * FROM tnt_front_line_jun_22`
);

const sep22LineSource = new carto.source.SQL(
  `SELECT * FROM tnt_front_line_sep_22`
);

const feb23LineSource = new carto.source.SQL(
  `SELECT * FROM tnt_front_line_feb_23`
);

var basemap = L.tileLayer(basemapURL, {});

// let frontLineLayer = L.tileLayer('https://api.mapbox.com/v4/{tilesetId}/{z}/{x}/{y}.png?access_token={accessToken}', {
//   maxZoom: 18,
//   accessToken: 'pk.eyJ1IjoiY3Npc3RudCIsImEiOiJjbDgxdzhxaGwwazI5M3ZwODNwOXlvZnpkIn0.a52jV7qfM8GXEqCvkoM3MA',
//   tilesetId: 'csistnt.cl833o32g01kx27ql6adys123-7l5eh',
// 	'paint': {
// 	'line-color': 'red',
// 	'line-width': 1
// }
// })

var map = L.map("map", {
  center: [48.158, 33.69398277149277],
  zoom: 7,
  maxZoom: 20,
  scrollWheelZoom: true,
  minZoom: 6,
  zoomControl: false,
  scrollWheelZoom: true,
  layers: [basemap /*frontLineLayer*/],
  attributionControl: false,
});

const mapSource = new carto.source.SQL(
  `SELECT * FROM csis.` + cartoSourceMarkers
);

const mapStyle = new carto.style.CartoCSS(`
// #layer {
//   marker-width: 7;
//   marker-allow-overlap: false;
//   marker-line-width: 1;
//   marker-line-color: #FFFFFF;
//   marker-line-opacity: 1;
// }
`);

const frontlineStyle = new carto.style.CartoCSS(`
#layer {
  line-width: 1.5;
  line-color: #6d3738;
  line-opacity: 1;
}
`);

const mapLayer = new carto.layer.Layer(mapSource, mapStyle, {
  featureOverColumns: [
    "formal_name",
    "short_form_name",
    "type",
    "size",
    "hq_tail2",
    "country",
    "lat",
    "long",
    "source",
  ],
});

const frontlineLayer = new carto.layer.Layer(feb23LineSource, frontlineStyle, {
  featureOverColumns: [],
});

clientFeb23Line.addLayer(frontlineLayer);

client.getLeafletLayer().bringToFront().addTo(map);
clientFeb23Line.getLeafletLayer().bringToFront().addTo(map);

let omsOptions = {
  circleFootSeparation: 30,
  keepSpiderfied: true,
  nearbyDistance: 40,
  circleSpiralSwitchover: 3,
};

const oms = new OverlappingMarkerSpiderfier(map, omsOptions);

const popup = L.popup({ closeButton: true });

// mapLayer.on(carto.layer.events.FEATURE_CLICKED, createPopup);
// oms.addListener('click', createPopup);

// var popup = new L.Popup();
// oms.addListener('click', function(marker) {
// 	console.log(marker)
//   popup.setContent(marker.desc);
//   popup.setLatLng(marker.getLatLng());
//   map.openPopup(popup);
// });

// function createPopup(event) {
// 	popup.setLatLng(event.latLng);

// 	if (!popup.isOpen()) {
// 		var data = event.data;
// 		console.log(event.data);
// 		var content = "<div>";

// 		content += `
// 		<div class="popupHeaderStyle">
// 		${data.short_form_name}
// 		</div>
// 		<div class="popupEntryStyle">
// 		${data.formal_name}
// 		</div>
// 		`;

// 		popup.setContent("" + content);
// 		popup.openOn(map);
// 	}
// }

// L.tileLayer('https://api.mapbox.com/v4/{tilesetId}/{z}/{x}/{y}.png?access_token={accessToken}', {
//   maxZoom: 18,
//   accessToken: 'pk.eyJ1IjoiY3Npc3RudCIsImEiOiJjbDgxdzhxaGwwazI5M3ZwODNwOXlvZnpkIn0.a52jV7qfM8GXEqCvkoM3MA',
//   tilesetId: 'csistnt.cl833o32g01kx27ql6adys123-7l5eh',
// 	'paint': {
// 	'line-color': '#877b59',
// 	'line-width': 1
// }
// }).addTo(map);

L.control
  .attribution({
    position: "bottomright",
  })
  .setPrefix(
    '<a href="https://www.csis.org/programs/PROGRAMNAME">CSIS PROGRAM</a>, <a href="https://leafletjs.com/">Leaflet</a>'
  );
