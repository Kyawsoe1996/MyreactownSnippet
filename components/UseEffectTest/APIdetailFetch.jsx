import React, { useEffect, useState } from 'react'
import axios from 'axios'
function APIdetailFetch() {
    const [user,setUser] = useState('')
    const [loading,setLoading] =  useState(true)
    const[id,setId] = useState()
    const[idFrombuttonCLick,setIdFromButtonClick]=useState()
    const handleGetUser = () => {
        setIdFromButtonClick(id)
        setLoading(!loading)
    }
    useEffect(()=> {
       
        axios.get('https://jsonplaceholder.typicode.com/users/'+ idFrombuttonCLick).then(res=> {
           
            setUser(res.data.username)
            setLoading(!loading)
        })
    },[idFrombuttonCLick])
    return (
        <div>
            <h1>API Detail Fetch</h1>
            <input type="text" type="number" onChange={(e)=>setId(e.target.value)} value={id} /> <br/>
            <p>Username ==> : {loading ? "Loading": user  } </p>
            <button onClick={handleGetUser}>GET USER</button>
        </div>
    )
}

export default APIdetailFetch
