import { cilArrowThickLeft } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminHeader from 'src/components/admin/AdminHeader'

import 'src/scss/_custom.scss'

const Subject = () => {

    const [subject, setSubject] = useState([])
    
    useEffect(() => {
        const fetchSubject = async () => {
        const result = await fetch('http://localhost:3005/subjectdata')
        const jsonSubject = await result.json()
    
        setSubject(jsonSubject)
        }
        fetchSubject()
    }, [])


  return (
    <div>
        <AdminHeader />
        <div className='add-div'>
                <Link to='/schooldetails' >
                    <CIcon icon={cilArrowThickLeft} /> Back
                </Link>
                <CRow>
                    <CCol >
                        <h2 className='text-center defaultcolor'>Subject</h2>
                        <CCard className='w-75 shadow middle-card'>
                            <CCardBody>
                                {subject.map(subject => 
                                <div key={subject.subject_id} className=''>
                                    <CCardBody>{subject.subject_name}</CCardBody>
                                    
                                </div>
                                )}
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
        </div>
    </div>
  )
}

export default Subject
