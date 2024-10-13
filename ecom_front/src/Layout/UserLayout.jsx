import React from 'react'
import UserNavbar from './UserNavbar'
import UserFooter from './UserFooter'

const UserLayout = ({children}) => {
  return (
    <div>
        <UserNavbar/>
            <div>{children}</div>
        <UserFooter/>
    </div>
  )
}

export default UserLayout