const basemapURL =
  "https://api.mapbox.com/styles/v1/ilabmedia/cldyvf17x007q01mtr5gwbo19/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw";

const cartoKeyMarkers = "6KgYkqFnDfk6hEgC3TGvIw";

const cartoSourceMarkers = "russia_btg_map_all_time_data";
const cartoSourceLines = "tnt_front_lines_time_slider";
const linesApiKey = "SMgzGpUrfgPT5Fg25t9XNw";
const username = "csis";

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
            iconSize: [45, 45],
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
      })
      .catch((err) => console.log(`Error in promises ${error}`));
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

            const date = new Date(row.date);
            const dateInSec = date.getTime();

            if (!dates.includes(dateInSec)) {
              dates.push(dateInSec);
            }

            if (dateInSec in markersByDate) {
              markersByDate[dateInSec].push(marker);
            } else {
              markersByDate[dateInSec] = [marker];
            }

            //map.addLayer(marker);
            oms.addMarker(marker);
          }
          // else {
          // 	console.log("No marker for " + row.type)
          // }
        });
        dates.sort();
        len = dates.length;
        timeline.setupTimeline({ start: dates[0], end: dates[len - 1] });

        for (array in markersByDate) {
          layerArray = L.layerGroup(markersByDate[array]);
          layerGroups.push(layerArray);
        }

        map.addLayer(layerGroups[0]);

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

var basemap = L.tileLayer(basemapURL, {});

var map = L.map("map", {
  center: [48.158, 33.69398277149277],
  zoom: 7,
  maxZoom: 20,
  scrollWheelZoom: true,
  minZoom: 6,
  zoomControl: false,
  scrollWheelZoom: true,
  layers: [basemap],
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
    "date",
  ],
});

let lineArr = []

fetch(
  `https://${username}.carto.com/api/v2/sql?format=GeoJSON&api_key=${linesApiKey}&q=SELECT * FROM ${cartoSourceLines} ORDER BY date ASC`
)
  .then((res) => res.json())
  .then((response) => {
		console.log(response)
		const frontlineStyle = new carto.style.CartoCSS(`
			#layer {
				line-width: 1.5;
				line-color: #6d3738;
				line-opacity: 1;
			}
		`);
    // Loop through the front line json file and create an object for each line
    response.features.forEach((row, i) => {
      const date = new Date(row.properties.date);
      const dateInSec = date.getTime();
      row.properties.dateInSec = dateInSec;
			lineArr.push(L.geoJSON(row, frontlineStyle))
    });
		map.addLayer(lineArr[0]);
  });
	
	
	function addLayerGroup(group) {
		return new Promise(function (resolve, reject) {
    resolve(map.addLayer(layerGroups[group]).addLayer(lineArr[group]));
  });
}

function removeLayerGroup(group) {
  return new Promise(function (resolve, reject) {
    resolve(map.removeLayer(layerGroups[group]).removeLayer(lineArr[group]));
  });
}


client.getLeafletLayer().bringToFront().addTo(map);


let omsOptions = {
  circleFootSeparation: 30,
  keepSpiderfied: true,
  nearbyDistance: 40,
  circleSpiralSwitchover: 3,
};

const oms = new OverlappingMarkerSpiderfier(map, omsOptions);

const popup = L.popup({ closeButton: true });

L.control
  .attribution({
    position: "bottomright",
  })
  .setPrefix(
    '<a href="https://www.csis.org/programs/PROGRAMNAME">CSIS PROGRAM</a>, <a href="https://leafletjs.com/">Leaflet</a>'
  );

