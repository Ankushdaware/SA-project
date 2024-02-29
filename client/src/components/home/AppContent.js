// import React, { Suspense } from 'react'
// import { Navigate, Route, Routes } from 'react-router-dom'
// import { CContainer, CSpinner } from '@coreui/react'

// // routes config
// import routes from '../routes'

// const AppContent = () => {
//   return (
//     <CContainer lg>
//       <Suspense fallback={<CSpinner color="primary" />}>
//         <Routes>
//           {routes.map((route, idx) => {
//             return (
//               route.element && (
//                 <Route
//                   key={idx}
//                   path={route.path}
//                   exact={route.exact}
//                   name={route.name}
//                   element={<route.element />}
//                 />
//               )
//             )
//           })}
//           <Route path="/" element={<Navigate to="dashboard" replace />} />
//         </Routes>
//       </Suspense>
//     </CContainer>
//   )
// }

// export default React.memo(AppContent)


import React from 'react'

const AppContent = () => {
  return (
    <div className='d-flex'>
        <div>
            <h1>Time Table Management System</h1>
            <p>Manage complex timetables with Schedule Application</p>
        </div>
        <div>Image</div>
    </div>
  )
}

export default AppContent
