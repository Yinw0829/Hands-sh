app.controller('bringList', ['$scope', '$modal', '$http', '$filter', 'api', '$resource', '$timeout',function ($scope, $modal, $http, $filter, api, $resource, $timeout) {
    $scope.url = api.url + 'recruit/';
    var getBring = $resource(
        $scope.url + ':type',
        {
            status: '@status',
            id: '@id',
            curPage: "@curPage",
            pageSize: "@pageSize"
        },
        {
            jobNormal:{method: 'get', params: {status: 'NORMAL'}, isArray: false},
            jobprohibit:{method: 'get', params: {status: 'STOPED'}, isArray: false}

        }
    );
    //正常状态
    $scope.paginationConf = {
        currentPage: 1,
        totalItems: 25,
        itemsPerPage: 10,
        pagesLength: 21,
        perPageOptions: [10, 20, 25, 50, 100],
        onChange: function () {
            var paginationConf = function () {
                getBring.jobNormal(
                    {type:'list'},
                    {
                        curPage: $scope.paginationConf.currentPage,
                        pageSize: $scope.paginationConf.itemsPerPage
                    },
                    function (data) {
                        $scope.paginationConf.totalItems = data.total;
                        $scope.jobNormal = data.rows;
                    });
            };
            $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', paginationConf)
        }
    };
    //过期
    $scope.disabledConf = {
        currentPage: 1,
        totalItems: 25,
        itemsPerPage: 10,
        pagesLength: 21,
        perPageOptions: [10, 20, 25, 50, 100],
        onChange: function () {
            var disabledConf = function () {
                getBring.jobprohibit(
                    {type:'list'},
                    {
                        curPage: $scope.disabledConf.currentPage,
                        pageSize: $scope.disabledConf.itemsPerPage
                    }, function (data) {
                        $scope.disabledConf.totalItems = data.total;
                        $scope.jobprohibit = data.rows;
                    });
            };
            $scope.$watch('disabledConf.currentPage + disabledConf.itemsPerPage', disabledConf)
        }
    };

    $scope.moreClick = function (id) {
        getBring.get({type: 'load'}, {id: id}, function (data) {
            $scope.more = data.result;
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
            $scope.paginationConf.onChange()
        });
    };
    $scope.Click = function (id) {
        getBring.get({type: 'load'}, {id: id}, function (data) {
            $scope.item = data.result;
        });
        var modalInstance = $modal.open({
            templateUrl: 'tpl/model/normal.past.html',
            size: 'lg',
            controller: 'PastCtrl',
            scope: $scope,
            resolve: {
                items: function () {
                    return $scope.item;
                }
            }
        });
        modalInstance.result.then(function () {
            $scope.jobprohibit.onChange()
        });
    }
}]);

app.controller('ParticularCtrl', ['$scope', '$modalInstance', '$filter', 'items', '$resource', function ($scope, $modalInstance, $filter, items, $resource) {
    var stops = $resource($scope.url + 'stop');
    $scope.stop = function (id) {
        stops.save({id: id}, function () {
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