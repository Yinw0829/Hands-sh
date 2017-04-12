app.filter('cityFilter',[function ($scope) {
    return function (data, parentCode) {
        var filteData = [];
        angular.forEach(data, function (obj) {
            if (obj.parentCode === parentCode) {
                filteData.push(obj);
            }
        });
        return filteData;
    }
}] );

app.controller('handsController', ['$http', '$scope', '$interval', '$state','Upload', 'api', '$resource','Storage',function ($http, $scope, $interval,$state, Upload, api, $resource,Storage) {
    var cityKey='city';
    $scope.cities=Storage.get(cityKey);
    $scope.province=$scope.cities[10].code;

    var url = api.url;
    var upLoad = $resource(
        url + ':type'
    );
    // upLoad.get({type:'district/list'},function (data) {
    //     $scope.cities = data.rows;
    //     console.log($scope.cities);
    //     $scope.citiesId=$scope.cities[0].id;
    // });

    upLoad.get({type:'/industry/list'},function (data) {
        $scope.industryList = data.rows;
        $scope.industryId=$scope.industryList[0].id;
    });

    upLoad.save({type:'/captcha'},function (data) {
        $scope.captchas = data.rows;
    });

    $scope.send = '发送验证码';
    $scope.isDisable = false;
    var time = 3; //秒
    var stop;
    $scope.minute = function () {
        if (!$scope.userData.captcha) {
            alert('请检查验证码')
        } else if (!$scope.userData.cellPhone) {
            alert('请检查手机号码')
        } else {
            $http({
                method: 'POST',
                url: '/hands-enterprise/sendSms',
                data: {cellPhone: $scope.userData.cellPhone, captcha: $scope.userData.captcha, type: 'REG'}
            })
                .success(
                    function (data) {
                        if (data.success) {
                            alert('短信发送成功！')
                        } else {
                            alert(data.msg);
                        }
                    }
                );
            stop = $interval(
                function () {
                    if (time > 0) {
                        time--;
                        $scope.send = time + "秒后重新发送";
                        $scope.isDisable = true;
                    } else {
                        $scope.send = '重新发送';
                        time = 3;
                        $scope.isDisable = false;
                        $interval.cancel(stop);
                    }
                }, 1000)
        }
    };

    $scope.uploadImg = '';
    $scope.submit = function () {
        $scope.upload($scope.file);
    };
    $scope.upload = function (file) {
        $scope.fileInfo = file;
        Upload.upload({
            method: 'POST',
            url: '/hands-enterprise/register',
            data: {
                license: file,
                name: $scope.name,
                userName: $scope.userName,
                cellPhone: $scope.cellPhone,
                password: $scope.password,
                creditCode: $scope.creditCode,
                contactPerson: $scope.contactPerson,
                province: $scope.province,
                city: $scope.city,
                industryId:$scope.industryId
                // smsCode: $scope.smsCode
            }
        }).success(function (data, status, headers, config) {
            if (data.success) {
                $state.go('access.signin');
            } else {
            }
        });
    };
}]);