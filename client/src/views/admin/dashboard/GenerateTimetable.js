// import { cilArrowLeft, cilArrowThickLeft } from '@coreui/icons'
// import CIcon from '@coreui/icons-react'
// import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CFormInput, CInputGroup, CNav, CNavLink, CRow } from '@coreui/react'
// import React from 'react'
// import { Link } from 'react-router-dom'
// import AdminHeader from 'src/components/admin/AdminHeader'

// const GenerateTimetable = () => {
//   return (
//     <div>
//         <AdminHeader />
//         <div>
//             <CContainer>
//               <Link to='/admin' >
//                 <CIcon icon={cilArrowThickLeft} /> Back
//               </Link>
//                 <CRow className="justify-content-center">
//                     <CCol md={4}>
            
//                         <CForm>
//                             <h2 className='text-center' style={{color:'#1D60AE'}}>Generate Timetable </h2>
//                             Days
//                             <CInputGroup className="mb-3">
//                             <CFormInput 
//                                 style={{borderRadius:'25px'}} 
//                                 type="number"
//                                 required
//                                 tooltipFeedback
//                             />
//                             </CInputGroup>
//                             Lecture
//                             <CInputGroup className="mb-4">
//                             <CFormInput
//                                 style={{borderRadius:'25px'}}
//                                 type="number"
//                                 required
//                                 tooltipFeedback
//                             />
//                             </CInputGroup>
//                             Classes
//                             <CInputGroup className="mb-4">
//                             <CFormInput
//                                 style={{borderRadius:'25px'}}
//                                 type="text"
//                                 required
//                                 tooltipFeedback
//                             />
//                             </CInputGroup>   
//                             Teachers
//                             <CInputGroup className="mb-3">
//                             <CFormInput 
//                                 style={{borderRadius:'25px'}} 
//                                 type="text"
//                                 required
//                                 tooltipFeedback
//                             />
//                             </CInputGroup>                
//                             <CRow>
//                             <CCol xs={12} className='text-center'>
//                                 <CButton className="px-4" type='submit' shape="rounded-pill">
//                                 Generate Timetable
//                                 </CButton>
//                             </CCol>
//                             </CRow><br/>
//                         </CForm>

//                     </CCol>
//                 </CRow>
//             </CContainer>
//         </div>
//     </div>
//   )
// }

// export default GenerateTimetable



import React, { useEffect, useState } from 'react';
import AdminHeader from 'src/components/admin/AdminHeader';

import 'src/scss/timetable.css'

import { CContainer } from '@coreui/react';
import { Link } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import { cilArrowThickLeft } from '@coreui/icons';

import Multiselect from 'multiselect-react-dropdown';
import { MultiSelect } from "react-multi-select-component";

import Axios from 'axios';

