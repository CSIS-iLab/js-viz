// Get all markers from images dir
// https://stackoverflow.com/questions/18480550/how-to-load-all-the-images-from-one-of-my-folder-into-my-web-page-using-jquery
function getImages() {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "./images/", true);
        xhr.responseType = "document";
        xhr.onload = () => {
            let markerIcon = {}

            if (xhr.status === 200) {
                let elements = xhr.response.getElementsByTagName("a");
                let allMarkers = [];
                let IconBase = L.Icon.extend({
                    options: {
                        iconSize: [50, 95],
                        iconAnchor: [22, 94],
                        popupAnchor: [-3, -76],
                    },
                });

                for (x of elements) {
                    if (x.href.match(/\.(svg)$/)) {
                        let img = document.createElement("img");
                        let filename = '';
                        let filename2 = '';

                        img.src = x.href; // Full URL
                        filename = x.href.substring(x.href.lastIndexOf('/') + 1); // File name w/ext
                        filename2 = x.href.substring(x.href.lastIndexOf('/') + 1).replace(/\.[^/.]+$/, ""); // File name no ext

                        markerIcon[filename2] = new IconBase({
                            iconUrl: x.href,
                        });

                    }
                }
            } else {}
            resolve(markerIcon);
        };
        xhr.send();
    })

};

