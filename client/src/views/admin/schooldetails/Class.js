import { cilArrowThickLeft } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminHeader from 'src/components/admin/AdminHeader'

import 'src/scss/_custom.scss'

const Class = () => {


    const [classes, setClasses] = useState([])
    
    useEffect(() => {
        const fetchClass = async () => {
        const result = await fetch('http://localhost:3005/classdata')
        const jsonClass = await result.json()
    
        setClasses(jsonClass)
        }
        fetchClass()
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
                        <h2 className='text-center defaultcolor'>Class</h2>
                        <CCard className='w-75 shadow middle-card'>
                            <CCardBody>
                                {classes.map(classes => 
                                <div key={classes.class_id} className=''>
                                    <CCardBody>{classes.class_name}</CCardBody>
                                    
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

export default Class
