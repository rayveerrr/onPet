import { useState, } from 'react'
import Navbar from '../../components/Navbar';
import useAuthentication from '../../hooks/auth/authenticate-user';

function Admin() {
    const orderStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }

      // useAuthentication('User')
    
    const [navVisible, showNavbar] = useState(false);
  return (
    <div>
            <Navbar visible={ navVisible } show={ showNavbar } />
            <div className={!navVisible ? "page" : "page page-with-navbar"} style={orderStyle}></div>
    </div>
  )
}

export default Admin