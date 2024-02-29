import { CButton, CCard, CContainer, CImage } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Axios from 'axios';

const HeadAdminContent = () => {

  const [school, setSchool] = useState([])
  const [admin, setAdmin] = useState([])

  useEffect(() => {
    const fetchSchool = async () => {
      const schoolresult = await fetch('http://localhost:3005/schooldata')
      const jsonSchool = await schoolresult.json()

      setSchool(jsonSchool)
    }
    fetchSchool()
  }, [])

  useEffect(() => {
    const fetchAdmin = async () => {
      const adminresult = await fetch('http://localhost:3005/admindata')
      const jsonAdmin = await adminresult.json()

      setAdmin(jsonAdmin)
    }
    fetchAdmin()
  }, [])

  return (
    <>
    <CContainer >
      <CButton className='h-a-contentSchool' href='/addschool' size="lg"  >
        Add School
      </CButton>
      <CButton className='h-a-contentAdmin' href='/addadmin' size="lg" >
        Add Admin
      </CButton>


      

    </CContainer>
    <CContainer className='d-flex'>
      <div>
        <h2>School</h2>
        {school.map(school => 
          <div key={school.school_id} className=''>
            <h4>{school.school_name}</h4>
            <p>Details</p>
            {school.school_reg_no} <br/>
            {school.board_type} <br/>
            {school.school_address} <br/>
            {school.school_email_id} <br/>
            {school.school_contact_no} <br/>

          </div>
          )}
      </div>
      <div>
        <h2>Admin</h2>

          {admin.map(admin =>
            <div key={admin.admin_id} className=''>
              <h4>Details</h4> 
              {admin.admin_name} <br/>
              {admin.admin_contact_no} <br/>
              {admin.admin_school_name} <br/>
            </div>)}
      </div>
    

    </CContainer>
    </>
  )
}

export default HeadAdminContent
