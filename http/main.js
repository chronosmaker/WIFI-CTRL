var app = angular.module('app', ['ui.router', 'appCtrls']);
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
                    templateUrl: 'manual.html',
                    controller: 'manualCtrl'
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
                    templateUrl: 'edit.html'
                }
            }
        });
});
app.run(function($rootScope, $http, $state) {
    $rootScope.sysInfo = {
        title: '中央空调控制中心'
    };
    $rootScope.posName = {
        p21: '二楼东侧',
        p22: '二楼西侧',
        p11: '一楼东侧',
        p12: '一楼西侧'
    };
    $rootScope.funcName = {
        f1: '手动控制',
        f2: '定时开关',
        f3: '延时开关'
    };
    $rootScope.page = 'default';
    $rootScope.goPage = function (url) {
		$rootScope.page = url;
		$state.go(url);
    };
    $http.post("/initSys.lc").then(function(res) {
        $rootScope.switchStat = res.data;
    }).catch();
});

var appCtrls = angular.module('appCtrls', []);

appCtrls.controller('manualCtrl', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http) {
    $scope.switchIO = function(id, stat) {
        $http.post("/switch.lc?id=" + id + "&stat=" + stat).then(function(res) {
            var msg = res.data.msg;
            if (msg == '200') {
                $rootScope.switchStat[id] = stat;
            }
        }).catch();
    };
}]);
