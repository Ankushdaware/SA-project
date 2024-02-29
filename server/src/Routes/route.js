const express = require('express');
const router = express.Router();
const UserController = require("../Controllers/UserController");
const HeadAdminController = require("../Controllers/HeadAdminController");
const AdminController = require("../Controllers/AdminController");


//const MW = require("../middlewere/auth");


router.post('/users',UserController.registerUser);
router.post("/login", UserController.loginUser);

router.post('/schools',UserController.registerSchool);

router.post('/admins',UserController.addAdmin);

router.post('/',UserController.addTeacher);

router.post('/classecsub',UserController.addClassSubjectSection);

router.post('/addclssub',UserController.addCls_Sub);

router.post('/addclssec',UserController.addclsSecSubClsTeacher);

router.post('/addsubteacher',UserController.addclsSecSubTeacher);

router.post('/students',UserController.addStudents);

router.post('/addstdcls',UserController.addstudentclass);

//router.put('/users/:userId', UserController.updateUser)


//  HeadAdminController
router.get('/schooldata',HeadAdminController.schooldata);
router.get('/admindata',HeadAdminController.admindata);


// AdminController
router.get('/classdata',AdminController.classdata);
router.get('/sectiondata',AdminController.sectiondata);
router.get('/subjectdata',AdminController.subjectdata);
router.get('/teacherdata',AdminController.teacherdata);
router.get('/studentdata',AdminController.studentdata);



module.exports = router;
