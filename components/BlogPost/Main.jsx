import React,{useReducer,useEffect,useContext} from 'react'
import { BrowserRouter as Router, Switch , Route } from 'react-router-dom'
import Login from './Login'
import Navbar from './Navbar'
import Register from './Register'
import Service from './Service'
import About from './About'
import Logout from './Logout'
import Home from './Home';
import BlogPostDataService from './services/BlogPostDataService'



import { jsxAttribute } from '@babel/types'


export const LoginUserContext = React.createContext()
const initialState = {
    user_obj: [],
    
   
   
}


const reducer = (state,{type,payload}) => {
       switch (type) {
           case 'FETCH_USER':
               
               return {...state,user_obj:[...payload]}
           
       
           default:
               break;
       }

        
}





function Main() {
    const [users,dispatchUser]  = useReducer(reducer,initialState)
    const {user_obj,login_user_obj} = users
    useEffect(()=> {
       BlogPostDataService.getAllUsers().then(res=> {
            
            dispatchUser({type:'FETCH_USER',payload:res.data})
           
       }).catch(err=> {
           console.log(err)
       })
    },[])

    //for login user
    console.log(user_obj)
    
    
    

  
    const loginUserid = parseInt(localStorage.getItem('id'))
   
    const loginUser = user_obj.filter(u => u.id === loginUserid)
    console.log(loginUser,"Login User")
     
   
    
  

    return (
        <div>
           
            
            <Router>
                <LoginUserContext.Provider value={loginUser}>
                <Navbar />
                <Switch>
                    <Route path="/" exact  component={Home} />
                    <Route path='/register' component={Register} exact />
                    <Route path='/login' component={Login} exact />
                    <Route path='/service' component={Service} />
                    <Route path='/about' component={About} />
                    <Route path='/logout' component={Logout} />

                </Switch>
                </LoginUserContext.Provider>
            </Router>

        </div>
    )
}

export default Main



