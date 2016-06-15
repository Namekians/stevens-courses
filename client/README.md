# Client Side Documentation

## Installation

1. Clone repository.
2. cd stevens-courses/client
3. bower install

## Data Service (dataService)

Provides/shares all data for the app

    {
        courseList: <Course>[],
        selectedCourses: <Selected Course>[],
        highlightedCourse: <Selected Course>
    }

## Course

    {
        number: <string>,
        name: <string>,
        sections: <section>[]
    }

## Section

    {
        name: <string>,
        professor: <string>,
        times: <time>[]
    }

## Time

    {
        day: <int>, [0:6]
        start: <float>, hours since midnight in 24 time
        end: <float>
    }

## Selected Course

    {
        course: <course>,
        section: <string>
    }
