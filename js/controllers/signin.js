app.controller('SigninFormController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    $scope.imgUrl = 'http://localhost:8087/hands/api/captcha?time=' + (new Date()).getTime();
    $scope.imgclick = function () {
        $scope.imgUrl = 'http://localhost:8087/hands/api/captcha?time=' + (new Date()).getTime();
    };

    $scope.authError = null;
    $scope.login = function () {
        $scope.authError = null;
        $http({
            method: 'POST',
            url: 'http://localhost:8087/hands/enterprise/api/login',
            headers: {'Content-Type': 'application/json'},
            data: {
                userName: $scope.userName,
                password: $scope.password,
                captcha: $scope.captcha
            }
        })
            .then(function (res) {
                var data = res.data;
                if (data.success) {
                    $state.go('app.job_normal');
                }
                    else {
                    $scope.authError = data.msg;
                }
            });
    };
}])
;