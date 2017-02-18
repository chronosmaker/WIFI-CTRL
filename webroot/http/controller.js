var appCtrls = angular.module('appCtrls', []);

appCtrls.controller('editCtrl', ['$rootScope', '$scope', '$http', '$stateParams', function($rootScope, $scope, $http, $stateParams) {
    $scope.node = parseInt($stateParams.id);
    $scope.showFunc = $rootScope.nodeInfo[$scope.node].mode;
    $scope.changeFunc = function(func) {
        $scope.showFunc = func;
    };
}]);

appCtrls.controller('stepCtrl', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http) {
    $rootScope.sysInfo.title = '电机控制中心';
    $scope.node = [];
    $http.get("/stepData.json").then(function(res) {
        $scope.node = res.data.step;
    }).catch();
    $scope.stepStatus = function(i, s) {
        $scope.node[i].s = s;
    };
    $scope.run = function() {
        angular.forEach($scope.node, function(data) {
            data.r = parseInt(data.t / data.p) * 2;
        });
        $http.post("/step.lc?data=" + JSON.stringify($scope.node)).then(function(res) {
            console.log(res.data.msg);
        }).catch();
    };
}]);
