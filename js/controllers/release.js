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

app.controller('firstController', ['$modal','$scope', '$interval', '$state', 'Upload', 'api', '$resource', '$log', '$filter','$timeout', function ($modal, $scope, $interval, $state, Upload, api, $resource, $log, $filter,$timeout) {

    var url = api.url;
    var getSelect = $resource(
        url,
        {enumName: '@SettlementType',status:'@NORMAL'},
        {
            recruit: {url: url + 'recruit/add', method: 'POST', isArray: false},
            cityAdd: {url: url + 'district/list', method: 'GET', isArray: false},
            position: {url: url + 'position/list', method: 'GET', isArray: false},
            typeJob: {url: url + 'position/type/list', method: 'GET', isArray: false},
            settlement: {url: url + 'enum/list', method: 'GET', isArray: false},
            interview: {url: url + 'address/list', method: 'GET', isArray: false},
            normal:{url:url+'recruit/list',method:'GET',isArray:false}
        }
    );

    getSelect.normal({status:'NORMAL'},function (data) {
        $scope.listbring = data.rows;
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
    });
    getSelect.settlement({enumName: 'Sex', type: 'ALL'}, function (data) {
        $scope.sex = data.rows;
    });
    getSelect.settlement({enumName: 'SalaryType'}, function (data) {
        $scope.SalaryType = data.rows;
    });
    getSelect.interview(function (data) {
        $scope.inter = data.rows;
    });
    $scope.jobDate = {
        startDate: $filter('date')(new Date(), 'yyyy-MM-dd'),
        minDate: $filter('date')(new Date(), 'yyyy-MM-dd'),
        clearDate: $filter('date')(new Date(), 'yyyy-MM-dd'),
        StartTime:$filter('date')(new Date(), 'yyyy-MM-dd'),
        EndTime:$filter('date')(new Date(), 'yyyy-MM-dd')
    };
    $scope.$watch('jobDate.startDate', function (newVaule, oldVaule) {
        $scope.jobDate.clearDate=$filter('date')(newVaule,'yyyy-MM-dd');
        $scope.jobDate.StartTime=$filter('date')(newVaule,'yyyy-MM-dd');
    });
    $scope.$watch('jobDate.StartTime',function (newVaule, oldVaule) {
        $scope.jobDate.EndTime=$filter('date')(newVaule,'yyyy-MM-dd');
    });
    //下面的固定不要去改
    $scope.disabled = function (date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };
    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };
    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1,
        class: 'datepicker'
    };
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
        newcity = [];
        var data = {
            title: $scope.title,
            count: $scope.count,
            positionId: $scope.positionId,
            salary: $scope.salary,
            sex: $scope.fistSex,
            salaryType: $scope.salaryType,
            settlementType: $scope.settlementType,
            recruitStartTime: $filter('date')($scope.jobDate.startDate, 'yyyy-MM-dd 00:00:00'),
            recruitEndTime: $filter('date')($scope.jobDate.clearDate, 'yyyy-MM-dd 00:00:00'),
            jobStartTime: $filter('date')($scope.jobDate.StartTime, 'yyyy-MM-dd 00:00:00'),
            jobEndTime: $filter('date')($scope.jobDate.EndTime, 'yyyy-MM-dd 00:00:00'),
            description: $scope.htmlVariable,
            contactPerson: $scope.contactPerson,
            contactPhone: $scope.contactPhone,
            interviewAddressId: $scope.interviewAddressId,
            locationLat: document.getElementById('secondText').value,
            locationLng: document.getElementById('firstText').value,
            jobAddress: document.getElementById('mapText').value,
            province: $scope.provinceCode,
            city: $scope.cityCode
        };
        getSelect.recruit(data, function (res) {
            if(res.success){
                var modalInstance = $modal.open({
                    templateUrl: 'tpl/model/release.html',
                    controller: ['$scope','$modalInstance',function ($scope,$modalInstance) {
                        $scope.modelMsg=res.msg;
                        $scope.yes = function () {
                            $modalInstance.close();
                            $state.go('app.job_normal');
                        };
                    }],
                    scope: $scope,
                    size: 'md'
                });
            }
        });


    };
}]);