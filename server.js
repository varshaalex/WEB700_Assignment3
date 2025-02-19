/*********************************************************************************
*  WEB700 – Assignment 03
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Varsha Maria Alex
   Student ID: 180085235
   Date: 19-02-2025
*
********************************************************************************/ 
const express = require("express");
const path = require("path");
const collegeData = require("./modules/collegeData");
const app = express();
const HTTP_PORT = process.env.PORT || 8081;

// Home Page Route
app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "home.html"));
});

// About Page Route
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "about.html"));
});

// HTML Demo Page Route
app.get("/htmlDemo", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "htmlDemo.html"));
});

// Get all students or by course
app.get("/students", (req, res) => {
    if (req.query.course) {
        collegeData.getStudentsByCourse(req.query.course)
            .then(students => res.json(students))
            .catch(() => res.json({ message: "no results" }));
    } else {
        collegeData.getAllStudents()
            .then(students => res.json(students))
            .catch(() => res.json({ message: "no results" }));
    }
});

// Get all Teaching Assistants
app.get("/tas", (req, res) => {
    collegeData.getTAs()
        .then(tas => res.json(tas))
        .catch(() => res.json({ message: "no results" }));
});

// Get all courses
app.get("/courses", (req, res) => {
    collegeData.getCourses()
        .then(courses => res.json(courses))
        .catch(() => res.json({ message: "no results" }));
});

// Get a student by student number
app.get("/student/:num", (req, res) => {
    collegeData.getStudentByNum(req.params.num)
        .then(student => res.json(student))
        .catch(() => res.json({ message: "no results" }));
});

// 404 Page Not Found
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// Initialize and start the server
collegeData.initialize()
    .then(() => {
        app.listen(HTTP_PORT, () => {
            console.log(`Server listening on port ${HTTP_PORT}`);
        });
    })
    .catch(err => {
        console.error("Failed to initialize data: ", err);
    });
