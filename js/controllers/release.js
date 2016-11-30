
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
    app.controller('firstController', ['$scope', function ($scope) {
        $scope.tipName = [
            {
                name: '市场',
                parent: 0,
                id: 1
            }, {
                name: '教育艺术',
                parent: 0,
                id: 2
            }, {
                name: '线上',
                parent: 0,
                id: 3
            }, {
                name: '其他',
                parent: 0,
                id: 4
            }, {
                name: '促销员',
                parent: 1,
                id: 5
            }, {
                name: '收银员',
                parent: 1,
                id: 6
            }, {
                name: '行政',
                parent: 1,
                id: 7
            }, {
                name: '英语老师',
                parent: 2,
                id: 8
            }, {
                name: '数学老师',
                parent: 2,
                id: 9
            },{
                name:'淘宝客服',
                parent:3,
                id:10
            },{
                name:'打字员',
                parent:3,
                id:11
            },{
                name:'快递员',
                parent:4,
                id:12
            }
        ];
    }]);