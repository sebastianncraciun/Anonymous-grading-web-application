import React, { useState } from 'react';
function Form_Send() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    function handleSubmit(event) {
        event.preventDefault();

        if (!email || !password) {
            setError('All 2 values are required');
        } else {
            // Send a request to the server to verify the login credentials
            // Do something with the username and password here
            console.log(email,password);
        }
    }    

  return (
    <div className="login-container">
          <form className="loginForm" onSubmit={handleSubmit}>
          <label className="form-label">
          <span>Email:</span>
          <input className="form-input" type="email" name="email" value={email} onChange={event => setEmail(event.target.value)} required />
          </label>       
          <br />
          <label className="form-label">
              <span>Password:</span>
              <input className="form-input" type="password" name="password" value={password} onChange={event => setPassword(event.target.value)} required />
          </label>
          <br />
          <button className="form-button" type="submit">Verify Student</button>
        </form>
      </div>
    
  );
}

export default Form_Send;
