/**
 * Created by Administrator on 2016/11/25 0025.
 */
app.controller('warehouse', ['$scope', '$modal', '$log', function($scope, $modal, $log) {
    $scope.items = ['item1', 'item2', 'item3'];
    //$scope.urlD这个是自己定义的
    $scope.open = function (size) {
        var modalInstance = $modal.open({
            templateUrl: 'tpl/model/modal.form.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    $scope.see = function (size) {
        var modalInstance = $modal.open({
            templateUrl: 'tpl/model/modal.form.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
$scope.member = function (size) {
    var modalInstance = $modal.open({
        templateUrl: 'tpl/model/member.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve: {
            items: function () {
                return $scope.items;
            }
        }
    });

    modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
    }, function () {
        $log.info('Modal dismissed at: ' + new Date());
    });
};
    $scope.amend = function (size) {
        var modalInstance = $modal.open({
            templateUrl: 'tpl/model/amend.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
}]);