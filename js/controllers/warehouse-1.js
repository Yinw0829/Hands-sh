app.controller('warehouse1', ['$scope', '$modal', '$log', '$resource', 'api', 'Storage', '$state', function ($scope, $modal, $log, $resource, api, Storage, $state) {

    $scope.url = api.url + 'interviewApply/';
    var getApply = $resource(
        $scope.url + ':type',
        {
            status: '@status',
            recruitId: '@recruitId',
            curPage: "@curPage",
            pageSize: "@pageSize"
        },{
            interList: {method: 'get', params: {status: 'APPLYING'}, isArray: false},
            //经验列表
            experienceList: {
                url: $scope.url + 'experience/list',
                method: 'GET',
                isArray: false
            }
        }
    );
    $scope.url = api.url + 'interview/';
    var getAudit = $resource(
        $scope.url + ':type',
        {
            status: '@status',
            recruitId: '@recruitId',
            curPage: "@curPage",
            pageSize: "@pageSize"
        },{
            auditionList: {method: 'get', params: {status: 'WAIT'}, isArray: false}
        }
    );
    $scope.url = api.url + 'checkin/';
    var getCheck = $resource(
        $scope.url + ':type',
        {
            status: '@status',
            recruitId: '@recruitId',
            curPage: "@curPage",
            pageSize: "@pageSize"
        },{
            checkinList: {method: 'get', params: {status: 'SUCCESS'}, isArray: false},
            checkList: {method: 'get', params: {status: 'WAIT'}, isArray: false}
        }
    );

    $scope.url = api.url;
    var getinter = $resource(
        $scope.url + ':type',
        {
            status: '@status',
            recruitId: '@recruitId',
            curPage: "@curPage",
            pageSize: "@pageSize"
        },
        {
            //获取详细
            minuteLoad: {
                url: $scope.url + 'resume/load',
                method: 'GET',
                isArray: false
            }
        }
    );

    $scope.filterNull=function (person) {
        return person.checkInReviewModel == null;
        // return person.interviewModel.recruitCheckInModel!==null;
    };

    //申请状态
    $scope.paginationConf = {
        currentPage: 1,
        totalItems: 25,
        itemsPerPage: 10,
        pagesLength: 21,
        perPageOptions: [10, 20, 25, 50, 100],
        onChange: function () {
            var paginationConf = function () {
                getApply.interList(
                    {type:'list'},
                    {
                        curPage: $scope.paginationConf.currentPage,
                        pageSize: $scope.paginationConf.itemsPerPage
                    },
                    function (data) {
                        $scope.paginationConf.totalItems = data.total;
                        $scope.interList = data.rows;
                    });
            };
            $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', paginationConf)
        }
    };
    //邀请面试
    $scope.invite = function (item) {
        var index = $scope.interList.indexOf(item);
        $scope.item = $scope.interList[index];
        var modalInstance = $modal.open({
            templateUrl: 'tpl/model/bring/bring.invite.html',
            controller: 'typeDelCtrl',
            scope: $scope,
            size: 'md',
            resolve: {
                items: function () {
                    return $scope.item;
                }
            }
        });
        modalInstance.result.then(function () {
            $scope.paginationConf.onChange();
        });
        modalInstance.result.then(function () {
            $scope.disabledConf.onChange();
        });
    };
    //拒绝申请
    $scope.refuse = function (item) {
        var index = $scope.interList.indexOf(item);
        $scope.item = $scope.interList[index];
        var modalInstance = $modal.open({
            templateUrl: 'tpl/model/bring/bring.refuse.html',
            controller: 'refuseCtrl',
            scope: $scope,
            size: 'md',
            resolve: {
                items: function () {
                    return $scope.item;
                }
            }
        });
        modalInstance.result.then(function () {
            $scope.paginationConf.onChange();
        });
    };
//面试状态
    $scope.disabledConf = {
        currentPage: 1,
        totalItems: 25,
        itemsPerPage: 10,
        pagesLength: 21,
        perPageOptions: [10, 20, 25, 50, 100],
        onChange: function () {
            var disabledConf = function () {
                getAudit.auditionList(
                    {type:'list'},
                    {
                        curPage: $scope.disabledConf.currentPage,
                        pageSize: $scope.disabledConf.itemsPerPage
                    },
                    function (data) {
                        $scope.disabledConf.totalItems = data.total;
                        $scope.auditionList = data.rows;
                    });
            };
            $scope.$watch('disabledConf.currentPage + disabledConf.itemsPerPage', disabledConf)
        }
    };
    //取消邀请面试
    $scope.abolishDel = function (item) {
        var index = $scope.auditionList.indexOf(item);
        $scope.item = $scope.auditionList[index];
        var modalInstance = $modal.open({
            templateUrl: 'tpl/model/bring/bring.abolish.html',
            controller: 'abolishCtrl',
            scope: $scope,
            size: 'md',
            resolve: {
                items: function () {
                    return $scope.item;
                }
            }
        });
        modalInstance.result.then(function () {
            $scope.disabledConf.onChange();
        });
    };
    //邀请入职
    $scope.entry = function (item) {
        var index = $scope.auditionList.indexOf(item);
        $scope.item = $scope.auditionList[index];
        var modalInstance = $modal.open({
            templateUrl: 'tpl/model/bring/bring.invite.html',
            controller: 'entryCtrl',
            scope: $scope,
            size: 'md',
            resolve: {
                items: function () {
                    return $scope.item;
                }
            }
        });
        modalInstance.result.then(function () {
            $scope.disabledConf.onChange();
        });
        modalInstance.result.then(function () {
            $scope.assessConf.onChange();
        });
    };
    //拒绝入职
    $scope.decline = function (item) {
        var index = $scope.auditionList.indexOf(item);
        $scope.item = $scope.auditionList[index];
        var modalInstance = $modal.open({
            templateUrl: 'tpl/model/bring/bring.refuse.html',
            controller: 'declineCtrl',
            scope: $scope,
            size: 'md',
            resolve: {
                items: function () {
                    return $scope.item;
                }
            }
        });
        modalInstance.result.then(function () {
            $scope.disabledConf.onChange();
        });
    };
// 入职状态
    $scope.assessConf = {
        currentPage: 1,
        totalItems: 25,
        itemsPerPage: 10,
        pagesLength: 21,
        perPageOptions: [10, 20, 25, 50, 100],
        onChange: function () {
            var assessConf = function () {
                getCheck.checkinList(
                    {type: 'list'},
                    {
                        curPage: $scope.assessConf.currentPage,
                        pageSize: $scope.assessConf.itemsPerPage
                    },
                    function (data) {
                        $scope.assessConf.totalItems = data.total;
                        $scope.checkinList = data.rows;
                        console.log($scope.checkinList);
                    });
                getCheck.checkList(
                    {type: 'list'},
                    {
                        curPage: $scope.assessConf.currentPage,
                        pageSize: $scope.assessConf.itemsPerPage
                    },
                    function (data) {
                        $scope.assessConf.totalItems = data.total;
                        $scope.checkList = data.rows;
                        console.log($scope.checkList);
                    });
            };
            $scope.$watch('assessConf.currentPage + assessConf.itemsPerPage', assessConf)
        }
    };
    //评价
    $scope.assess = function (item) {
        var index = $scope.checkinList.indexOf(item);
        $scope.item = $scope.checkinList[index];
        var modalInstance = $modal.open({
            templateUrl: 'tpl/model/bring/bring.assess.html',
            controller: 'ModalInstanceCtrl',
            size: 'md',
            scope: $scope,
            resolve: {
                items: function () {
                    return $scope.item;
                }
            }
        });
        modalInstance.result.then(function () {
            $scope.assessConf.onChange();
        });

    };
//取消邀请
    $scope.rescind = function (item) {
        var index = $scope.checkList.indexOf(item);
        $scope.item = $scope.checkList[index];
        var modalInstance = $modal.open({
            templateUrl: 'tpl/model/bring/bring.abolish.html',
            controller: 'abrogateCtrl',
            size: 'md',
            scope: $scope,
            resolve: {
                items: function () {
                    return $scope.item;
                }
            }
        });
        modalInstance.result.then(function () {
            $scope.assessConf.onChange();
        });
    };
//查看详细
    $scope.minute = function (id, recruitId) {
        getinter.minuteLoad({userId: id}, function (resp) {
            $scope.item = resp.result;
            console.log($scope.item);
        });
        getApply.experienceList({recruitId: recruitId, userId: id}, function (resp) {
            $scope.groups = resp.rows;
        });
        var modalInstance = $modal.open({
            templateUrl: 'tpl/model/minute.html',
            size: 'lg',
            controller: 'minuteCtrl',
            scope: $scope,
            resolve: {
                items: function () {
                    return $scope.item;
                }
            }
        });
    };
}])
;
//详细
app.controller('minuteCtrl', ['$scope', '$modalInstance', '$filter', 'items', '$resource', function ($scope, $modalInstance, $filter, items, $resource) {
    $scope.ok = function () {
        $modalInstance.close(items);
    };
}]);
//接受面试
app.controller('typeDelCtrl', ['$scope', '$modalInstance', '$filter', 'items', '$resource', '$state', function ($scope, $modalInstance, $filter, items, $resource, $state) {
    var idDate = {
        recruitId: items.recruitId,
        userId: items.userId
    };
    var typeInvite = $resource(
        $scope.url + 'interviewApply/accept',
        {},
        {dataDelete: {method: 'POST', isArray: false}});
    $scope.invite = function () {
        typeInvite.dataDelete(idDate, function (resp) {
            $modalInstance.close(items);
        })
    };
    $scope.cancel = function (id) {
        $modalInstance.close(items);
    }
}]);
//拒绝面试
app.controller('refuseCtrl', ['$scope', '$modalInstance', '$filter', 'items', '$resource', '$state', function ($scope, $modalInstance, $filter, items, $resource, $state) {
    var idData = {
        recruitId: items.recruitId,
        userId: items.userId
    };
    var typereject = $resource(
        $scope.url + 'interviewApply/reject',
        {},
        {refuseDel: {method: 'POST', isArray: false}});
    $scope.refuse = function () {
        typereject.refuseDel(idData, function (resp) {
            $modalInstance.close();
        })
    };
    $scope.cancel = function (id) {
        $modalInstance.close(items);
    }
}]);
// 取消邀请面试
app.controller('abolishCtrl', ['$scope', '$modalInstance', '$filter', 'items', '$resource', '$state', function ($scope, $modalInstance, $filter, items, $resource, $state) {
    var idData = {
        recruitId: items.recruitId,
        userId: items.userId
    };
    var abolishject = $resource(
        $scope.url + 'interview/cancel',
        {},
        {refuseDel: {method: 'POST', isArray: false}});
    $scope.abolish = function () {
        abolishject.save(idData, function (resp) {
            $modalInstance.close();
        })
    };
    $scope.cancel = function (id) {
        $modalInstance.close(items);
    }
}]);
// 邀请入职
app.controller('entryCtrl', ['$scope', '$modalInstance', '$filter', 'items', '$resource', '$state', function ($scope, $modalInstance, $filter, items, $resource, $state) {
    var idDate = {
        recruitId: items.recruitId,
        userId: items.userId
    };
    var typeInvite = $resource(
        $scope.url + 'interview/accept',
        {},
        {dataDelete: {method: 'POST', isArray: false}});
    $scope.invite = function () {
        typeInvite.dataDelete(idDate, function (resp) {
            $modalInstance.close(items);
        })
    };
    $scope.cancel = function (id) {
        $modalInstance.close(items);
    }
}]);
//拒绝入职
app.controller('declineCtrl', ['$scope', '$modalInstance', '$filter', 'items', '$resource', '$state', function ($scope, $modalInstance, $filter, items, $resource, $state) {
    var idDate = {
        recruitId: items.recruitId,
        userId: items.userId
    };
    var decline = $resource($scope.url + 'interview/reject',
        {},
        {declineDel: {method: 'POST', isArray: false}});
    $scope.refuse = function () {
        decline.save(idDate, function (resp) {
            $modalInstance.close();
        })
    };
    $scope.cancel = function (id) {
        $modalInstance.close(items);
    }
}]);
//入职状态
app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'items', '$resource', function ($scope, $modalInstance, items, $resource) {
    var evaluate = $resource($scope.url + 'checkin/review/add',
        {},
        {evaluateAdd: {method: 'POST', isArray: false}});
    $scope.ok = function () {
        evaluate.save({content: $scope.content, recruitId: items.recruitId, userId: items.userId}, function (resp) {
            $modalInstance.close();
        })
    }
}]);
// 取消入职邀请
app.controller('abrogateCtrl', ['$scope', '$modalInstance', '$filter', 'items', '$resource', '$state', function ($scope, $modalInstance, $filter, items, $resource, $state) {
    var idData = {
        recruitId: items.recruitId,
        userId: items.userId
    };
    var abrogate = $resource(
        $scope.url + 'checkin/cancel',
        {},
        {abrogateDel: {method: 'POST', isArray: false}});
    $scope.abolish = function () {
        abrogate.save(idData, function (resp) {
            $modalInstance.close();
        })
    };
    $scope.cancel = function (id) {
        $modalInstance.close(items);
    }
}]);