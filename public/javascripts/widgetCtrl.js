guiApp.controller('WidgetCtrl', function ($window, $scope, $http, $state, $timeout){

  console.log("hi");

  $scope.getURL = function(videoIndex) {
    // console.log(videoIndex);
    var url = "/api/video?id=" + videoIndex
    // console.log(url);

    $http({url: url, method: 'GET'})
    .success(function(data, status, headers, config) {
      console.log(data);
      $scope.videoUrl = data.videoUrl;
    })
    .error(function(data, status, headers, config) {
      if(status == 401){
      return;
      }
    })
  };

});

