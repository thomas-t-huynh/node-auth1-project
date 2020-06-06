import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'

const initData = { username: "thom27", password: "secretword123", repassword: "secretword123" }

function App() { 

  const [credentials, setCredentials] = useState(initData)
  const [users, setUsers] = useState()
  const [route, setRoute] = useState()
  const [status, setStatus] = useState()
  
  useEffect(() => {
    if (route === 'users') {
      axios.get('http://localhost:5000/api/users/')
        .then(res => {
          setUsers(res.data)
          setStatus(undefined)
          setCredentials(initData)
          console.log(res)
        })
        .catch(err => {
          console.log(err)
          setStatus('Error handling request')
      })
    }
  }, [route])
  
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
          setRoute('users')
          setStatus(undefined)
          setCredentials(initData)
        })
        .catch(err => {
          console.log(err)
          setStatus('Wrong credentials')
        })
    }
  }
  const handleLogOut = () => {
    axios.get('http://localhost:5000/api/users/logout')
      .then(res => {
        console.log(res)
        setRoute("")
        setStatus(undefined)
      })
      .catch(err => {
        setStatus("Uh... idk what happened")
        console.log(err)
      })
  }
  if (!route) {
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
  if (route === 'users') {
    return (
      <div>
        <button onClick={() => handleLogOut()}>Logout</button>
        {users && users.map((user, i) => <h2 key={i}>{user.username}</h2>)}
      </div>
    )
  }
}


export default App;
