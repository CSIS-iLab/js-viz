// Get all markers from images dir
// https://stackoverflow.com/questions/18480550/how-to-load-all-the-images-from-one-of-my-folder-into-my-web-page-using-jquery
var xhr = new XMLHttpRequest();
xhr.open("GET", "./images/", true);
xhr.responseType = "document";
xhr.onload = () => {
    if (xhr.status === 200) {
        var elements = xhr.response.getElementsByTagName("a");
        for (x of elements) {
            if (x.href.match(/\.(svg)$/)) {
                let img = document.createElement("img");
                img.src = x.href;
                // console.log(x.href)
            }
        }
    } else {
        // console.log("Request failed. Returned status of " + xhr.status);
    }
};
xhr.send();

var basemap = L.tileLayer(
    // "https://api.mapbox.com/styles/v1/ilabmedia/ckvber5pm07gr14rq5v9ichdy/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw",
    "https://api.mapbox.com/styles/v1/ilabmedia/cl2th2451004c16ni3f3t9v43/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw", {}
);

var map = L.map("map", {
    center: [47.646, 30.987],
    zoom: 6.24,
    maxZoom: 10,
    scrollWheelZoom: true,
    minZoom: 1,
    zoomControl: true,
    scrollWheelZoom: true,
    layers: [basemap],
    attributionControl: false,
});

const client = new carto.Client({
    apiKey: "moxuF6iP0jTe4tyXPtVK4Q",
    username: "csis",
});

const mapSource = new carto.source.SQL(`SELECT * FROM csis.russia_btg_map_1`);

function theData() {
    var sql = new cartodb.SQL({ user: "csis" });
    sql
        .execute("SELECT * FROM csis.russia_btg_map_1")
        .done(function(data) {
            const rows = data.rows;
            console.log(rows)
                // Loop through lat/long - We need to get all the data before we loop through in leaflet
                // data.rows.forEach(row => {
                //     L.marker([row.lat, row.long], { icon: ruAirborneInfantryDivisionHQTail }).addTo(map).bindPopup(
                //         '<h2>' + row.short_form_name + '</h2>' +
                //         '<a href="' + row.source + '" target="_blank">Source</a>'
                //     );
                // });

            // return rows;
        })
        .error(function(errors) {
            // errors contains a list of errors
            console.log("errors:" + errors);
        });
}

const mapStyle = new carto.style.CartoCSS(`
#layer {
  marker-width: 7;
  marker-fill: ramp([type], (#5F4690, #e8777b, #38A6A5, #0F8554, #73AF48, #EDAD08, #E17C05, #CC503E, #94346E, #6F4070, #666666), (null, "RU_Mechanized-infantry_Brigade", "Mechanized Infantry", "UKR_Mechanized-infantry_Brigade", "RU_Mechanized-infantry_Regiment", "UKR_Light-infantry_Brigade", "RU_Airmobile-Infantry_Brigade", "RU_Mechanized-infantry_Corps_HQ", "RU_Mechanized-infantry_Task-Force", "UKR_Airmobile-Infantry_Brigade"), "=");
  marker-fill-opacity: 1;
  marker-file: ramp([type], (url('https://s3.amazonaws.com/com.cartodb.users-assets.production/production/csis/assets/20220628163711RU_Airborne%20Infantry_Division_HQ.svg')), ("RU_Mechanized-infantry_Brigade"), "=");
  marker-allow-overlap: true;
  marker-line-width: 1;
  marker-line-color: #FFFFFF;
  marker-line-opacity: 1;
}
`);
const mapLayer = new carto.layer.Layer(mapSource, mapStyle, {
    featureOverColumns: ["formal_name", "short_form_name", "type", "size", "hq_tail2", "country", "lat", "long", "source"],
});




let IconBase = L.Icon.extend({
    options: {
        iconSize: [50, 95],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
    },
});

let ruAirborneInfantryDivisionHQTail = new IconBase({ iconUrl: "./images/RU_Airborne Infantry_Division_HQ.svg" });

// L.marker([47.646, 30.987], { icon: ruAirborneInfantryDivisionHQTail }).addTo(map).bindPopup("I am a green leaf.");



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
      ${data.short_form_name}
    </div>
    <div class="popupEntryStyle">
      ${data.formal_name}
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
    .setPrefix('<a href="https://www.csis.org/programs/PROGRAMNAME">CSIS PROGRAM</a>, <a href="https://leafletjs.com/">Leaflet</a>')
    .addTo(map);