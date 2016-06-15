(function ()
{
    var app = angular.module("selectedCourses", []);

    app.directive("selectedCourses", ["data", function (data) {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: "templates/selectedCourses.html",
            controller: function() {
                this.data = data;
            },
            controllerAs: "ctrl"
        };
    }]);
}
)
();