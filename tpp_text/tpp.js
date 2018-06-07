
Highcharts.chart('container', {
    chart: {
        type: 'bar',
        height: 500
    },
    colors: ['#283B53', '#669DA1'],
    title: {
        text: 'TPP Text, before and after'
    },
    subtitle: {
        text: 'Percent of text found in other US FTAs and percent suspended in the CPTPP, by chapter'
    },
    xAxis: {
        categories: [
'TPP Average',
'Investment',
'Financial Services',
'General Services',
'Telecommunications',
'Safeguards',
'Intellectual property',
'Dispute Settlement',
'Technical barriers to trade',
'Labor',
'Sanitary'],
        title: {
            text: null
        }
    },
    yAxis: {
        min: 0,

        labels: {
            overflow: 'justify'
        },
        title:{
        text:null
        }
    },
    tooltip: {
        valueSuffix: '%'
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
        layout: 'horizontal',
        align: 'center',
        borderWidth: 1,
        backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
        shadow: true
    },
    credits: {
        enabled: true,
        text:'<a href="http://journals.sagepub.com/doi/pdf/10.1177/2053168016658919">Allee & Lugg 2016</a> | CPTPP text | TPP text'
    },
    series: [{
        name: 'Similarity',
        data: [45, 80, 68, 62, 58, 47, 45, 39, 36, 32, 32]
    }, {
        name: 'Cut',
        data: [2.308, 14.498, 1.488, 0, 2.05, 0, 25.66, 0, 0, 0, 0]
    }]
});
