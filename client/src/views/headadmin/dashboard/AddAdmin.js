import { CButton, CCol, CContainer, CForm, CFormInput, CInputGroup, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import HeadAdminHeader from 'src/components/headadmin/HeadAdminHeader'

import Axios from 'axios';


const AddAdmin = () => {

    const [adminName, setAdminName] = useState();
    const [email, setEmail] = useState();
    const [number, setNumber] = useState();
    const [schoolName, setSchoolName] = useState();
    const [schoolList, setSchoolList] = useState([{'school_name':'','school_id':''}]);

    useEffect(() => {
        const fetchData = async ()=>{
            const response = await fetch(`http://localhost:3005/schooldata`);
            const newData = await response.json();
            setSchoolList(newData);
        };
        fetchData();
    }, [])

    
    const admin = () => {
        Axios.post("http://localhost:3005/admins", {

            Name: adminName,
            email: email,
            contactNo: number,
            schoolName: schoolName,
            
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
                            <h2 className='text-center defaultcolor' >Add Admin </h2>
                            Name
                            <CInputGroup className="mb-3">
                            <CFormInput 
                                value={adminName} 
                                onChange={(e) => {
                                    setAdminName(e.target.value);
                                }}
                                style={{borderRadius:'25px'}} 
                                type="text"
                                aria-describedby="inputGroupPrependFeedback"
                                feedbackInvalid="Please enter School Name."
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
                            School Name
                            <select 
                                className="form-control borderRadius" 
                                value={schoolName}
                                onChange={(e) => {
                                    setSchoolName(e.target.value);
                                }}
                            >
                                <option value=''>Choose School Name</option>

                                {schoolList.map(school => (
                                    <option value={school.school_name} key={school.school_id} >{school.school_name}</option>
                            
                                    ))
                                }

                            </select> <br/>

                            <CRow>
                            <CCol xs={12} className='text-center'>
                                <CButton className="px-4" type='submit' shape="rounded-pill" onClick={admin}>
                                Register Admin
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

export default AddAdmin
