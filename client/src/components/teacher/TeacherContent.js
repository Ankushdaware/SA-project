import { CButton, CCard, CCardTitle, CCol, CContainer, CRow } from '@coreui/react'
import React from 'react'

const TeacherContent = () => {
  return (
    <div>
      <CContainer className='teacher-mar'>
        <CRow xs={{ cols: 1, gutterX: 1, gutterY:5}} md={{ cols: 4 }}>
            <CCol >
                <CButton href='/teacheraddstudent' className='shadow teacher-content ' >
                    <CCard>
                        <CCardTitle>Add Student</CCardTitle>
                    </CCard>
                </CButton>
            </CCol>
            <CCol>
                <CButton href='/teacherattendance' className='shadow teacher-content' >
                    <CCard>
                        <CCardTitle>Attendance</CCardTitle>
                    </CCard>
                </CButton>
            </CCol>
            <CCol>
                <CButton href='/teacherviewtimetable' className='shadow teacher-content' >
                    <CCard>
                        <CCardTitle>View Timetable</CCardTitle>
                    </CCard>
                </CButton>
            </CCol>
            <CCol>
                <CButton href='/teacherleavesection' className='shadow teacher-content' >
                    <CCard>
                        <CCardTitle>Leave Section</CCardTitle>
                    </CCard>
                </CButton>
            </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default TeacherContent
