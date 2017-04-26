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

app.controller('pageSingUpController', ['$http', '$scope', '$interval', '$state', 'Upload', 'api', '$resource', 'province', 'Storage', function ($http, $scope, $interval, $state, Upload, api, $resource, province, Storage) {
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
                url: url + '/industry/list',
                method: 'GET',
                isArray: false
            }
        }
    );
    upLoad.get({type: '/district/list'}, function (data) {
        $scope.cities = data.rows;
        $scope.citiesId = $scope.cities[0].id;
    });

    upLoad.industry(function (resp) {
        $scope.industryList = resp.rows;
        // $scope.industryId=$scope.industryList[0].id;
        // console.log($scope.industryId);
    });

    upLoad.save({type: '/captcha'}, function (data) {
        $scope.captchas = data.rows;
    });


    $scope.isDisable = false;
    var time = 3; //默认秒数
    var stop;
    $scope.send = '发送验证码';
    $scope.transmit = function () {
        if ($scope.captcha !== undefined && $scope.cellPhone !== undefined) {
            $http({
                method: 'POST',
                url: 'api/sms/sendByCaptcha',
                data: {cellPhone: $scope.cellPhone, captcha: $scope.captcha, type: 'REG'}
            }).success(
                function (data) {
                    alert(data);
                    if (data.success) {
                        // break;
                    } else {
                        $scope.authError = data.msg;
                        console.log($scope.authError);
                    }
                }
            );
            //验证码和手机号码都不为空的时候
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
                }, 1000);
        } else if ($scope.captcha == undefined || $scope.captcha.length < 4) {
            alert('图形验证码有误，请检查！')
        } else if ($scope.cellPhone == undefined || $scope.cellPhone.length<11) {
            alert('手机号码有误，请检查！')
        }
        // else {
        //     $http({
        //         method: 'POST',
        //         url: '/sendSms',
        //         data: {cellPhone: $scope.cellPhone, captcha: $scope.captcha, type: 'REG'}
        //     }).success(
        //             function (data) {
        //                 alert(data);
        //                 if (data.success) {
        //                     // break;
        //                 } else {
        //                     $scope.authError = data.msg;
        //                     alert(data.msg);
        //                 }
        //             }
        //         );
        // }
    };
    $scope.imgUrl = url + 'captcha?time=' + (new Date()).getTime();
    $scope.imgclick = function () {
        $scope.imgUrl = url + 'captcha?time=' + (new Date()).getTime();
    };
    $scope.$watch('cellPhone+captcha', function (newValue, oldValue) {
        $scope.authError = ''
    });
    $scope.uploadImg = '';
    $scope.submit = function () {
        $scope.upload($scope.file);
    };
    $scope.upload = function (file) {
        $scope.fileInfo = file;
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
                $scope.auError = '申请成功，请耐心等待管理员审核';
            } else {
                $scope.auError = data.msg;
            }
        });
    };
}]);