import React, { useState,useEffect } from 'react'
import axios from 'axios'
function APIwithuseEffect() {
    const [users,setUsers] = useState([])
    useEffect (()=> {
        axios.get('https://jsonplaceholder.typicode.com/users').then(
            res => {
                console.log(res.data)
                setUsers(res.data)
                
            }
        ).catch(error => {
            console.log(error)
        })
    },[])
    return (
        <div>
          <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone</th>

                    </tr>
                </thead>
                <tbody>
                    {users.map(user =>
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.phone}</td>

                    </tr>
                     )}
                </tbody>
          </table>
        </div>
    )
}

export default APIwithuseEffect
