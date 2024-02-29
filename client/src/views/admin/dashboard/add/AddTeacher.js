import { cilArrowThickLeft } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CCol, CContainer, CForm, CFormInput, CInputGroup, CRow } from '@coreui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AdminHeader from 'src/components/admin/AdminHeader'

import Axios from 'axios';

import 'src/scss/_custom.scss'

const RegisterTeacher = () => {

    const [schoolId, setSchoolId] = useState();
    const [teacherName, setTeacherName] = useState();
    const [email, setEmail] = useState();
    const [number, setNumber] = useState();
    const [employid, setEmployId] = useState();

    const teacher = () => {
        Axios.post("http://localhost:3005/teachers", {

            teacherSchoolId: schoolId,
            Name: teacherName,
            email: email,
            contactNo: number,
            employid: employid,
            
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
                            <h2 className='text-center defaultcolor' >Add Teacher </h2>
                            School Id
                            <CInputGroup className="mb-3">
                            <CFormInput 
                                value={schoolId} 
                                onChange={(e) => {
                                    setSchoolId(e.target.value);
                                }}
                                className='borderRadius'
                                type="text"
                                required
                                tooltipFeedback
                            />
                            </CInputGroup>
                            Name
                            <CInputGroup className="mb-3">
                            <CFormInput 
                                value={teacherName} 
                                onChange={(e) => {
                                    setTeacherName(e.target.value);
                                }}
                                className='borderRadius'
                                type="text"
                                required
                                tooltipFeedback
                            />
                            </CInputGroup>
                            Email Id
                            <CInputGroup className="mb-4">
                            <CFormInput
                                value={email} 
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                className='borderRadius'
                                type="email"
                                required
                                tooltipFeedback
                            />
                            </CInputGroup>
                            Contact Number
                            <CInputGroup className="mb-4">
                            <CFormInput
                                value={number} 
                                onChange={(e) => {
                                    setNumber(e.target.value);
                                }}
                                className='borderRadius'
                                type="number"
                                required
                                tooltipFeedback
                            />
                            </CInputGroup>   
                            Employee ID
                            <CInputGroup className="mb-3">
                            <CFormInput 
                                value={employid} 
                                onChange={(e) => {
                                    setEmployId(e.target.value);
                                }}
                                className='borderRadius' 
                                type="text"
                                required
                                tooltipFeedback
                            />
                            </CInputGroup>                
                            <CRow>
                            <CCol xs={12} className='text-center'>
                                <CButton className="px-4" type='submit' shape="rounded-pill" onClick={teacher}>
                                    Register Teacher
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

export default RegisterTeacher
