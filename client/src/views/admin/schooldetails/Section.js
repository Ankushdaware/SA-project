import { cilArrowThickLeft } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminHeader from 'src/components/admin/AdminHeader'

import 'src/scss/_custom.scss'

const Section = () => {

    const [section, setSection] = useState([])
    
    useEffect(() => {
        const fetchSection = async () => {
        const result = await fetch('http://localhost:3005/sectiondata')
        const jsonSection = await result.json()
    
        setSection(jsonSection)
        }
        fetchSection()
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
                        <h2 className='text-center defaultcolor'>Section</h2>
                        <CCard className='w-75 shadow middle-card'>
                            <CCardBody>
                                {section.map(section => 
                                <div key={section.section_id} className=''>
                                    <CCardBody>{section.section_name}</CCardBody>
                                    
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

export default Section