getImages().then((markerIcon) => {
    const dataRows = theData(markerIcon);

    function theData(markerIcon) {

        var sql = new cartodb.SQL({ user: "csis" });
        sql
            .execute("SELECT * FROM csis.russia_btg_map_1")
            .done(function(data) {
                const rows = data.rows;
                // Loop through lat/long - We need to get all the data before we loop through in leaflet
                data.rows.forEach(row => {
                    if (row.type !== '') {
                        let iconName = row.type;
                        if (iconName in markerIcon) {
                            L.marker([row.lat, row.long], { icon: markerIcon[iconName] }).addTo(map).bindPopup(
                                '<h2>' + row.short_form_name + '</h2>' +
                                '<a href="' + row.source + '" target="_blank">Source</a>'
                            );
                        }
                    } else {}
                });
            })
            .error(function(errors) {
                // errors contains a list of errors
                console.log("errors:" + errors);
            });
    }
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


var frontLineGEOJson = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            31.523895263671875,
            46.56452573114373
          ],
          [
            31.559600830078125,
            46.53713734839792
          ],
          [
            31.598052978515625,
            46.53713734839792
          ],
          [
            31.65023803710937,
            46.53713734839792
          ],
          [
            31.672210693359375,
            46.534303278597505
          ],
          [
            31.691436767578125,
            46.53997127029103
          ],
          [
            31.718902587890625,
            46.543749602738565
          ],
          [
            31.75872802734375,
            46.54280504427768
          ],
          [
            31.776580810546875,
            46.53619267489863
          ],
          [
            31.8548583984375,
            46.51635073507512
          ],
          [
            31.904296874999996,
            46.514460648524775
          ],
          [
            31.941375732421875,
            46.50406399740093
          ],
          [
            31.98394775390625,
            46.492719928122746
          ],
          [
            32.025146484375,
            46.48893804576338
          ],
          [
            32.078704833984375,
            46.494610770689384
          ],
          [
            32.1075439453125,
            46.613601326659726
          ],
          [
            32.2613525390625,
            46.717268685073954
          ],
          [
            32.4920654296875,
            46.81885778879603
          ],
          [
            32.794189453125,
            47.06638028321398
          ],
          [
            33.1951904296875,
            47.23821935972681
          ],
          [
            33.2501220703125,
            47.5394554474239
          ],
          [
            33.6456298828125,
            47.491224888201955
          ],
          [
            33.68408203125,
            47.42437092240519
          ],
          [
            33.97796630859375,
            47.37789454155521
          ],
          [
            34.02740478515625,
            47.36673410912714
          ],
          [
            34.046630859375,
            47.416937456635445
          ],
          [
            34.12628173828125,
            47.418795921472714
          ],
          [
            34.19219970703125,
            47.409502941311075
          ],
          [
            34.28009033203125,
            47.4355191531953
          ],
          [
            34.28009033203125,
            47.41136166853917
          ],
          [
            34.34600830078125,
            47.45037978769006
          ],
          [
            34.3817138671875,
            47.49308072945064
          ],
          [
            34.49432373046875,
            47.49679221520181
          ],
          [
            34.5245361328125,
            47.502358951968574
          ],
          [
            34.57122802734375,
            47.49864785970502
          ],
          [
            34.62615966796875,
            47.54687159892238
          ],
          [
            34.661865234375,
            47.519055620971265
          ],
          [
            34.69207763671875,
            47.49493650511712
          ],
          [
            34.7607421875,
            47.487513008956554
          ],
          [
            34.7882080078125,
            47.46337939935778
          ],
          [
            34.84039306640625,
            47.455951443369926
          ],
          [
            34.87884521484374,
            47.44852243794931
          ],
          [
            34.86785888671875,
            47.42437092240519
          ],
          [
            34.92828369140625,
            47.38905261221537
          ],
          [
            35.0189208984375,
            47.40392636603371
          ],
          [
            35.07659912109375,
            47.44666502261753
          ],
          [
            35.21392822265624,
            47.44666502261753
          ],
          [
            35.80169677734375,
            47.58393661978134
          ],
          [
            36.221923828125,
            47.54687159892238
          ],
          [
            36.2713623046875,
            47.67833372712059
          ],
          [
            36.5185546875,
            47.70791337194979
          ],
          [
            36.71905517578125,
            47.79286140021344
          ],
          [
            37.078857421875,
            47.755944512091666
          ],
          [
            37.4578857421875,
            47.73747623919626
          ],
          [
            37.54302978515625,
            47.80577611936809
          ],
          [
            37.71881103515625,
            47.78363463526376
          ],
          [
            37.577362060546875,
            48.01381248943335
          ],
          [
            37.747650146484375,
            48.06477319125294
          ],
          [
            37.76481628417969,
            48.127830296770306
          ],
          [
            37.98316955566406,
            48.31539614816813
          ],
          [
            38.264007568359375,
            48.63926125872981
          ],
          [
            38.23516845703124,
            48.90805939965008
          ],
          [
            38.25164794921875,
            48.996438064932285
          ],
          [
            38.049774169921875,
            48.99733908118444
          ],
          [
            37.8204345703125,
            48.928815391832714
          ],
          [
            37.711944580078125,
            48.97390736160892
          ],
          [
            37.66937255859375,
            49.00995159747052
          ],
          [
            37.18048095703125,
            48.953170117120976
          ],
          [
            37.20245361328125,
            49.04506962208049
          ],
          [
            37.03765869140625,
            49.116130191506805
          ],
          [
            37.069244384765625,
            49.2140089056539
          ],
          [
            37.254638671875,
            49.21670007971533
          ],
          [
            36.841278076171875,
            49.459198634468564
          ],
          [
            36.90032958984375,
            49.78392421773299
          ],
          [
            36.98822021484375,
            49.78481090512662
          ],
          [
            36.98753356933593,
            49.88268990571892
          ],
          [
            37.00675964355469,
            49.908787000867136
          ],
          [
            36.984100341796875,
            49.92691395912688
          ],
          [
            36.953887939453125,
            49.94282469418618
          ],
          [
            36.94084167480468,
            49.96138057904258
          ],
          [
            36.89964294433594,
            49.97109747495407
          ],
          [
            36.931915283203125,
            49.99714673955337
          ],
          [
            36.815185546875,
            50.03773778732018
          ],
          [
            36.83578491210937,
            50.068158571371235
          ],
          [
            36.849517822265625,
            50.161064818858684
          ],
          [
            36.857757568359375,
            50.2691545281742
          ],
          [
            36.54327392578124,
            50.161064818858684
          ],
          [
            36.39701843261719,
            50.19272617963508
          ],
          [
            36.18621826171875,
            50.331874645939926
          ],
          [
            36.23291015625,
            50.364736755649716
          ]
        ]
      }
    }
  ]
}

var fontLineStyle = {
    "color": "#6a3839",
    "weight": 3,
    "opacity": 0.75,
    "dashArray": "5",
    "dashOffset": "5"
};

L.geoJSON(frontLineGEOJson, {
    style: fontLineStyle
}).addTo(map);

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
    .addTo(map);