const generateRandomTimetable = (
  days,
  lectures,
  classes,
  teachers,
  globalAssignedTeachers,
  includeSaturday,
  extraLecturesTeachers,
  weeklyOnceTeachers
) => {
  const timetable = {};
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Function to check if a teacher is already assigned to a position in other timetables
  const isTeacherAssigned = (teacher, subject, day, lecture, className) => {
    const key = `${day}-${lecture}`;

    // Check if the teacher is already assigned in the same position for the given class
    if (timetable[className]?.[day]?.[`Lecture ${lecture}`]?.teacher === teacher) {
      return true;
    }

    // Iterate over all the previous timetables
    for (const existingTimetable of Object.values(timetable)) {
      for (const existingDay of Object.keys(existingTimetable)) {
        for (const existingLecture of Object.keys(existingTimetable[existingDay])) {
          const existingKey = `${existingDay}-${existingLecture}`;
          const existingTeacher = existingTimetable[existingDay][existingLecture].teacher;
          const existingSubject = existingTimetable[existingDay][existingLecture].subject;

          // Check if the same teacher name is assigned to a different subject in another timetable
          if (
            existingTeacher.split('-')[0] === teacher &&
            existingSubject === subject &&
            globalAssignedTeachers.has(`${existingTeacher}-${existingKey}`)
          ) {
            return true;
          }
        }
      }
    }

    return globalAssignedTeachers.has(`${teacher}-${key}`);
  };

  // Function to get a random teacher-subject pair considering regular and extra teachers
  const getRandomTeacherSubjectPair = (weeklyOnceTeachersSet) => {
    const isExtraLecturesTeacher = Math.random() < 0.2; // 20% chance to choose an extra lectures teacher
    const isWeeklyOnceTeacher = Math.random() < 0.1; // 10% chance to choose a weekly once teacher

    if (isExtraLecturesTeacher && extraLecturesTeachers.size > 0) {
      return Array.from(extraLecturesTeachers)[Math.floor(Math.random() * extraLecturesTeachers.size)].split('-');
    } else if (isWeeklyOnceTeacher && weeklyOnceTeachersSet.size > 0) {
      const selectedTeacherSubject = Array.from(weeklyOnceTeachersSet)[Math.floor(Math.random() * weeklyOnceTeachersSet.size)];
      weeklyOnceTeachersSet.delete(selectedTeacherSubject); // Remove from the set
      return selectedTeacherSubject.split('-');
    } else {
      const randomIndex = Math.floor(Math.random() * teachers.length);
      return teachers[randomIndex].split('-');
    }
  };

  classes.forEach((className) => {
    timetable[className] = {};

    // Create a set to track assigned Weekly Once Teachers for each timetable
    const assignedWeeklyOnceTeachersSet = new Set(weeklyOnceTeachers);

    for (let i = 0; i < days; i++) {
      const day = weekDays[i];
      timetable[className][day] = {};

      for (let lecture = 1; lecture <= (includeSaturday && day === 'Saturday' ? lectures / 2 : lectures); lecture++) {
        let randomTeacher;
        let randomSubject;

        do {
          // Get a random teacher-subject pair considering all types of teachers
          [randomTeacher, randomSubject] = getRandomTeacherSubjectPair(assignedWeeklyOnceTeachersSet);
        } while (isTeacherAssigned(randomTeacher, randomSubject, day, lecture, className));

        const key = `${day}-${lecture}`;
        globalAssignedTeachers.add(`${randomTeacher}-${key}`);

        timetable[className][day][`Lecture ${lecture}`] = {
          teacher: randomTeacher,
          subject: randomSubject,
        };
      }
    }
  });

  return timetable;
};







