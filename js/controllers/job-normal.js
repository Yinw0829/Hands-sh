app.controller('bringList', ['$scope', '$modal', '$log', '$resource', 'httpServe', function ($scope, $modal, $log, $resource, httpServe) {
    $scope.url = httpServe.httpUrl + 'enterprise/';
    var getBring = $resource(
        $scope.url + ':type',
        {
            status: '@status',
            id: '@id'
        }
    );
    getBring.get({type: 'recruit/list'}, {status: 'NORMAL'}, function (data) {
        $scope.jobNormal = data.rows;
    });
    getBring.get({type: 'recruit/list'}, {status: 'STOPED'}, function (data) {
        $scope.jobprohibit = data.rows;
        console.log($scope.jobprohibit)
    });
    // getBring.get({type: 'recruit/list'}, {status: 'EXPIRE'}, function (data) {
    //     $scope.jobprohibit = data.rows;
    // });
    $scope.moreClick = function (id) {
        getBring.get({type: 'recruit/load'}, {id: id}, function (data) {
            $scope.more = data.result;
            console.log($scope.more)
        });
        var modalInstance = $modal.open({
            templateUrl: 'tpl/model/normal.detail.html',
            size: 'lg',
            controller: 'ParticularCtrl',
            scope: $scope,
            resolve: {
                items: function () {
                    return $scope.more;
                }
            }
        });
        modalInstance.result.then(function () {
            getBring.get({type: 'recruit/list'}, {status: 'NORMAL'}, function (data) {
                $scope.jobNormal = data.rows;
            });
        });
    };
    $scope.Click = function (id) {
        getBring.get({type: 'recruit/load'}, {id: id}, function (data) {
            $scope.item = data.result;
            console.log($scope.item)
        });
        var modalInstance = $modal.open({
            templateUrl:'tpl/model/normal.past.html',
            size:'lg',
            controller:'PastCtrl',
            scope:$scope,
            resolve:{
                items:function () {
                    return $scope.item;
                }
            }
        });
        modalInstance.result.then(function () {
            getBring.get({type: 'recruit/list'}, {status: 'STOPED'}, function (data) {
                $scope.jobNormal = data.rows;
            });
        });
    }
}]);

app.controller('ParticularCtrl', ['$scope', '$modalInstance', '$filter', 'items', '$resource', function ($scope, $modalInstance, $filter, items, $resource) {
    var stops = $resource($scope.url + 'recruit/stop');
    $scope.stop = function (id) {
        stops.save({id:id},function () {
            $modalInstance.close(items);
        });
    };
    $scope.ok = function () {
        $modalInstance.close(items)
    }
}]);
app.controller('PastCtrl', ['$scope', '$modalInstance', '$filter', 'items', '$resource', function ($scope, $modalInstance, $filter, items, $resource) {
    $scope.ok = function () {
        $modalInstance.close(items)
    }
}]);