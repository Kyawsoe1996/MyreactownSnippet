import React,{useState,useEffect} from 'react'

function UseEffectTimer() {
    const [count,setCount] = useState(0)
    const tick = () => {
        setCount(count+1 )
    }
    useEffect(()=> {
        
        
        const interval = setInterval(tick,1000)
        return ()=> {
            
           
            
            clearInterval(interval)
        }
    },[count])
    
    return (
        <div>
            <p>Timer count : {count}</p>
        </div>
    )
}

export default UseEffectTimer
