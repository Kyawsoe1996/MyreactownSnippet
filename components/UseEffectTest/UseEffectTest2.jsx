import React, { useEffect,useState } from 'react'
import UseEffectTest1 from './UseEffectTest1'
function UseEffectTest2() {
    const [display,setDisplay] = useState(true)

    const handleClick =()=>{
        console.log("Handle Clicked")
        setDisplay(!display)
    }
    return (
        <div>
           {display ? < UseEffectTest1/> : "No component Yet" }
            <button onClick={handleClick}>Use Effect Show</button>
        </div>
    )
}

export default UseEffectTest2
