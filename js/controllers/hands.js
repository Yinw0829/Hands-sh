
app.directive('timerButton', ['$timeout','$interval',function($timeout, $interval){
    return {
        restrict: 'AE',
        template: '<div><button ng-click="onClick()" class="btn btn-default" ng-disabled="timer"><span ng-if="showTimer">{{ timerCount }}</span>{{text}}</button></div>',
        scope: {
            showTimer: '=',
            timeout: '='
        },
        link: function(scope, element, attrs){
            console.log(scope);
            console.log(element);
            scope.timer = false;
            scope.timeout = 60000;
            scope.timerCount = scope.timeout / 1000;
            scope.text = "获取验证码";
            scope.onClick = function(){
                scope.showTimer = true;
                scope.timer = true;
                scope.text = "秒后重新获取";
                var counter = $interval(function(){
                    scope.timerCount = scope.timerCount - 1;
                }, 1000);

                $timeout(function(){
                    scope.text = "获取验证码";
                    scope.timer = false;
                    $interval.cancel(counter);
                    scope.showTimer = false;
                    scope.timerCount = scope.timeout / 1000;
                }, scope.timeout);
            }
        }
    };
}]);
app.filter('jobFilter',function () {
    return function (data,parent) {
        var filteData=[];
        angular.forEach(data,function (obj) {
            if(obj.parent===parent){
                filteData.push(obj);
            }
        });
        return filteData;
    }
});
app.controller('handsController',['$http','$scope',function ($http,$scope) {
    $scope.imgUrl='http://120.27.146.138:8080/hands/api/captcha?time='+(new Date()).getTime();
        $scope.imgclick=function () {
            $scope.imgUrl='http://120.27.146.138:8080/hands/api/captcha?time='+(new Date()).getTime();
        };

    $http.get('http://120.27.146.138:8080/hands/api/captcha').success(function (data) {
        $scope.cart=data.rows;
        console.log($scope.cart)
    });

    $scope.tipName = [
        {
            name: '浙江省',
            parent: 0,
            id: 1
        }, {
            name: '江苏省',
            parent: 0,
            id: 2
        }, {
            name: '广东省',
            parent: 0,
            id: 3
        }, {
            name: '陕西省',
            parent: 0,
            id: 4
        }, {
            name: '嘉兴市',
            parent: 1,
            id: 5
        }, {
            name: '杭州市',
            parent: 1,
            id: 6
        }, {
            name: '金华市',
            parent: 1,
            id: 7
        }, {
            name: '南京市',
            parent: 2,
            id: 8
        }, {
            name: '盐城市',
            parent: 2,
            id: 9
        },{
            name:'深圳市',
            parent:3,
            id:10
        },{
            name:'深圳市',
            parent:3,
            id:11
        },{
            name:'西安市',
            parent:4,
            id:12
        }
    ];
    function findIndex(id) {
        //先给index设置一个初始值，为假
        var index = -1;
        //forEach需要二个参数，一个是对象，一个是函数，然后函数中的item代表的是$scope.cart，然后key就是最后生成的值就是item的值
        angular.forEach($scope.cart, function (item, key) {
            if (item.id === id) {
                index = key;
                return;
            }
        });
        return index
    }

    //登陆
    $scope.name=function () {
        $http({
            method:'POST',
            url:'http://120.27.146.138:8080/hands//enterprise/api/login',
            data: {userName:$scope.userName,password:$scope.password}
        })
            .success(
                function (data) {
                    if (data.success){
                        tisi()
                    }else {
                        alert(data.msg)
                    }
                }
            )
    };
    //验证码
    $scope.name=function () {
        $http({
            method:'POST',
            url:'http://120.27.146.138:8080/hands/api/sendSms',
            data: {cellPhone:$scope.cellPhone,captcha:$scope.captcha,REG:$scope.REG}
        })
            .success(
                function (data) {
                    if (data.success){
                        tisi()
                    }else {
                        alert(data.msg)
                    }
                }
            )
    };
//注册
    $scope.name=function () {
        $http({
            method:'POST',
            url:'http://120.27.146.138:8080/hands/enterprise/api/register',
            data: {name:$scope.name,userName:$scope.userName,cellPhone:$scope.cellPhone,password:$scope.password,license:$scope.license,creditCode:$scope.creditCode,
                contractPerson:$scope.contractPerson,msCode:$scope.msCode}
        })
            .success(
                function (data) {
                    if (data.success){
                    $scope.new=data.result;
                    }else {
                        alert(data.msg)
                    }
                }
            )
    };













//     // 停用
//     $scope.jy=function (id) {
//         var jy1=findIndex(id);
//         if (jy1 !== -1){
//             $http({
//                 method:'POST',
//                 url: 'http://localhost:8087/api/user/disabled',
//                 data:{id:id}
//             })
//                 .then(function (data) {
//                     tisi()
//                 })
//         }
//     };
//     // 启用
//     $scope.qy=function (id) {
//         var qy1=findIndex(id);
//         if (qy1 !== -1){
//             $http({
//                 method:'POST',
//                 url: 'http://localhost:8087/api/user/enable',
//                 data:{id:id}
//             })
//                 .then(function (data) {
//                     tisi()
//                 })
//         }
//     };
//
//     //删除
//     $scope.del=function (id) {
//         var delect=findIndex(id);
//         if (delect !== -1){
//             var qingwen=confirm('是否删除！');
//             if (qingwen){
//                 $http({
//                     method:'POST',
//                     url: 'http://localhost:8087/api/user/delete',
//                     data:{id:id}
//                 })
//                     .then(function (dell) {
//                         tisi()
//                     })
//             }
//         }
//     };
// //查看
//     $scope.new=[];
//     $scope.see=function (id) {
//         var index=findIndex(id);
//         if (index !== -1){
//             $http({
//                 method:'GET',
//                 url:'http://localhost:8087/api/user/load?id='+id
//             })
//                 .success(function (data) {
//                     $scope.new=data.result;
//                 })
//         }
//     };
// //编辑
//     $scope.bianji=function () {
//         $http({
//             method:'POST',
//             url:'http://localhost:8087/api/user/modify',
//             data:{
//                 id:$scope.new.id,
//                 userName:$scope.new.userName,
//                 cellPhone:$scope.new.cellPhone
//             }
//         })
//             .success(function (data) {
//                 tisi();
//             })
//     };

}]);





