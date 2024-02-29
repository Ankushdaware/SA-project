import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  CContainer,
  CHeader,
  CHeaderDivider,
  CHeaderNav,
  CNavLink,
  CNavItem,
  CImage,
} from '@coreui/react'

import HeadAdminBreadcrumb from './HeadAdminBreadcrumb' 
import { HeadAdminHeaderDropdown } from './header/index'
import salogo from '../../assets/brand/SAlogo.png'
import '../../scss/_custom.scss'

const HeadAdminHeader = () => {


  return (
    <CHeader position="sticky" className="mb-4 header" >
        <CContainer fluid  >
          <CHeaderNav className="d-none d-md-flex me-auto"  >
            <CNavItem>
              <CNavLink to="/headadmin" component={NavLink}>
                <CImage src={salogo} height={48} />
                <a class="header-brand">Head Admin Dashboard</a>
              </CNavLink>
            </CNavItem>
          </CHeaderNav>
          <CHeaderNav className="ms-3">
            <HeadAdminHeaderDropdown />
          </CHeaderNav>
        </CContainer>
      <CHeaderDivider />
      <CContainer className='justify-content-center'>
        <HeadAdminBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default HeadAdminHeader
