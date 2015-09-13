quickDrop.controller('addCtrl', function ($window, $scope, $http, $state){

	$scope.submitAd = function(){
		$scope.adDetails = { 
			"email": $scope.email,
			"remoteAddr": "14.139.82.6",
			"subCategory": "Laptops - Computers",
			"cityName": "Hyderabad",
			"title": $scope.title,
			"description": $scope.description,
			"locations": "Gachibowli",
			"price": $scope.attributes.Price,
			"slabs": {"slab1":{"price":$scope.slab1.price, "users": $scope.slab1.users}},
			"images": [$scope.image1],
			"attributes":
			{ "Price": $scope.attributes.Price, "Ad_Type": "offer", "You_are": "Individual", "Condition": "New", "Brand_name": "Apple", "Product_Type": "Laptop" }
			}

    $http
    .post('/api/ad', $scope.adDetails)
    .success(function(data, status){
      console.log('done', data)
      $state.go('electronics');
    })
    .error(function(data, status){

    })
  }
		
});