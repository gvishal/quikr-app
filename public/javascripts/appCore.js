var quickDrop = angular.module('quickDrop', ['ui.router', 'placeholders']);

quickDrop.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('dashboard', {
      url: '/dashboard',
      templateUrl: '/partials/dashboard.html',
      controller: 'DashboardCtrl'
    });

    $stateProvider.state('electronics', {
      url: '/electronics',
      templateUrl: 'partials/electronics.html',
      controller: 'ElectronicsCtrl'
    });

    $stateProvider.state('productDetail', {
      url: '/products/:productID',
      templateUrl: 'partials/productDetails.html',
      controller: 'ProductCtrl'
    });

  $urlRouterProvider.otherwise('/dashboard');
}]);
