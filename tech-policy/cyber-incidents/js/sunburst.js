$(function() {

  var data = {}

  Highcharts.data({
    googleSpreadsheetKey: '1ckTFN3Q01BWmzwq3D2Ox9cCw1Zbguu9tY1UTC7BXF7A',
      googleSpreadsheetWorksheet: 1,
      switchRowsAndColumns: true,
      parsed: function(columns) {
        $.each(columns, function (i, code) {
          if ( i == 0 ) {
            return
          }

          var type = code[0]
          var attacker = code[1]
          var victim = code[2]
          var description = code[3]
          var dateString = code[4]

          data[type] = data[type] || {}
          data[type][attacker] = data[type][attacker] || {}

          data[type][attacker][victim] = data[type][attacker][victim] || {
              id: slugify([type, attacker, victim]),
              parent: slugify([type, attacker]),
              name: victim,
              value: 0,
              level: 3,
              attacker: attacker,
              type: type,
              dates: []
          }
          data[type][attacker][victim].value += 1
          var dateParts = dateString.split('-')
          var date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2])
          date = date.toLocaleString('en-us', {month: "long", year: 'numeric'})
          data[type][attacker][victim].dates.push(date)
        })

        // Convert object to array - we no longer need the keys
        let types = [{
          id: '0',
          parent: '',
          name: 'Incident<br/>Class'
        }]
        var dataArray = $.map(data, function(attackers, type) {
          types.push({
            id: type.toLowerCase(),
            parent: '0',
            name: type,
            level: 1
          })
          let array = []
          var attackersArray = $.map(attackers, function(victims, attacker) {
            let victimsArray = Object.values(victims)
            array.push({
              id: slugify([type, attacker]),
              parent: type.toLowerCase(),
              name: attacker,
              level: 2,
              type: type,
              targets: victimsArray.length
            })
            return victimsArray.sort((a, b) => b.value - a.value)
          })
          return array.concat(attackersArray);
        });

        dataArray = types.concat(dataArray)

        renderChart(dataArray)
      }
  })

  function renderChart(data) {
    $('#hcContainer').highcharts({
      chart: {
        height: '100%',
        style: {
          fontFamily: 'Montserrat, sans-serif',
        },
      },
      colors: ['#ffffff', '#104547', '#75986a', '#005489', '#3F3F37', '#3e7a82', '#4b5255'],
      title: {
        text: 'Significant Cyber Incidents: Attackers and Victims'
      },
      subtitle: {
        text: 'Click on a wedge to see a breakdown of its components.'
      },
      credits: {
        enabled: true,
        href: false,
        text: "CSIS Technology Policy | Cybersecurity & Governance"
      },
      series: data,
      tooltip: {
        useHTML: true,
        formatter: function () {
          if ( this.point.level === 1 ) {
            return `# ${this.point.name} Incidents: <b>${this.point.value}</b>`;
          } else if ( this.point.level === 2 ) {
            return `
            Attacker: <b>${this.point.name}</b><br />
            # ${this.point.type} Incidents: <b>${this.point.value}</b><br />
            # of Targets: <b>${this.point.targets}</b>`;
          } else if ( this.point.level === 3 ) {
            const datesArray = this.point.dates
            var dates = '';
            $.each(datesArray, function(i, date) {
              var suffix = ', ';

              if ( i == (datesArray.length - 1)) {
                suffix = ''
              } else if ( i % 2 == 0 ) {
                suffix = ',<br />'
              }
              dates += date + suffix
            })

            return `
              Target: <b>${this.point.name}</b><br />
              Attacker: <b>${this.point.attacker}</b><br />
              # ${this.point.type} Incidents: <b>${this.point.value}</b><br />
              Incident Dates: ${dates}
            `;
          } else {
            return `Total # Incidents: <b>${this.point.value}</b>`;
          }
        }
      },    
      // Additional Plot Options
      plotOptions: {
        series: {
          colors: ['#CC5414', '#DCAC97', '#FFED91']
        }
      },
      series: [{
        type: "sunburst",
        borderWidth: 0.3,
        data: data,
        allowDrillToNode: true,
        cursor: 'pointer',
        dataLabels: {
          format: '{point.name}',
          style: {
            textOutline: 0
          },
          filter: {
            property: 'innerArcLength',
            operator: '>',
            value: 24
          }
        },
        levels: [{
          level: 1,
          levelIsConstant: false,
          levelSize: {
            unit: 'percentage',
            value: 14.5
          },
          dataLabels: {
            rotationMode: 'parallel',
            filter: {
              property: 'outerArcLength',
              operator: '>',
              value: 64
            }
          }
        }, {
          level: 2,
          levelIsConstant: true,
          levelSize: {
            unit: 'percentage',
            value: 40
          },
          colorByPoint: true,
          dataLabels: {
            rotationMode: 'parallel'
          }
        },
        {
          level: 3,
          colorVariation: {
            key: 'brightness',
            to: -0.5
          }
        }, {
          level: 4,
          colorVariation: {
            key: 'brightness',
            to: 0.5
          }
        }]
      }]
    });
  }

  function slugify(words) {
    var slug = ''
    $.each(words, function(i, word) {
      var prefix = '-'
      if ( i == 0 ) { prefix = '' }
      slug += prefix + word
    })
    slug = slug.replace(/\s+/g, '-').toLowerCase();
    return slug
  }
});
