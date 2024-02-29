import { cilArrowThickLeft } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CCol, CContainer, CForm, CFormInput, CInputGroup, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminHeader from 'src/components/admin/AdminHeader'

import Multiselect from 'multiselect-react-dropdown';

import Axios from 'axios';

import 'src/scss/_custom.scss'

const AddSubjectTeacher = () => {

    const [classname, setClassname] = useState();
    const [section, setSection] = useState();
    const [teacherName, setTeacherName] = useState();
    const [selectedSubjects, setSelectedSubjects] = useState([]);

    const [classList, setClassList] = useState([{'class_name': '' , 'class_id': ''}]);
    const [sectionList, setSectionList] = useState([{'section_name': '', 'section_id': ''}]);
    const [teacherList, setTeacherList] = useState([{'teacher_name':'','teacher_id':''}]);
    const [subjectList, setSubjectList] = useState([{'subject_name': '', 'subject_id': ''}]);


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

    useEffect(() => {
        const fetchData = async ()=>{
            const response = await fetch(`http://localhost:3005/teacherdata`);
            const newData = await response.json();
            setTeacherList(newData);
        };
        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = async ()=>{
            const response = await fetch(`http://localhost:3005/subjectdata`);
            const newData = await response.json();
            setSubjectList(newData);
        };
        fetchData();
    }, [])

    const handleSubjectChange = (selectedList, selectedSubject) => {
        setSelectedSubjects(selectedList);
      };
    
    const subTeacher = () => {

        const selectedClass = classList.find((cls) => cls.class_name === classname);
        const selectedSection = sectionList.find((sec) => sec.section_name === section);
        const selectedTeacher = teacherList.find((teacher) => teacher.teacher_name === teacherName);

        if (selectedClass && selectedSection && selectedTeacher) {
        Axios.post("http://192.168.1.38:3005/addSubTeacher", {

        classId: selectedClass.class_id,
        sectionId: selectedSection.section_id,
        classTeacherId: selectedTeacher.teacher_id,
        subjectIds: selectedSubjects.map((subject) => subject.subject_id),
      }).then((response) => {
        console.log(response);
      });
    } else {
      console.error("Invalid selection or missing data");
    }
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
                            <h2 className='text-center defaultcolor' >Add Subject Teacher </h2>
                            Class Name
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
                            Teacher Name
                            <select 
                                className="form-control borderRadius" 
                                value={teacherName} 
                                onChange={(e) => {
                                    setTeacherName(e.target.value);
                                }}
                            >
                                <option value="">Choose Teacher</option>

                                {teacherList.map(teacher => (
                                    <option value={teacher.teacher_name} key={teacher.teacher_id} >{teacher.teacher_name}</option>
                            
                                    ))
                                }

                            </select> <br/>  
                            Subject Name
                            <Multiselect
                                className='multi-select'
                                selectedValues={selectedSubjects}
                                onSelect={handleSubjectChange}
                                onRemove={handleSubjectChange}
                                options={subjectList}
                                displayValue={"subject_name"}
                                isObject={true}
                                style={{
                                chips: {
                                    background: '#1D60AE'
                                },
                                searchBox: {
                                    'border-radius': '25px',
                                },
                                }}
                                placeholder=''
                            /> 
                            <br/>  
                                 
                            <CRow>
                            <CCol xs={12} className='text-center'>
                                <CButton className="px-4" type='submit' shape="rounded-pill" onClick={subTeacher}>
                                Add Subject Teacher
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

export default AddSubjectTeacher
