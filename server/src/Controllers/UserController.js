

const { query } = require('../utils/database');
const bcrypt = require('bcrypt');
const logger = require('../utils/logger');
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const { handleDuplicateEntryError } = require('../ErrorHandlers/ErrorHandler.js');




// Helper function to generate a username from email    
function generateUsername(email) {
    const firstFourLetters = email.substring(0, 4);
    const randomString = Math.random().toString(36).substring(2, 6);
    return `${firstFourLetters}_${randomString}`;
}

function generateUsername1(Name) {
    // Get the first three letters of the Name (assuming it's at least 3 characters long)
    const firstThreeLetters = Name.substring(0, 3).toLowerCase();

    // Generate a random string of 4 characters
    const randomString = Math.random().toString(36).substring(2, 6);

    // Concatenate the first three letters with the random string
    return `${firstThreeLetters}_${randomString}`;
}

// Helper function to generate a random password
function generateRandomPassword() {
    return Math.random().toString(36).substring(2, 10); // Adjust the length of the password
}

// Helper function to encrypt a string using base64 encoding
function encryptString(str) {
    return Buffer.from(str).toString('base64');
}


const registerUser = async (req, res) => {
    try {
        const { Name,userEmail, contactNo } = req.body;
        
        if ( !Name||!userEmail || !contactNo) {
            return res.status(400).send({ status: false, message: "Please provide username, email, and contact number (they are mandatory)" });
        }

        const encryptedEmail = encryptString(userEmail);

        const sql = 'SELECT * FROM tbl_user WHERE userEmail = ?';
        const [existingUser] = await query(sql, [encryptedEmail]);
        
        if (existingUser) {
            return res.status(400).send({ status: false, message: "User already exists" });
        }

        const admin="HeadAdmin"

        // Generate a username from email
        const username = generateUsername(userEmail);

        // Generate a random password
        const password = generateRandomPassword();

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        const insertUserQuery = 'INSERT INTO tbl_user (name,userName, userEmail, userPassword, userNumber,userType) VALUES (?, ?, ?, ?, ?, ?)';
        await query(insertUserQuery, [Name,username, encryptedEmail, hashedPassword, contactNo,admin]);

        return res.status(200).send({ status: true, message: "User registered successfully", username, password });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ status: false, message: err.message });
    }
};



