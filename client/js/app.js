(function () {
    var app = angular.module("stevens-courses",
        ["courseSearch",
            "selectedCourses",
            "calendar",
            "node"]);

    app.factory("data", ["$http", function ($http) {
        function equalsCourseSection(course, section) {
            return function (target) {
                var numbersAreEqual = target.course.number === course.number;
                var sectionsAreEqual = target.section.name === section.name;

                return numbersAreEqual && sectionsAreEqual;
            }
        }

        function equalsSelected(selected) {
            return equalsCourseSection(selected.course, selected.section);
        }

        var dataService = {
            courseList: [],
            selectedCourses: [],
            highlightedCourse: null,

            highlightCourseSection: function (course, section) {
                if (course === null) {
                    this.highlightedCourse = null;
                } else {
                    this.highlightedCourse = {};
                    this.highlightedCourse.course = course;
                    this.highlightedCourse.section = section;
                }
            },

            removeHighlightedCourseSection: function ()
            {
                this.highlightedCourse = null;
            },

            removeHighlightedCourse: function()
            {
                this.highlightedCourse = null;
            },

            selectCourseSection: function (course, section) {
                var found = this.selectedCourses
                    .find(equalsCourseSection(course, section));

                if (found !== undefined) {
                    return;
                }

                var selectedCourse = {};
                selectedCourse.course = course;
                selectedCourse.section = section;
                this.selectedCourses.push(selectedCourse);
            },

            removeSelectedSection: function (selected) {

                console.log("removing");
                var index = this.selectedCourses.find(equalsSelected(selected));
             //   console.log(index);

                var indexNumber = this.selectedCourses.lastIndexOf(selected);
                console.log(indexNumber);

                if (index !== -1) {

                    this.selectedCourses.splice(indexNumber, 1);

                }
            }
        };

        $http
            .get("/api/course-list/2015S")
            .success(function (data, status, headers, config) {
                console.log("success");
                dataService.courseList = data;
            })
            .error(function (data, status, headers, config) {
                console.log("failed");
            });

        return dataService;
    }]);
})();