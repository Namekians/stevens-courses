(function () {
    var app = angular.module("courseSearch", []);

    function normalizeKey(key) {
        return key.toLowerCase().split(" ");
    }

    function formalizeTime(course) {
            var timeKeywords = "";
            for (var i = 0, j = course.sections.length; i < j; i++) {
                timeKeywords += switchDay(course.sections[i]) + " ";
            }
            return timeKeywords;
        function switchDay(object) {
            if (object.times[0]) {
                if (object.times[0].day) {
                    switch (object.times[0].day) {
                        case 1:
                            return "Mon";
                        case 2:
                            return "Tue";
                        case 3:
                            return "Wed";
                        case 4:
                            return "Thu";
                        case 5:
                            return "Fri";
                        default:
                            return "this will never be shown";
                    }
                } else if (object.name == "WS"||object.name=="W1") {
                    return "WS";
                }else {return "unknown3";}
            }
            // course.sections[].times == null or dosen't exist
            else {
                return "tobedecided";
            }
        }
    }


    // for example: all courses from 501-599 return 500 to indicate that's a 500 level course
    function generalCourseNum(courseNum){
        var temp = courseNum.split(" ");
        return temp[1]==undefined?"unknown":temp[1].charAt(0)+"00";
    }

    app.directive("courseSearch", ["data", function (data) {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: "templates/courseSearch.html",
            controller: searchController,
            controllerAs: "ctrl"
        };

        function searchController() {
            this.data = data;
            this.query = "";



            this.showHelp=true;
            this.showHalfResults =460;



            var self = this;
            this.filterCourses = function (course) {


                if (self.query.length == 0) {
                    return true;
                }



                //a set of key words for each course, [[department],[number],[name1],[name2]...]
                var courseKeywords = normalizeKey(course.number + " " + course.name + " " + formalizeTime(course)+" "+generalCourseNum(course.number));
                courseKeywords.unshift(courseKeywords[0] + courseKeywords[1],courseKeywords[0]+courseKeywords[courseKeywords.length-1]);


                var normQuery = normalizeKey(self.query);
                //normQuery.reverse();



                        return normQuery.every(function(queryKey){
                            return courseKeywords.some(function(courseKey){
                                return (courseKey.indexOf(queryKey))==0;
                            });
                        });


               /*
                var matchAllKeywords = false;

                var x, y;
                for (x = 0, y = normQuery.length; x < y; x++) {

                    var matchOneKeyword = false;
                    for (var i = 0, j = courseKeywords.length; i < j; i++) {
                        if (courseKeywords[i].indexOf(normQuery[x]) == 0) {
                            matchOneKeyword = true;
                        }
                    }
                    if (!matchOneKeyword) {
                        break;
                    }
                }

                if (x == y) {
                    matchAllKeywords = true;
                }

                return matchAllKeywords;
                   */

            };

            this.showMoreResults= function(){
                self.showHalfResults = 10000;
            };

            this.displayHelp= function(){
                self.showHelp=true;
                document.getElementById('query-syntax-help').classList.toggle('closed');
            };
            this.hideHelp =function(){
                //self.showHelp=false;
                document.getElementById('query-syntax-help').classList.toggle('closed');
            };


        }
    }]);

    app.controller("SearchItemController", function () {
        this.expanded = false;
        this.courseOutcome="";

        this.selectCourse = function (course, data) {

            // if the course only has one section add to the selected list
            if (course.sections.length == 1) {
                data.selectCourseSection(course, course.sections[0]);
            } else {
                // otherwise, toggle expanded
                this.expanded = !this.expanded;
            }
        };

        this.selectSection = function (course, section, data) {
            data.selectCourseSection(course, section);
        };

        this.highlightCourse = function (course, data) {
            if (course.sections.length == 1)
            {
                console.log("Hightlight course is working!");
                data.highlightCourseSection(course, course.sections[0]);
            }
        };

        this.highlightSection = function (course, section, data) {
            console.log("Highlight section is working!");
            data.highlightCourseSection(course, section);
        };

        this.removeHighlightedCourse = function(data)
        {
            data.removeHighlightedCourse();
        };

        this.removeHighlightedSection = function(data)
        {
            console.log("Is remove section working?");
            data.removeHighlightedCourseSection();

        }
    });
})();

