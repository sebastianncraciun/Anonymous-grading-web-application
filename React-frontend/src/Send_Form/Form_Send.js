import React, { useState } from 'react';
function Form_Send() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const data = {  email: email, password: password,};
    function handleSubmit(event) {
        event.preventDefault();

        if (!email || !password) {
            setError('All 2 values are required');
        } else {
            fetch('http://localhost:8080/loginStudent', {
            mode: 'no-cors',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
            // Handle the response here
            // If the request is successful, you can clear the form inputs
            setEmail('');
            setPassword('');
            })
            .catch(error => {
            // Handle the error here
            console.error('Error:', error);
            });
                console.log(data.email,data.password);
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




