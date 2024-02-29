import { cilArrowThickLeft } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CCol, CContainer, CForm, CFormInput, CInputGroup, CRow } from '@coreui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AdminHeader from 'src/components/admin/AdminHeader'

import Axios from 'axios';

import 'src/scss/_custom.scss'

const AddSection = () => {

    const [sectionName, setSectionName] = useState();

    const section = () => {
        Axios.post("http://localhost:3005/classecsub", {

        userAct : 'addSection',
        sectionName : sectionName,
        userId : '27',
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
                            <h2 className='text-center defaultcolor' >Add Section </h2>
                            Section Name
                            <CInputGroup className="mb-3">
                            <CFormInput 
                                value={sectionName}
                                onChange={(e) => {setSectionName(e.target.value);}}
                                className='borderRadius' 
                                type="text"
                                required
                                tooltipFeedback
                            />
                            </CInputGroup>             
                            <CRow>
                            <CCol xs={12} className='text-center'>
                                <CButton className="px-4" type='submit' shape="rounded-pill" onClick={section}>
                                Add Section
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

export default AddSection
