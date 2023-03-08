/* -------------------------------------------------------------------------- */
/*                     Connecting to Carto to get our data                    */
/* -------------------------------------------------------------------------- */

//  Basemap being used: TNT_Russia_Ukraine_map-timeline-WORKING-POI-labels-updated-masks
const basemapURL =
  "https://api.mapbox.com/styles/v1/ilabmedia/clesm3yxm000a01mtyumq5sp4/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw";

//  Carto dataset being used for markers
const cartoKeyMarkers = "6KgYkqFnDfk6hEgC3TGvIw";
const cartoSourceMarkers = "russia_btg_map_all_time_data";

// Carto dataset being used for frontlines
const linesApiKey = "SMgzGpUrfgPT5Fg25t9XNw";
const cartoSourceLines = "tnt_front_lines_time_slider";

// Name to use with carto.Client
const username = "csis";

// entry point for Carto.js
// reference: https://carto.com/developers/carto-js/reference/#cartoclient
const client = new carto.Client({
  apiKey: cartoKeyMarkers,
  username: username,
});

/* -------------------------------------------------------------------------- */
/*                                Build the map                               */
/* -------------------------------------------------------------------------- */

// Used to load and display tile layers on the map
// Reference: https://leafletjs.com/reference.html#tilelayer
var basemap = L.tileLayer(basemapURL, {});

// Creates a map on the page
// Reference: https://leafletjs.com/reference.html#map
var map = L.map("map", {
  center: [48.981, 32.839],
  zoom: 6.5,
  maxZoom: 20,
  scrollWheelZoom: true,
  minZoom: 6,
  zoomControl: false,
  scrollWheelZoom: true,
  zoomSnap: 0,
  zoomDelta: 0.5,
  layers: [basemap],
  attributionControl: false,
});

// SQL query of Carto datasource - here, it's the markers
// Reference: https://carto.com/developers/carto-js/reference/#cartosourcesql
const mapSource = new carto.source.SQL(
  `SELECT * FROM csis.` + cartoSourceMarkers
);

// Apply CartoCSS to a layer
// Reference: https://carto.com/developers/carto-js/reference/#cartostylecartocss
const mapStyle = new carto.style.CartoCSS(`
// #layer {
//   marker-width: 7;
//   marker-allow-overlap: false;
//   marker-line-width: 1;
//   marker-line-color: #FFFFFF;
//   marker-line-opacity: 1;
// }
`);

// Use data from SQL query and CartoCSS style settings to create a layer
// Reference: https://carto.com/developers/carto-js/reference/#cartolayerlayer
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

/* -------------------------------------------------------------------------- */
/*            Instantiate Overlapping Marker Spiderfier for Leaflet           */
/* -------------------------------------------------------------------------- */
let omsOptions = {
  keepSpiderfied: true,
  nearbyDistance: 35,
  circleSpiralSwitchover: 3,
};

// relies on map being instantiated, can't put this code before it
// this creates the OverlappingMarkerSpiderfier instance
const oms = new OverlappingMarkerSpiderfier(map, omsOptions);

/* -------------------------------------------------------------------------- */
/*                           Build the marker icons                           */
/* -------------------------------------------------------------------------- */

