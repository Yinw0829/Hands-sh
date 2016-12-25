app.controller('audition', ['$scope', '$modal', '$log', '$resource', 'httpServe', function ($scope, $modal, $log, $resource, httpServe) {
    $scope.url = httpServe.httpUrl + 'enterprise/';
    var getAdd = $resource(
        $scope.url + ':type',
        {
            id:'@id'
        }
    );
    getAdd.get({type: 'address/list'}, function (data) {
        $scope.yaddRess = data.rows;
    });
    //新增
    $scope.newAdd = function () {
        var modalInstance = $modal.open({
            templateUrl: 'tpl/model/audition/audition.form.html',
            controller: 'ModalInstanceCtrl',
            size: 'md',
            scope: $scope,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });
        modalInstance.result.then(function () {
            getAdd.get({type: 'address/list'}, function (data) {
                $scope.yaddRess = data.rows;
            });
        })
    };

    //编辑
    $scope.see = function (id) {
        getAdd.get({type:'address/load'},{id:id},function (data) {
            console.log(data);
            $scope.item = data.result;
        });
        var modalInstance = $modal.open({
            templateUrl: 'tpl/model/audition/audition.compile.html',
            controller: 'compileCtrl',
            size: 'md',
            scope: $scope,
            resolve: {
                items: function () {
                    return $scope.item;
                }
            }
        });

        modalInstance.result.then(function () {
            getAdd.get({type: 'address/list'}, function (data) {
                $scope.yaddRess = data.rows;
            });
        });
    };

    //删除
    $scope.del = function (items) {
        $scope.item = items;
        var modalInstance = $modal.open({
            templateUrl: 'tpl/model/audition/audition.delete.html',
            controller: 'deleteCtrl',
            size: 'md',
            scope: $scope,
            resolve: {
                items: function () {
                    return $scope.item;
                }
            }
        });
        modalInstance.result.then(function () {
            getAdd.get({type: 'address/list'}, function (data) {
                $scope.yaddRess = data.rows;
            });
        })
    }
}]);
//删除
app.controller('deleteCtrl', ['$scope', '$modalInstance', '$resource',function ($scope, $modalInstance, $resource) {
    var postName = $resource($scope.url + 'address/del');
    $scope.using = function (id) {
        postName.save({id:id}, function () {
            $modalInstance.close();
        })
    };
    $scope.cancel = function () {
      $modalInstance.close();
    }
}]);


//新增
app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', '$resource', function ($scope, $modalInstance, $resource) {
    var postName = $resource($scope.url + 'address/add');
    $scope.ok = function () {
        postName.save({address:$scope.newAdds}, function () {
            $modalInstance.close();
        })
    }
}]);
//编辑
app.controller('compileCtrl', ['$scope', '$modalInstance', '$resource', 'items', function ($scope, $modalInstance, $resource, items) {
    $scope.add = items;
    var bianji = $resource($scope.url + 'address/modify');
    $scope.comp = function (id) {
        bianji.save(
            {id: $scope.item.id, address: $scope.item.address},
            function () {
                $modalInstance.close(items);
            })
    };
}]);