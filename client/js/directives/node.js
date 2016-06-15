(function () {
    var app = angular.module("node", []);

    app.directive("node", ["data", function (data) {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: "templates/node.html",
            controller: function() {
                this.value = "node";
            },
            controllerAs: "ctrl"
        };
    }]);
})();