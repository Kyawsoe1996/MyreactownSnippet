import React, { useReducer,useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faMailBulk, faVoicemail, faPassport, faPhone, faAddressBook, faHeadSideCough, faExclamationCircle, faSeedling, faLock } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import BlogPostDataService from './services/BlogPostDataService'
import { data, error } from 'jquery'
import validator from 'validator'


const initialUserState = {
    username:'',
    email:'',
    password:'',
    confirmPassword:'',
    phone:'',
    address:'',
    loading:true,
    error:{
        password:'',
        email:'',
        username:'',
        confirmPassword:'',
        address:'',
        phone:''
    }

}
const reducer = (state,{type,payload}) => {
    switch (type) {
        case 'username':
           
            return {...state,username:payload}
            
        case 'email':
          

            return {...state,email:payload}

        case 'password':
            return {...state,password:payload}

        case 'confirmPassword':
            return {...state,confirmPassword:payload}

        case 'phno':
            return {...state,phone:payload}

        case 'address':
            return {...state,address:payload}
        
        case 'passwordnotmatch':
            return {...state,error:{password:"The two password does not match"}}

        case 'emailCheck':
            return {...state,error:{email:"Email is Wrong"}}
        
        case 'passwordCheck':
            return {...state,error:{password:"Fill Password"}}

        case 'confirmpasswordCheck':
            return {...state,error:{confirmPassword:"Fill Confirm Password"}}
        
        case 'phoneCheck':
            return {...state,error:{phone:"Fill Phone  Number"}}
        
        case 'addressCheck':
            return {...state,error:{phone:"Fill Address"}}
        
        case 'usernameCheck':
            return {...state,error:{username:"Fill Username"}}
        
        case 'PhNumberUniqueAfterSubmmit':
            return {...state,error:{phone:"Phone Number is Already Provided"}}

        case 'EmailUniqueAfterSubmit':
            return {...state,error:{email:"Email is Already Provided"}}
        
        
        case 'loading':
            return {...state,loading:false}
        
        
        case 'submit':
            
            return initialUserState

        default:
            throw new Error;
       }
}

 

// accepting props for the after register success and  to redirect in login
function Register(props) {
    const [user,dispatchUser] =useReducer(reducer,initialUserState)
    const {username,email,password,confirmPassword,phone,address,error,loading} = user

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
          window.location.replace('http://localhost:3000/');
        } else {
            dispatchUser({type:'loading'})
        }
      }, []);

    const nextPath = path => {
        props.history.push(path);
      }

    const handleUserRegister = (e) => {
       
        console.log("Btn submit")
        e.preventDefault()
      
        const submitted_data = {
            user:{
                email:email,
                username:username,
                password:password,
                password2:confirmPassword
            },
            phone_number:phone ,
            present_address:address
        }

        if(password !==  confirmPassword){
            dispatchUser({type:'passwordnotmatch'})
            
        } else if(!validator.isEmail(email)){
               
            dispatchUser({type:'emailCheck'})
        } else if(!username){
               
           
            dispatchUser({type:'usernameCheck'})
          
        } else if(!password){
               
            dispatchUser({type:'passwordCheck'})
        } else if(!confirmPassword){
               
            dispatchUser({type:'confirmpasswordCheck'})
        } else if(!phone){
               
            dispatchUser({type:'phoneCheck'})
        }else if(!address){
               
            dispatchUser({type:'addressCheck'})
        }


        
        

        
        
        else{
            axios.post('http://localhost:8000/api/account/users/',submitted_data).then(res=>{
                   
           
            if(res.data['error_code'] === 404){
                
                dispatchUser({type:'PhNumberUniqueAfterSubmmit'})
            } else if (res.data['email_exist'] === "true"){
                dispatchUser({type:'EmailUniqueAfterSubmit'})
            }
            
            else {
                
                if (res.data.token) {
                    console.log(res.data,"RES DATA")
                    dispatchUser({type:'submit'})
                    localStorage.clear();
                    // localStorage.setItem('token', res.data.token);
                    // localStorage.setItem('id', res.data.id);

                    window.location.replace('http://localhost:3000/login');
                    // nextPath('/')
                }
              
                
                
            }
            
            }).catch(err=> {
                console.log(err)
            })
            
            
           

            
        }
        
    
       
   
        
    }
    
    return (
        <div>
             {loading === false && <h1>Signup</h1>}
            <div className="register-form">

                <form onSubmit={(e)=>handleUserRegister(e)}>
                <h3 >Register Form</h3>
                    <div className="form-label">
                      
                        <span> <FontAwesomeIcon icon={faUser}/>
                        <input type="text" placeholder="Username" 
                        onChange={(e)=>dispatchUser({type:'username',payload:e.target.value})}
                        value={username} />
                        </span>
                    </div>
                    <span style={{color:'red'}}>{error.username}</span>
                    
                    <div className="form-label">
                        
                        <span><FontAwesomeIcon icon={faMailBulk}/>
                        <input type="email" placeholder="Email"
                         onChange={(e)=>dispatchUser({type:'email',payload:e.target.value})}  value={email}/>
                        </span>
                    </div>
                    <span style={{color:'red'}}>{error.email}</span>

                    <div className="form-label">
                       
                        <span><FontAwesomeIcon icon={faLock}/>
                        <input type="password"  placeholder="Password" 
                         onChange={(e)=>dispatchUser({type:'password',payload:e.target.value})}  value={password}/>
                        </span>
                    </div>
                    <span style={{color:'red'}}>{error.password}</span>

                    <div className="form-label">
                        
                        <span><FontAwesomeIcon icon={faLock}/>
                        <input type="password"  placeholder="Confirm Password" 
                         onChange={(e)=>dispatchUser({type:'confirmPassword',payload:e.target.value})} value={confirmPassword}/>
                        </span>
                    </div>
                    <span style={{color:'red'}}>{error.confirmPassword}</span>

                    <div className="form-label">
                        
                       <span><FontAwesomeIcon icon={faPhone}/>
                        <input type="number"  placeholder="Ph No" 
                         onChange={(e)=>dispatchUser({type:'phno',payload:e.target.value})} value={phone}/>
                        </span>
                    </div>
                    <span style={{color:'red'}}>{error.phone}</span>

                    <div className="form-label">
                       
                        <span><FontAwesomeIcon icon={faAddressBook}/>
                        <input type="text"  placeholder="Address" 
                         onChange={(e)=>dispatchUser({type:'address',payload:e.target.value})} value={address}/>
                        </span>
                    </div>
                    <span style={{color:'red'}}>{error.address}</span>
                   
                         <input  className="register-btn" type="submit" value="Register" />
                   
                  
                </form>
            </div>
        </div>
    )
}

export default Register
