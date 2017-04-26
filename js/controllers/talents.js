app.controller('talensCtrl', ['$scope', '$modal', '$log', '$resource', 'api', 'Storage', '$state', function ($scope, $modal, $log, $resource, api, Storage, $state) {
    $scope.url = api.url +'checkin/';
    var getinter = $resource(
        $scope.url + ':type',
        {
            status: '@status',
            recruitId: '@recruitId',
            userId:'@userId',
            curPage: "@curPage",
            pageSize: "@pageSize"
        },
        {
            interList: {method: 'get', params: {status: 'SUCCESS'}, isArray: false},
            loadList:{
                url: $scope.url + 'review/load',
                method: 'GET',
                isArray: false
            }
        }
    );
    //库列表
    $scope.paginationConf = {
        currentPage: 1,
        totalItems: 25,
        itemsPerPage: 10,
        pagesLength: 21,
        perPageOptions: [10, 20, 25, 50, 100],
        onChange: function () {
            var paginationConf = function () {
                getinter.interList(
                    {type: 'load'},
                    {
                        curPage: $scope.paginationConf.currentPage,
                        pageSize: $scope.paginationConf.itemsPerPage
                    },
                    function (data) {
                        $scope.paginationConf.totalItems = data.total;
                        $scope.interList = data.rows;
                        console.log($scope.interList)
                    });
            };
            $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', paginationConf)
        }
    };
    $scope.filterNull=function (person) {
        // return person.interviewModel.recruitCheckInModel.checkInReviewModel!==null;
        return person.interviewModel.recruitCheckInModel!==null;
    };
    //删除
    $scope.del = function (item) {
        var index = $scope.interList.indexOf(item);
        $scope.item = $scope.interList[index];
        var modalInstance = $modal.open({
            templateUrl: 'tpl/model/bring/bring.delect.html',
            controller: 'refuseCtrl',
            scope: $scope,
            size: 'md',
            resolve: {
                items: function () {
                    return $scope.item;
                }
            }
        });
        modalInstance.result.then(function () {
            getinter.get({type:'list'},{status: 'SUCCESS'},function (data) {
                $scope.interList = data.rows;
            });
        });
    };
    //查看评价
    $scope.evaluate = function (id,recruitId) {
        var item = id;
        var items = recruitId;
        console.log(item);
        console.log(items);
        getinter.interList({type:'load'},{recruitId: items, userId: item}, function (resp) {
            $scope.groups = resp.rows;
            console.log($scope.groups);
        });
        var modalInstance = $modal.open({
            templateUrl: 'tpl/model/bring/bring.evaluate.html',
            controller: 'examineCtrl',
            scope: $scope,
            size: 'md',
            resolve: {
                items: function () {
                    return $scope.item;
                }
            }
        });
    };
}]);
//删除
app.controller('refuseCtrl', ['$scope', '$modalInstance', '$filter', 'items', '$resource', '$state', function ($scope, $modalInstance, $filter, items, $resource, $state) {
    var idData = {
        recruitId: items.recruitId,
        userId: items.userId
    };
    var typereject = $resource(
        $scope.url + 'del',
        {},
        {refuseDel: {method: 'POST', isArray: false}});
    $scope.refuse = function () {
        typereject.refuseDel(idData, function (resp) {
            $modalInstance.close();
        })
    };
    $scope.cancel = function (id) {
        $modalInstance.close(items);
    }
}]);
// 查看评价
app.controller('examineCtrl', ['$scope', '$modalInstance', '$filter', 'items', '$resource', '$state', function ($scope, $modalInstance, $filter, items, $resource, $state) {
    $scope.comp = function () {
        $modalInstance.close(items);
    };
}]);