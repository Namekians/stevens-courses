var fs = require("fs");
var xml = require("xmldoc");

function parseDate(str) {
    if (str) {
        var parts = str.split(":");
        return {
            str: parts[0] + ":" + parts[1],
            raw: parseInt(parts[0]) + parseInt(parts[1])/60
        };
    }
    return null;
}

fs.readFile(__dirname + "/raw-scheduler-course-list.xml", function (err, data) {
    var semester = new xml.XmlDocument(data);
    var courses = [];
    var courseMap = {};
    semester.eachChild(function (child) {
        var courseRegExp = /(.{1,5}[\d]{3})(.{1,3})?/g;
        var matches = courseRegExp.exec(child.attr.Section);
        if (matches == null) {
            console.log("regexp failed " + child.attr.Section);
            return;
        }
        var courseNumber = matches[1];
        var sectionName = matches[2];

        var course = courseMap[courseNumber];
        if (course == undefined) {
            course = {
                number: courseNumber,
                name: child.attr.Title,
                sections: []
            };
            courseMap[courseNumber] = course;
            courses.push(course);
        }

        var section = {
            professor: child.attr.Instructor1,
            name: sectionName,
            times: []
        };

        child.childrenNamed("Meeting").forEach(function(xmlMeeting) {
            var meeting = {};
            switch (xmlMeeting.attr.Day) {
                case "M":
                    meeting.day = 1;
                    break;
                case "T":
                    meeting.day = 2;
                    break;
                case "W":
                    meeting.day = 3;
                    break;
                case "R":
                    meeting.day = 4;
                    break;
                case "F":
                    meeting.day = 5;
                    break;
            }

            meeting.start = parseDate(xmlMeeting.attr.StartTime);
            meeting.end = parseDate(xmlMeeting.attr.EndTime);
            section.times.push(meeting);
        });

        course.sections.push(section);
    });

    fs.writeFileSync("./scheduler-course-list.json", JSON.stringify(courses));
    fs.writeFileSync("./scheduler-course-list-pretty.json", JSON.stringify(courses, null, 2));
});
