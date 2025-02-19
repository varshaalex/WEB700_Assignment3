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
const fs = require("fs");

class Data{
    constructor(students, courses){
        this.students = students;
        this.courses = courses;
    }
}

let dataInfo = null;

module.exports.initialize = function () {
    return new Promise( (resolve, reject) => {
        fs.readFile('./data/courses.json','utf8', (err, courseData) => {
            if (err) {
                reject("unable to load courses"); return;
            }

            fs.readFile('./data/students.json','utf8', (err, studentData) => {
                if (err) {
                    reject("unable to load students"); return;
                }

                dataInfo = new Data(JSON.parse(studentData), JSON.parse(courseData));
                resolve();
            });
        });
    });
}

module.exports.getAllStudents = function(){
    return new Promise((resolve,reject)=>{
        if (dataInfo.students.length == 0) {
            reject("No results Available"); return;
        }

        resolve(dataInfo.students);
    })
}

module.exports.getTAs = function () {
    return new Promise(function (resolve, reject) {
        var filteredStudents = [];

        for (let i = 0; i < dataInfo.students.length; i++) {
            if (dataInfo.students[i].TA == true) {
                filteredStudents.push(dataInfo.students[i]);
            }
        }

        if (filteredStudents.length == 0) {
            reject("No results Available"); return;
        }

        resolve(filteredStudents);
    });
};

module.exports.getCourses = function(){
   return new Promise((resolve,reject)=>{
    if (dataInfo.courses.length == 0) {
        reject("No results Available"); return;
    }

    resolve(dataInfo.courses);
   });
};

module.exports.getStudentByNum = function (num) {
    return new Promise(function (resolve, reject) {
        var foundStudent = null;

        for (let i = 0; i < dataInfo.students.length; i++) {
            if (dataInfo.students[i].studentNum == num) {
                foundStudent = dataInfo.students[i];
            }
        }

        if (!foundStudent) {
            reject("No results Available"); return;
        }

        resolve(foundStudent);
    });
};

module.exports.getStudentsByCourse = function (course) {
    return new Promise(function (resolve, reject) {
        var filteredStudents = [];

        for (let i = 0; i < dataInfo.students.length; i++) {
            if (dataInfo.students[i].course == course) {
                filteredStudents.push(dataInfo.students[i]);
            }
        }

        if (filteredStudents.length == 0) {
            reject("No results Available"); return;
        }

        resolve(filteredStudents);
    });
};


