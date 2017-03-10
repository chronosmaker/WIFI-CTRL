var app = angular.module('app', ['ui.router', 'appCtrls', 'appDires']);
app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }
    $httpProvider.defaults.headers.common["X-Requested-with"] = 'XMLHttpRequest';
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('default', {
            url: '/',
            views: {
                'body': {
                    templateUrl: 'default.html'
                }
            }
        })
        .state('manual', {
            url: '/manual',
            views: {
                'body': {
                    templateUrl: 'manual.html'
                }
            }
        })
        .state('auto', {
            url: '/auto',
            views: {
                'body': {
                    templateUrl: 'auto.html'
                }
            }
        })
        .state('delay', {
            url: '/delay',
            views: {
                'body': {
                    templateUrl: 'delay.html'
                }
            }
        })
        .state('edit', {
            url: '/edit/:id',
            views: {
                'body': {
                    templateUrl: 'edit.html',
                    controller: 'editCtrl'
                }
            }
        })
        .state('step', {
            url: '/step',
            views: {
                'body': {
                    templateUrl: 'step.html',
                    controller: 'stepCtrl'
                }
            }
        });
});

app.run(function($rootScope, $state) {
    $rootScope.sysInfo = {};
    $rootScope.goPage = function(url) {
        $rootScope.page = url;
        $state.go(url);
    };
});

var appDires = angular.module('appDires', []);

appDires.directive('navAir', ['$rootScope', '$http', '$state', function($rootScope, $http, $state) {
    return {
        restrict: 'EA',
        replace: true,
        scope: false,
        templateUrl: 'navAir.html',
        link: function() {
            // $http.post("/initSys.lc").then(function(res) {
            //     $rootScope.sysInfo = res.data[0];
            //     $rootScope.nodeInfo = res.data.splice(1, 4);
            // }).catch();
            // $rootScope.switchIO = function(index, stat) {
            //     $http.post("/switch.lc?id=" + $rootScope.nodeInfo[index].id + "&stat=" + stat).then(function(res) {
            //         if (res.data.msg == '200') {
            //             $rootScope.nodeInfo[index].status = stat;
            //         }
            //     }).catch();
            // };
        }
    };
}]);

appDires.directive('navStep', ['$rootScope', '$http', '$state', function($rootScope, $http, $state) {
    return {
        restrict: 'EA',
        replace: true,
        scope: false,
        templateUrl: 'navStep.html',
        link: function(){
            $rootScope.goPage('step');
        }
    };
}]);