const Timetable = ({ timetables }) => {
  return (
    <div>
      {Object.keys(timetables).map((className) => (
        <div key={className}>
          <h2>{className} Timetable</h2>
          <table className="timetable">
            <thead>
              <tr>
                <th>Day</th>
                {Object.keys(timetables[className]['Monday']).map((lecture) => (
                  <th key={lecture}>{lecture}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.keys(timetables[className]).map((day) => (
                <tr key={day}>
                  <td>{day}</td>
                  {Object.values(timetables[className][day]).map((info, index) => (
                    <td key={index}>
                      {`${info.teacher}-${info.subject}`}
                      {info.isExtraLectureTeacher && <span> (Extra Lecture)</span>}
                      {info.isWeeklyOnceTeacher && <span> (Weekly Once)</span>}
                    </td>
                  ))}
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

const GenerateTimetable = () => {

  const [days, setDays] = React.useState(5);
  const [lectures, setLectures] = React.useState(6);
  const [classes, setClasses] = React.useState([]);
  const [teachers, setTeachers] = React.useState([]);
  const [globalAssignedTeachers, setGlobalAssignedTeachers] = React.useState(new Set());
  const [extraLecturesTeachers, setExtraLecturesTeachers] = React.useState(new Set());
  const [weeklyOnceTeachers, setWeeklyOnceTeachers] = React.useState(new Set());
  const [timetables, setTimetables] = React.useState({});
  const [includeSaturday, setIncludeSaturday] = React.useState(true);

  const handleGenerateTimetable = () => {
    const generatedTimetables = generateRandomTimetable(
      days,
      lectures,
      classes.map(c => c.value.split('-')[0]), // Extract className from each selected option
      teachers.map(c => c.value.split('-')[0]),
      globalAssignedTeachers,
      includeSaturday,
      extraLecturesTeachers,
      weeklyOnceTeachers
    );
    setTimetables(generatedTimetables);
  };
  
  
  

  const [classname, setClassname] = useState();
  const [subject, setSubject] = useState();

  const [classList, setClassList] = useState([{'class_name': '' , 'class_id': ''}]);
  const [teacherList, setTeacherList] = useState([{'teacher_name': '' , 'teacher_id': ''}]);

  // const [subjectList, setSubjectList] = useState([{'subject_name': '', 'subject_id': ''}]);


  useEffect(() => {
      const fetchData = async ()=>{
          const response = await fetch(`http://localhost:3005/classdata`);
          const newData = await response.json();
          setClassList(newData);
      };
      fetchData();
  }, [])

  useEffect(() => {
      const fetchData = async ()=>{
          const response = await fetch(`http://localhost:3005/teacherdata`);
          const newData = await response.json();
          setTeacherList(newData);
      };
      fetchData();
  }, [])



  return (
    <div>
      <AdminHeader />
      <div >
        <CContainer>
          <Link to='/admin'>
            <CIcon icon={cilArrowThickLeft} /> Back
          </Link> &emsp;
          <div class='table'>
            <label>
              Number of Days:
              <input
                type="number"
                value={days}
                onChange={(e) => {
                  setDays(Math.min(Number(e.target.value), 6));
                  setIncludeSaturday(e.target.value === '6');
                }}
              />
            </label>
            <br />
            {days === 6 && (
              <label>
                Half day on Saturday :
                <input
                  type="checkbox"
                  checked={includeSaturday}
                  onChange={(e) => setIncludeSaturday(e.target.checked)}
                />
              </label>
            )}
            <br />
            <label>
              Number of Lectures:
              <input type="number" value={lectures} onChange={(e) => setLectures(e.target.value)} />
            </label>
            <br />
            <label>
              Classes (comma-separated):
              <MultiSelect
                options={classList.map(c => ({ label: c.class_name, value: `${c.class_name}-${c.class_id}` }))}
                value={classes}
                onChange={setClasses}
                labelledBy={"Select Classes"}
                hasSelectAll={false}
                overrideStrings={{ selectSomeItems: "Select Classes", allItemsAreSelected: "All Classes are selected" }}
              />
            </label>
          
            {/* <label>
              Teachers (comma-separated Teacher1-Subject1):
              <input
                type="text"
                value={teachers}
                onChange={(e) => setTeachers(e.target.value.split(','))}
              />
            </label> */}
            <label>
              Teachers : 
              <MultiSelect
                options={teacherList.map(c => ({ label: c.teacher_name, value: `${c.teacher_name}-${c.teacher_id}` }))}
                value={teachers}
                onChange={setTeachers}
                labelledBy={"Select Teachers"}
                hasSelectAll={false}
                overrideStrings={{ selectSomeItems: "Select Teacher", allItemsAreSelected: "All Teachers are selected" }}
              />
            </label>
            <br />
            <label>
              Extra Lectures Teachers (comma-separated Teacher-Subject):
              <input
                type="text"
                value={Array.from(extraLecturesTeachers).join(',')}
                onChange={(e) => setExtraLecturesTeachers(new Set(e.target.value.split(',')))}
              />
            </label>
            <br />
            <label>
              Weekly Once Teachers (comma-separated Teacher-Subject):
              <input
                type="text"
                value={Array.from(weeklyOnceTeachers).join(',')}
                onChange={(e) => setWeeklyOnceTeachers(new Set(e.target.value.split(',')))}
              />
            </label>
            <br/>
            <button onClick={handleGenerateTimetable}>Generate Timetable</button>
            <br />
            <a href='/generatetimetable'>
              <button >Re-Generate Timetable</button>
            </a>
            <div id="download-container">
              {Object.keys(timetables).length > 0 && <Timetable timetables={timetables} />}
            </div>
          </div>
        </CContainer>
      </div>
    </div>
  );
};

export default GenerateTimetable;
