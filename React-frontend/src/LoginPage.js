import React, { useState } from 'react';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [teamname, setTeamName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    function handleSubmit(event) {
        event.preventDefault();

        if (!email || !password || !name || !teamname) {
            setError('All 4 values are required');
        } else {
            // Send a request to the server to verify the login credentials
            // Do something with the username and password here
            console.log(email, name, teamname, password);
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
              <span>Name:</span>
              <input className="form-input" type="text" name="name" value={name} onChange={event => setName(event.target.value)} required />
          </label>
          <br />
          <label className="form-label">
              <span>Teamname:</span>
              <input className="form-input" type="text" name="teamname" value={teamname} onChange={event => setTeamName(event.target.value)} required />
          </label>
          <br />
          <label className="form-label">
              <span>Password:</span>
              <input className="form-input" type="password" name="password" value={password} onChange={event => setPassword(event.target.value)} required />
          </label>
          <br />
          <button className="form-button" type="submit">Add participant</button>
        </form>
      </div>
    );
  }

export default LoginPage;
