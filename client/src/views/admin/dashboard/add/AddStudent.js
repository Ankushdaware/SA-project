import { cilArrowThickLeft } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CCol, CContainer, CForm, CFormInput, CInputGroup, CRow } from '@coreui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AdminHeader from 'src/components/admin/AdminHeader'

import Axios from 'axios';

import 'src/scss/_custom.scss'

const AddStudent = () => {

    const [studentName, setStudentName] = useState();
    const [number, setNumber] = useState();

    const student = () => {
        Axios.post("http://localhost:3005/students", {

            Name: studentName,
            contactNo: number,
            
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
                            <h2 className='text-center defaultcolor' >Add Student </h2>
                            Name
                            <CInputGroup className="mb-3">
                            <CFormInput 
                                value={studentName} 
                                onChange={(e) => {
                                    setStudentName(e.target.value);
                                }}
                                className='borderRadius'
                                type="text"
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
                            <CRow>
                            <CCol xs={12} className='text-center'>
                                <CButton className="px-4" type='submit' shape="rounded-pill" onClick={student}>
                                    Register Student
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

export default AddStudent
