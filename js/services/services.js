angular.module('ui.services', [])
    .factory('province', ['api', '$rootScope', '$resource', function (api, $rootScope, $resource) {
        var Url = api.url;
        var resource = $resource(Url + 'district/list');
        var city = [];
        return {
            logCity:function () {
                resource.get(function (resp) {
                    // city = resp;
                    if(resp.success){
                        city=resp.rows;
                    }
                    $rootScope.$broadcast('city.services');
                })
            },
            getCity: function () {
                return city;
            }
        }
    }])
       .factory('Storage',function () {
        return{
            //在缓存中存入key及相应的data的值，并且将其保存成JSON的格式
            set:function (key, data) {
                return window.localStorage.setItem(key,window.JSON.stringify(data));
            },
            //将缓存中的key（对象）取出来
            get:function (key) {
                return window.JSON.parse(window.localStorage.getItem(key));
            },
            //移除缓存种的key（对象）
            remove:function (key) {
                return window.localStorage.removeItem(key);
            }
        };
    });
