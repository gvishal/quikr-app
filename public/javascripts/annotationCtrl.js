guiApp.controller('AnnotationCtrl', function ($window, $scope, $http, $state, $timeout){

  // required to make sure that the map is hidden.
  // $scope.$apply(function() {
  //   $scope.showMap = false;
  // })
  
  $scope.message = '';

  var annotationsUrl = '/annotation';

  // make request only if user is logged in.
  if($window.localStorage.getItem("token") != null){

    $http({url: annotationsUrl, method: 'GET'})
    .success(function(data, status, headers, config) {
      $scope.aggregate = data;
      // console.log(data);
    })
    .error(function(data, status, headers, config) {
      if(status == 401){
        $scope.message = 'Please login to continue';
        return;
      } else if(status == 400){
        $scope.message = 'You are not authorized to access this page.';
        return;
      }
    })
  } else {
    $scope.message = 'Please login to continue';
  }

  $scope.getImage = function(imgIndex) {
    // console.log(imgIndex);
    var url = "/api/getImgUri?imgIndex=" + imgIndex
    // console.log(url);

    $http({url: url, method: 'GET'})
    .success(function(data, status, headers, config) {
      if (imgIndex == data.imgIndex) {
        var uri = data.uri;
        window.open(uri, 'Image');
      }
    })
    .error(function(data, status, headers, config) {
      if(status == 401){
        return;
      }
    })
  };

  if($window.localStorage.getItem("token") != null){
    $scope.downloadCSVUrl = '/annotation?download=true' + '&token=' + $window.localStorage.token;
  }

});