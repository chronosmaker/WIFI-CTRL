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
        });
});
app.run(function($rootScope, $http, $state) {
    $http.post("/initSys.lc").then(function(res) {
        $rootScope.sysInfo = res.data[0];
        $rootScope.nodeInfo = res.data.splice(1,4);
    }).catch();
    $rootScope.page = 'default';
    $rootScope.goPage = function (url) {
		$rootScope.page = url;
		$state.go(url);
    };
    $rootScope.switchIO = function(index, stat) {
        $http.post("/switch.lc?id=" + $rootScope.nodeInfo[index].id + "&stat=" + stat).then(function(res) {
            if (res.data.msg == '200') {
                $rootScope.nodeInfo[index].status = stat;
            }
        }).catch();
    };
});

var appCtrls = angular.module('appCtrls', []);

appCtrls.controller('editCtrl', ['$rootScope', '$scope', '$http', '$stateParams', function($rootScope, $scope, $http, $stateParams) {
    $scope.node = parseInt($stateParams.id);
    $scope.showFunc = $rootScope.nodeInfo[$scope.node].mode;
    $scope.changeFunc = function(func) {
        $scope.showFunc = func;
    };
}]);
