import { cilArrowThickLeft } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import AdminHeader from 'src/components/admin/AdminHeader'

import 'src/scss/_custom.scss'

const ClassSubject = () => {
  return (
    <div>
        <AdminHeader />
        <div className='add-div'>
                <Link to='/schooldetails' >
                    <CIcon icon={cilArrowThickLeft} /> Back
                </Link>
                <CRow>
                    <CCol >
                        <h2 className='text-center defaultcolor'>Class Subject </h2>
                        <CCard className='w-75 shadow middle-card'>
                            <CCardBody>
                                Class Subject 
                            </CCardBody>
                        </CCard>
                        <CCard className='w-75 shadow middle-card'>
                            <CCardBody>
                                Class Subject 
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
        </div>
    </div>
  )
}

export default ClassSubject
