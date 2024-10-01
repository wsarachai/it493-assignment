"use strict";
////////////////////////////////////////
// Main Functions
////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  const mainContainer = document.getElementById("main-container");

  const section = new Section("student", "Student Name Table");
  const studentTable = new StudentTable("student-table");
  section.appendChild(studentTable);
  studentTable.createHeaderRow([
    "No.",
    "Student Name",
    "Student ID",
    "Nick Name",
    "Comments",
  ]);

  fetch("students.json")
    .then((res) => res.json())
    .then(function (data) {
      for (let i = 0; i < data.length; i++) {
        studentTable.createDataRow([
          i + 1,
          data[i].name,
          data[i].studentId,
          data[i].nickname,
          data[i].comment,
        ]);
      }
    });

  section.addSelfToParent(mainContainer);
});
