import React, { useState } from 'react'

const JustTestingHooks = () => {
    const initialValue = 0
    const [count,setCount] = useState(initialValue)
    const [disable,setDisable] = useState(false)
    const handleIncrement = () => {
        setCount(count => count +1)
        setDisable(!disable)
        
    }
    const getColor = count===0 ? 'text-danger':'text-primary'
    return (
        <div>
           <h1>Testing Hooks</h1>
           <p>Initial Value: <span className={getColor}>{count}</span> </p>
           <button onClick={handleIncrement}>Increment</button>
           {count === 0  ? (<button disabled>Decrement</button>) : (<button onClick={()=>setCount(count => count -1)}>Decrement</button>)}
          

           <button  onClick={()=>setCount(count => initialValue)}>Reset to Default</button> 
           <ButonTest />

        </div>
    )
}

export default JustTestingHooks





function ButonTest() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Your state values: \n 
            email: ${email} \n 
            password: ${password} \n 
            You can replace this alert with your process`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email address</label>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={handleEmailChange}
          value={email}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={handlePasswordChange}
          value={password}
        />
      </div>
      <button type="submit" disabled={!email || !password}>
        Login
      </button>
    </form>
  );
}
