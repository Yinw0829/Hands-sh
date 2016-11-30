/**
 * Created by iform on 2016-11-25.
 */
app.controller('auditdemo',['$scope','$http','$stateParams','$timeout',function ($scope,$http,$stateParams,$timeout) {
    //拿传过来的ID
    $scope.sum=$stateParams.itemID;
    var id=Number($scope.sum);
    $http.get("js/app/cart.json").success(function (data) {
        $scope.cart = data.cart;
    });

    //拿接口里的数据

    function findIndex(id) {
        var index = -1;
        angular.forEach($scope.cart, function (item, key) {
            if (item.id === id) {
                index = key;
                return;
            }
        });
        return index
    }

    $timeout(function () {
        var id=Number($scope.sum);
        var index=findIndex(id);
        if(index!==-1){
            $scope.Data=$scope.cart[index];
        }
    },2000);
}]);