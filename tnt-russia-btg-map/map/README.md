# What is this

This is an interactive map used to illustrate how the location of Ukrainian and Russian military units and the frontline of the conflict have changed since the ongoing conflict began in early 2022. Military units are represented by blue and red icons (icons along with the associated geojson information comprise the map markers), the svgs for which can be found in this repo. The detail for the markers and the frontlines is kept in a [Google Sheet](https://docs.google.com/spreadsheets/d/1N9CReVCcffwbqt_mskZCugSGN9oVOZDwIEgGcFaU65k/edit#gid=1679214547) that feeds Carto and accessed via `cartodb.SQL`.

The base style map was made in [Mapbox Studio](https://www.mapbox.com/mapbox-studio), and we use [Leaflet](https://leafletjs.com/), [Overlapping Marker Spiderfier for Leaflet](https://github.com/jawj/OverlappingMarkerSpiderfier-Leaflet), and [noUiSlider](https://refreshless.com/nouislider/) to make the rest of the map and its functionality.

# Where does this live

[The live map is on Netlify](https://csis-js-viz.netlify.app/tnt-russia-btg-map/map/), with the rest of the `js-viz` repo. The map has been added to a [Shorthand](https://shorthand.com/) story and added to the `features.csis.org` subdomain. It can be found at [https://features.csis.org/ukraine-war-map/](https://features.csis.org/ukraine-war-map/). This is the version that should be linked to in related posts and stories and treated as the “full size” version.

# How to work on development

It’s powered by a single `index.html` file and a single JavaScript file. The easiest option is to fire up [the Live Server extension in VS Code](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

# How to add new icons

To add new icons, update both the [Google Sheet](https://docs.google.com/spreadsheets/d/1N9CReVCcffwbqt_mskZCugSGN9oVOZDwIEgGcFaU65k/edit#gid=1679214547) and the `/images` directory.

In the "Options" tab of the Google Sheet, the "Type/Symbol" name should match the name of the svg inside the `/images` directory.

Add the `.svg` for the new icon to the `/images` directory. In `/js/markers.json`, add the name of the icon from the Carto dataset (or the Google Sheet that feeds it) as a key. For that key’s value, add the path to the related `.svg` you just added.

# The rest of the README

The rest of this README ties to the map’s JS file. Each heading ties to a section title in the JS file.

## Connecting to Carto to get our data

In this section, we have the URL for the Mapbox style we’ll be using for our base map, the API keys for the Carto datasets that have the marker data and the frontline data, and the names of those Carto datasets.

- Mapbox Studio map used: `TNT_Russia_Ukraine_map-timeline-WORKING-POI-labels-updated-masks`
- Carto dataset for markers: `russia_btg_map_all_time_data`
- Carto dataset for frontlines: `tnt_front_lines_time_slider`

---

## Build the map

Here, we tell Leaflet to what basemap to use and create a map on the page so we can give it initial settings and manipulate it latter.

References:

- [L.tileLayer](https://leafletjs.com/reference.html#tilelayer)
- [L.map](https://leafletjs.com/reference.html#map)

---

## Instantiate Overlapping Marker Spiderfier for Leaflet

Because there are so many markers on the page, we use a library that - when a user clicks on a group of markers that are very close together - will take markers and spread them outward so they become visible.

References:

- [Overlapping Marker Spiderfier for Leaflet](https://github.com/jawj/OverlappingMarkerSpiderfier-Leaflet)
- [Illustration of what spiderfication means](https://regionbound.com/clusters-of-one#:~:text=Spiderfication%20is%20a%20mechanism%20to,spiral%20around%20their%20shared%20location.)

---

## Build the marker icons

In this section is a function called `getImages()` that will create a `markerIcon` object for every marker type.

The `markers.json` file has the name of every marker type. We get that information, then loop through it and use it to get the file names for all the different icon images. That information is used to create a Leaflet marker object for each marker type.

Reference:

- [Leaflet markers with custom icons](https://leafletjs.com/examples/custom-icons/)
- [How to load all the images from one of my folder into my web page, using Jquery/Javascript (Stack Overflow)](https://stackoverflow.com/questions/18480550/how-to-load-all-the-images-from-one-of-my-folder-into-my-web-page-using-jquery)

---

## Sort marker icons by date and add to map; set up spiderfier

We’ll need several variables to use with the markers and our timeline later one:

- `markersByDate` — An object of the structure `{String date: Array markers}`
- `markerLayerGroups` — The markers for each date are added to a group of layers, as each marker is its own layer. There is a group of layers for each date, and those groups are added to `markerLayerGroups`.
- `dates` — These dates are extracted from our marker data and are put into an array that we can use with both markers and front lines.

Note: `markerLayerGroups`, `dates`, and the array of front lines will be created in the same date-order, so if the index of `2/1/23` is `0`, the matching `markerLayerGroup` and `frontline` will also have index `0`. This is important for the timeline slider to function properly.

### **Build markers, markersByDate, dates; add each marker to spiderfier**

- After setting those up, we’ll run `getImages()` from the above section so we have our marker objects ready. Then, we use the [`cartodb` API](https://carto.com/blog/the-versatility-of-retreiving-and-rendering-geospatial) to access the Carto dataset with the marker information. Before manipulating it, we set up `latLngArr` to keep track of all the latitude and longitude pairs in the dataset so we can identify duplicates.

- We loop over each row in the dataset and grab the latitude and longitude as well as the marker name. We’ll use `latLngArr` to check if the latitude/longitude pair is a duplicate. If it’s not in the array, add it. If it’s already there, add a small number to the latitude value to avoid the markers sitting directly on top of one another. Next, we check the `markerArr` we made in `getImages()` and see if there’s a marker with the same name of the marker in the row we’re checking. If so, save that as `foundMarkerIcon`. We’ll create a marker object to put on the map, adding the icon we found and a placeholder for the rest of the data from the row. We’ll take all that data and assign it to the `marker.data` key (the marker needs to be instantiated before we can add `row` to `data`).

- Next we look at the dates. We convert the date that Carto pulls from the row we’re looking at and convert it to seconds. (We use seconds to normalize the dates of the markers and frontlines.) If our array of `dates` _doesn’t_ have the date of the row we’re checking, we add it to the array. We’re only pulling out unique dates — this array will be used for both markers and frontlines.

- Once `dates` is updated, we check whether `markersByDate` has the date in it. If not, add it and add the marker we’ve made to that date’s array of markers. Else, add the marker to the existing array of markers that matches the date we’re looking at.

- Finally we tell the OMS instance about each marker as we add it.

- Reference: [https://github.com/jawj/OverlappingMarkerSpiderfier-Leaflet](https://github.com/jawj/OverlappingMarkerSpiderfier-Leaflet)

### **Setup timeline in the map legend**

- Now that the markers are set up, we’ll sort the dates array and grab its length. Sorting accounts for whether the data in the dataset is not in the exact order we need. We use `dates` and that length to set up the timeline in the legend. `setUpTimeline` is a property on the `timeline` object, defined below.

### **Build the marker layer groups**

- For every array in the `markersByDate` object, create a `layerGroup` — remember every marker is its own layer. Take that `layerGroup` and add it to the `markerLayerGroups` array. We’re creating an array that has one layer group for each date. Add the first group to the map (see note above: `0` should be the oldest date).

### **Set up spiderfier event listeners**

- Reference: [https://github.com/jawj/OverlappingMarkerSpiderfier-Leaflet](https://github.com/jawj/OverlappingMarkerSpiderfier-Leaflet)

---

## Create and add front lines

Start with an empty `lineArr`. We’ll use `cartodb` to access the dataset containing the lines and for each row in the dataset ordered by date, normalize the date by putting it in seconds and then _add_ `dateInSec` as an additional property to the row. Convert the information in each row into `geojson` and then add it to the `lineArr`. Then add the first line in the array to the map.

---

## Functions to add/remove marker and layer groups at the same time

`addLayerGroup` and `removeLayerGroup` take `group` as an argument. `group` is the index of where the marker layer groups and lines are in their respective arrays. We find them and then add both to the map or remove both from the map.

---

## Popups, attribution, zoom position

Leaflet references for popups, attribution, and zoom:

- `popup` - [https://leafletjs.com/reference.html#popup](https://leafletjs.com/reference.html#popup)
- `attribution` - [https://leafletjs.com/reference.html#control-attribution](https://leafletjs.com/reference.html#control-attribution)
- `zoom` - [https://leafletjs.com/reference.html#control-zoom](https://leafletjs.com/reference.html#control-zoom)

---

## Legend timeline and play button

This section sets up the timeline that lives in the legend. It has a play button that lets the user see how the data changes over time. [It relies on the noUiSlider library](https://refreshless.com/nouislider/).

`timeline` is an object with several properties. The non-function properties are self-explanatory:

- `el`
- `controlBtn`
- `currentDateEl`
- `playing`
- `timer`
- `transitionDuration`
- `end`
- `start`
- `updateCurrentDate` (function)
- `onChange` (function)
- `formatDate` (function)
- `setupTimeline` (function)
- `setupBtnControls` (function)
- `stopTimeline` (function)

### updateCurrentDate

- Takes in the current date (current position) of the timeline and updates the text of the proper element.

### onChange

- Use [noUiSlider’s `get()` method](https://refreshless.com/nouislider/slider-read-write/) to grab the current slider value and update the current date.
- Close any open popups before the timeline starts playing.
- Get the index of the current date from the `dates` array that we created earlier — we need that index to add and remove layer groups. Remove layer groups that DONT have the current `dateIndex` and then ADD the layer groups that DO have the current `dateIndex`.
- Stop playing the timeline when it hits the last date and don’t restart it. This allows users to explore this data if they want to, instead of forcing them back to the beginning.

### formatDate

- Create an array of month names that we want to display to users. Take the current date in seconds and put it into UTC year, month, and date. Use that information to get `monthName year`.

### setupTimeline

- `setUpTimeline` is the function used above giving it a start at the very first date in `dates` and an end at the very last date in `dates`.
- First, run `setUpBtnControls()`.
- Next, create a `range` object to use in the creation of the slider. Loop over each date, knowing the first and last date are the start and end date of the slider. Set the first date to the minimum, the last date to the maximum, and for all other dates, get the percentage of where that date falls between the start and end dates. Pass that `percent:date` as `key:value` to the range object. This is used to place the date in the correct position on the timeline.

References:

- [https://math.stackexchange.com/questions/754130/find-what-percent-x-is-between-two-numbers](https://math.stackexchange.com/questions/754130/find-what-percent-x-is-between-two-numbers)
- [https://refreshless.com/nouislider/examples/#section-values](https://refreshless.com/nouislider/examples/#section-values)

Now we create the noUiSlider. Below are references that will be helpful:

- `behaviour` - [https://refreshless.com/nouislider/behaviour-option/](https://refreshless.com/nouislider/behaviour-option/)
- `format` - [https://refreshless.com/nouislider/number-formatting/](https://refreshless.com/nouislider/number-formatting/)
- `pips` - [https://refreshless.com/nouislider/pips](https://refreshless.com/nouislider/pips)
- `.set()` - [https://refreshless.com/nouislider/slider-read-write/](https://refreshless.com/nouislider/slider-read-write/)
- `.on(event)` - [https://refreshless.com/nouislider/events-callbacks/](https://refreshless.com/nouislider/events-callbacks/)

Make the pips that have values clickable and add an event listener that will set the slider value to the value of that pip. This lets the user click on the different dates and see the updated data. Use `toFormat` to format the pip labels.

### setupBtnControls

- Add an event listener to the play button. If the slider is at its last date, remove the map’s layers and set to start. If the timeline is playing, stop it.
- Get where the timeline currently is and increment it by 1. If it’s at the end, start over at 0. This lets user hit play again when the timeline stops. We need to call this function to get the current TL position before referencing it below, otherwise there’s an additional delay when the user hits play.
- Then set the transition intervals and change the button appearance from “play” to “pause” as needed.

### stopTimeline

- use `clearInterval` and set `playing` to false. Remove the “pause button” class and add the “play button” class. This is used when we set up the timeline and when the timeline reaches its last date.
