import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

const initData = { username: "thom27", password: "secretword123", repassword: "secretword123" }

function App() { 
  const [credentials, setCredentials] = useState(initData)
  const [user, setUser] = useState()
  const [route, setRoute] = useState('register')
  const [status, setStatus] = useState()
  const handleOnChange = e => { setCredentials({...credentials, [e.target.name]: e.target.value }) }
  const handleOnSubmit = e => {
    e.preventDefault()
    const { username, password, repassword } = credentials
    if (e.target.name === 'register') {
      if (password !== repassword) {
        return setStatus('Passwords do not match')
      }
      axios.post('http://localhost:5000/api/auth/register', { username, password })
        .then(res => {
          setUser(res.data.username)
          setRoute('login')
          setStatus(undefined)
          setCredentials(initData)
          console.log(res)
        })
        .catch(err => {
          console.log(err)
          setStatus('Error handling request')
      })
    } else if (e.target.name === 'login') {
      axios.post('http://localhost:5000/api/auth/login', { username, password })
        .then(res => {
          console.log(res)
          setStatus(undefined)
          setCredentials(initData)
        })
        .catch(err => {
          console.log(err)
          setStatus('Wrong credentials')
        })
    }

  }
  if (route === 'register') {
    return (
      <div>
        <form className="App" onSubmit={handleOnSubmit} name="register">
          <h2>Register</h2>
          {status && <h3>{status}</h3>}
          <label>
            Username
          </label>
          <input type="text" value={credentials.username} onChange={e => handleOnChange(e)} name="username"/>
          <label>
            Password
          </label>
          <input type="password" value={credentials.password} onChange={e => handleOnChange(e)} name="password" />
          <label>
            Re-enter Password
          </label>
          <input type="password" value={credentials.repassword} onChange={e => handleOnChange(e)} name="repassword"/>
          <button>Submit</button>
        </form>
        <button onClick={() => setRoute('login')}>Already registered? Login here</button>
      </div>

    );
  }
  if (route === 'login') {
    return (
      <form className="App" onSubmit={handleOnSubmit} name="login">
        <h2>Login</h2>
        {status && <h3>{status}</h3>}
        <label>
          Username
        </label>
        <input type="text" value={credentials.username} onChange={e => handleOnChange(e)} name="username"/>
        <label>
          Password
        </label>
        <input type="password" value={credentials.password} onChange={e => handleOnChange(e)} name="password" />
        <button>Submit</button>
      </form>
    )
  }
}

export default App;
