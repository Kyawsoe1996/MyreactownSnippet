import userEvent from '@testing-library/user-event'
import React from 'react'
import {UserContext} from './Main'
function ComponentD() {
    return (
        <div>
            <UserContext.Consumer>
                {
                    user => {
                        return <div>COmponent D getting user value : {user.heigh}</div>
                    }
                }
            </UserContext.Consumer>
        </div>
    )
}

export default ComponentD
