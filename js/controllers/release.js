app.filter('jobFilter', function () {
    return function (data, typeId) {
        var filteData = [];
        angular.forEach(data, function (obj) {
            if (obj.typeId === typeId) {
                filteData.push(obj);
            }
        });
        return filteData;
    }
});
app.controller('firstController', ['$modal','$scope', '$interval', '$state', 'Upload', 'httpServe', '$resource', '$log', '$filter', function ($modal, $scope, $interval, $state, Upload, httpServe, $resource, $log, $filter) {
    var url = httpServe.httpUrl;
    var getSelect = $resource(
        url,
        {enumName: '@SettlementType',status:'@NORMAL'},
        {
            recruit: {url: url + 'enterprise/recruit/add', method: 'POST', isArray: false},
            cityAdd: {url: url + 'districtList', method: 'GET', isArray: false},
            position: {url: url + ' positionList', method: 'GET', isArray: false},
            typeJob: {url: url + 'positionTypeList', method: 'GET', isArray: false},
            settlement: {url: url + 'enumList', method: 'GET', isArray: false},
            interview: {url: url + '/enterprise/address/list', method: 'GET', isArray: false},
            normal:{url:url+'enterprise/recruit/list',method:'GET',isArray:false}
        }
    );

    getSelect.normal({status:'NORMAL'},function (data) {
        $scope.listbring = data.rows;
        console.log(data);
    });

    getSelect.position(function (data) {
        $scope.tipName = data.rows;
    });
    getSelect.typeJob(function (data) {
        $scope.jobName = data.rows;
    });
    var provincies;
    getSelect.cityAdd(function (data) {
        provincies = data.rows;
    });
    getSelect.settlement({enumName: 'SettlementType'}, function (data) {
        $scope.settem = data.rows;
        console.log($scope.settem)
    });
    getSelect.settlement({enumName: 'Sex', type: 'ALL'}, function (data) {
        $scope.sex = data.rows;
    });
    getSelect.settlement({enumName: 'SalaryType'}, function (data) {
        $scope.SalaryType = data.rows;
    });
    getSelect.interview(function (data) {
        $scope.inter = data.rows;
        console.log(data);
    });


    $scope.mapClick = function () {
        $scope.map = {
            province: document.getElementById('Province').value,
            city: document.getElementById('city').value
        };
        var newcity = [];
        for (var i = 0; i < provincies.length; i++) {
            if (provincies[i].name == $scope.map.city) {
                newcity.push(provincies[i])
            }
        }
        $scope.provinceCode = newcity[0].parentCode;
        $scope.cityCode = newcity[0].code;
        console.log($scope.provinceCode, $scope.cityCode);
        newcity = [];

        var data = {
            title: $scope.title,
            count: $scope.count,
            positionId: $scope.positionId,
            salary: $scope.salary,
            sex: $scope.fistSex,
            salaryType: $scope.salaryType,
            settlementType: $scope.settlementType,
            recruitStartTime: $filter('date')($scope.recruitStartTime, 'yyyy-MM-dd 00:00:00'),
            recruitEndTime: $filter('date')($scope.recruitEndTime, 'yyyy-MM-dd 00:00:00'),
            jobStartTime: $filter('date')($scope.jobStartTime, 'yyyy-MM-dd 00:00:00'),
            jobEndTime: $filter('date')($scope.jobEndTime, 'yyyy-MM-dd 00:00:00'),
            description: $scope.description,
            contractPerson: $scope.contractPerson,
            contractPhone: $scope.contractPhone,
            interviewAddressId: $scope.interviewAddressId,
            locationLat: document.getElementById('secondText').value,
            locationLng: document.getElementById('firstText').value,
            jobAddress: document.getElementById('mapText').value,
            province: $scope.provinceCode,
            city: $scope.cityCode
        };
        console.log(data);
        getSelect.recruit(data, function (res) {
            console.log(res)
        });
        var modalInstance = $modal.open({
            templateUrl: 'tpl/model/release.html',
            controller: 'typeRelease',
            scope: $scope,
            size: 'md'
        });
    };
}]);

app.controller('typeRelease', ['$scope', '$modalInstance', '$resource','$state', function ($scope, $modalInstance, $resource,$state) {
    $scope.yes = function () {
        $modalInstance.close();
        $state.go('app.job_normal');
    };
}]);