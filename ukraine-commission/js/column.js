// Options for all charts: year colors, font
Highcharts.setOptions({
  colors: ["#edb21b", "#6dadd1", "#064265", "#6B806F"],
  chart: {
    style: {
      fontFamily: "'Source Sans Pro', sans-serif",
    },
  },
});

/*----Three Charts----*/
// Corruption Perceptions Index: Score
var rank = Highcharts.chart("rank", {
  chart: {
    type: "scatter",
    zoomType: "xy",
  },
  title: {
    text: "Corruption Perceptions Index: Rank",
    margin: 75,
  },
  credits: {
    enabled: true,
    href: false,
    text: "CSIS | Source: Transparency International",
  },
  subtitle: {
    text: "Highest possible rank: 1",
  },
  xAxis: {
    title: {
      enabled: true,
      text: "Year",
    },
    startOnTick: true,
    endOnTick: true,
    showLastLabel: true,
    tickPositions: [2015, 2018, 2021],
  },
  yAxis: {
    title: {
      text: "Rank",
    },
    reversed: true,
    tickPositions: [1, 25, 50, 75, 100, 125, 150],
    startOnTick: true,
  },
  plotOptions: {
    scatter: {
      marker: {
        radius: 5,
        states: {
          hover: {
            enabled: true,
            lineColor: "rgb(100,100,100)",
          },
        },
        symbol: "circle",
      },
      states: {
        hover: {
          marker: {
            enabled: false,
          },
        },
      },
      tooltip: {
        headerFormat: "<b>{series.name}</b><br>",
        pointFormat: "{point.x} Ranking: {point.y}/{point.outOf}",
      },
    },
  },
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 600,
        },
        // Make the labels less space demanding on mobile
        chartOptions: {
          legend: {
            y: -8,
          },
          credits: {
            position: {
              y: -15,
            },
            text: "CSIS | Source: Transparency International",
          },
        },
      },
    ],
  },
  series: [
    {
      name: "Ukraine",
      color: "#EDB21B",
      data: [
        { x: 2015, y: 130, outOf: 168 },
        { x: 2018, y: 112, outOf: 180 },
        { x: 2021, y: 120, outOf: 180 },
      ],
    },
    {
      name: "Poland",
      color: "#6DADD1",
      data: [
        { x: 2015, y: 26, outOf: 168 },
        { x: 2018, y: 42, outOf: 180 },
        { x: 2021, y: 36, outOf: 180 },
      ],
    },
    {
      name: "Czech Republic",
      color: "#064265",
      data: [
        { x: 2015, y: 38, outOf: 168 },
        { x: 2018, y: 49, outOf: 180 },
        { x: 2021, y: 38, outOf: 180 },
      ],
    },
    {
      name: "Romania",
      color: "#6B806F",
      data: [
        { x: 2015, y: 58, outOf: 168 },
        { x: 2018, y: 66, outOf: 180 },
        { x: 2021, y: 61, outOf: 180 },
      ],
    },
  ],
});

