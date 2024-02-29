import { cilArrowThickLeft } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CCol, CContainer, CForm, CFormInput, CInputGroup, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminHeader from 'src/components/admin/AdminHeader'

import Axios from 'axios';

import 'src/scss/_custom.scss'

const AddStudentClass = () => {

    const [studentName, setStudentName] = useState();
    const [classname, setClassname] = useState();
    const [section, setSection] = useState();

    const [studentList, setstudentList] = useState([{'student_name':'','student_id':''}]);
    const [classList, setClassList] = useState([{'class_name': '' , 'class_id': ''}]);
    const [sectionList, setSectionList] = useState([{'section_name': '', 'section_id': ''}]);


    useEffect(() => {
        const fetchData = async ()=>{
            const response = await fetch(`http://localhost:3005/studentdata`);
            const newData = await response.json();
            setstudentList(newData);
        };
        fetchData();
    }, [])

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
            const response = await fetch(`http://localhost:3005/sectiondata`);
            const newData = await response.json();
            setSectionList(newData);
        };
        fetchData();
    }, [])


    
    const stdcls = () => {
        Axios.post("http://localhost:3005/addstdcls", {

        studentId : studentName ,
        classId : classname ,
        sectionId : section ,
            
        }).then((response) => {
          console.log(response);
        });
      };


  return (
    <div>
        <AdminHeader />
        <div>
            <CContainer>
            <Link to='/add' >
                <CIcon icon={cilArrowThickLeft} /> Back
              </Link>
                <CRow className="justify-content-center">
                    <CCol md={4}>
            
                        <CForm>
                            <h2 className='text-center defaultcolor' >Add Student Class</h2>
                            Student Name
                            <select 
                                className="form-control borderRadius" 
                                value={studentName}
                                onChange={(e) => {
                                    setStudentName(e.target.value);
                                }}
                            >
                                <option value="">Choose Student </option>

                                {studentList.map(student => (
                                    <option value={student.student_name} key={student.student_id} >{student.student_name}</option>
                            
                                    ))
                                }

                            </select> <br/> 
                            Class 
                            <select 
                                className="form-control borderRadius" 
                                value={classname}
                                onChange={(e) => {
                                    setClassname(e.target.value);
                                }}
                            >
                                <option value="">Choose Class </option>

                                {classList.map(classname => (
                                    <option value={classname.class_name} key={classname.class_id} >{classname.class_name}</option>
                            
                                    ))
                                }

                            </select> <br/>   
                            Section Name
                            <select 
                                className="form-control borderRadius" 
                                value={section}
                                onChange={(e) => {
                                    setSection(e.target.value);
                                }}
                            >
                                <option value="">Choose Section </option>

                                {sectionList.map(section => (
                                    <option value={section.section_name} key={section.section_id} >{section.section_name}</option>
                            
                                    ))
                                }

                            </select> <br/>            
                            <CRow>
                            <CCol xs={12} className='text-center'>
                                <CButton className="px-4" type='submit' shape="rounded-pill" onClick={stdcls}>
                                Add Student Class
                                </CButton>
                            </CCol>
                            </CRow><br/>
                        </CForm>

                    </CCol>
                </CRow>
            </CContainer>
        </div>
    </div>
  )
}

export default AddStudentClass
