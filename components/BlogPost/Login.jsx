import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Login() {
    return (
        <div>
        <div className="login-form">
            <form>
                <div className="form-label">
                  
                    <span> <FontAwesomeIcon icon={faUser}/><input type="text" placeholder="Username" /></span>
                </div>
                <div className="form-label">
                    
                    <span><FontAwesomeIcon icon={faLock}/><input type="password" placeholder="Password" /></span>
                </div>
                
               
                     <input className="login-btn" type="submit" value="Login" />
               
              
            </form>
        </div>
    </div>
    )
}

export default Login