// Corruption Perceptions Index: Rank
var score = Highcharts.chart("score", {
  chart: {
    renderTo: "score",
    type: "column",
    zoomType: "xy",
  },
  title: {
    text: "Corruption Perceptions Index: Score",
    margin: 100,
  },
  credits: {
    enabled: true,
    href: false,
    text: "CSIS | Source: Transparency International",
  },
  subtitle: {
    text: "Best possible score: 100",
  },
  xAxis: {
    categories: ["2015", "2018", "2021"],
    crosshair: true,
  },
  yAxis: {
    min: 0,
    max: 100,
    title: {
      text: "Score",
    },
  },
  tooltip: {
    headerFormat: '<span style="font-size:14px">{point.key}</span><br>',
    shared: true,
    useHTML: true,
    style: {
      lineHeight: "21px",
    },
  },
  legend: {
    itemStyle: {
      color: "#000",
      opacity: 0.5,
    },
  },
  plotOptions: {
    column: {
      pointPadding: 0.2,
      borderWidth: 0,
    },
  },
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 600,
        },
        // Make the labels less space demanding on mobile
        chartOptions: {
          legend: {
            y: -8,
          },
          credits: {
            position: {
              y: -15,
            },
            text: "CSIS | Source: Transparency International",
          },
        },
      },
    ],
  },
  series: [
    { name: "Ukraine", data: [27, 32, 32] },
    { name: "Poland", data: [63, 56, 60] },
    { name: "Czech Republic", data: [56, 54, 59] },
    { name: "Romania", data: [46, 45, 47] },
  ],
});
// Freedom House Score
var freedom = Highcharts.chart("freedom", {
  chart: {
    renderTo: "freedom",
    type: "column",
    zoomType: "xy",
  },
  title: {
    text: "Freedom House Score",
    margin: 100,
  },
  credits: {
    enabled: true,
    href: false,
    text: "CSIS | Source: Freedom House",
  },
  subtitle: {
    text: "Best possible score: 100",
  },
  xAxis: {
    categories: ["2015", "2018", "2021"],
    crosshair: true,
  },
  yAxis: {
    min: 0,
    title: {
      text: "Score",
    },
  },
  tooltip: {
    headerFormat: '<span style="font-size:14px">{point.key}</span><br>',
    shared: true,
    useHTML: true,
    style: {
      lineHeight: "21px",
    },
  },
  legend: {
    itemStyle: {
      color: "#000",
      opacity: 0.5,
    },
  },
  plotOptions: {
    column: {
      pointPadding: 0.2,
      borderWidth: 0,
    },
  },
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 600,
        },
        // Make the labels less space demanding on mobile
        chartOptions: {
          legend: {
            y: -8,
          },
          credits: {
            position: {
              y: -15,
            },
            text: "CSIS | Source: Freedom House",
          },
        },
      },
    ],
  },
  series: [
    { name: "Ukraine", data: [62, 62, 60] },
    { name: "Poland", data: [93, 85, 82] },
    { name: "Czech Republic", data: [95, 93, 91] },
    { name: "Romania", data: [83, 83, 83] },
  ],
});

/*----Select buttons and their container to add event listeners----*/
const btnTransparency = document.getElementById("transparency");
const btnFreedomHouse = document.getElementById("freedomHouse");
const btnScore = document.getElementById("corruptionScore");
const btnRank = document.getElementById("corruptionRank");
const btnContainer = document.getElementById("btnContainer");

/*----Select charts to add event listeners----*/
var rank = document.getElementById("rank");
var score = document.getElementById("score");
var freedom = document.getElementById("freedom");

/*----Add event listeners----*/
// Transparency International Button
btnTransparency.addEventListener("click", function () {
  /********Deal with Buttons********/
  // remove Transparency Int'l button
  // make Freedom House button background transparent
  btnTransparency.remove();
  btnFreedomHouse.classList.remove("is-selected");

  // make Score and Rank buttons visible
  // make "Rank" button blue
  btnScore.classList.remove("is-inactive");
  btnRank.classList.remove("is-inactive");
  btnRank.classList.add("is-selected");

  // move Rank and Score in front of Freedom House button
  // adjust container `left` to account for extra buttons
  btnContainer.prepend(btnScore);
  btnContainer.prepend(btnRank);
  btnContainer.classList.add("transparency");

  /********Deal with Charts********/
  rank.classList.add("is-active");
  freedom.classList.remove("is-active");
});
// Freedom House Button
btnFreedomHouse.addEventListener("click", function () {
  /********Deal with Buttons********/
  // rake Freedom House button blue
  btnFreedomHouse.classList.add("is-selected");

  // remove `Rank` and `Score` buttons
  btnScore.remove();
  btnRank.remove();

  // remove selected state from Rank and Score buttons
  btnScore.classList.remove("is-selected");
  btnRank.classList.remove("is-selected");

  // add Transparency Int'l button back in
  btnContainer.prepend(btnTransparency);

  // adjust container 'left' to account for fewer buttons
  btnContainer.classList.remove("transparency");
  btnContainer.classList.add("freedom");

  /********Deal with Charts********/
  score.classList.remove("is-active");
  rank.classList.remove("is-active");
  freedom.classList.add("is-active");
});
// Score button
btnScore.addEventListener("click", function () {
  btnScore.classList.add("is-selected");
  btnRank.classList.remove("is-selected");
  btnFreedomHouse.classList.remove("is-selected");
  score.classList.add("is-active");
  rank.classList.remove("is-active");
});
// Rank button
btnRank.addEventListener("click", function () {
  btnScore.classList.remove("is-selected");
  btnRank.classList.add("is-selected");
  btnFreedomHouse.classList.remove("is-selected");
  rank.classList.add("is-active");
  score.classList.remove("is-active");
});
