import { cilArrowThickLeft } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminHeader from 'src/components/admin/AdminHeader'

import 'src/scss/_custom.scss'

const Teachers = () => {

  const [teacher, setTeacher] = useState([])

  useEffect(() => {
    const fetchTeacher = async () => {
      const result = await fetch('http://localhost:3005/teacherdata')
      const jsonTeacher = await result.json()

      setTeacher(jsonTeacher)
    }
    fetchTeacher()
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
                        <h2 className='text-center defaultcolor'>Teachers</h2>
                        <CCard className='w-75 shadow middle-card'>
                            <CCardBody>
                            {teacher.map(teachers => 
                            <div key={teachers.teacher_id} className=''>
                                <CCardBody>{teachers.teacher_name}</CCardBody>
                                
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

export default Teachers
