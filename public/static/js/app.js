var robo = angular.module('robo', ['ngRoute', 'btford.socket-io']);

robo.factory('socket', function(socketFactory){
    return socketFactory({
        ioSocket: io.connect('http://localhost:8080')
    });
})

robo.config(function($routeProvider) {
    $routeProvider
    .when('/newtask', {
        templateUrl: 'static/partials/newtask.html',
        controller: 'roboController'
    })
    .when('/', {
        templateUrl: 'static/partials/newtask.html',
        controller: 'roboController'
    })
    .when('/report', {
        templateUrl: 'static/partials/report.html',
        controller: 'roboController'
    })
    .when('/history', {
        templateUrl: 'static/partials/history.html',
        controller: 'roboController'
    })
    .when('/slave', {
        templateUrl: 'static/partials/slave.html',
        controller: 'roboController'
    }).otherwise({
        redirectTo: '/'
    });
});

robo.service('roboService', function($http, $rootScope){
    this.startJob = function  (data) {
        var promiss = $http({
            url : '/job',
            method: 'POST',
            data:data
        }).then( function(response){
            console.dir(response)
            return response.data
        })
        return promiss
    }
})

robo.controller('roboController', function($scope, roboService, socket) { 
    $scope.newJob =  {method:"GET", url: "http://localhost:8000/", users:100}
    socket.emit('realTimeData', '')
    $scope.salesData=[
        {hour: 1,sales:1}
    ];
    $scope.rpsData=[
        {hour: 1,sales:1}
    ];
    $scope.allreadyAdded = {}
    var milliseconds = (new Date).getTime();
    socket.on('status', function(data){
       
        $scope.summary = data.summary

        angular.forEach(data.time_stamp, function(value, key) {

          if(!$scope.allreadyAdded[key]){
            $scope.allreadyAdded[key] = true
            // key = Math.floor(key)
            console.dir(value)
            // console.dir(key)
            $scope.salesData.push({hour: (key - milliseconds)/1000, sales:value.avg_response_time});
            $scope.rpsData.push({hour: (key - milliseconds )/1000, sales:value.requests});
          }
        });
    })
    socket.on('slave', function(data){
        console.dir(data)
        $scope.slaves = data
    })
    socket.on('history', function(data){
        console.dir(data)
        $scope.histories = data
    })
    $scope.submitNewJob = function(){
        roboService.startJob($scope.newJob).then(function(data){
            console.dir(data)
        })
    }
    $scope.size = function(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };
});


robo.directive('linearChart', function($parse, $window){
   return{
      restrict:'EA',
      template:"<svg width='450' height='200'></svg>",
       link: function(scope, elem, attrs){
           var exp = $parse(attrs.chartData);
           var color = attrs.chartColor


           var salesDataToPlot=exp(scope);
           var padding = 20;
           var pathClass="path";
           var xScale, yScale, xAxisGen, yAxisGen, lineFun;

           var d3 = $window.d3;
           var rawSvg=elem.find('svg');
           var svg = d3.select(rawSvg[0]);

           scope.$watchCollection(exp, function(newVal, oldVal){
               salesDataToPlot=newVal;
               redrawLineChart();
           });

           function setChartParameters(){

               xScale = d3.scale.linear()
                   .domain([salesDataToPlot[0].hour, salesDataToPlot[salesDataToPlot.length-1].hour])
                   .range([padding + 5, rawSvg.attr("width") - padding]);

               yScale = d3.scale.linear()
                   .domain([0, d3.max(salesDataToPlot, function (d) {
                       return d.sales;
                   })])
                   .range([rawSvg.attr("height") - padding, 0]);

               xAxisGen = d3.svg.axis()
                   .scale(xScale)
                   .orient("bottom")
                   .ticks(salesDataToPlot.length - 1);

               yAxisGen = d3.svg.axis()
                   .scale(yScale)
                   .orient("left")
                   .ticks(5);

               lineFun = d3.svg.line()
                   .x(function (d) {
                       return xScale(d.hour);
                   })
                   .y(function (d) {
                       return yScale(d.sales);
                   })
                   .interpolate("basis");
           }
         
         function drawLineChart(color) {

               setChartParameters();

               svg.append("svg:g")
                   .attr("class", "x axis")
                   .attr("transform", "translate(0,180)")
                   .call(xAxisGen);

               svg.append("svg:g")
                   .attr("class", "y axis")
                   .attr("transform", "translate(20,0)")
                   .call(yAxisGen);

               svg.append("svg:path")
                   .attr({
                       d: lineFun(salesDataToPlot),
                       "stroke": color,
                       "stroke-width": 2,
                       "fill": "none",
                       "class": pathClass
                   });
           }

           function redrawLineChart() {

               setChartParameters();

               svg.selectAll("g.y.axis").call(yAxisGen);

               svg.selectAll("g.x.axis").call(xAxisGen);

               svg.selectAll("."+pathClass)
                   .attr({
                       d: lineFun(salesDataToPlot)
                   });
           }

           drawLineChart(color);
       }
   };
});
