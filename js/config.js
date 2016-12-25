// config

var app = angular.module('app')
  .config(
    [        '$controllerProvider', '$compileProvider', '$filterProvider', '$provide','$httpProvider',
    function ($controllerProvider,   $compileProvider,   $filterProvider,$provide,$httpProvider) {
        // lazy controller, directive and service
        app.controller = $controllerProvider.register;
        app.directive  = $compileProvider.directive;
        app.filter     = $filterProvider.register;
        app.factory    = $provide.factory;
        app.service    = $provide.service;
        app.constant   = $provide.constant;
        app.value      = $provide.value;
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
        $provide.provider('httpServe',function () {
            this.$get = function () {
                return{
                    httpUrl:'http://localhost:8087/hands/'
                }
            }
        })
    }
  ]);