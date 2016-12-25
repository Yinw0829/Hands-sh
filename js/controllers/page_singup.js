app.filter('cityFilter', function () {
    return function (data, parentCode) {
        console.log(parentCode);
        var filteData = [];
        angular.forEach(data, function (obj) {
            if (obj.parentCode === parentCode) {
                filteData.push(obj);
            }
        });
        return filteData;
    }
});

app.controller('handsController', ['$http', '$scope', '$interval', '$state','Upload', 'httpServe', '$resource', function ($http, $scope, $interval,$state, Upload, httpServe, $resource) {
   var url = httpServe.httpUrl;
    var upLoad = $resource(
        url + ':type'
    );
    upLoad.get({type:'districtList'},function (data) {
        $scope.cities = data.rows;
        console.log(data)
    });
    upLoad.save({type:'captcha'},{},function (data) {
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
                url: 'http://localhost:8087/hands/sendSms',
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
            url: 'http://localhost:8087/hands/enterprise/register',
            data: {
                license: file,
                name: $scope.name,
                userName: $scope.userName,
                cellPhone: $scope.cellPhone,
                password: $scope.password,
                creditCode: $scope.creditCode,
                contractPerson: $scope.contractPerson,
                province: $scope.province,
                city: $scope.city
                // smsCode: $scope.smsCode
            }
        }).success(function (data, status, headers, config) {
            if (data.success) {
                console.log(data.msg);
                console.log(data);
                $state.go('access.signin');
            } else {
                console.log(data.msg);
            }
        });
    };
}]);