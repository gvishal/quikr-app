
robo.controller('newtaskController', ['$scope','postfactory',function($scope,postfactory) 
      { 
                  $scope.url = postfactory.query();
                  

           
      }]);
