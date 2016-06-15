(function () {
    var app = angular.module("calendar", []);

    app.directive("calendar", ["data", function (data) {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: "./templates/calendar.html",
            controller: function() {
                this.value = "calendar";
                this.data = data;
                this.frank = "Unclicked";

                this.doRemove = function() {
                    console.log("You can nevah face me!");
                },

                this.translateDay = function( day ) {
                    if ( day === 1 )
                        return "Monday";
                    else if ( day === 2 )
                        return "Tuesday";
                    else if ( day === 3 )
                        return "Wednesday";
                    else if ( day === 4 )
                        return "Thursday";
                    else
                        return "Friday";
                },

                this.getBubbleStyle = function ( timeToDisplay ) {
                    var styleReturn;

                    // Set the horizontal position based on the Day...
                    var horizontalPos = ( timeToDisplay.day - 1 ) * 20;
                    horizontalPos += '%';
                  //  console.log( "Horizontal position is: " + horizontalPos );

                    // Set the vertical position based on the course's Start time
                    var verticalPos = ( timeToDisplay.start.raw - 8 ) * ( 100 / 13 );
                    verticalPos += '%';
                  //  console.log( "Vertical position is: " + verticalPos );

                    // Set the height based on the length of the class
                    var bubbleHeight = ( timeToDisplay.end.raw - timeToDisplay.start.raw ) * ( 100 / 13 );
                    bubbleHeight += '%';
                  //  console.log( "Height is: " + bubbleHeight );

                    styleReturn = {'left' : horizontalPos, 'top' : bubbleHeight, 'height' : bubbleHeight };

                    return styleReturn;
                }

                // write a function that takes the time and returns JSON style
            },

            controllerAs: "ctrl"
        };
    }]);


})();