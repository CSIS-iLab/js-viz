$(function () {
  Highcharts.setOptions({
    lang: {
      decimalPoint: ".",
      thousandsSep: ",",
    },
  });
  $("#hcContainer").highcharts({
    data: {
      googleAPIKey: "AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg",
      googleSpreadsheetKey: "1kBnEawzDO8PXQr0MRjHvm-RfVb8CezN3TZXO13uDja0",
      googleSpreadsheetRange: "Triadic Patent Families",
    },
    chart: {
      type: "line",
      backgroundColor: "#FFF",
      border: "none",
      color: "#000",
      plotShadow: true,
    },
    credits: {
      enabled: true,
      href: "http://csis.org",
      text: "CSIS China Power Project | Source: OECD",
    },
    title: {
      text: "Triadic Patent Totals",
    },
    subtitle: {
      text: "From 1990 to 2011",
    },
    legend: {
      title: {
        text: 'Country<br/><span style="font-size: 9px; color: #666; font-weight: normal">(Click to hide)</span>',
        style: {
          fontStyle: "italic",
        },
      },
      align: "right",
      verticalAlign: "middle",
      layout: "vertical",
    },
    colors: [
      "#7ea5b2",
      "#303D43",
      "#907561",
      "#781F30",
      "#EC382A",
      "#61884D",
      "#d1e056",
    ],
    xAxis: {
      tickInterval: 1,
      tickmarkPlacement: "on",
    },
    yAxis: {
      title: {
        text: "National currency per US dollar",
      },
    },
    plotOptions: {
      line: {
        marker: {
          enabled: false,
          symbol: "circle",
        },
      },
    },
  });
});
