import React, { useState } from 'react'
import ComponentA from './ComponentA'
import ComponentB from './ComponentB'
import ComponentC from './ComponentC'
export const UserContext = React.createContext()
export const ChannelContext = React.createContext()
function Main() {
    const [user,SetUser] = useState(
        {name:"Shamu",age:23,heigh:4}
    )
    const [channel,SetChannel] = useState({
        name:"BBC NEWS",established:"2021"
    })
    console.log(user)
    return (
        <div>
            <h1>Main Component</h1>
            <UserContext.Provider value={user}>
                <ChannelContext.Provider value={channel}>
                <ComponentA/>
                <ComponentB/>
                <ComponentC />
                </ChannelContext.Provider>
            </UserContext.Provider>
        </div>
    )
}

export default Main
