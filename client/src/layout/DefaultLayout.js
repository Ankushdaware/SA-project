import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/home/index'

const DefaultLayout = () => {
  return (
      <div>
        <AppHeader />
        <div>
          <AppContent />
        </div>
      </div>
  )
}

export default DefaultLayout
