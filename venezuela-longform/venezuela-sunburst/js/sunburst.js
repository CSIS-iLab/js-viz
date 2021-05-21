var data = [
  {
    id: "0.0",
    parent: "",
    name: "Central Table",
    blurb:
      "Norwegian team facilitates dialogue between opposition and regime delegations focused on the broad goal of free, fair, and transparent presidential elections",
  },
  {
    id: "1.1",
    parent: "0.0",
    name: "The Room Next Door",
    blurb:
      "International table comprised of UN ambassadors or other delegates from various countries, including the United States, Lima Group countries, the European Union, Mexico, Panama, Argentina, Russia, Cuba, and China, all available for consultation with the Norwegian delegation. Possibly presence of multilateral organizations such as the United Nations and OAS.",
  },
  {
    id: "1.2",
    parent: "0.0",
    name: "Civil Society Consultation Tables",
    blurb:
      "Advisory group comprised of a diverse set of civil society leaders that has a direct and impartial channel of communication with both the central negotiating table and parallel tables. Could include human rights defenders, environmental activists, humanitarian relief workers, student leaders, and Indigenous representatives, among others. ",
    value: 100,
  },
  {
    id: "2.1",
    parent: "1.1",
    name: "Humanitarian Relief",
    blurb:
      "Specialized delegations from the opposition and the regime negotiate potential short-term trust-building partial agreements aimed at opening channels for humanitarian aid. Mediated by an international organization or an impartial country.",
    value: 25,
  },
  {
    id: "2.2",
    parent: "1.1",
    name: "Public Health and Covid Vaccines",
    blurb:
      "Specialized delegations from the opposition and the regime negotiate short-term trust-building partial agreements aimed at  acquiring and distributing Covid-19 vaccines, personal protective equipment, and medicine. Mediated by Pan American Health Organization or other international organizations.",
    value: 25,
  },
  {
    id: "2.3",
    parent: "1.1",
    name: "Illegal Mining",
    blurb:
      "Specialized delegations from the opposition and the regime negotiate short-term trust-building partial agreements aimed at halting the illegal mining crisis in southern Venezuela and preventing further environmental devastation. Potential mediators include the United Nations or countries such as Costa Rica and Finland.",
    value: 25,
  },
  {
    id: "2.4",
    parent: "1.1",
    name: "Human Rights and Political Prisoners",
    blurb:
      "Specialized delegations from the opposition and the regime negotiate short-term trust-building partial agreements aimed at securing the release of political prisoners and opening access to continued investigations into the regime's human rights violations. Mediated by UN Human Rights Council or the Inter-American Commission on Human Rights.",
    value: 25,
  },
];

Highcharts.chart("hcContainer", {
  series: [
    {
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
    text: "The Negotiating Table",
  },
  // Credits
  credits: {
    enabled: true,
    href: false,
    text: "",
  },
  tooltip: {
    useHTML: true,
    headerFormat: "",
    formatter: function () {
      return `<b>${this.key}:</b> ${this.point.blurb}`;
    }
  },
  // Chart Legend
  legend: {
    enabled: false,
  },
});
