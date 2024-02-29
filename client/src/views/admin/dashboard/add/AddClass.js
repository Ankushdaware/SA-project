import { cilArrowThickLeft } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CCol, CContainer, CForm, CFormInput, CInputGroup, CRow } from '@coreui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AdminHeader from 'src/components/admin/AdminHeader'

import Axios from 'axios';

import 'src/scss/_custom.scss'


const AddClass = () => {

    const [classname, setClassName] = useState();

    const addcls = () => {
        Axios.post("http://localhost:3005/classecsub", {

        userAct : 'addClass',
        className : classname,
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
                            <h2 className='text-center defaultcolor' >Add Class </h2>
                            Class Name
                            <CInputGroup className="mb-3">
                            <CFormInput 
                                value={classname}
                                onChange={(e) => {setClassName(e.target.value);}}
                                className='borderRadius'
                                type="text"
                                required
                                tooltipFeedback
                            />
                            </CInputGroup>             
                            <CRow>
                            <CCol xs={12} className='text-center'>
                                <CButton className="px-4" type='submit' shape="rounded-pill" onClick={addcls}>
                                Add Class
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

export default AddClass
