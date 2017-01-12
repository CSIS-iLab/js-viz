# Global Migration Data Sheet 2013
Unique estimates of migration flows between the top 50 sending and receiving countries.

http://www.global-migration.info/

## Installation
```javascript
npm install
```

## Getting Started
Start a server:
```javascript
npm start
```

## Development
Lint and compile the project:
```javascript
grunt
```

For development you can compile a small excerpt using the `--sample` switch:
```javascript
grunt --sample
```

## Changing Number of Regions or Countries
- Number of regions is pulled from `data.csv` file automatically
  - Update `countries.csv` to make sure that only countries with regions are shown, otherwise there will be a blank gap in the chart

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style.
Lint your code using [Grunt](http://gruntjs.com/).

## License
Copyright (c) 2013 null2 GmbH Berlin  
This work is licensed under a [Creative Commons Attribution-NonCommercial 3.0 Unported License](http://creativecommons.org/licenses/by-nc/3.0/).