const timeline = {
  el: document.querySelector(".timeline-bar"),
  controlBtn: document.getElementById("timeline-btn"),
  currentDateEl: document.querySelector(".timeline-current-date"),
  playing: false,
  timer: null,
  transitionDuration: 1000,
  end: null,
  start: null,
  // step: 30 * 24 * 60 * 60 * 1000,
  updateCurrentDate(date) {
    this.currentDateEl.innerHTML = `${this.formatDate(date)}`;
  },
  onChange: function onChange() {
    now = this.get();
    timeline.updateCurrentDate(now);

    // jammingIcons.forEach(icon => {
    // 	const iconDate = +icon.getAttribute("data-timestamp");
    // 	icon.classList.toggle("isActive", iconDate === now);
    // 	icon.parentNode.classList.toggle("isActive", iconDate === now)
    // });

    console.log(now);

    // Get the index of the date from the dates array that matches now
    let dateIndex = dates.indexOf(now);

    // Remove the layer group with the index of the date minus 1 from the map
    removeLayerGroup(dateIndex - 1);
    // Add the layer group with the same index of the date to the map
    addLayerGroup(dateIndex);

    // Add the front line layer with the same date of now to the map

    if (now == timeline.end) {
      timeline.stopTimeline();
      setTimeout(function () {
        const lastDateIndex = dates.length - 1;
        removeLayerGroup(lastDateIndex);
        timeline.el.noUiSlider.set(timeline.start);
      }, timeline.transitionDuration);
    }
  },
  formatDate(date) {
    date = new Date(date);
    date = new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate()
    );
    return `${date.getMonth() + 1}/${date.getFullYear()}`;
  },
  setupTimeline: function ({ start, end }) {
    this.start = start;
    this.end = end;

    this.setupBtnControls();

    // console.log(((dates[1] - dates[0]) / (dates[len - 1] - dates[0]) * 100))

    let midRange = ((dates[1] - dates[0]) / (dates[len - 1] - dates[0])) * 100;

    noUiSlider.create(this.el, {
      start: this.start,
      connect: true,
      behaviour: "tap-drag",
      // step: this.step,
      snap: true,
      range: {
        min: this.start,
        "37%": [1661990400000],
        max: this.end,
      },
      format: {
        from: function from(v) {
          return parseInt(v, 10);
        },
        to: function to(v) {
          return parseInt(v, 10);
        },
      },
      pips: {
        //mode: "range",
        //mode: "positions",
        //mode: "values",
        mode: "count",
        values: dates.length,
        //values: [0, midRange, 100],
        //values: dates,
        //density: midRange,
        density: 100,
        stepped: true,
        format: {
          to: toFormat,
        },
      },
    });
    this.el.noUiSlider.set(this.start);
    this.el.noUiSlider.on("update", this.onChange);
    this.el.noUiSlider.on("slide", function (values, handle) {
      let tempDate = new Date(values[handle]);
      tempDate = new Date(
        tempDate.getUTCFullYear(),
        tempDate.getUTCMonth(),
        tempDate.getUTCDate()
      ).getTime();

      timeline.el.noUiSlider.set(tempDate);
    });

    function toFormat(seconds) {
      console.log("seconds", seconds);
      date = new Date(seconds);
      date = new Date(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate()
      );
      return `${date.getMonth() + 1}/${date.getFullYear()}`;
      //return new Date(seconds);
      //return seconds.formatDate();
      //return this.formatDate(seconds);
    }

    /*this.el.querySelector("[data-value='" + 1661990400000, "']").innerHTML =
      this.formatDate(1661990400000);*/

    /*this.el.querySelector("[data-value='" + this.start, "']").innerHTML =
      this.formatDate(start);

    this.el.querySelector("[data-value='" + this.end, "']").innerHTML =
      this.formatDate(end);*/
  },
  setupBtnControls: function () {
    this.controlBtn.addEventListener("click", function () {
      let currentDate = now;
      if (now == timeline.end) {
        timeline.el.noUiSlider.set(timeline.start);
      }

      if (timeline.playing == true) {
        timeline.stopTimeline();
        return;
      }

      let ints = dates;

      // dates.forEach(date => {
      // 	const iconDate = +icon.getAttribute("data-timestamp");
      // 	ints.push(iconDate)
      // })

      let i = 0;

      function jamTimer() {
        if (i >= ints.length) {
          i = 0;
        }

        let currentDate = now;
        now = ints[i];
        timeline.el.noUiSlider.set(now);
        i++;
      }

      timeline.timer = setInterval(jamTimer, timeline.transitionDuration);

      // timeline.timer = setInterval(function () {
      //   let currentDate = now;
      //   now += timeline.el.noUiSlider.options.step;
      //   timeline.el.noUiSlider.set(now);
      //   console.log(now)
      // }, timeline.transitionDuration);
      this.classList.remove("play-btn");
      this.classList.add("pause-btn");
      timeline.playing = true;
    });
  },
  stopTimeline: function () {
    clearInterval(timeline.timer);
    timeline.playing = false;
    timeline.controlBtn.classList.remove("pause-btn");
    timeline.controlBtn.classList.add("play-btn");
  },
};
