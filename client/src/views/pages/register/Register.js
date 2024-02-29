import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CNav,
  CNavLink,
  CRow,
} from '@coreui/react'

import 'src/scss/_custom.scss'

import Axios from 'axios';
 


// import { APIRegister  } from '../../../api/APIRegister'

const Register = () => {

  const [usernameReg, setUsernameReg] = useState();
  const [emailReg, setEmailReg] = useState();
  const [contactNoReg, setcontactNoReg] = useState();


  const register = () => {
      Axios.post("http://localhost:3005/users", {
        Name: usernameReg,
        userEmail: emailReg,
        contactNo: contactNoReg
      }).then((response) => {
        console.log(response);
      });
    };
  

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className='p-4 maxcard' >
                <CCardBody>
                  <CForm>
                    <h1 className='text-center defaultcolor' >Register Now </h1>
                    Institution Name
                    <CInputGroup className="mb-3">
                      <CFormInput 
                        value={usernameReg} onChange={(e) => {
                          setUsernameReg(e.target.value);
                        }}
                        style={{borderRadius:'25px'}}
                        type="text"
                        aria-describedby="inputGroupPrependFeedback"
                        feedbackInvalid="Please enter Institution Name."
                        required
                        tooltipFeedback
                      />
                    </CInputGroup>
                    Email Id
                    <CInputGroup className="mb-4">
                      <CFormInput
                        value={emailReg} onChange={(e) => {
                          setEmailReg(e.target.value);
                        }}
                        style={{borderRadius:'25px'}}
                        type="email"
                        aria-describedby="inputGroupPrependFeedback"
                        feedbackInvalid="Please enter Email Id."
                        required
                        tooltipFeedback
                      />
                    </CInputGroup>
                    Contact Number
                    <CInputGroup className="mb-4">
                      <CFormInput
                        value={contactNoReg} onChange={(e) => {
                          setcontactNoReg(e.target.value);
                        }}
                        style={{borderRadius:'25px'}}
                        type="number"
                        aria-describedby="inputGroupPrependFeedback"
                        feedbackInvalid="Please enter Contact Number."
                        required
                        tooltipFeedback
                      />
                    </CInputGroup>                   
                    <CRow>
                      <CCol xs={12} className='text-center'>
                        <CButton onClick={register} className="px-4" type='submit' shape="rounded-pill">
                          Register
                        </CButton>
                      </CCol>
                    </CRow><br/>
                    
                    <CNav className='justify-content-center'>
                      <CNavLink disabled className='padRight'>Already have an Account ? </CNavLink>
                      <CNavLink href='/login' className='padLeft'> &nbsp; Log In</CNavLink>
                  </CNav>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
