# CSIS China View

China View interactive data visualization. Designed and developed by Nick Harbaugh [http://sevenmilemedia.com/]

## Documentation

A few notes about the code.

- Dependencies: jQuery 1.12.0
- All CSS selectors use the prefix "aq-"
- A default "normalize.css" file was included. This can be removed or swapped out for the CSIS style reset
- The "#container" element is temporary and can be removed in production along with the corresponding style rules
- The JSON data contains a duplicate of the Shanghai dataset (labeled "shanghaiInit") to initialize the chart - this was added to fix a strange Highcharts bug that I ran out of time trying to solve
