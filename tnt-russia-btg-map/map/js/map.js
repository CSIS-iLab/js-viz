// Get all markers from images dir
// https://stackoverflow.com/questions/18480550/how-to-load-all-the-images-from-one-of-my-folder-into-my-web-page-using-jquery
function getImages() {
    return new Promise((resolve, reject) => {
        let url = 'http://127.0.0.1:5500/map/js/markers.json';
        fetch(url)
            .then(res => res.json())
            .then((markers) => {
                let markerIcon = "";
                let elements = document.createElement('a');
                let IconBase = L.Icon.extend({
                    options: {
                        iconSize: [50, 95],
                        iconAnchor: [22, 94],
                        popupAnchor: [-3, -76],
                    },
                });
                let markerArr = [];
                for (let x in markers) {
                    // X = icon name
                    // fullUrl = icon url
                    let fullUrl = "http://127.0.0.1:5500/map/images/" + x + ".svg";
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
    markerArr = markerArr.flatMap(options => options);


    function theData(markerArr) {
        let sql = new cartodb.SQL({ user: "csis" });
        sql
            .execute("SELECT * FROM csis.russia_btg_map_1")
            .done(function(data) {
                const rows = data.rows;
                // Loop through lat/long - We need to get all the data before we loop through in leaflet
                rows.forEach((row) => {
                        if (row.type !== '') {
                            let markerName = row.type;
                            // Get icon Name vs URL

                            const foundItem = markerArr.find((marker) => {
                                marker.options.iconName == markerName;
                            })
                            console.log(foundItem)
                                // if (markerName == markerArr.options.markerName) {
                            L.marker([row.lat, row.long], { icon: markerName }).addTo(map).bindPopup(
                                '<h2>' + row.short_form_name + '</h2>' +
                                '<a href="' + row.source + '" target="_blank">Source</a>'
                            );
                            // } else {}
                        };
                    })
                    .error(function(errors) {
                        // errors contains a list of errors
                        console.log("errors:" + errors);
                    });
            })
    };
});

const client = new carto.Client({
    apiKey: "moxuF6iP0jTe4tyXPtVK4Q",
    username: "csis",
});

var basemap = L.tileLayer(
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

const mapSource = new carto.source.SQL(`SELECT * FROM csis.russia_btg_map_1`);



// console.log(dataRows)

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