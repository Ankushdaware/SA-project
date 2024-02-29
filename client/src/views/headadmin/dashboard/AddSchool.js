import { CButton, CCol, CContainer, CForm, CFormInput, CInputGroup, CRow } from '@coreui/react'
import React, { useState } from 'react'
import HeadAdminHeader from 'src/components/headadmin/HeadAdminHeader'

import Axios from 'axios';

const AddSchool = () => {

    const [instituteName, setInstitutionName] = useState();
    const [schoolName, setSchoolName] = useState();
    const [schoolRegName, setSchoolRegName] = useState();
    const [boardtype, setBoardType] = useState();
    const [address, setAddress] = useState();
    const [pincode, setPincode] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [country, setCountry] = useState();
    const [email, setEmail] = useState();
    const [number, setNumber] = useState();


    const school = () => {
        Axios.post("http://localhost:3005/schools", {

            institutionName: instituteName,
            schoolName: schoolName,
            registrationNo: schoolRegName,
            boardType: boardtype,
            location: {address, pincode, city, state, country},
            schoolEmail: email,
            contactNo: number,
        }).then((response) => {
          console.log(response);
        });
      };
    


  return (
    <div>
        <HeadAdminHeader />
        <div>
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={6}>
            
                        <CForm>
                            <h2 className='text-center defaultcolor' >Add School </h2>
                            Institution Name
                            <CInputGroup className="mb-3">
                            <CFormInput 
                                value={instituteName} 
                                onChange={(e) => {
                                    setInstitutionName(e.target.value);
                                }}
                                style={{borderRadius:'25px'}} 
                                type="text"
                                aria-describedby="inputGroupPrependFeedback"
                                feedbackInvalid="Please enter School Name."
                                required
                                tooltipFeedback
                            />
                            </CInputGroup>
                            School Name
                            <CInputGroup className="mb-3">
                            <CFormInput 
                                value={schoolName} 
                                onChange={(e) => {
                                    setSchoolName(e.target.value);
                                }}
                                style={{borderRadius:'25px'}} 
                                type="text"
                                aria-describedby="inputGroupPrependFeedback"
                                feedbackInvalid="Please enter School Name."
                                required
                                tooltipFeedback
                            />
                            </CInputGroup>
                            School Registration Number
                            <CInputGroup className="mb-4">
                            <CFormInput
                                value={schoolRegName} 
                                onChange={(e) => {
                                    setSchoolRegName(e.target.value);
                                }}
                                style={{borderRadius:'25px'}}
                                type="number"
                                aria-describedby="inputGroupPrependFeedback"
                                feedbackInvalid="Please enter School Registration Number."
                                required
                                tooltipFeedback
                            />
                            </CInputGroup>
                            Board Type
                            <CInputGroup className="mb-3">
                            <CFormInput 
                                value={boardtype} 
                                onChange={(e) => {
                                    setBoardType(e.target.value);
                                }}
                                style={{borderRadius:'25px'}} 
                                type="text"
                                aria-describedby="inputGroupPrependFeedback"
                                feedbackInvalid="Please enter Board Type."
                                required
                                tooltipFeedback
                            />
                            </CInputGroup>
                            Address 
                            <CInputGroup className="mb-3">
                            <CFormInput 
                                value={address} 
                                onChange={(e) => {
                                    setAddress(e.target.value);
                                }}
                                style={{borderRadius:'25px'}} 
                                type="text"
                                aria-describedby="inputGroupPrependFeedback"
                                feedbackInvalid="Please enter Address."
                                required
                                tooltipFeedback
                            />
                            </CInputGroup>
                            Pincode
                            <CInputGroup className="mb-4">
                            <CFormInput
                                value={pincode} 
                                onChange={(e) => {
                                    setPincode(e.target.value);
                                }}
                                style={{borderRadius:'25px'}}
                                type="number"
                                aria-describedby="inputGroupPrependFeedback"
                                feedbackInvalid="Please enter Pincode."
                                required
                                tooltipFeedback
                            />
                            </CInputGroup>
                            City
                            <CInputGroup className="mb-3">
                            <CFormInput 
                                value={city} 
                                onChange={(e) => {
                                    setCity(e.target.value);
                                }}
                                style={{borderRadius:'25px'}} 
                                type="text"
                                aria-describedby="inputGroupPrependFeedback"
                                feedbackInvalid="Please enter City."
                                required
                                tooltipFeedback
                            />
                            </CInputGroup>
                            State 
                            <CInputGroup className="mb-3">
                            <CFormInput 
                                value={state} 
                                onChange={(e) => {
                                    setState(e.target.value);
                                }}
                                style={{borderRadius:'25px'}} 
                                type="text"
                                aria-describedby="inputGroupPrependFeedback"
                                feedbackInvalid="Please enter State."
                                required
                                tooltipFeedback
                            />
                            </CInputGroup>
                            Country 
                            <CInputGroup className="mb-3">
                            <CFormInput 
                                value={country} 
                                onChange={(e) => {
                                    setCountry(e.target.value);
                                }}
                                style={{borderRadius:'25px'}} 
                                type="text"
                                aria-describedby="inputGroupPrependFeedback"
                                feedbackInvalid="Please enter Country."
                                required
                                tooltipFeedback
                            />
                            </CInputGroup>
                            Email Id
                            <CInputGroup className="mb-4">
                            <CFormInput
                                value={email} 
                                onChange={(e) => {
                                    setEmail(e.target.value);
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
                                value={number} 
                                onChange={(e) => {
                                    setNumber(e.target.value);
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
                                <CButton className="px-4" type='submit' shape="rounded-pill" onClick={school}>
                                Add School
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

export default AddSchool
