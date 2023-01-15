import React, { useState } from 'react';
function Form_Send() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const SERVER = 'http://localhost:8080'

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
    const checkwithDB = async () =>{
      let myEmail = document.getElementById('email').value;
      let echipamea = document.getElementById('echipamea');
      let lista = [];
      const requestOptions = {method: 'GET'}
      const response = await fetch(`${SERVER}/student/${myEmail}`, requestOptions)
      .then(response => response.json())
      .then(response => echipamea.innerHTML="Your team is: "+response.teamName);
    }


  return (
    <div className="login-container">
          <form className="loginForm" onSubmit={handleSubmit}>
          <label className="form-label">
          <span>Email:</span>
          <input className="form-input" id="email" type="email" name="email" value={email} onChange={event => setEmail(event.target.value)} required />
          </label>    
          <br />
          <button className="form-button" type="submit"  onClick={checkwithDB}>Verify Student</button>
          <br />
          <div id="echipamea"></div>
        </form>
      </div>
    
  );
}

export default Form_Send;
