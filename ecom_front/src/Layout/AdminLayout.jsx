import React from 'react'
import AdminNav from './AdminNav'

const AdminLayout = ({children}) => {
  return (
    <div>
        <AdminNav/>
          <div>{children}</div>
    </div>
  )
}

export default AdminLayout