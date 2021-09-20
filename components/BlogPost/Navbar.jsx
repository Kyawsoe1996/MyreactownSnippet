import React from 'react'
import logo from '../../logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
function Navbar() {
    
    return (
        <div>
            <nav>
          
                <img className="logo-img" src={logo} />
                <ul>
                    <Link to='/register'>
                        <li>Register</li>
                    </Link>

                    <Link to='/login'>
                        <li>Login</li>
                    </Link>

                    <Link to='/service'>
                        <li>Service</li>
                    </Link>

                    <Link to='/about'>
                        <li>About</li>
                    </Link>
                  
                 


                </ul>
            </nav>
        </div>
    )
}

export default Navbar