const loginUser = async (req, res) => {
    try {
        const { userNameOrEmail, userPassword } = req.body;

        if (!userNameOrEmail || !userPassword) {
            return res.status(400).send({ status: false, message: "Please provide username or email and password (they are mandatory)" });
        }

        const usernameQuery = 'SELECT * FROM tbl_user WHERE userName = ?';
      let  userData = await query(usernameQuery, [userNameOrEmail]);

      if (!userData || userData.length === 0) {
            
            const encryptedEmail = encryptString(userNameOrEmail);
        
            const emailQuery = 'SELECT * FROM tbl_user WHERE userEmail = ?';
            userData = await query(emailQuery, [encryptedEmail]);
        }

        if (!userData || userData.length === 0){
            return res.status(404).send({ status: false, message: "Please provide valid username or email" });
        }
        
        const validPassword = await bcrypt.compare(userPassword, userData[0].userPassword);
    
        if (!validPassword) return res.status(400).send({ status: false, message: "Invalid Password" });

        const token = jwt.sign({ userId: userData.id }, "Tekhnologiya", { expiresIn: '12hr' });

        const tokenData = {
            userId: userData.id,
            token: token
        };

        return res.status(200).send({ status: true, message: "User login successful", data: tokenData });
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};


const registerSchool = async (req, res) => {
    try {
        const {institutionName, schoolName, registrationNo, boardType, location, schoolEmail, contactNo } = req.body;
        
        if ( !institutionName || !schoolName || !registrationNo || !boardType || !location || !schoolEmail || !contactNo) {
            return res.status(400).send({ status: false, message: "Please provide school name, registration number, board type, location, Email Id, and Contact Number (they are mandatory)" });
        }

        // Destructure location object
        const { address, pin, city, state, country } = location;

        // Check if the school already exists
        const checkSchoolQuery = 'SELECT * FROM tbl_school WHERE school_reg_no = ?';
        const [existingSchool] = await query(checkSchoolQuery, [registrationNo]);
        
        if (existingSchool) {
            return res.status(400).send({ status: false, message: "School with this registration number already exists" });
        }

        // Insert school information into the database
        const insertSchoolQuery = 'INSERT INTO tbl_school (institute_name, school_name, school_reg_no, board_type, school_address, school_pincode, school_city, school_state, school_country, school_email_id, school_contact_no) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        await query(insertSchoolQuery, [institutionName, schoolName, registrationNo, boardType, address, pin, city, state, country, schoolEmail, contactNo]);

        return res.status(200).send({ status: true, message: "School information added successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ status: false, message: err.message });
    }
}



const addAdmin = async (req, res) => {
    try {
        const { Name, email, contactNo, schoolName } = req.body;
        
        if (!Name || !email || !contactNo || !schoolName || schoolName.length === 0) {
            return res.status(400).send({ status: false, message: "Please provide name, email, contact, and at least one schoolName (they are mandatory)" });
        }

        // Check if the user already exists
        const encryptedEmail = encryptString(email);

        const checkUserQuery = 'SELECT * FROM tbl_user WHERE userEmail = ?';

        const [existingUser] = await query(checkUserQuery, [encryptedEmail]);

        if (existingUser) {
            return res.status(400).send({ status: false, message: "User already exists" });
        }

        const admin = "SchoolAdmin";

        // Generate a username from email
        const username = generateUsername(email);

        // Generate a random password
        const password = generateRandomPassword();

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        const insertUserQuery = 'INSERT INTO tbl_user (name, userName, userEmail, userPassword, userNumber, userType) VALUES (?, ?, ?, ?, ?, ?)';
        await query(insertUserQuery, [Name, username, encryptedEmail, hashedPassword, contactNo, admin]);

        // Get the user_id from tbl_user based on the provided email
        const getUserIdQuery = 'SELECT user_id FROM tbl_user WHERE userEmail= ?';
        const [user] = await query(getUserIdQuery, [encryptedEmail]);

        if (!user || typeof user.user_id === 'undefined') {
            console.error(`User with email "${email}" not found.`);
        }  
        const userId = user.user_id;

        // // Iterate over the array of school names
        // for (const schoolName of schoolName) {
          
            // Search for the corresponding school_id in tbl_school
            const getSchoolIdQuery = 'SELECT school_id FROM tbl_school WHERE school_name = ?';
            const [school] = await query(getSchoolIdQuery, [schoolName]);
            // console.log(school)
            
            // If school not found, handle the error or skip it
            if (!school || typeof school.school_id === 'undefined') {
                console.error(`School "${schoolName}" not found.`);
            // Skip to the next school
            }

            const schoolId = school.school_id;

            // Insert the user_id and school_id pair into tbl_school_admin
            const insertUserSchoolQuery = 'INSERT INTO tbl_admin (admin_name, admin_contact_no, admin_school_name, admin_user_id, admin_school_id) VALUES (?, ?, ?, ?, ?)';
            await query(insertUserSchoolQuery, [ Name, contactNo, schoolName, userId, schoolId]);
        

        return res.status(200).send({ status: true, message: "User registered successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ status: false, message: err.message });
    }
};


const addTeacher = async (req, res,next) => {
    try {
        const {teacherSchoolId, Name, employid, email,  contactNo } = req.body;
        console.log(req.body)

         
        if (!Name || !employid || !email || !contactNo) {
            return res.status(400).send({ status: false, message: "Please provide name, email, contact (they are mandatory)" });
        }
              
              // Check if the user already exists
        const encryptedEmail = encryptString(email);

        const checkUserQuery = 'SELECT * FROM tbl_user WHERE userEmail = ?';

        const [existingUser] = await query(checkUserQuery, [encryptedEmail]);

        if (existingUser) {
            return res.status(400).send({ status: false, message: "User already exists" });
        }

        const userType = "teacher";

        // Generate a username from email
        const username = generateUsername(email);

        // Generate a random password
        const password = generateRandomPassword();

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        const insertUserQuery = 'INSERT INTO tbl_user (name, userName, userEmail, userPassword, userNumber, userType) VALUES (?, ?, ?, ?, ?, ?)';
        await query(insertUserQuery, [Name, username, encryptedEmail, hashedPassword, contactNo, userType]);   
        
        const getUserIdQuery = 'SELECT user_id FROM tbl_user WHERE userEmail= ?';
        const [user] = await query(getUserIdQuery, [encryptedEmail]);

        if (!user || typeof user.user_id === 'undefined') {
            console.error(`User with email "${email}" not found.`);
        }  
        const userId = user.user_id;

        const checkTeacherQuery = 'SELECT * FROM tbl_teacher WHERE teacher_user_id = ?';

        const [existingTeacher] = await query(checkTeacherQuery, [userId]);
        if (existingTeacher) {
            return res.status(400).send({ status: false, message: "User already exists" });
        }
    
        // Insert the teacher into the database
        const insertTeacherQuery = 'INSERT INTO tbl_teacher (teacher_user_id,teacher_school_id,teacher_name, teacher_emp_id, teacher_email, teacher_contact) VALUES (?, ?, ?, ?, ?, ?)';
        const result = await query(insertTeacherQuery, [userId,teacherSchoolId, Name, employid, email, contactNo]);

        return res.status(200).send({ status: true, message: "Teacher registered successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ status: false, message: err.message });
    }
};


const getSchoolRows = async (userId) => {
    const sql = 'CALL GetSchool_id(?)'; // Use CALL to invoke a stored procedure
    const values = [userId];
    const [results] = await query(sql, values);

    if (!results || results.length === 0) {
        throw new Error('No school ID found for the provided user ID');
    }

    const schoolIdObject = results[0]; // Assuming results[0] is { schoolId: 2 }
    const schoolId = Object.values(schoolIdObject)[0]; // Accessing the first value of the object
    return schoolId;
};

// -----------------*********************--------------------------------------

const addClassSubjectSection = async (req, res, next) => {
    try {
        const { userAct, className, subName, sectionName, userId } = req.body;

        if (!userId) {
            throw new Error("userID not received");
        }

        if (!userAct) {
            throw new Error("Please provide userAct in the request body");
        }

        switch (userAct) {
            case 'addClass':
                if (!className) {
                    throw new Error("Please provide className in the request body (UserAct And Provided Data is Missmatch)");
                }
                await addClass(className, userId);
                break;
            case 'addSub':
                if (!subName) {
                    throw new Error("Please provide subName in the request body (UserAct And Provided Data is Missmatch)");
                }
                await addSubject(subName, userId);
                break;
            case 'addSection':
                if (!sectionName) {
                    throw new Error("Please provide sectionName in the request body (UserAct And Provided Data is Missmatch)");
                }
                await addSection(sectionName, userId);
                break;
            default:
                throw new Error("Invalid userAct value. Valid values are 'addClass', 'addSub', and 'addSection'");
        }

        return res.status(200).send({ status: true, message: `${userAct} successful` });
    } catch (err) {
        return res.status(400).send({ status: false, message: err.message });
    }
};

const addClass = async (className, userId) => {
    const rows = await getSchoolRows(userId);
    console.log(rows)
    const selectClassQuery = 'SELECT * FROM tbl_class WHERE class_name = ?';
    const [existingClass] = await query(selectClassQuery, [className]);
    if (existingClass) {
        throw new Error(`Class '${className}' already exists`);
    }
    console.log(rows)
    const insertClassQuery = 'INSERT INTO tbl_class (class_name,class_school_id) VALUES (?,?)';
    await query(insertClassQuery, [className, rows]);
};

const addSubject = async (subName, userId) => {
    const rows = await getSchoolRows(userId);
    const selectSubjectQuery = 'SELECT * FROM tbl_subject WHERE subject_name = ?';
    const [existingSubject] = await query(selectSubjectQuery, [subName]);
    if (existingSubject) {
        throw new Error(`Subject '${subName}' already exists`);
    }
    const insertSubjectQuery = 'INSERT INTO tbl_subject (subject_name,subject_school_id) VALUES (?,?)';
    await query(insertSubjectQuery, [subName, rows]);
};

const addSection = async (sectionName, userId) => {
    const rows = await getSchoolRows(userId);
    const selectSectionQuery = 'SELECT * FROM tbl_section WHERE section_name = ?';
    const [existingSection] = await query(selectSectionQuery, [sectionName]);
    if (existingSection) {
        throw new Error(`Section '${sectionName}' already exists`);
    }
    const insertSectionQuery = 'INSERT INTO tbl_section (section_name,section_school_id) VALUES (?,?)';
    await query(insertSectionQuery, [sectionName, rows]);
};





const addStudents = async (req, res, next) => {
    try {
        const { Name,  contactNo } = req.body;

        if (!Name || !contactNo) {
            return res.status(400).send({ status: false, message: "Please provide name, contactNo (they are mandatory)" });
        }


        const selectStdName = 'SELECT * FROM tbl_student WHERE student_name = ?';

        const [existingStudent] = await query(selectStdName, [Name]);

        if (existingStudent) {
            return res.status(400).send({ status: false, message: "student already exists" });
        }

        // Check if the user already exists
        // Assuming no check is needed for existing users for now

        const userType = "student";

        // Generate a random username
        const username = generateUsername1(Name);

        // Generate a random password
        const password = generateRandomPassword();

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user details into the database
        const insertUserQuery = 'INSERT INTO tbl_user (name, userName, userPassword, userNumber, userType) VALUES (?, ?, ?, ?, ?)';
        const { insertId: user_id } = await query(insertUserQuery, [Name, username, hashedPassword, contactNo, userType]);

        // Insert the teacher details into the database
        const insertTeacherQuery = 'INSERT INTO tbl_student ( student_user_id, student_name, student_contact) VALUES (?, ?, ?)';
        await query(insertTeacherQuery, [user_id, Name,  contactNo]);

        return res.status(200).send({ status: true, message: "student registered successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ status: false, message: err.message });
    }
};




const addCls_Sub = async (req, res) => {
    try {
        const { classId, subjectIds } = req.body;
        
        if (!classId || !subjectIds || subjectIds.length === 0) {
            return res.status(400).send({ status: false, message: "Please provide class ID and at least one subject ID" });
        }

        // Assuming you have a database connection or ORM set up
        // const db = getYourDbConnectionSomehow();

        // Iterate over each subjectId and insert into tbl_class_sub
        for (const subjectId of subjectIds) {
            // Construct your query to insert into tbl_class_sub
            const queryForCls_Sub = "INSERT INTO tbl_class_sub (classub_class_id, clasub_sub_id) VALUES (?, ?)";
            // Use prepared statements to prevent SQL injection
            await query(queryForCls_Sub, [classId, subjectId]);
        }

        // Respond with success message
        res.status(200).send({ status: true, message: "Subjects added to class successfully" });
    } catch (error) {
        console.error("Error adding subjects to class:", error);
        res.status(500).send({ status: false, message: "Internal server error" });
    }
};



// // class section
// const addclsSecSubClsTeacher = async (req, res) => {
//     try {
//         const { classId, sectionId, classTeacherId, subjectIds } = req.body;
        
//         if (!classId || !sectionId || !classTeacherId || !subjectIds || subjectIds.length === 0) {
//             return res.status(400).send({ status: false, message: "Please provide class ID, section ID, class teacher ID, and at least one subject ID" });
//         }

//         // Insert associations into the table
//         const insertAssociationsQuery = 'INSERT INTO tbl_class_section(clssec_class_id, clssec_section_id, clssec_teacher_id, clssec_subject_id) VALUES (?, ?, ?, ?)';
//         const values = subjectIds.map(subjectId => [classId, sectionId, classTeacherId, subjectId]);

//         await query(insertAssociationsQuery, [values]);

//         return res.status(200).send({ status: true, message: "Associations added successfully" });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).send({ status: false, message: err.message });
//     }
// }



const addclsSecSubClsTeacher = async (req, res) => {
    try {
        const { classId, sectionId, classTeacherId, subjectIds } = req.body;
        console.log(classId)

        // Validation
        if (!classId || !sectionId || !classTeacherId) {
            throw new Error("Please provide classId, sectionId, and classTeacherId");
        }

        if (!Array.isArray(subjectIds) || subjectIds === null) {
            throw new Error("subjectIds must be an array or null");
        }
console.log(classId)
      // Insert each subject into a separate row
      const insertAssociationsQuery = 'INSERT INTO tbl_clssec_sub_teacher(clssec_sub_class_id, clssec_sub_section_id, clssec_sub_techer_id, clssec_sub_subject_id) VALUES (?, ?, ?, ?)';
        
      for (const subjectId of subjectIds) {
          const values = [classId, sectionId, classTeacherId, subjectId];
          await query(insertAssociationsQuery, values);
      }

      return res.status(200).send({ status: true, message: "Associations added successfully" });
  } catch (err) {
      console.error(err);
      return res.status(500).send({ status: false, message: err.message });
  }
}






// subject teacher
const addclsSecSubTeacher = async (req, res) => {
    try {
        const { classId, sectionId, subjectIds, teacherId } = req.body;
        
        if (!classId || !sectionId || !subjectIds || !teacherId || subjectIds.length === 0) {
            return res.status(400).send({ status: false, message: "Please provide class ID, at least one subject ID, and teacher ID" });
        }

        // // Fetch classSectionId from tbl_class_section based on classId
        // const getClassSectionIdQuery = 'SELECT class_section_id FROM tbl_class_section WHERE class_id = ?';
        // const [classSectionRows] = await query(getClassSectionIdQuery, [classId]);

        // if (classSectionRows.length === 0) {
        //     return res.status(404).send({ status: false, message: "Class section not found for the given class ID" });
        // }

        // const classSectionId = classSectionRows[0].class_section_id;

        // Insert associations into the table
        const insertAssociationsQuery = 'INSERT INTO your_table_name (clssec_sub_class_id, clssec_sub_section_id,  clssec_sub_subject_id, clssec_sub_techer_id) VALUES (?, ?, ?, ?)';
        // const values = subjectIds.map(subjectId => [classSectionId, subjectId, teacherId]);

        await query(insertAssociationsQuery, [classId, sectionId, subjectIds, teacherId ]);

        return res.status(200).send({ status: true, message: "Associations added successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ status: false, message: err.message });
    }
}


const addstudentclass = async (req, res) => {
    try {
        const { studentId, classId, sectionId } = req.body;
        
        if (!studentId || !classId || !sectionId ) {
            return res.status(400).send({ status: false, message: "Please provide at least studentId, ClassId, SectionId" });
        }
        const insertAssociationsQuery = 'INSERT INTO tbl_student_class (stdcls_student_id, stdcls_class_id,  stdcls_section_id ) VALUES (?, ?, ?)';
        await query(insertAssociationsQuery, [studentId, classId, sectionId ]);

        return res.status(200).send({ status: true, message: "Associations added successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ status: false, message: err.message });
    }
}




module.exports = { registerUser, loginUser, registerSchool,addAdmin,addTeacher,addClassSubjectSection,addStudents,addclsSecSubTeacher,addclsSecSubClsTeacher, addCls_Sub, addstudentclass};





   














// module.exports = { registerUser,loginUser };




// const registerUser = async (req, res) => {
//     try {

//         const { userName, userEmail, contactNo } = req.body;
        
//         if (!instituteName || !userEmail || !contactNo) {
//             return res.status(400).send({ status: false, message: "Please provide username, password, and userType (they are mandatory)" });
//         }

//         // Check if the user already exists
//         const checkUserQuery = 'SELECT * FROM tbluser WHERE userEmail = ?';

//         const [existingUser] = await query(checkUserQuery, [userEmail]);
        
//         if (existingUser) {
//             return res.status(400).send({ status: false, message: "User already exists" });
//         }

//         // Hash the password
//         //const hashedPassword = await bcrypt.hash(userPassword, 10);

//         // Insert the user into the database
//         const insertUserQuery = 'INSERT INTO tbluser (userName, userEmail, userPassword) VALUES (?, ?, ?)';
//         await query(insertUserQuery, [userName, userEmail, hashedPassword]);

//         return res.status(200).send({ status: true, message: "User registered successfully" });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).send({ status: false, message: err.message });
//     }
// };



// const updateUser = async function (req, res) {

//     try {
//         const userId = req.params.userId;
//         const { adharNo,className ,userGender} = req.body;

//         // Use Sequelize to update user information
//         const [updatedRowsCount] = await User.update(
//             { adharNo, className,userGender },
//             { where: { id: userId } }
//         );

//         if (updatedRowsCount === 0) {
//             return res.status(404).json({ status: false, message: 'User not found' });
//         }

//         return res.status(200).json({ status: true, message: 'User information updated successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ status: false, message: error.message });
//     }
// };


//module.exports={createUser,login,updateUser}

//login,updateUser

















// const User = require('../Models/UserModel'); // Adjust the path accordingly

// const createUser = async function (req, res) {
//     try {
//         let { userName, userEmail,userPassword,} = req.body;
//         console.log(req.body)

//         if (!userName || !userEmail || !userPassword ) {
//             return res.status(400).send({ msg: "Please enter all details" });
//         }
//         userPassword = await bcrypt.hash(userPassword, 10)

//         // Use Sequelize's create method to insert a new user
//         const newUser = await User.create({
    
//             userName,
//             userEmail,
//             userPassword,
            
//         });

//         return res.status(201).send({ status: true, message: "Success", data: { userId: newUser.id } });

//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ status: false, message: error.message });
//     }
// };






// const login = async function (req, res) {
//     try {
//         const data = req.body;
    
//         console.log(data)
//         if (!Object.keys(data).length || !data.userName || !data.userPassword) {
//             return res.status(400).send({ status: false, message: "Please provide email and password (they are mandatory)" });
//         }

//         const { userName, userPassword } = data;

//         // Use Sequelize's findOne method to find a user by email
//         const userData = await User.findOne({ where: { userName } });
          
//         if (!userData) {
//             return res.status(404).send({ status: false, message: "Please provide valid email" });
//         } else {
//             const validPassword = await bcrypt.compare(userPassword, userData.userPassword);
//             if (!validPassword) return res.status(400).send({ status: false, message: "Invalid Password" });
//         }

//         const token = jwt.sign({ userId: userData.id }, "Tekhnologiya", { expiresIn: '12hr' });

//         const tokenData = {
//             userId: userData.id,
//             token: token
//         };

//         return res.status(200).send({ status: true, message: "User login successful", data: tokenData });

//     } catch (err) {
//         console.error(err);
//         return res.status(500).send({ status: false, message: err.message });
//     }
// };



//Update user information

// const updateUser = async function (req, res) {

//     try {
//         const userId = req.params.userId;
//         const { adharNo,className ,userGender} = req.body;

//         // Use Sequelize to update user information
//         const [updatedRowsCount] = await User.update(
//             { adharNo, className,userGender },
//             { where: { id: userId } }
//         );

//         if (updatedRowsCount === 0) {
//             return res.status(404).json({ status: false, message: 'User not found' });
//         }

//         return res.status(200).json({ status: true, message: 'User information updated successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ status: false, message: error.message });
//     }
// };


// module.exports={createUser,login,updateUser}

//login,updateUser