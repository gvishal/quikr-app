var quickDrop = angular.module('quickDrop', ['ui.router', 'placeholders']);

quickDrop.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

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

    $stateProvider.state('lifestyle', {
      url: '/lifestyle',
      templateUrl: 'partials/placeHolder.html',
      controller: 'placeholderCtrl'
    });

    $stateProvider.state('clothing', {
      url: '/clothing',
      templateUrl: 'partials/placeHolder.html',
      controller: 'placeholderCtrl'
    });

    $stateProvider.state('bestof', {
      url: '/bestof',
      templateUrl: 'partials/placeHolder.html',
      controller: 'placeholderCtrl'
    });

    $stateProvider.state('popular', {
      url: '/popular',
      templateUrl: 'partials/placeHolder.html',
      controller: 'placeholderCtrl'
    });

    $stateProvider.state('add', {
      url: '/add',
      templateUrl: 'partials/addProduct.html',
      controller: 'addCtrl'
    });

  $urlRouterProvider.otherwise('/electronics');
}]);
