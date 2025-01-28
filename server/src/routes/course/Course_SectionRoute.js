const express = require("express");
const CourseSection = express.Router();
const CourseSectionController = require("../../controller/course/Course_Section");


CourseSection.get("/gettingCourseSectionData/:id", CourseSectionController.getCourseSectionData);
CourseSection.get("/gettingCourseSectionDataWithId/:id", CourseSectionController.getCourseSectionDataWithId);
CourseSection.post("/addingCourseSection", CourseSectionController.addCourseSectionData);
CourseSection.put("/updatingCourseSection/:id", CourseSectionController.updateCourseSectionData);
CourseSection.put("/updatingCourseSectionOrder/:id", CourseSectionController.updateCourseSectionOrderData);
CourseSection.delete("/deletingCourseSection/:id", CourseSectionController.deleteCourseSectionData);



module.exports = CourseSection




