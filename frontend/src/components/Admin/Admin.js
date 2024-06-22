import React from 'react'
import NAV from '../Navbar/NAV'
import Sidebar from './Sidebar/Sidebar'
import AdminNav from '../Navbar/AdminNav'

function Admin() {
  return (
    <div > 
      <div>  <AdminNav/></div>
      <div><Sidebar/></div>
      <div className='background' style={{height:'100vh'}}></div>
    
     </div>
  )
}

export default Admin