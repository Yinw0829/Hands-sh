app.controller('warehouse', ['$scope', '$modal', '$log', '$resource', 'api','Storage','$state', function ($scope, $modal, $log, $resource,api,Storage, $state) {
    var urlKey='user';
    $scope.users=Storage.get(urlKey);

    $scope.loginOut=function () {
        Storage.remove(urlKey);
        $state.go('access.signin')
    };


    $scope.url = api.url;
    var getpassword = $resource(
        $scope.url + ':type',
        {
            oldPassword: '@oldPassword',
            password: '@password'
        },
        {
            VIPlist: {
                url: $scope.url + 'vip/fee/option/list',
                method: 'GET',
                isArray: false
            }
        }
    );
    // getpassword.get({type: 'account/changePwd'}, function (data) {
    //     $scope.passwd = data.rows;
    // });
    $scope.items = ['item1', 'item2', 'item3'];
    //$scope.urlD这个是自己定义的
    $scope.open = function (size) {
        var modalInstance = $modal.open({
            templateUrl: 'tpl/model/audition.form.html',
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
            templateUrl: 'tpl/model/audition.form.html',
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
    // 成为会员
    $scope.member = function (size) {

        var modalInstance = $modal.open({
            templateUrl: 'tpl/model/member.html',
            controller:'ModalInstanceCtrl',
            size: 'md',
            scope:$scope,
            resolve: {
                items: function () {
                    return $scope.item;
                }
            }
        });
        modalInstance.opened.then(function () {
            getpassword.VIPlist(function (resp) {
                $scope.vipMonery=resp.rows;
            });
        });
        // modalInstance.result.then(function (selectedItem) {
        //     $scope.selected = selectedItem;
        // }, function () {
        //     $log.info('Modal dismissed at: ' + new Date());
        // });
    };
    //忘记密码
    $scope.amend = function () {
        var modalInstance = $modal.open({
            templateUrl: 'tpl/model/amend.html',
            controller: 'PasswordCtrl',
            size: 'md',
            scope: $scope,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });
    };
}]);
app.controller('PasswordCtrl', ['$scope', '$modalInstance', '$filter', 'items', '$resource','$state', function ($scope, $modalInstance, $filter, items, $resource,$state) {
    var passwd = $resource($scope.url + 'account/changePwd');
    $scope.ok = function (){
        var data = {
            oldPassword: $scope.oldpassword,
            password: $scope.password
        };
        passwd.save(data,function (reg) {
            if (reg.success){
                $modalInstance.close(items);
                $state.go('access.signin');
            }else{
                $scope.authError=reg.msg;
            }
        });
    };
}]);
// 成为会员
app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', '$filter', 'items', '$resource','$state', function ($scope, $modalInstance, $filter, items, $resource,$state) {
    var getList=$resource($scope.url,{},{
        vipMonery:{
            url:$scope.url+'/vip/fee/option/list',
            method:'GET',
            isArray: false
        }
        }
    );
    getList.vipMonery(function (resp) {
        $scope.vipList=resp.rows;
    });
    // console.log(items);
    // var passwd = $resource($scope.url + 'vip/fee/option/list');
    // $scope.ok = function (){
    //     var data = {
    //         oldPassword: $scope.oldpassword,
    //         password: $scope.password
    //     };
    //     passwd.save(data,function (reg) {
    //         console.log(reg);
    //         if (reg.success){
    //             $modalInstance.close(items);
    //             $state.go('access.signin');
    //         }else{
    //             $scope.authError=reg.msg;
    //         }
    //     });
    // };
}]);