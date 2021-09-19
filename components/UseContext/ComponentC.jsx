import React from 'react'
import ComponentF from './ComponentF'
import {UserContext,ChannelContext} from './Main'
function ComponentC() {
    return (
        <div>
            <ComponentF />
            <hr />
            <ChannelContext.Consumer>
                    {channel => {
                        return <div>ON compnect C channel {channel.name}
                        
                        
                                <UserContext.Consumer>
                            {
                                user => {
                                    return <div>User Context name {user.name}</div>
                                }
                            }
                        </UserContext.Consumer>
                        </div>
                    }
                    }
               
            </ChannelContext.Consumer>
        </div>
    )
}

export default ComponentC
