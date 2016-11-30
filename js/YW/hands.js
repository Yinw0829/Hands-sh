angular.module('myApp',[])

.controller('cartController',['$http','$scope',function ($http,$scope) {
    $http.get('http://localhost:8087/api/hands/api/captcha').success(function (data) {
        $scope.cart=data;
        console.log($scope.cart)
    });
    console.log($scope);


//     $http.get('http://localhost:8087/api/user/list?role=2').success(function (data) {
//         $scope.cart=data.rows;
//         console.log($scope.cart)
//     });
//     function tisi () {
//         $http.get('http://localhost:8087/api/user/list?role=2').success(function (data) {
//             $scope.cart=data.rows;
//         })
//     }
//     function findIndex(id) {
//         //先给index设置一个初始值，为假
//         var index = -1;
//         //forEach需要二个参数，一个是对象，一个是函数，然后函数中的item代表的是$scope.cart，然后key就是最后生成的值就是item的值
//         angular.forEach($scope.cart, function (item, key) {
//             if (item.id === id) {
//                 index = key;
//                 return;
//             }
//         });
//         return index
//     }
//
//     //登陆
//     $scope.name=function () {
//         $http({
//             method:'POST',
//             url:'http://120.27.146.138:8080/hands//enterprise/api/login',
//             data: {userName:$scope.userName,password:$scope.password}
//         })
//             .success(
//                 function (data) {
//                     if (data.success){
//                         tisi()
//                     }else {
//                         alert(data.msg)
//                     }
//                 }
//             )
//     };
//     //验证码
//     $scope.name=function () {
//         $http({
//             method:'POST',
//             url:'http://120.27.146.138:8080/hands/api/sendSms',
//             data: {cellPhone:$scope.cellPhone,captcha:$scope.captcha,REG:$scope.REG}
//         })
//             .success(
//                 function (data) {
//                     if (data.success){
//                         tisi()
//                     }else {
//                         alert(data.msg)
//                     }
//                 }
//             )
//     };
// //注册
//     $scope.name=function () {
//         $http({
//             method:'POST',
//             url:'http://120.27.146.138:8080/hands/enterprise/api/register',
//             data: {name:$scope.name,userName:$scope.userName,cellPhone:$scope.cellPhone,password:$scope.password,license:$scope.license,creditCode:$scope.creditCode,
//                 contractPerson:$scope.contractPerson,cellPhone:$scope.cellPhone,smsCode:$scope.smsCode}
//         })
//             .success(
//                 function (data) {
//                     if (data.success){
//                         tisi()
//                     }else {
//                         alert(data.msg)
//                     }
//                 }
//             )
//     };
//
//
//
//
//
//
//
//
//
//
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