// Get all markers from images directoy
// Reference: https://stackoverflow.com/questions/18480550/how-to-load-all-the-images-from-one-of-my-folder-into-my-web-page-using-jquery
function getImages() {
  return new Promise((resolve, reject) => {
    let url = "./js/markers.json";
    fetch(url)
      .then((res) => res.json())
      .then((markers) => {
        let markerIcon = "";

        // https://leafletjs.com/examples/custom-icons/
        let IconBase = L.Icon.extend({
          options: {
            iconSize: [45, 45],
            iconAnchor: [22, 40],
          },
        });

        let markerArr = [];

        // Loop through the marker json file and create a marker object for each type
        for (let x in markers) {
          x = x.toLowerCase();
          let fullUrl = "./images/" + x + ".svg";
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

/* -------------------------------------------------------------------------- */
/*         Sort marker icons by date and add to map; set up spiderfier        */
/* -------------------------------------------------------------------------- */

/* Note: markerLayerGroups, dates, and the array of front lines will be created
in the same date-order, so if the index fo 2/1/23 is [0], the matching 
markerLayerGroup and frontline will also have index [0]. This is important
for the timeline slider to function properly. */

// markersByDate is an object of {String date: Array markers}
let markersByDate = {};

// the markers for each date are added to a group of layers, each marker is one layer
// there is a group of layers for each date, added to markerLayerGroups
let markerLayerGroups = [];

// dates is extracted from the markers, to use with both markers and front lines
let dates = [];

// run getImages() from above, then create/use markersByDate and markerLayerGroups
// then also set up the spiderfier
Promise.all([getImages()]).then((markerArr) => {
  let sql = new cartodb.SQL({ user: "csis" });
  sql
    .execute("SELECT * FROM csis." + cartoSourceMarkers)
    .done(function (data) {
      // all rows of Carto spreadsheet
      const rows = data.rows;
      // array of all lat/long pairs to help find duplicates
      let latLngArr = [];

      /* ---- Build markers, markersByDate, dates; add each marker to spiderfier --- */
      rows.forEach((row) => {
        let latLong = row.lat + ", " + row.long;
        let markerName = row.type.toLowerCase();

        // Check if lat/long is a duplicate, add a small number if it is
        // This keeps markers from sitting directly on top of one another
        if (!latLngArr.includes(latLong)) {
          latLngArr.push(latLong);
        } else {
          row.lat = row.lat + (Math.random() * (0.15 - 0.05) + 0.05);
          latLong = row.lat + ", " + row.long;
          latLngArr.push(latLong);
        }

        // Check the markerArr from getImages(), which used our JSON file --
        // if it has a marker with a name that matches the name in the
        // row we're checking, save it as "foundMarkerIcon"
        const foundMarkerIcon = markerArr[0].find((marker) => {
          return marker.options.iconName == markerName;
        });

        // If we have a matching marker icon, use it to mark the map
        // at the lat/long of the row we're checking
        if (foundMarkerIcon) {
          // create a marker object with the icon you found and a placeholder
          // for the rest of the data from the row
          let marker = L.marker([row.lat, row.long], {
            icon: foundMarkerIcon,
            riseOnHover: false,
            data: null,
          });

          // add all row information to the marker -- can't add at the same time marker
          // object is being created
          marker.data = row;

          // convert date Carto pulls from the google sheet to seconds
          // to normalize between the markers and the frontlines
          const dateInSec = new Date(marker.data.date).getTime();

          // if the dates array doesn't have the date of the row we're checking, add it
          // we're only pulling out the unique dates -- this array will be used for both
          // markers and front lines
          if (!dates.includes(dateInSec)) {
            dates.push(dateInSec);
          }

          // if the markersByDate object doesn't have our date, (1) add it
          // and (2) add the marker to its array or markers, else, add
          // the marker to its array of markers
          if (dateInSec in markersByDate) {
            markersByDate[dateInSec].push(marker);
          } else {
            markersByDate[dateInSec] = [marker];
          }

          // tell the OMS instance about each marker as we add it
          // Reference: https://github.com/jawj/OverlappingMarkerSpiderfier-Leaflet
          oms.addMarker(marker);
        } else {
          console.log("No marker for " + row.type);
        }
      });

      /* -------------------- Setup timeline in the map legend -------------------- */
      dates.sort();
      len = dates.length;

      // setupTimeline is a property on the timeline object, below
      timeline.setupTimeline({ start: dates[0], end: dates[len - 1] });

      /* ---------------------- Build the marker layer groups --------------------- */
      for (array in markersByDate) {
        // remember each marker is its own layer
        layerArray = L.layerGroup(markersByDate[array]);
        markerLayerGroups.push(layerArray);
      }

      // add the first group to the map to start with
      map.addLayer(markerLayerGroups[0]);

      /* -------------------- Set up spiderfier event listeners ------------------- */
      // Reference: https://github.com/jawj/OverlappingMarkerSpiderfier-Leaflet
      oms.addListener("click", function (marker) {
        if (marker.data.formal_name === "") {
          popup.setContent(
            "<p class='leaflet-popup-content--no-name'>Name not available</p>"
          );
        } else {
          popup.setContent(marker.data.formal_name);
        }
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
});

/* -------------------------------------------------------------------------- */
/*                         Create and add front lines                         */
/* -------------------------------------------------------------------------- */

let lineArr = [];

fetch(
  `https://${username}.carto.com/api/v2/sql?format=GeoJSON&api_key=${linesApiKey}&q=SELECT * FROM ${cartoSourceLines} ORDER BY date ASC`
)
  .then((res) => res.json())
  .then((response) => {
    // Loop through the front line Carter spreadsheet and create a layer for each line
    response.features.forEach((row) => {
      // normalize date to match markers by putting in seconds
      const dateInSec = new Date(row.properties.date).getTime();

      // the rows come with the date -- *add* dateInSeconds as add'l property
      row.properties.dateInSec = dateInSec;

      // convert the row into geojson, style it, and add it to the line array
      lineArr.push(
        L.geoJSON(row, {
          style: function (feature) {
            return { weight: 3, color: "#6d3738", opacity: 1 };
          },
          interactive: false,
        })
      );
    });

    // add the first line in the array to the map to begin with
    map.addLayer(lineArr[0]);
  });

/* -------------------------------------------------------------------------- */
/*      Functions to add/remove marker and layer groups at the same time      */
/* -------------------------------------------------------------------------- */
function addLayerGroup(group) {
  return new Promise(function (resolve, _reject) {
    resolve(map.addLayer(markerLayerGroups[group]).addLayer(lineArr[group]));
  });
}

function removeLayerGroup(group) {
  return new Promise(function (resolve, _reject) {
    resolve(
      map.removeLayer(markerLayerGroups[group]).removeLayer(lineArr[group])
    );
  });
}

/* -------------------------------------------------------------------------- */
/*                     Popups, attribution, zoom position                     */
/* -------------------------------------------------------------------------- */

// popups for markers
// Reference: https://leafletjs.com/reference.html#popup
const popup = L.popup({ closeButton: true, offset: new L.Point(0, -20) });

// Attribution reference: https://leafletjs.com/reference.html#control-attribution
L.control
  .attribution({
    position: "bottomleft",
  })
  .setPrefix(
    'Data by <a target="_blank" href="https://www.csis.org/programs/transnational-threats-project">CSIS Transnational Threats Program</a> | <a href="https://leafletjs.com/">Leaflet</a>'
  )
  .addTo(map);

// Zoom reference: https://leafletjs.com/reference.html#control-zoom
L.control
  .zoom({
    position: "topright",
  })
  .addTo(map);

/* -------------------------------------------------------------------------- */
/*                       Legend Timeline and Play Button                      */
/* -------------------------------------------------------------------------- */
const timeline = {
  el: document.querySelector(".timeline-bar"),
  controlBtn: document.getElementById("timeline-btn"),
  currentDateEl: document.querySelector(".timeline-current-date"),
  playing: false,
  timer: null,
  transitionDuration: 2000,
  end: null,
  start: null,

  updateCurrentDate: function (currentDate) {
    this.currentDateEl.innerHTML = `${this.formatDate(currentDate)}`;
  },

  onChange: function onChange() {
    // use nouislider get() to grab current slider value
    // reference: https://refreshless.com/nouislider/slider-read-write/
    currentDate = this.get();
    timeline.updateCurrentDate(currentDate);

    // close any open popups before timeline starts playing
    map.closePopup();

    // Get the index of the date from the dates array that matches
    // the current timeline/slider value
    let dateIndex = dates.indexOf(currentDate);

    // Remove layer groups that DONT have the current dateIndex
    for (i = 0; i < len; i++) {
      if (i != dateIndex) {
        removeLayerGroup(i);
      }
    }

    // Add the layer groups with the same index of the current date to the map
    addLayerGroup(dateIndex);

    // stop playing the timeline at the last date; don't auto restart
    if (currentDate == timeline.end) {
      timeline.stopTimeline();
    }
  },

  formatDate: function (currentDate) {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    dateInSec = new Date(currentDate);

    formattedDate = new Date(
      dateInSec.getUTCFullYear(),
      dateInSec.getUTCMonth(),
      dateInSec.getUTCDate()
    );

    return `${
      monthNames[formattedDate.getMonth()]
    } ${formattedDate.getFullYear()}`;
  },

  setupTimeline: function ({ start, end }) {
    this.start = start;
    this.end = end;

    this.setupBtnControls();

    let range = {};
    // Build range object to use below in slider creation
    dates.forEach((date, i) => {
      // Since the dates array was sorted above, the first and last date are the start and end date
      if (i === 0) {
        range["min"] = date;
      } else if (i === len - 1) {
        range["max"] = date;
      } else {
        // For all dates that aren't the first or last, get percentage of where that date falls between the start and end dates, then pass percent:date as key:value to the range object. Used to place the date in the correct position on the timeline.
        // Reference: https://math.stackexchange.com/questions/754130/find-what-percent-x-is-between-two-numbers
        // Reference: https://refreshless.com/nouislider/examples/#section-values
        let rangePercent =
          Math.floor(
            ((date - dates[0]) / (dates[len - 1] - dates[0])) * 100 + 0.5
          ) + "%";
        range[rangePercent] = date;
      }
    });

    // Reference: https://refreshless.com/nouislider/
    noUiSlider.create(this.el, {
      start: this.start,
      connect: true,
      // behaviour reference: https://refreshless.com/nouislider/behaviour-option/
      behaviour: "tap-drag",
      snap: true,
      range: range,
      // format reference: https://refreshless.com/nouislider/number-formatting/
      format: {
        from: function from(v) {
          return parseInt(v, 10);
        },
        to: function to(v) {
          return parseInt(v, 10);
        },
      },
      // pips reference: https://refreshless.com/nouislider/pips
      pips: {
        mode: "count",
        values: len,
        density: 100,
        stepped: true,
        format: {
          to: toFormat,
        },
      },
    });

    // .set() reference: https://refreshless.com/nouislider/slider-read-write/
    this.el.noUiSlider.set(this.start);
    // .on(event) reference: https://refreshless.com/nouislider/events-callbacks/
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

    // Make pips with values clickable
    let pips = timeline.el.querySelectorAll(".noUi-value");

    // Set slider value to the data-value of the clicked pip
    function clickOnPip() {
      var value = Number(this.getAttribute("data-value"));
      timeline.el.noUiSlider.set(value);
    }
    // Add event listener to the pips
    for (var i = 0; i < pips.length; i++) {
      pips[i].addEventListener("click", clickOnPip);
    }

    // used above to format pip labels
    function toFormat(seconds) {
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      date = new Date(seconds);
      date = new Date(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate()
      );
      return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    }
  },

  setupBtnControls: function () {
    this.controlBtn.addEventListener("click", function () {
      // if slider is at last date, remove its layers and set to start
      if (currentDate == timeline.end) {
        const lastDateIndex = len - 1;
        removeLayerGroup(lastDateIndex);
        timeline.el.noUiSlider.set(timeline.start);
      }

      // if the timeline is playing, stop it (don't auto-repeat)
      if (timeline.playing == true) {
        timeline.stopTimeline();
        return;
      }

      // get where the timeine currently is, increment it by 1
      // if it's at the end, start over at 0 (this lets user
      // hit play again when timeline stops)
      let i = dates.indexOf(currentDate);
      function timelinePosition() {
        if (i >= dates.length) {
          i = 0;
        }

        currentDate = dates[i];
        timeline.el.noUiSlider.set(currentDate);
        i++;
      }
      // call function to get current TL position -- otherwise
      // there's a delay when you hit play
      timelinePosition();

      timeline.timer = setInterval(
        timelinePosition,
        timeline.transitionDuration
      );

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

//console.log("timeline", timeline);
