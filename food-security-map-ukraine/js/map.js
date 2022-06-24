var basemap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/ilabmedia/cl4r8xsu6000215p70wd971j7/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw",
  {}
);

var map = L.map("map", {
  center: [48.2, 32.6],
  zoom: 6,
  maxZoom: 8,
  scrollWheelZoom: true,
  minZoom: 2,
  zoomControl: true,
  scrollWheelZoom: true,
  layers: [basemap],
  attributionControl: false,
});

const client = new carto.Client({
  apiKey: "mLKZ_fUJ6GlelNbfkALecQ",
  username: "csis",
});

const mapSource = new carto.source.SQL(`SELECT * FROM edodd_attacks_on_ukraine_agriculture_food_supply_chain_1`);

const mapStyle = new carto.style.CartoCSS(`
#layer {
  marker-width: 20;
  marker-fill: ramp([marker_color], (#482d9e, #e32c31, #005e38, #376dc2, #3cc954, #444444, #cc1b15, #ffcc00), ("#482d9e", "#e32c31", "#005e38", "#376dc2", "#3cc954", "#444444", "#cc1b15", "#ffcc00"), "=");
  marker-fill-opacity: 1;
  marker-file: ramp([marker_color], (url('https://s3.amazonaws.com/com.cartodb.users-assets.production/production/csis/assets/20220622193635location-pin.svg'), url('https://s3.amazonaws.com/com.cartodb.users-assets.production/production/csis/assets/20220622193635location-pin.svg'), url('https://s3.amazonaws.com/com.cartodb.users-assets.production/production/csis/assets/20220622193635location-pin.svg'), url('https://s3.amazonaws.com/com.cartodb.users-assets.production/production/csis/assets/20220622193635location-pin.svg'), url('https://s3.amazonaws.com/com.cartodb.users-assets.production/production/csis/assets/20220622193635location-pin.svg'), url('https://s3.amazonaws.com/com.cartodb.users-assets.production/production/csis/assets/20220622193635location-pin.svg'), url('https://s3.amazonaws.com/com.cartodb.users-assets.production/production/csis/assets/20220622193635location-pin.svg'), url('https://s3.amazonaws.com/com.cartodb.users-assets.production/production/csis/assets/20220622193635location-pin.svg')), ("#482d9e", "#e32c31", "#005e38", "#376dc2", "#3cc954", "#444444", "#cc1b15", "#ffcc00"), "=");
  marker-allow-overlap: true;
  marker-line-width: 2;
  marker-line-color: #FFFFFF;
  marker-line-opacity: 1;
}
`);

const mapLayer = new carto.layer.Layer(mapSource, mapStyle, {
  featureOverColumns: ["title",
    "description",
    "_group",
    "url",
    "media_url",
    "marker_color",
    "tweethtml"
  ],
});

client.addLayer(mapLayer);

client.getLeafletLayer().bringToFront().addTo(map);

const sidePanel = L.popup({ closeButton: true });

mapLayer.on(carto.layer.events.FEATURE_CLICKED, createSidePanel);

function getTweet(URLtweet) {
  console.log(URLtweet)
  const url = 'https://tweetic.io/api/tweet?url='+ URLtweet
  console.log(url)
  // var requestOptions = {
  //   mode: 'no-cors',
  //   method: 'GET'
  // };

  // fetch(url, requestOptions)
  //   .then(res => res.text())
  //   .then(result => console.log('res ', result))
  //   .catch(error => console.log('error', error));
var requestOptions = {
  mode: 'no-cors',
  method: 'GET',
  redirect: 'follow'
};

// fetch("https://tweetic.io/api/tweet?url=https://twitter.com/nexta_tv/status/1502576577032380417", requestOptions)
fetch("https://publish.twitter.com/oembed?url="+URLtweet)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

  // const response = fetch(`https://tweetic.io/api/tweet?url=${URL}`, {
  //   mode: 'no-cors',
  // })
  // const test = response.json()
  // console.log(test)
}

function createSidePanel(event) {
  sidePanel.setLatLng(event.latLng);

  const panel = document.querySelector('.panel');
  const panelContent = document.querySelector('.panel-content');
  panel.classList.add('open');

  if (!sidePanel.isOpen()) {
    var data = event.data;
    var content = '';

    content += `
    <h2 class="sidePanelHeaderStyle">
      Ukraine
    </h2>
    <p class="side-panel-value">Title: <span>${data.title}</span> </p>
    <p class="side-panel-value">Description: <span>${data.description}</span> </p>
    `
    console.log(data.media_url);
    if (data.media_url) {
      // const tweet = getTweet(data.media_url)
      const tweet = fetch("https://publish.twitter.com/oembed?url="+data.media_url, {
        mode: 'no-cors'
      })
        .then(res => res.text())
        .then(data => console.log(data))
      // const tweet = "https://publish.twitter.com/oembed?url="+data.media_url
      console.log(tweet);
      // const tweet = `<blockquote class="twitter-tweet"><p lang="en" dir="ltr"><a href="https://twitter.com/hashtag/UPDATE?src=hash&amp;ref_src=twsrc%5Etfw">#UPDATE</a>: Governor of Sumy in eastern Ukraine reports a ammonia leak at the Pat Sumykhimprom chemical plant as clashes continue in the area. The affected area is 5km wide and is classed as dangerous due to the leak <a href="https://t.co/R5vNRk2ilQ">pic.twitter.com/R5vNRk2ilQ</a></p>&mdash; ELINT News (@ELINTNews) <a href="https://twitter.com/ELINTNews/status/1505745445083090944?ref_src=twsrc%5Etfw">March 21, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`
      // content += `Insert tweet here: <a href="${tweet}">tweet</a>`
      // content += `<div id="tweetContainer"></div>`
    }
    if (data.tweethtml) {
      console.log(data.tweethtml)
      content += `<div class="tweetContainer">${data.tweethtml}</div>`
    }
    if (data.url) {
      content +=
      `
      <p class="side-panel-link">For more details, click <a href="${data.url}" target="_blank">here</a>.</p>
      `;
    }
    panelContent.innerHTML = content;
  }
}

const closeBtn = document.querySelector('.close-btn');
closeBtn.addEventListener('click', function(e) {
  const panel = document.querySelector('.panel');
  panel.classList.remove('open');
})

L.control
  .attribution({
    position: "bottomright",
  })
  .setPrefix(
    '<a href="https://www.csis.org/programs/global-food-security-program">CSIS Global Food Security Program</a>, <a href="https://leafletjs.com/">Leaflet</a>'
  )
  .addTo(map);
