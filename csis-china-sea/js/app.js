/**
 * South China Sea Incident Tracker
 * http://sevenmilemedia.com/
 *
 * Copyright 2016 CSIS | All Rights Reserved
 * Written by Nick Harbaugh - http://sevenmilemedia.com/
 */

(function($, _) {

    /* ==========================================================================
       Global variables
       ========================================================================== */

    var mobileWidth = 700,
        currentIndex = -1,
        winWidth = $(window).width(),
        isTouch = Modernizr.touch,
        isMobileWidth = (winWidth < mobileWidth) ? true : false,
        markersArray = [],
        settings = {
            minHeight : 600,
            speed : 350,
            easing : 'ease'
        };

    var options = {
        mapCenter: {
            lat: 16.2500,
            long: 111.7000
        },
        minZoom: 6,
        maxZoom: 6,
        autoZoomLevel: 6
    };

    var mapOptions = {
        center: new google.maps.LatLng(options.mapCenter.lat, options.mapCenter.long),
        zoom: options.minZoom,

        minZoom: options.minZoom,
        maxZoom: options.maxZoom,
        zoomControl: false,

        draggable: true,
        scrollwheel: false,
        scaleControl: false,
        panControl: false,
        navigationControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var mapStyle = [
        {
            "featureType": "landscape.natural.terrain",
            "elementType": "geometry.fill",
            "stylers": [
                { "visibility": "simplified" }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "labels",
            "stylers": [
                { "visibility": "off" }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [
                { "visibility": "on" }
            ]
        },
        {
            "featureType": "road",
            "stylers": [
                { "visibility": "off" }
            ]
        },
        {
            "featureType": "poi",
            "stylers": [
                { "visibility": "off" },
                { "saturation": -100 },
                { "lightness": -50 }
            ]
        },
        {
            "featureType": "transit",
            "stylers": [
                { "visibility": "off" }
            ]
        },
        {
            "featureType": "administrative",
            "stylers": [
                { "visibility": "off" }
            ]
        },
        {
            "featureType": "administrative.country",
            "elementType": "geometry.stroke",
            "stylers": [
                { "visibility": "off" },
                { "weight": 1 },
                { "color": "#E6EAEE" }
            ]
        },
        {
            "featureType": "administrative.province",
            "elementType": "geometry",
            "stylers": [
                { "visibility": "off" },
                { "color": "#E6EAEE" },
                { "weight": 1 }
            ]
        },
        {
            "featureType": "administrative",
            "stylers": [
                { "visibility": "off" }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [
                { "visibility": "off" }
            ]
        },
        {
            "featureType": "landscape.natural.terrain",
            "stylers": [
                { "visibility": "off" }
            ]
        },
        {
            "featureType": "landscape.natural",
            "elementType": "geometry",
            "stylers": [
                { "saturation": -100 },
                { "gamma": 0.30 },
                { "lightness": -70 }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                { "gamma": 0.79 },
                { "saturation": -100 },
                { "lightness": 70 }
            ]
        }
    ];

    /* ==========================================================================
       Initialize
       ========================================================================== */

    $(function() {
        initialize();
    });

    function initialize() {
        fetchData(initInteractive);
    }

    function initInteractive(scsData) {
        new ChinaSea(scsData);
    }

    function ChinaSea(data) {
        this.data = data.reverse();
        this.years = pluckYears(this.data); // Pluck years from data
        this.currentYear = this.years[0]; // Determine latest year
        this.currentData = pluckCurrent(this.data, this.currentYear); // Grab single year dataset
        this.create();
        this.updateYear(this.currentYear);
        this.initTimeline();
        this.initMap(mapStyle);
        enableKeyboardControl(this);

        // Init timeline with latest event
        this.updateEvent(this.currentData.length-1);
    }

    // Fetch data function uses Highcharts "data.js" module to fetch google spreadsheet data
    var fetchData = function(callbackInt, callbackMap) {
        var data = [];
        var scsData = Highcharts.data({

            googleSpreadsheetKey: '1ngkNOKulaflQM_c4XhuWLc1h2u0AfOKf1k1jC3wqHRo',

            // custom handler when the spreadsheet is parsed
            parsed: function (columns) {
                var rowCount = columns[0].length;

                // Add obj for each row, excluding header row
                for (var i = 0; i < rowCount; i++) {
                    var obj = {};
                    data.push(obj);
                }

                for (var i in columns) {
                    var column = columns[i];
                    var key = column[0];

                    for (var i = 0; i < rowCount; i++) {
                        data[i][key] = column[i];
                    }
                }

                // Pop header row off data
                data.shift();

                callbackInt(data);
            }
        });
    };


    /* ==========================================================================
       Event handlers
       ========================================================================== */

    var setEventHandlers = function(self) {
        // Timeline tick event handler
        $('.cs-timeline a').click(function(e) {
            e.preventDefault();
            var i = $(this).index('.cs-timeline a');
            self.updateEvent(i);
        });
        if (!isTouch) { $('.cs-timeline a').hover(function(e) { $(this).checkOverlap(e); }); }
    };

    var enableKeyboardControl = function(self) {
        $(document).keydown(function(e){
            if (e.keyCode == 39) {
                prevNextHandler(self, e.keyCode, $('<div></div>'));
                return false;
            }
            else if (e.keyCode == 37) {
                prevNextHandler(self, e.keyCode, $('<div></div>'));
                return false;
            }
        });
    };

    var prevNextHandler = function(self, keyCode, $this) {
        var isNext = ($this.hasClass('cs-timeline-next') || keyCode == 39) ? true : false;
        var lastIndex = self.currentData.length - 1;
        var activeIndex = $('.cs-timeline li.active').index('.cs-timeline li');
        var nextIndex = (activeIndex == lastIndex) ? 0 : activeIndex + 1;
        var prevIndex = (activeIndex == 0) ? lastIndex : activeIndex - 1;
        if (isNext) {
            self.updateEvent(nextIndex);
            updateTimelineDisplay(nextIndex);
        } else {
            self.updateEvent(prevIndex);
            updateTimelineDisplay(prevIndex);
        }
    };


    /* ==========================================================================
       Timeline setup
       ========================================================================== */

    var pluckYears = function(data) {
        var years = [];
        var y = _.pluck(data, 'year');
        years = _.uniq(y);
        return years.reverse();
    };

    var pluckCurrent = function(data, currentYear) {
        var items = [];
        for (var i in data) {
            if (data[i].year == currentYear) {
                items.push(data[i]);
            }
        }
        return items;
    };

    var parseDates = function(data, currentYear) {
        var parsed = [];
        var firstDate = parseInt(moment('1/1/'+currentYear).format('x'));
        var lastDate = parseInt(moment('12/31/'+currentYear).format('x')) - firstDate;

        for (var i in data) {
            var dp = {};
            var percentWidth = '';
            // parse date with moment.js using the formats specified below
            var startDate = data[i].date_start;
            var endDate = data[i].date_end;
            var startDateParsed = parseInt(moment(startDate).format('x'));
            
            var startDateCalc = startDateParsed - firstDate;
            var percentLeft = (startDateCalc / lastDate) * 100;

            // Check if end date exists and it's a special event
            if (endDate && data[i].special_event) {
                var endDateParsed = parseInt(moment(endDate).format('x'));
                var endDateCalc = endDateParsed - firstDate;
                var duration = endDateCalc - startDateCalc;
                percentWidth = (duration / lastDate) * 100;
            }

            function calcDateDispLong() {
                var dateDisp;
                if (endDate && data[i].special_event) {
                    var startMonth = moment(startDate).format('MMMM');
                    var startDay = moment(startDate).format('D');
                    var endMonth = moment(endDate).format('MMMM');
                    var endDay = moment(endDate).format('D');
                    var year = moment(startDate).format('YYYY');
                    if (startMonth !== endMonth) {
                        dateDisp = startMonth + ' ' + startDay + ' - ' + endMonth + ' ' + endDay + ', ' + year;
                    } else {
                        dateDisp = startMonth + ' ' + startDay + ' - ' + endDay + ', ' + year;
                    }
                } else {
                    dateDisp = moment(startDate).format('MMMM D, YYYY');
                }
                return dateDisp;
            }

            dp.datePosLeft = percentLeft;
            dp.dateWidth = percentWidth;
            dp.dateDispLong = calcDateDispLong();
            dp.dateDispShort = moment(startDate).format('MMM D');
            parsed.push(dp);
        }
        return parsed;
    };

    var positionDates = function(dates) {
        $('.cs-timeline li p').each(function(index, item) {
            var $item = $(item);
            var itemWidth = $item.width();
            var leftMargin = -1 * (itemWidth / 2) + 4;
            if (!$item.hasClass('cs-tick-special')) { $item.css('margin-left', leftMargin); } 
        });
    };




    /* ==========================================================================
       Google map
       ========================================================================== */

    var initMapStyle = function(map, mapStyle) {
        // setup map styles
        var mapStyle = new google.maps.StyledMapType(mapStyle, {map: map, name: 'default'});
        map.mapTypes.set('default', mapStyle);
        map.setMapTypeId('default');
    };

    var updateMap = function(map, latLong) {
        var xOffset = 300;
        var yOffset = 100;
        var coordLat = parseFloat(latLong[0].trim());
        var coordLong = parseFloat(latLong[1].trim());
        var coord = new google.maps.LatLng(coordLat,coordLong);
        placeMarker(map, coord);
        mapCustomCenter(map, coord, xOffset, yOffset);
    };

    var mapCustomCenter = function(map,latlng,offsetx,offsety) {
        var point1 = map.getProjection().fromLatLngToPoint(
            (latlng instanceof google.maps.LatLng) ? latlng : map.getCenter()
        );
        var point2 = new google.maps.Point(
            ( (typeof(offsetx) == 'number' ? offsetx : 0) / Math.pow(2, map.getZoom()) ) || 0,
            ( (typeof(offsety) == 'number' ? offsety : 0) / Math.pow(2, map.getZoom()) ) || 0
        );

        map.panTo(map.getProjection().fromPointToLatLng(new google.maps.Point(
            point1.x - point2.x,
            point1.y + point2.y
        )));
    };

    var placeMarker = function(map, coord) {
        // Delete current markers
        for (var i = 0; i < markersArray.length; i++) {
          markersArray[i].setMap(null);
          markersArray = [];
        }
        var marker = new google.maps.Marker({
            optimized: true, // prevents flicker on hover (false)
            position: coord,
            map: map,
            icon: new google.maps.MarkerImage('images/map-marker.png',
                new google.maps.Size(300,300), // Image size
                new google.maps.Point(0, 0), // Image origin
                new google.maps.Point(60, 60), // Anchor
                new google.maps.Size(120,120) // Scaled size
            )
        });
        markersArray.push(marker);
    };


    /* ==========================================================================
       Utility functions
       ========================================================================== */

    $.fn.checkOverlap = function(e) {
        var $ticks = $('.cs-timeline li');
        var p1 = $(this).find('p');
        var p2 = p2 = $('.cs-timeline li.active p');
        var o;

        // remove hidden class from all elements
        $ticks.find('p').removeClass('cs-hidden');

        // check for element overlap
        if (e && e.type !== 'mouseleave') {
            o = overlaps(p1, p2);
            if (o === true) {
                p2.addClass('cs-hidden');
            }
        }
    };

    var overlaps = (function () {
        function getPositions( elem ) {
            var pos, width, height;
            pos = $( elem ).offset(); // custom - offset instead of position
            width = $( elem ).textWidth(); // custom - textWidth instead of width
            height = $( elem ).height();
            return [ [ pos.left, pos.left + width ], [ pos.top, pos.top + height ] ];
        }

        function comparePositions( p1, p2 ) {
            var r1, r2;
            r1 = p1[0] < p2[0] ? p1 : p2;
            r2 = p1[0] < p2[0] ? p2 : p1;
            return r1[1] > r2[0] || r1[0] === r2[0];
        }

        return function ( a, b ) {
            var pos1 = getPositions( a ),
                pos2 = getPositions( b );
            return comparePositions( pos1[0], pos2[0] ) && comparePositions( pos1[1], pos2[1] );
        };
    })();

    $.fn.textWidth = function(){
        var html_org = $(this).html();
        var html_calc = '<span>' + html_org + '</span>';
        $(this).html(html_calc);
        var width = $(this).find('span:first').width()+10;
        $(this).html(html_org);
        return width;
    };

    function updateTimelineDisplay(index) {
        // Update active nav item
        $('.cs-timeline li').removeClass('active');
        $('.cs-timeline li').eq(index).addClass('active');
    }


    /* ==========================================================================
       China Sea constructor
       ========================================================================== */

    ChinaSea.prototype = {
        create : function() {
            var self = this;
            this.firstLoad = true;
            this.countryKey = {
                'CHN': {
                    'name': 'China',
                    'pos': 'China’s',
                    'adj': 'Chinese'
                },
                'IDN': {
                    'name': 'Indonesia',
                    'pos': 'Indonesia’s',
                    'adj': 'Indonesian'
                },
                'PHL': {
                    'name': 'Philippines',
                    'pos': 'Philippines’',
                    'adj': 'Philippine'
                },
                'THA': {
                    'name': 'Thailand',
                    'pos': 'Thailand’s',
                    'adj': 'Thai'
                },
                'TWN': {
                    'name': 'Taiwan',
                    'pos': 'Taiwan’s',
                    'adj': 'Taiwanese'
                },
                'VNM': {
                    'name': 'Vietnam',
                    'pos': 'Vietnam’s',
                    'adj': 'Vietnamese'
                },
                'MYS': {
                    'name': 'Malaysia',
                    'pos': 'Malaysia’s',
                    'adj': 'Malaysian'
                },
                'NATO': {
                    'name': 'NATO',
                    'pos': 'NATO’s',
                    'adj': 'NATO'
                },
                'UN': {
                    'name': 'United Nations',
                    'pos': 'United Nations’',
                    'adj': 'UN'
                },
                'FRA': {
                    'name': 'France',
                    'pos': 'France’s',
                    'adj': 'French'
                },
                'AUS': {
                    'name': 'Australia',
                    'pos': 'COUNTRY’s',
                    'adj': 'COUNTRY_ADJ'
                },
                'LKA': {
                    'name': 'Sri Lanka',
                    'pos': 'Sri Lanka’s',
                    'adj': 'Sri Lankan'
                },
                'SGP': {
                    'name': 'Singapore',
                    'pos': 'Singapore’s',
                    'adj': 'Singaporean'
                },
                'MMR': {
                    'name': 'Myanmar',
                    'pos': 'Myanmar’s',
                    'adj': 'Burmese'
                },
                'PRK': {
                    'name': 'North Korea',
                    'pos': 'North Korea’s',
                    'adj': 'North Korean'
                },
                'KOR': {
                    'name': 'South Korea',
                    'pos': 'South Korea’s',
                    'adj': 'South Korean'
                },
                'MDV': {
                    'name': 'Maldives',
                    'pos': 'Maldives’',
                    'adj': 'Maldivian'
                },
                'KHM': {
                    'name': 'Cambodia',
                    'pos': 'Cambodia’s',
                    'adj': 'Cambodian'
                },
                'BGD': {
                    'name': 'Bangladesh',
                    'pos': 'Bangladesh’s',
                    'adj': 'Bangladeshi'
                },
                'BRN': {
                    'name': 'Brunei',
                    'pos': 'Brunei’s',
                    'adj': 'Bruneian'
                },
                'IND': {
                    'name': 'India',
                    'pos': 'India’s',
                    'adj': 'Indian'
                },
                'USA': {
                    'name': 'United States',
                    'pos': 'United States’',
                    'adj': 'American'
                },
                'JPN': {
                    'name': 'Japan',
                    'pos': 'Japan’s',
                    'adj': 'Japanese'
                }
            };
            this.vesselKey = {
                'CG': {
                    'name': 'Maritime Law Enforcement Vessels',
                    'description': ''
                },
                'FV': {
                    'name': 'Fishing Vessels',
                    'description': ''
                },
                'NV': {
                    'name': 'Navy Vessels',
                    'description': ''
                },
                'MSV': {
                    'name': 'Marine Surveillance Vessels',
                    'description': ''
                },
                'UV': {
                    'name': 'Unknown Vessels',
                    'description': ''
                }
            };
            this.vesselIcons = {
                'CG': 'cg.svg',
                'FV': 'fv.svg',
                'NV': 'nv.svg',
                'MSV': 'msv.svg',
                'UV': 'uv.svg'
            };
            this.outcomeKey = {
                'HAR': {
                    'title': 'Harassment',
                    'description': 'Aggressive behavior directed at individuals or equipment',
                    'color': '#F2784B'
                },
                'SF': {
                    'title': 'Shots Fired',
                    'description': 'A firearm or a vessel’s armaments were fired',
                    'color': '#049372'
                },
                'RAM': {
                    'title': 'Ramming',
                    'description': 'A vessel was intentionally hit by another vessel',
                    'color': '#EF5A26'
                },
                'DTH': {
                    'title': 'Death',
                    'description': 'A person died as a result of the incident',
                    'color': '#EB1D25'
                },
                'WC': {
                    'title': 'Water Cannon',
                    'description': 'A water cannon was used',
                    'color': '#22A7F0'
                },
                'AR': {
                    'title': 'Arrest',
                    'description': 'An arrest occurred',
                    'color': '#F1BE2C'
                },
                'IMP': {
                    'title': 'Vessel Impounded',
                    'description': 'A vessel was impounded',
                    'color': '#D2D7D3'
                },
                'STO': {
                    'title': 'Standoff',
                    'description': 'A prolonged standoff occurred',
                    'color': '#3C948B'
                },
                'PST': {
                    'title': 'Official Protest',
                    'description': 'An official protest or inquiry was made about the incident',
                    'color': '#1A99AA'
                }
            };
            // create elements
            this.$navContainer = $('.cs-nav-container');
            this.$cardContainer = $('.cs-card-container');
            this.$mapContainer = $('.cs-map-container');
            // Timeline
            this.$timelineContainer = $('<div id="cs-timeline-container" class="cs-timeline-container"></div>');
            this.$timeline = $('<ul class="cs-timeline"></ul>');
            this.$timelineContainer.append(this.$timeline);
            // Event cards
            this.$card = $('<div id="cs-card" class="cs-card"></div>');
            this.cardTemplate = $('#cs-card-template').html();
            // Event navigation
            this.$chartHeader = $('<div class="cs-chart-header cs-align-left"><h3>South China Sea Incidents</h3></div>');
            this.$yearSelect = $('<div class="cs-dropdown">'+
                                    '<button id="dropdown-label" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
                                        'Dropdown trigger'+
                                        '<span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>'+
                                    '</button>'+
                                    '<ul class="dropdown-menu" aria-labelledby="dropdown-label"></ul>'+
                                '</div><div class="clearfix"></div>');
            this.$timelineNav = $('<div class="cs-timeline-nav cs-align-right"><a class="cs-timeline-prev" href="#"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>Previous</a><a class="cs-timeline-next" href="#">Next<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></a></div><div class="clearfix"></div>');
            
            // Build year dropdown
            var optionsMarkup = '';
            for (var i in this.years) {
                var selectedClass = (i == 0) ? 'selected' : ''; // Select first year by default
                var option = '<li class="'+selectedClass+'"><a href="#" data-year="'+this.years[i]+'">'+this.years[i]+'</a></li>';
                optionsMarkup += option;
            }
            this.$yearSelect.find('ul').html(optionsMarkup);
            this.$yearSelect.find('a').click(function(e) {
                e.preventDefault();
                $('.cs-dropdown li').removeClass('selected');
                $(this).parent().addClass('selected');
                var year = $(this).attr('data-year');
                self.updateYear(year);
                self.updateEvent(0); // Defaults to first event in the year
            });
            this.$chartHeader.append(this.$yearSelect);

            // Collect appends and append them
            var navAppends = [this.$chartHeader, this.$timelineNav, this.$timelineContainer];
            var cardAppends = [this.$card];
            this.$navContainer.append(navAppends);
            this.$cardContainer.append(cardAppends);

            // Init previous / Next button functionality
            this.$timelineNav.find('a').click(function(e) {
                e.preventDefault();
                prevNextHandler(self, 0, $(this));
            });
        },
        updateEvent : function(index) {
            var self = this;
            this.eventData = this.currentData[index];
            
            var outcome = [];
            var footer = {};
            var outcomeArray = (this.eventData.outcome) ? this.eventData.outcome.split(',') : '';
            var breakdown = (this.eventData.breakdown) ? this.eventData.breakdown.split(';;') : '';
            var sources = (this.eventData.sources) ? this.eventData.sources.split(';;') : '';
            var compileCardTemplate = _.template(this.cardTemplate);

            for (var i in outcomeArray) {
                var o = {};
                outcomeCode = outcomeArray[i].trim();
                o.code = outcomeCode;
                o.title = this.outcomeKey[outcomeCode].title;
                o.description = this.outcomeKey[outcomeCode].description;
                o.color = this.outcomeKey[outcomeCode].color;
                o.template = '<div class="popover cs-popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>';
                outcome.push(o);
            }

            // Create vessel objects
            var cv1 = this.calcVessels(this.eventData.cty_1_vessels, this.eventData.cty_1_hull_numbers, this.eventData.cty_1_tonnages, this.eventData.cty_1_ship_types);
            var cv2 = this.calcVessels(this.eventData.cty_2_vessels, this.eventData.cty_2_hull_numbers, this.eventData.cty_2_tonnages, this.eventData.cty_2_ship_types);

            // Create content for footer
            function calcSources(sources) {
                var sourcesMarkup = '<div class="popover cs-popover cs-sources-popover" role="tooltip">' +
                    '<div class="arrow"></div><h3 class="popover-title"></h3>'+
                    '<ul>';
                for (var i = 0; i < sources.length; i++) {
                    var li = '<li><a href="'+sources[i]+'" target="_blank">'+sources[i]+'</a></li>';
                    sourcesMarkup += li;
                }
                sourcesMarkup += '</ul></div>';
                return sourcesMarkup;
            }
            var methodologyTemplate = '<div class="popover cs-popover cs-methodology-popover" role="tooltip">' +
                    '<div class="arrow"></div><h3 class="popover-title"></h3>'+
                    '<p>This timeline identifies major maritime law enforcement incidents that have occurred in the South China Sea from 2010 to the present. Major incidents are defined as events where a state’s coast guard, navy (when acting in a law enforcement capacity), or other government agency used coercive measures beyond routine maritime law enforcement actions. These incidents may involve the use of firearms, rammings, water cannons, or other types of harassment. Cases where bodily injury or death occurred have also been included.</p><p>Many of the incidents on this timeline triggered a diplomatic protest. Official responses for these incidents are provided where available. Information regarding disputed information has also been noted.</p><p>Incidents were identified through a survey of open source media. The Center for the Study of Chinese Military Affairs at the National Defense University’s Institute for National Strategic Studies provided an initial dataset for this research. As such, this infographic may not represent all actual incidents that occurred during the selected timeframe.</p><p>This infographic will be updated regularly. Please feel free to contact us at <a href="mailto:chinapower@csis.org">chinapower@csis.org</a> with any questions or information you may have pertaining to these incidents.</p>'+
                '</div>';
            footer.methodologyTemplate = methodologyTemplate;
            footer.sourcesTemplate = calcSources(sources);

            // Compile card template
            var cardMarkup = compileCardTemplate({
                date: this.displayDates[index].dateDispLong,
                title: this.eventData.location,
                country_1: this.countryKey[this.eventData.cty_1],
                country_2: this.countryKey[this.eventData.cty_2],
                cty_1_vessels: cv1,
                cty_2_vessels: cv2,
                outcome: outcome,
                summary: this.eventData.summary,
                breakdown: breakdown,
                response_1: this.eventData.cty_1_response,
                response_2: this.eventData.cty_2_response,
                footer: footer
            });

            // Hide current card and remove active class
            this.$card.hide();
            this.$card.removeClass('cs-active-card');
            this.$card.html(cardMarkup);
            this.$card.show();
            // Timeout required for CSS animation
            setTimeout(function() {
                self.$card.addClass('cs-active-card');
            }, 50);

            // Update dropdown
            this.$yearSelect.find('#dropdown-label').html(self.currentYear+'<span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>');

            // Update timeline
            updateTimelineDisplay(index);

            // Init bootstrap popover (after removing current popovers)
            $('.cs-popover-trigger').popover('destroy');
            $('.cs-popover').remove();
            this.initPopover($('.cs-popover-trigger'));

            // Init perfect scrollbar plugin on desktop
            if (!isTouch) { $('.cs-card').perfectScrollbar({
                wheelPropagation: true
            }); }

            // Update map
            if (!this.firstLoad) { this.updateMapTest(this.map); }
        },
        updateMapTest : function() {
            this.coordinates = this.eventData.coordinates.split(',');
            updateMap(this.map, this.coordinates);
        },
        calcVessels : function(vesselString, hullNumberString, tonnageString, shipTypeString) {
            var vessels = [];
            var cv = vesselString.split(',');
            
            for (var i in cv) {
                var o = {};
                var v = cv[i].split('-');
                o.vesselType = v[0].trim(); // remove white space
                o.vesselName = this.vesselKey[o.vesselType].name;
                o.vesselDescription = this.vesselKey[o.vesselType].description;
                o.vesselStyle = 'cs-vessel-' + o.vesselType.toLowerCase();
                o.vesselCount = v[1].trim();
                // Check if hull numbers exist
                o.popoverTemplate = createPopoverTemplate(o);
                vessels.push(o);
            }
            
            function createPopoverTemplate(co) {
                // Default popover markup if we don't have hull numbers
                var popMarkup = '<div class="popover cs-popover cs-popover-empty" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3></div>';
                // Check if we have hull numbers
                if (hullNumberString) {
                    var hullNumbersClasses = hullNumberString.split(',');
                    var tonnageArray = (tonnageString + '').split(',');
                    var shipTypeArray = shipTypeString.split(',');
                    var hullNumberCount = hullNumbersClasses.length;
                    var hullNumbers = [];
                    for (var i = 0; i < hullNumberCount; i++) {
                        var o = {};
                        var hnc = hullNumbersClasses[i].trim().split('_');
                        o.vesselCategory = hnc[0];
                        o.hullNumber = hnc[1];
                        o.tonnage = tonnageArray[i].trim();
                        o.shipType = shipTypeArray[i].trim();
                        if (co.vesselType == o.vesselCategory) {
                            hullNumbers.push(o);
                        }
                    }
                    // Build popover template if we have hull numbers
                    if (hullNumbers.length > 0) {
                        popMarkup = '<div class="popover cs-popover" role="tooltip">' +
                            '<div class="arrow"></div><h3 class="popover-title"></h3>'+
                            '<table>'+
                                '<tr>'+
                                    '<th>Hull Number</th>'+
                                    '<th>Tonnage</th>'+
                                    '<th>Type</th>'+
                                '</tr>';
                        for (var i = 0; i < hullNumbers.length; i++) {
                            var row = '<tr>'+
                                '<td>'+hullNumbers[i].hullNumber+'</td>'+
                                '<td>'+hullNumbers[i].tonnage+'</td>'+
                                '<td>'+hullNumbers[i].shipType+'</td>'+
                            '</tr>';
                            popMarkup += row;
                        }
                        popMarkup += '</table></div>';
                    }
                }
                return popMarkup;
            }

            return vessels;
        },
        updateYear : function(year) {
            this.currentYear = year;
            this.currentData = pluckCurrent(this.data, this.currentYear);
            // Build timeline
            var timelineMarkup = '';
            // Parse dates for display
            this.displayDates = parseDates(this.currentData, this.currentYear);
            for (var i in this.currentData) {
                var widthAttr = (this.displayDates[i].dateWidth) ? 'width:'+this.displayDates[i].dateWidth+'%;' : '';
                var activeClass = (i == 0) ? 'active' : '';
                var tickTextClass = (this.currentData[i].special_event) ? 'cs-tick-special' : '';
                var m = '<li class="'+activeClass+'" style="left:'+this.displayDates[i].datePosLeft+'%;'+widthAttr+'">'+
                    '<a href="#" data-value="'+this.displayDates[i].dateDispShort+'">'+
                        '<p class="'+tickTextClass+'">'+this.displayDates[i].dateDispShort+'</p>'+
                        '<span></span>'+
                    '</a>'+
                '</li>';
                timelineMarkup += m;
            }
            this.$timeline.html(timelineMarkup);
            this.initTimeline();
        },
        initTimeline : function() {
            positionDates();
            setEventHandlers(this);
        },
        initMap : function(mapStyle) {
            var self = this;
            // init google map
            var mapCanvas = document.getElementById('map-canvas');
            this.map = new google.maps.Map(mapCanvas, mapOptions);

            // Update map on first load - wait for map to load
            google.maps.event.addListenerOnce(this.map, 'idle', function() {
                self.updateMapTest(self.map);
                self.firstLoad = false;
            });

            // google map customization
            initMapStyle(this.map, mapStyle);
        },
        initPopover : function($element) {
            var placement = (isMobileWidth) ? 'top' : 'auto right';
            $element.popover({
                container: 'body',
                placement: placement
            });
        }
    }

})(jQuery, _);