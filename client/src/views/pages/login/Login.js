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
  CFormLabel,
  CImage,
  CInputGroup,
  CNav,
  CNavLink,
  CRow,
} from '@coreui/react'
import google from '../../../assets/icons/google.png'
import facebook from '../../../assets/icons/facebook.png'
import mail from '../../../assets/icons/mail.png'

import '../../../scss/_custom.scss'

import Axios from 'axios';

const Login = () => {

  const [validated, setValidated] = useState(false)

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  const login = () => {
    Axios.post("http://localhost:3005/login", {
      userNameOrEmail: username,
      userPassword: password,
    }).then((response) => {

      console.log(response);
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus(response.data[0].username);
      }
    });
  };




  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className='p-4 maxcard'>
                <CCardBody>
                  <CForm 
                    // shape="rounded-pill"
                    className="row g-3 needs-validation"
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                  >
                    <h1 className='text-center defaultcolor' >Log In Here!</h1>
                    <CFormLabel >Username</CFormLabel>
                    <CInputGroup className="mb-3" >
                      <CFormInput 
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                        style={{borderRadius:'25px'}}
                        type="username"
                        aria-describedby="inputGroupPrependFeedback"
                        feedbackInvalid="Please enter userName."
                        required
                        tooltipFeedback
                      />
                    </CInputGroup>
                    Password
                    <CInputGroup className="mb-4">
                      
                      <CFormInput
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        style={{borderRadius:'25px'}}
                        type="password"
                        aria-describedby="inputGroupPrependFeedback"
                        feedbackInvalid="Please enter password"
                        required
                        tooltipFeedback
                      />
                      
                    </CInputGroup>
                    <CCol class="col-md-6 offset-md-7"  md={{ offset: 5 }} >
                      <CNav>
                        <CNavLink href="/forgotpassword" style={{color:'rgba(44, 56, 74, 0.95)'}}>
                          Forgot password ?
                        </CNavLink>
                      </CNav>
                        
                    </CCol>
                    
                    <CRow>
                      <CCol xs={12} className='text-center'>
                        <CButton className="px-4" type='submit' shape="rounded-pill" onClick={login}>
                          Log in
                        </CButton>
                      </CCol>
                    </CRow><br/><br/><br/>
                    <CRow className='justify-content-center'>
                      Or Log In with 
                    </CRow>
                    
                    <CNav className="flex-column flex-sm-row justify-content-center">
                      <CNavLink href="#">
                        <CImage src={mail} />
                      </CNavLink>
                      <CNavLink href="#">
                        <CImage src={facebook} />
                      </CNavLink>
                      <CNavLink href="#">
                        <CImage src={google} />
                      </CNavLink>
                    </CNav>
                    
                    <CNav className='justify-content-center'>
                      <CNavLink disabled className='padRight'>Don’t have an Account ?</CNavLink>
                      <CNavLink href='/register' className='padLeft'> &nbsp; Register Now</CNavLink>
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

export default Login
