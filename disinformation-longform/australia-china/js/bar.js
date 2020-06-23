// Data gathered from http://populationpyramid.net/germany/2015/

// Age categories
var categories

Highcharts.chart("hcContainer", {
    data: {
        googleSpreadsheetKey: "1uf6yWzyUSU_-oQ85lK3695iQbWL_YbcmWB00PnZvxlA",
        googleSpreadsheetWorksheet: 3
    },
    chart: {
        type: "bar",
    },
    title: {
        text: "Australia's Ratings of China",
    },
    subtitle: {
        text: "",
    },
    credits: {
        enabled: true,
        href: false,
        text: "CSIS | Source: PEW",
    },
    xAxis: [{
            categories: categories,
            reversed: true,
            tickInterval: 1,
        },
        {
            // mirror axis on right side
            opposite: true,
            categories: categories,
            linkedTo: 0
        },
    ],
    yAxis: {
        title: "",
        min: -100,
        max: 100,
        labels: {
            formatter: function () {
                return Math.abs(this.value) + "%";
            },
        }
    },

    plotOptions: {
        series: {
            stacking: "normal",
        },
    },

    tooltip: {
        formatter: function () {
            return (
                "<b>" +
                this.series.name + ", " +
                this.point.category +
                "</b><br/>" +
                Highcharts.numberFormat(Math.abs(this.point.y), 1) +
                "%"
            );
        },
    },
});