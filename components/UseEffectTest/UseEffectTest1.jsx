import React,{useEffect, useState} from 'react'

const  UseEffectTest1 = () => {

        const [count, setCount] = useState(0)
        const[name,setName] = useState('')
        useEffect(()=> {
           document.title = `Document title => ` + count
           console.log("Use Effect")
           
           return ()=> {
                
              console.log("Component Unmount!!!!!!!")
            
           }
          
            
        },[count])
        console.log("Render")
        return (
        <div>
            <p>Use Effect Test</p>
            <p>Initial Count: {count}</p>
            <button onClick={()=>setCount(prevCount => prevCount + 1)}>Increment</button>
        </div>
    )
}

export default UseEffectTest1


