import userEvent from '@testing-library/user-event'
import React from 'react'
import ComponentD from './ComponentD'
import {UserContext} from './Main'
function ComponentA() {
    const Mystle ={
        color:'green'
    }
    const username ={
        color:'red'
    }
    return (
        <div>
            <ComponentD />
            <div>
                <h1 style={Mystle}>Additional Component A Data</h1>
                <UserContext.Consumer>
                    {
                    user => {
                        return <div>
                            <p>Username <span style={username}>{user.name}</span></p>
                        </div>
                    }
                    }
                </UserContext.Consumer>
            </div>
            
        </div>
    )
}

export default ComponentA
