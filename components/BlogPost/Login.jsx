import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import React,{useReducer,useEffect,} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import BlogPostDataService from './services/BlogPostDataService'


const initialState = {
    username:'',
    password:'',
    loading:true,
    error:{
        username:'',
        password:'',
        invalidCredential:''
    },
  
    
}

const reducer = (state,{type,payload}) => {
       
        switch (type) {
            case 'username':
                
                return {...state,username:payload};
            case 'password':
                return {...state,password:payload}
            
            case 'usernameCheck':
                return {...state,error:{username:'Fill username'}}
            
            case 'passwordCheck':
                return {...state,error:{password:'Fill password'}}
            
            case 'invalidCredential':
                return {...state,error:{invalidCredential:"Invalid credential"}}
            
            case 'submit':
                return initialState
            
            case 'loading':
                return {...state,loading:false}
            
           
        
            default:
                throw new Error;
        }

}
// accepting props for the after login success to redirect
function Login(props) {

    
    const [user,Userdispatch] = useReducer(reducer,initialState)


    const {username,password,error,loading} = user
    useEffect(() => {
        
        if (localStorage.getItem('token') !== null) {
          window.location.replace('http://localhost:3000/');
        } else {
            Userdispatch({type:'loading'});
        }
      }, []);
   

    const errorColor = {
        color:'red'
    }

    const nextPath = path => {
        props.history.push(path);
      }

    const handleLogin = (e) => {
        const login_data ={
            username:username,
            password:password
        }
        
        e.preventDefault()
        if(!username){
            Userdispatch({type:'usernameCheck'})
        }else if(!password) {
            Userdispatch({type:'passwordCheck'})
        }else {

            
            BlogPostDataService.Login(login_data).then(res=> {
                
                if(res.data['error_message']){
                    Userdispatch({type:'invalidCredential'})
                }else {
                    
                    if (res.data.token) {
                        // const login_user = {
                        //     id:res.data.pk,
                        //     username:res.data.username
                        // }
                       
                        Userdispatch({type:'submit'})
                        localStorage.clear();
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('id', res.data.pk);

                        window.location.replace('http://localhost:3000/');
                        // nextPath('/')
                      }
                  
                   
                   
                    
                }
            }).catch(error => {
                console.log(error)
            })
        }
    }
    return (
        <div>
                
                {loading === false && (
                    <div className="login-form">
                        <form onSubmit={handleLogin}>
                            <h3>Login Form</h3>
                            <div className="form-label">
                            
                                <span> <FontAwesomeIcon icon={faUser}/>
                                <input type="text" placeholder="Username"
                                onChange={(e)=>Userdispatch({type:'username',payload:e.target.value})}
                                value={username}
                                />
                                </span>
                            </div>
                            <span style={errorColor}>{error.username}</span>
                            <div className="form-label">
                                
                                <span><FontAwesomeIcon icon={faLock}/>
                                <input type="password" placeholder="Password" 
                                onChange={(e)=>Userdispatch({type:'password',payload:e.target.value})}
                                value={password}
                                />
                                
                                </span>
                            </div>
                            <span style={errorColor}>{error.password}</span>
                            <p style={errorColor}>{error.invalidCredential}</p>
            
            
                            
                            
                                <input className="login-btn" type="submit" value="Login" />
                            
                        
                        </form>
                    </div>
                 )}
    </div>
    )
}

export default Login
