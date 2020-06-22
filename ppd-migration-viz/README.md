# Internet Penetration in China

A data visualization that shows the influx of internally displaced populations in Syria.

## To Run

1. Run `npm install` to install project dependencies
2. Run `npm start` to start local development server

## To Build

1. Run `npm build`

## To Update

- Data files should be placed in the `/src/data/` directory and follow the naming convention `YYYYMMDD-data.csv` where the date is the date the new data was added to the repo (eg. Data added on April 10, 2019 will named `20190410-data.csv`)
- The `dataSrc` path should be updated in `index.js`
- The category labels & threshold size per category can be updated in `/src/js/categories.js`
