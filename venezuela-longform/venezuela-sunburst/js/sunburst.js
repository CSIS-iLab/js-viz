var data = [
  {
    id: "0.0",
    parent: "",
    name: "Central Table",
    blurb:
      "Norwegian team facilitates dialogue between opposition and regime delegations focused on macro-goal of free, fair, and transparent presidential elections",
  },
  {
    id: "1.1",
    parent: "0.0",
    name: "The Room Next Door",
    blurb:
      "International table comprised of UN Ambassadors or other delegates from various countries, including the United States, Lima Group countries, the EU, Mexico, Panama, Argentina, Russia, Cuba, and China, all available for consultation with the Norwegian delegation. Possibly presence of multilateral organizations such as the UN and OAS.",
  },
  {
    id: "1.2",
    parent: "0.0",
    name: "Civil Society Consultation Tables",
    blurb:
      "Advisory group comprised of a diverse set of civil society leaders that has a direct and impartial channel of communication with both the central negotiating table and parallel tables. Could include human rights defenders, environmental activists, humanitarian relief workers, student leaders, and indigenous representatives, among others. ",
    value: 100,
  },
  {
    id: "2.1",
    parent: "1.1",
    name: "Humanitarian Relief",
    blurb:
      "Specialized delegations from the opposition and the regime negotiate potential short-term trust-building partial agreements aimed at opening channels for humanitarian aid. Mediated by an international organizatio or an impartial country.",
    value: 25,
  },
  {
    id: "2.2",
    parent: "1.1",
    name: "Public Health & Covid Vaccines",
    blurb:
      "Specialized delegations from the opposition and the regime negotiate short-term trust-building partial agreements aimed at  acquiring and distributing Covid-19 vaccines, personal protective equipment, and medicine. Mediated by PAHO or other international organization.",
    value: 25,
  },
  {
    id: "2.3",
    parent: "1.1",
    name: "Illegal Mining",
    blurb:
      "Specialized delegations from the opposition and the regime negotiate short-term trust-building partial agreements aimed at halting the illegal mining crisis in southern Venezuela and preventing further environmental devastation. Potential mediators include the UN or countries such as Costa Rica or Finland.",
    value: 25,
  },
  {
    id: "2.4",
    parent: "1.1",
    name: "Human Rights & Political Prisoners",
    blurb:
      "Specialized delegations from the opposition and the regime negotiate short-term trust-building partial agreements aimed at securing the release of political prisoners and opening access to continued investigations into the regime's human rights violations. Mediated by UNHRC or IACHR.",
    value: 25,
  },
];

// Highcharts.chart('hcContainer', {
//   chart: {
//       height: '50%'
//   },

//   title: {
//       text: 'World population 2017'
//   },
//   subtitle: {
//       text: 'Source <a href="https://en.wikipedia.org/wiki/List_of_countries_by_population_(United_Nations)">Wikipedia</a>'
//   },
//   series: [{
//       type: 'sunburst',
//       data: data,
//       cursor: 'pointer',
//       dataLabels: {
//         rotationMode: 'circular'
//       }
//   }],
//   color: {
//     rotation: 360
//   },
//   tooltip: {
//       headerFormat: '',
//       pointFormat: '{point.blurb}'
//   }
// });

Highcharts.chart("hcContainer", {
  // Load Data in from Google Sheets
  series: [
    {
      // type: 'sunburst',
      data: data,
      cursor: 'pointer',
      dataLabels: {
        rotationMode: "circular",
        color:"white",
        style: {
          textOutline: "0px",
        }
      },
      levels: [
        {
          level: 1,
          levelIsConstant: false,
        },
        {
          level: 2,
          colorByPoint: true,
          rotation: 360,
        },
        {
          level: 3,
          colorByPoint: true,
          rotation: 180,
        },
      ],
    },
  ],
  colors: ["#45818E", "#A4C2F4", "#D5A6BD", "#6AA84F", "#93C47D", "#B6D7A8", "#D9EAD3"],
  // General Chart Options
  chart: {
    type: "sunburst",
    height: "40%"
  },
  // Chart Title and Subtitle
  title: {
    text: "Interactive Title",
  },
  subtitle: {
    text: "Click and drag to zoom in",
  },
  // Credits
  credits: {
    enabled: true,
    href: false,
    text: "CSIS Project Name | Source: NAME",
  },
  tooltip: {
    useHTML: true,
    headerFormat: "",
    pointFormat: "{point.blurb}",
  },
  // Chart Legend
  legend: {
    title: {
      text:
        'Legend Title<br/><span style="font-size: 12px; color: #808080; font-weight: normal">(Click to hide)</span>',
    },
    align: "center",
    verticalAlign: "bottom",
    layout: "horizontal",
  },
  // Additional Plot Options
  // plotOptions:
  // {
  // }
});
