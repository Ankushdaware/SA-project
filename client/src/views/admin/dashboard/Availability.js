import { cilArrowThickLeft } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CCol, CContainer, CForm, CFormInput, CInputGroup, CRow } from '@coreui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import AdminHeader from 'src/components/admin/AdminHeader'

import 'src/scss/_custom.scss'


const Availability = () => {
  return (
    <div>
        <AdminHeader />
        <div>
            <CContainer>
            <Link to='/admin' >
                <CIcon icon={cilArrowThickLeft} /> Back
              </Link>
                <CRow className="justify-content-center">
                    <CCol md={4}>
            
                        <CForm>
                            <h2 className='text-center defaultcolor' > Availability of Teacher </h2>
                            Day
                            <CInputGroup className="mb-3">
                            <CFormInput 
                                className='borderRadius'
                                type="text"
                                required
                                tooltipFeedback
                            />
                            </CInputGroup>   
                            Lecture
                            <CInputGroup className="mb-3">
                            <CFormInput 
                                className='borderRadius' 
                                type="number"
                                required
                                tooltipFeedback
                            />
                            </CInputGroup>       
                            <CRow>
                            <CCol xs={12} className='text-center'>
                                <CButton className="px-4" type='submit' shape="rounded-pill">
                                Search
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

export default Availability
