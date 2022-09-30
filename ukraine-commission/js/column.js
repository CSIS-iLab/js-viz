// Options for all charts: year colors, font
Highcharts.setOptions({
  colors: ["#edb21b", "#6dadd1", "#064265"],
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
    renderTo: "rank",
    type: "column",
    zoomType: "xy",
  },
  title: {
    text: "Corruption Perceptions Index: Rank",
    margin: 100,
  },
  credits: {
    enabled: true,
    href: false,
    text: "CSIS | Source: Transparency International",
  },
  xAxis: {
    categories: ["Ukraine", "Poland", "Czech Republic", "Romania"],
    crosshair: true,
  },
  yAxis: {
    min: 0,
    title: {
      text: "Rank",
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
    { name: "2015", data: [130, 26, 38, 58] },
    { name: "2018", data: [112, 42, 49, 66] },
    { name: "2021", data: [120, 36, 38, 61] },
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
  xAxis: {
    categories: ["Ukraine", "Poland", "Czech Republic", "Romania"],
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
    { name: "2015", data: [27, 63, 56, 46] },
    { name: "2018", data: [32, 56, 54, 45] },
    { name: "2021", data: [32, 60, 59, 47] },
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
  xAxis: {
    categories: ["Ukraine", "Poland", "Czech Republic", "Romania"],
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
    { name: "2015", data: [62, 93, 95, 83] },
    { name: "2018", data: [62, 85, 93, 83] },
    { name: "2021", data: [60, 82, 91, 83] },
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
