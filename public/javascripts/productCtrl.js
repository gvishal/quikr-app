quickDrop.controller('ProductCtrl', function ($window, $scope, $http, $state, $stateParams){
	$scope.productID = $stateParams.productID;
	$scope.products = [
		{'name': 'Premium Leather mouse pad', 'imageUrl': 'http://cdn.shopify.com/s/files/1/0167/4484/products/black-mousepad-2000-new_1024x1024.jpg?v=1405453682', 'curr_price' : '2000', 'id': 1},
		{'name': 'Razer Naga', 'imageUrl': 'http://assets.razerzone.com/eeimages/products/13785/razer-naga-2014-right-03.png', 'curr_price' : '4500', 'id': 2},
		{'name': 'Macbook Pro \'13', 'imageUrl': 'http://store.storeimages.cdn-apple.com/4711/as-images.apple.com/is/image/AppleInc/aos/published/images/M/AC/MACBOOKPRO/MACBOOKPRO?wid=1200&hei=630&fmt=jpeg&qlt=95&op_sharpen=0&resMode=bicub&op_usm=0.5,0.5,0,0&iccEmbed=0&layer=comp&.v=1425922618098', 'curr_price': '81000', 'id': '3'},
		{'name': 'Corsair K70', 'imageUrl': 'http://gaming.corsair.com/~/media/Corsair/Product%20Photos/keyboards/k95/cg-k95-rgb/small/CGK95RGB_01_A.png', 'curr_price': '8100', 'id': 4},
	];
	for (var i=0; i< $scope.products.length; i++){
		if($scope.products[i].id == $scope.productID){
			$scope.productName = $scope.products[i].name;
			$scope.curr_price = $scope.products[i].curr_price; 
			$scope.imageUrl = $scope.products[i].imageUrl;
		}		
	}
});