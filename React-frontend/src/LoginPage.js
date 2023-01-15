import React, { useState } from 'react';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [team, setTeam] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const data = { name: name, email: email, password: password, team: team};
    function handleSubmit(event) {
        event.preventDefault();

        if (!email || !password || !name || !team) {
            setError('All 4 values are required');
        } else {
            fetch('http://localhost:8080/students', {
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
            setName('');
            setTeam('');
            setPassword('');
            })
            .catch(error => {
            // Handle the error here
            console.error('Error:', error);
            });
                console.log(data.email, data.name, data.team, data.password);
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
              <input className="form-input" type="text" name="team" value={team} onChange={event => setTeam(event.target.value)} required />
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
