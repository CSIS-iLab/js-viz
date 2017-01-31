angular.module('app', []);

angular.module('app').controller('mainCntrl', ['$scope', 
function ($scope) {

  // MASTER DATA STORED BY CATEGORY, YEAR
  $scope.master = {
    "all": {},
    "vegetables": {},
    "animals": {},
    "food products": {}
  };

  // YEARS
  $scope.selected_year = 2014;
  $scope.start_year = 2004;
  $scope.end_year = 2014;
  $scope.years = d3.range($scope.end_year, $scope.start_year, -1);

  // CATEGORIES
  $scope.categories = [
    {id: "all", text: "All", tooltip: "All Food Product"},
    {id: "animals", text: "Animals", tooltip: "Animal Product"},
    {id: "vegetables", text: "Vegetables", tooltip: "Vegetable Product"},
    {id: "food products", text: "Food Products", tooltip: "Other Food Product"}
  ];
  $scope.selected_category = $scope.categories[2];

  // FILTERS
  $scope.filters = {};
  $scope.hasFilters = false;

  // TOOLTIP
  $scope.tooltip = {};

  // FORMATS USED IN TOOLTIP TEMPLATE IN HTML
  $scope.pFormat = d3.format(".1%");  // PERCENT FORMAT
  $scope.qFormat = d3.format(".2"); // COMMAS FOR LARGE NUMBERS

  $scope.updateTooltip = function (data) {
    $scope.tooltip = data;
    $scope.$apply();
  }

  $scope.addFilter = function (name) {
    $scope.hasFilters = true;
    $scope.filters[name] = {
      name: name,
      hide: true
    };
    $scope.$apply();
  };

  $scope.update = function () {
    var data = $scope.master[$scope.selected_category.id][$scope.selected_year];

    if (data && $scope.hasFilters) {
      $scope.drawChords(data.filter(function (d) {
        var fl = $scope.filters;
        var v1 = d.importer1, v2 = d.importer2;

        if ((fl[v1] && fl[v1].hide) || (fl[v2] && fl[v2].hide)) {
          return false;
        }
        return true;
      }));
    } else if (data) {
      $scope.drawChords(data);
    }
  };

  // IMPORT THE CSV DATA
  d3.csv('data/final_revised.csv', function (err, data) {
    
    data.forEach(function (d) {
      d.category = d.category;
      d.year  = +d.year;
      d.flow1 = +d.flow1;
      d.flow2 = +d.flow2;

      if (!$scope.master[d.category][d.year]) {
        $scope.master[d.category][d.year] = []; // STORED BY CATEGORY, YEAR
      }
      $scope.master[d.category][d.year].push(d);
    });
    $scope.update();
  });

  $scope.$watch('selected_year', $scope.update);
  $scope.$watch('selected_category', $scope.update);
  $scope.$watch('filters', $scope.update, true);

}]);