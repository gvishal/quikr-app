quickDrop.controller('DashboardCtrl', function ($window, $scope, $http, $state, $timeout, ngDialog){

  console.log("hi");

  // ngDialog Box
  $scope.openVideoBox = function (videoIndex) {
    
    var callback = function() {
      ngDialog.open({
        template: 'partials/videobox.html'
      });
    }

    $scope.getURL(videoIndex, callback);
  };

  $scope.getURL = function(videoIndex, callback) {
    // console.log(videoIndex);
    var url = "/api/video?id=" + videoIndex
    console.log(url);

    $http({url: url, method: 'GET'})
    .success(function(data, status, headers, config) {
      console.log(data);
      $scope.videoUrl = data.videoUrl;
      console.log($scope.videoUrl);
      callback();
      // console.log($scope.videoUrl);
    })
    .error(function(data, status, headers, config) {
      if(status == 401){
      return;
      }
    })
  };

});
