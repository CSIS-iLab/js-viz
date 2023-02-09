// Get all markers from images dir
// https://stackoverflow.com/questions/18480550/how-to-load-all-the-images-from-one-of-my-folder-into-my-web-page-using-jquery
function getImages() {
	return new Promise((resolve, reject) => {
		let url = 'http://127.0.0.1:5503/tnt-russia-btg-map/map/js/markers.json';
		// let url = 'https://feat-tnt-russia-ukraine-map--csis-js-viz.netlify.app/tnt-russia-btg-map/map/js/markers.json';
		fetch(url)
		.then(res => res.json())
		.then((markers) => {
			let markerIcon = "";
			let IconBase = L.Icon.extend({
				options: {
					iconSize: [60, 60],
					iconAnchor: [30, 30],
					popupAnchor: [3, 0],
				},
			});
			let markerArr = [];
			// Loop through the marker json file and create a marker object for each type
			for (let x in markers) {
				x = x.toLowerCase()
				let fullUrl = "http://127.0.0.1:5503/tnt-russia-btg-map/map/images/" + x + ".svg";
				// let fullUrl = "https://feat-tnt-russia-ukraine-map--csis-js-viz.netlify.app/tnt-russia-btg-map/map/images/" + x + ".svg";
				let filename2 = x.substring(x.lastIndexOf('/') + 1).replace(/\.[^/.]+$/, ""); // File name no ext
				markerIcon = new IconBase({
					iconUrl: fullUrl,
					iconName: filename2
				});
				markerArr.push(markerIcon)
			}
			resolve(markerArr);
		})
		// .catch(err => { throw err });
	})

};

Promise.all([getImages()]).then(markerArr => {
	const dataRows = theData(markerArr);

	function theData(markerArr) {
		let sql = new cartodb.SQL({ user: "csis" });
		sql
		.execute("SELECT * FROM csis.russia_btg_map_february_2023_data")
		.done(function(data) {
			const rows = data.rows;
			// Loop through each battlement
			let latLngArr = []
			rows.forEach((row) => {
				let latLongObj = {
					'rowLat': row.lat,
					'rowLong': row.long
				}
				let latLong = row.lat + ', ' + row.long
				// Check if lat long combo is a duplicate and add a small number if it is
				if (!latLngArr.includes(latLong)) {
					latLngArr.push(latLong)
				} else {
					row.lat = row.lat + .05
					latLongObj.rowLat = row.lat
					latLong = row.lat + ', ' + row.long

					latLngArr.push(latLong)
				}
					let markerName = row.type.toLowerCase();
					// Get marker icon object for the specific battlement type
					const foundItem = markerArr[0].find((marker) => {
						return marker.options.iconName == markerName;
					})
					// If we have a matching marker, use it to mark the battlement on the map
					if(foundItem) {
						let marker = L.marker([row.lat, row.long], { icon: foundItem, riseOnHover: true, riseOffset: 1000 })
						marker.data = row
						// .bindPopup(
						// 	'<h2>' + row.short_form_name + '</h2>' +
						// 	'<a href="' + row.source + '" target="_blank">Source</a>'
						// );
						map.addLayer(marker)
						oms.addMarker(marker)
					}
					else {
						console.log("No marker for " + row.type)
					}
			})

			oms.addListener('click', function(marker) {
				// console.log("bounds:" + bounds + "; marker latlng:" + marker.getLatLng())
				popup.setContent(marker.data.short_form_name);
				popup.setLatLng(marker.getLatLng());
				map.openPopup(popup);
			});

			oms.addListener('spiderfy', function(markers) {
				map.closePopup()
			})
		})
		.error(function(errors) {
				// errors contains a list of errors
				console.log("errors:" + errors);
		});
	};
});

const client = new carto.Client({
	apiKey: "zzhzybmAeI8PrGIOd4WHzg",
	username: "csis",
});

var basemap = L.tileLayer(
	// February 23 Front Line
	"https://api.mapbox.com/styles/v1/ilabmedia/cldvy5ya3002201qfcqhyw53n/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw",
  {}
	//"https://api.mapbox.com/styles/v1/ilabmedia/cldov14wh001t01o3duhh9bbh/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw", {}
);

var map = L.map("map", {
	center: [48.95569267478989, 33.69398277149277],
	zoom: 7,
	maxZoom: 20,
	scrollWheelZoom: true,
	minZoom: 6,
	zoomControl: false,
	scrollWheelZoom: true,
	layers: [basemap],
	attributionControl: false,
});

const mapSource = new carto.source.SQL(`SELECT * FROM csis.russia_btg_map_february_2023_data`);

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
    featureOverColumns: ["formal_name", "short_form_name", "type", "size", "hq_tail2", "country", "lat", "long", "source"],
});


client.getLeafletLayer().bringToFront().addTo(map);

let omsOptions = {
	circleFootSeparation: 30,
	keepSpiderfied: true,
	nearbyDistance: 40,
	circleSpiralSwitchover: 3
}

const oms = new OverlappingMarkerSpiderfier(map, omsOptions)

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

L.control
	.attribution({
		position: "bottomright",
	})
	.setPrefix('<a href="https://www.csis.org/programs/PROGRAMNAME">CSIS PROGRAM</a>, <a href="https://leafletjs.com/">Leaflet</a>')