app.filter('cityFilter', [function ($scope) {
    return function (data, parentCode) {
        var filteData = [];
        angular.forEach(data, function (obj) {
            if (obj.parentCode === parentCode) {
                filteData.push(obj);
            }
        });
        return filteData;
    }
}]);

app.controller('handsController', ['$http', '$scope', '$interval', '$state', 'Upload', 'api', '$resource', 'province', 'Storage', function ($http, $scope, $interval, $state, Upload, api, $resource, province, Storage) {
    var cityKey = 'city';
    province.logCity();
    $scope.$on('city.services', function () {
        $scope.addCity = province.getCity();
        Storage.set(cityKey, $scope.addCity)
    });
    $scope.cities = Storage.get(cityKey);
    // $scope.province = $scope.cities[10].code;
    var url = api.url;


    var upLoad = $resource(
        url, {}, {
            industry: {
                url: url + 'industry/list',
                method: 'GET',
                isArray: false
            },
            minute: {url: url + 'sms/sendByCaptcha', method: 'POST', isArray: false}
        }
    );
    upLoad.get({type: 'district/list'}, function (data) {
        // $scope.district = data.rows;
        $scope.cities = data.rows;
        $scope.citiesId = $scope.cities[0].id;
    });

    upLoad.industry(function (resp) {
        $scope.industryList = resp.rows;
        // $scope.industryId=$scope.industryList[0].id;
        // console.log($scope.industryId);
    });
    $scope.imgUrl = url + 'captcha?time=' + (new Date()).getTime();
    $scope.imgclick = function () {
        $scope.imgUrl = url + 'captcha?time=' + (new Date()).getTime();
    };

    $scope.send = '发送验证码';
    $scope.isDisable = false;
    var time = 3; //秒
    var stop;
    $scope.minute = function () {
        if ($scope.captcha == null) {
            alert('请检查验证码')
        } else if ($scope.cellPhone == null) {
            alert('请检查手机号码')
        }
        var data = {
            cellPhone: $scope.cellPhone,
            captcha: $scope.captcha,
            type: 'REG'
        };
        upLoad.minute(data, function (reg) {
                if (reg.success) {
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

    };
    // $scope.minute = function () {
    //     if ($scope.captcha == null) {
    //         alert('请检查验证码')
    //     } else if ($scope.cellPhone == null) {
    //         alert('请检查手机号码')
    //     } else {
    //         Upload.upload({
    //             method: 'POST',
    //             url: 'api/sms/sendByCaptcha',
    //             data: {cellPhone: $scope.cellPhone, captcha: $scope.captcha, type: 'REG'}
    //         })
    //             .success(
    //                 function (data) {
    //                     if (data.success) {
    //                         alert('短信发送成功！')
    //                     } else {
    //                         alert(data.msg);
    //                     }
    //                 }
    //             );
    //         stop = $interval(
    //             function () {
    //                 if (time > 0) {
    //                     time--;
    //                     $scope.send = time + "秒后重新发送";
    //                     $scope.isDisable = true;
    //                 } else {
    //                     $scope.send = '重新发送';
    //                     time = 3;
    //                     $scope.isDisable = false;
    //                     $interval.cancel(stop);
    //                 }
    //             }, 1000)
    //     }
    //     alert($scope.cellPhone);
    //     alert($scope.captcha);
    // };

    $scope.uploadImg = '';


    $scope.submit = function () {
        $scope.upload($scope.file);
    };
    $scope.upload = function (file) {
        $scope.fileInfo = file;
        console.log($scope.fileInfo);
        Upload.upload({
            method: 'POST',
            url: 'api/register',
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
                industryId: $scope.industryId,
                smsCode: $scope.smsCode
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
}])
;