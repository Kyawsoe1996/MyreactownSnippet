import React,{useState,useEffect, Fragment,useContext} from 'react'
import logo from '../../logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
import { LoginUserContext } from './Main'
function Navbar() {
    const [isAuth, setIsAuth] = useState(false);
    
    useEffect(() => {
        
        if (localStorage.getItem('token') !== null) {
          setIsAuth(true);
        }
      }, []);
      const loginUser = useContext(LoginUserContext)
    return (
        <div>
            <nav>
          
                <Link to='/'>
                 <img className="logo-img" src={logo} />
                </Link>
                <ul>
                    {isAuth === true ? (
                        <Fragment>
                            <Link to='/'>
                                <li>Home</li>
                            </Link>
                            <Link to='/service'>
                                <li>Service</li>
                            </Link>

                            <Link to='/about'>
                                <li>About</li>
                            </Link>
                            
                            {/* <LoginUserContext.Consumer>
                                        {
                                            loginUser => {
                                                
                                                
                                                if (loginUser.length  > 0) {
                                                    return <Link> <li><FontAwesomeIcon icon={faUser}/>{loginUser[0].user.username}</li>
                                                        </Link>
                                                }else {
                                                    return <div><h1>Not getting the user back from LoginUserContext</h1></div>
                                                }
                                                
                                            }
                                        }
                            </LoginUserContext.Consumer>  */}
                            {loginUser.length>0? (
                                <Link to='/'> 
                                     <li><FontAwesomeIcon icon={faUser}/>{loginUser[0].user.username}</li>
                                </Link>

                            ):(<h1>Not getting the user back from LoginUserContext</h1>)}
                            <Link to='/logout'>
                            <li>Logout</li>
                            </Link>
                        </Fragment>
                    ):(
                        <Fragment>
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
                        </Fragment>
                    )}
                  

                   
                  
                 


                </ul>
            </nav>
        </div>
    )
}

export default Navbar
