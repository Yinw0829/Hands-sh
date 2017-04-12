app.controller('SigninFormController', ['$scope', '$modal', '$http', '$state', '$resource', 'api', 'Storage', function ($scope, $modal, $http, $state, $resource, api, Storage) {
    var url = api.url;
    var getup = $resource(
        url,
        {},
        {
            enter: {url: url + '/login', method: 'POST', isArray: false}
        }
    );
    $scope.login = function () {
        var data = {
            userName: $scope.userName,
            password: $scope.password
            // captcha: $scope.captcha
        };
        getup.enter(data, function (reg) {
            if (reg.success) {
                $state.go('app.job_normal');
                Storage.set('user', reg.result)
            } else {
                $scope.authError = reg.msg;
            }
        });
    };
    //监听三个$scope值的变化，如果发生变化就清空$scope.authError的值。
    $scope.$watch('userName+password+captcha', function (newValue, oldValue) {
        $scope.authError = ''
    });
    $scope.imgUrl = url + 'captcha?time=' + (new Date()).getTime();
    $scope.imgclick = function () {
        $scope.imgUrl = url + 'captcha?time=' + (new Date()).getTime();
    };
}]);