import { cilArrowThickLeft } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CCol, CContainer, CForm, CFormInput, CInputGroup, CRow } from '@coreui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AdminHeader from 'src/components/admin/AdminHeader'

import Axios from 'axios';

import 'src/scss/_custom.scss'

const AddSubject = () => {

    const [subjectName, setSubjectName] = useState();

    const subject = () => {
        Axios.post("http://localhost:3005/classecsub", {

        userAct : 'addSub',
        subName : subjectName,
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
                            <h2 className='text-center defaultcolor' >Add Subject </h2>
                            Subject Name
                            <CInputGroup className="mb-3">
                            <CFormInput 
                                value={subjectName}
                                onChange={(e) => {setSubjectName(e.target.value);}}
                                className='borderRadius'
                                type="text"
                                required
                                tooltipFeedback
                            />
                            </CInputGroup>             
                            <CRow>
                            <CCol xs={12} className='text-center'>
                                <CButton className="px-4" type='submit' shape="rounded-pill" onClick={subject}>
                                Add Subject
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

export default AddSubject
