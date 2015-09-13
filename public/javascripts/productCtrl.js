quickDrop.controller('ProductCtrl', function ($window, $scope, $http, $state, $stateParams){
	$scope.productID = $stateParams.productID;
	$scope.products = [
		{'name': 'Premium Leather mouse pad', 'imageUrl': 'http://cdn.shopify.com/s/files/1/0167/4484/products/black-mousepad-2000-new_1024x1024.jpg?v=1405453682', 'curr_price' : '2000', 'id': 1},
		{'name': 'Razer Naga', 'imageUrl': 'http://assets.razerzone.com/eeimages/products/13785/razer-naga-2014-right-03.png', 'curr_price' : '4500', 'id': 2},
		{'name': 'Macbook Pro \'13', 'imageUrl': 'http://store.storeimages.cdn-apple.com/4711/as-images.apple.com/is/image/AppleInc/aos/published/images/M/AC/MACBOOKPRO/MACBOOKPRO?wid=1200&hei=630&fmt=jpeg&qlt=95&op_sharpen=0&resMode=bicub&op_usm=0.5,0.5,0,0&iccEmbed=0&layer=comp&.v=1425922618098', 'curr_price': '81000', 'id': '3'},
		{'name': 'Corsair K70', 'imageUrl': 'http://gaming.corsair.com/~/media/Corsair/Product%20Photos/keyboards/k95/cg-k95-rgb/small/CGK95RGB_01_A.png', 'curr_price': '8100', 'id': 4},
	];

	$scope.message = ''
    url = 'http://127.0.0.1:8080/api/products'
    $http({url: url, method: 'GET'})
    .success(function(data, status, headers, config) {
      // Limit set in backend too, to avoid large transfer of data.
      // ToDo: Add pagination
      $scope.products = data.data
      console.log(data);
      for (var i=0; i< $scope.products.length; i++){
		if($scope.products[i]._id == $scope.productID){
			$scope.productName = $scope.products[i].title;
			$scope.curr_price = $scope.products[i].attributes.Price; 
			$scope.imageUrl = $scope.products[i].images[0];
			$scope.noOfCommiters = $scope.products[i].noOfCommiters;
			if('slabs' in $scope.products[i]){
				$scope.slabs = $scope.products[i].slabs;
			}
			$scope.nextPrice = $scope.slabs.slab1.price
			$scope.moreToGo = $scope.slabs.slab1.users - $scope.noOfCommiters
			if($scope.moreToGo == 0){
				$scope.curr_price = $scope.nextPrice
			}
			$scope.maxUsers = $scope.slabs.slab1.users
			$scope.description = $scope.products[i].description
		}		
	}
    })
    .error(function(data, status, headers, config) {
      if(status == 401){
        $scope.message = 'Some error occurred';
        return;
      } else if(status == 400){
        $scope.message = 'Some error occurred';
        return;
      }
    })

    $scope.commit = function(){
    	url = 'http://127.0.0.1:8080/api/commit/' + $scope.productID
	    $http({url: url, method: 'GET'})
	    .success(function(data, status, headers, config) {
	      // Limit set in backend too, to avoid large transfer of data.
	      // ToDo: Add pagination
	      console.log(data);
	      $scope.noOfCommiters += 1
	      $scope.moreToGo = $scope.slabs.slab1.users - $scope.noOfCommiters
			if($scope.moreToGo == 0){
				$scope.curr_price = $scope.nextPrice
			}
	      $scope.$apply();
	    })
	    .error(function(data, status, headers, config) {
	      if(status == 401){
	        $scope.message = 'Some error occurred';
	        return;
	      } else if(status == 400){
	        $scope.message = 'Some error occurred';
	        return;
	      }
	    })
    }
});