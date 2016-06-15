# Stevens Courses

## Running the Project

1.  Make sure node is installed.
2.  Navigate to server/
3.  $node server.js
4.  website will be served on localhost:9000

## Network Calls (internal server calls)

For this project we are hijacking the calls that the original
Stevens Scheduler uses to obtain its data.

### Server Url

    https://web.stevens.edu/scheduler/core/core.php

### All Sections for a Semester

    <server-url>?cmd=getxml&term=<semester>

    2015S, 2014F, etc.

