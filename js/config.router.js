'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .run(
        ['$rootScope', '$state', '$stateParams',
            function ($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    )
    .config(
        ['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {

                $urlRouterProvider
                    .otherwise('/access/signin');
                $stateProvider
                    .state('app', {
                        abstract: true,
                        url: '/app',
                        templateUrl: 'tpl/app.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(
                                        ['js/controllers/form.js',
                                            'js/controllers/warehouse.js'
                                        ]);
                                }]
                        }
                    })
                    .state('app.job_normal', {
                        url: '/job_normal',
                        templateUrl: 'tpl/job_normal.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load('js/controllers/job-normal.js');
                                }]
                        }
                    })
                    .state('app.job_past', {
                        url: '/job_past',
                        templateUrl: 'tpl/job_past.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load('js/controllers/job-normal.js');
                                }]
                        }
                    })
                    .state('app.warehouse', {
                        url: '/warehouse',
                        templateUrl: 'tpl/warehouse.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load('js/controllers/warehouse-1.js');
                                }]
                        }
                    })
                    .state('app.enterprise_list', {
                        url: '/enterprise_list',
                        templateUrl: 'tpl/talents.html'
                    })
                    .state('app.talents', {
                        url: '/talents',
                        templateUrl: 'tpl/talents.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['js/controllers/talents.js']);
                                }]
                        }
                    })
                    .state('app.audition', {
                        url: '/audition',
                        templateUrl: 'tpl/audition.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load('js/controllers/audition.js');
                                }]
                        }
                    })
                    .state('app.release', {
                        url: '/release',
                        templateUrl: 'tpl/release.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('textAngular').then(
                                        function () {
                                            return $ocLazyLoad.load('js/controllers/release.js');
                                        }
                                    );
                                }]
                        }
                    })
                    .state('app.particular', {
                        url: '/particular',
                        templateUrl: 'tpl/particular.html'
                    })
                    .state('app.resume', {
                        url: '/resume',
                        templateUrl: 'tpl/resume.html'
                    })
                    .state('app.minute', {
                        url: '/minute',
                        templateUrl: 'tpl/minute.html'
                    })
                    .state('access', {
                        url: '/access',
                        template: '<div ui-view class="fade-in-right-big smooth"></div>'
                    })

                    .state('access.signin', {
                        url: '/signin',
                        templateUrl: 'tpl/page_signin.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['js/controllers/signin.js']);
                                }]
                        }
                    })
                    .state('access.signup', {
                        url: '/signup',
                        templateUrl: 'tpl/page_signup.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load('js/controllers/page_singup.js');
                                }]
                        }
                    })
                    .state('access.password', {
                        url: '/password',
                        templateUrl: 'tpl/password.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['js/controllers/password.js']);
                                }]
                        }
                    })
                    .state('app.audit', {
                        url: '/audit',
                        templateUrl: 'tpl/audit.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load('js/app/audit.js');
                                }]
                        }
                    })
                    //换页
                    .state('app.auditdemo', {
                        url: '/auditdemo',
                        templateUrl: 'tpl/auditdemo.html',
                        params: {"itemID": null},
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load('js/app/auditdemo.js');
                                }]
                        }
                    })
            }
        ]
    );