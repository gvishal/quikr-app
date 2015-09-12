var guiApp = angular.module('adninja', ['ui.router', 'ngDialog', 'ngVideo']);

guiApp.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('dashboard', {
      url: '/dashboard',
      templateUrl: '/partials/dashboard.html',
      controller: 'DashboardCtrl'
    });

    $stateProvider.state('widget', {
      url: '/widget',
      templateUrl: '/partials/widget.html',
      controller: 'WidgetCtrl'
    });

    $stateProvider.state('upload', {
      url: '/upload',
      templateUrl: '/partials/upload.html',
      controller: 'UploadCtrl'
    });
  $urlRouterProvider.otherwise('/dashboard');
}]);
