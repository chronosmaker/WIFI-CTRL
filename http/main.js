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
                    templateUrl: 'edit.html',
                    controller: 'editCtrl'
                }
            }
        });
});
app.run(function($rootScope, $http, $state) {
    $rootScope.page = 'default';
    $rootScope.goPage = function (url) {
		$rootScope.page = url;
		$state.go(url);
    };
    $http.post("/initSys.lc").then(function(res) {
        //console.log(res);
        $rootScope.sysInfo = res.data[0];
        $rootScope.nodeInfo = res.data.splice(1,4);
    }).catch();
});

var appCtrls = angular.module('appCtrls', []);

appCtrls.controller('manualCtrl', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http) {
    $scope.switchIO = function(index, stat) {
        $http.post("/switch.lc?id=" + $rootScope.nodeInfo[index].id + "&stat=" + stat).then(function(res) {
            if (res.data.msg == '200') {
                $rootScope.nodeInfo[index].status = stat;
            }
        }).catch();
    };
}]);

appCtrls.controller('editCtrl', ['$rootScope', '$scope', '$http', '$stateParams', function($rootScope, $scope, $http, $stateParams) {
    $scope.pos = $stateParams.id;
    if ($scope.pos == 'p21') {
        $scope.showFunc = $rootScope.switchStat.m21;
    } else if ($scope.pos == 'p22') {
        $scope.showFunc = $rootScope.switchStat.m22;
    } else if ($scope.pos == 'p11') {
        $scope.showFunc = $rootScope.switchStat.m11;
    } else if ($scope.pos == 'p12') {
        $scope.showFunc = $rootScope.switchStat.m12;
    }
    $scope.changeFunc = function(func) {
        $scope.showFunc = func;
    };
}]);
