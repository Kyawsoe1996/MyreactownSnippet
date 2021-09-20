import React from 'react'
import { BrowserRouter as Router, Switch , Route } from 'react-router-dom'
import Login from './Login'
import Navbar from './Navbar'
import Register from './Register'
import Service from './Service'
import About from './About'

function Main() {
    return (
        <div>
            <Router>
                <Navbar />
                <Switch>
                    <Route path="/" exact  component={Home}/>
                    <Route path='/register' component={Register} />
                    <Route path='/login' component={Login} />
                    <Route path='/service' component={Service} />
                    <Route path='/about' component={About} />

                </Switch>
            </Router>

        </div>
    )
}

export default Main


const Home = () => {
    return (
        <div>
            <p>Home</p>
        </div>
    )
}
