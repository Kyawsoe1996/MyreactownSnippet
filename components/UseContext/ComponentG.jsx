import React from 'react'
import {UserContext,ChannelContext} from './Main'
function ComponentG() {
    return (
        <div>
            <UserContext.Consumer>
               {
                   user => {
                       return <div>
                           <ChannelContext.Consumer>
                               {channel=> {
                                   return <div>Channel Context ... {channel.name}</div>
                               }
                               }
                           </ChannelContext.Consumer>
                           User context value is... {user.name}
                           <p>User age is ....{user.age}</p>
                           </div>
                   }
               }
            </UserContext.Consumer>
        </div>
    )
}

export default ComponentG
