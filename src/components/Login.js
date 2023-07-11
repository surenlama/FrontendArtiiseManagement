import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { LoginUser, RegisterUser } from '../services/UserServices';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [token, setToken] = useCookies(['mytoken']);
  const [isLogin, setLogin] = useState(true);
  const navigate = useNavigate();
  const [error,setError] = useState(null);

  const loginBtn = () => {
    LoginUser({ username, password })
      .then(resp => {
        setToken('mytoken', resp.token);
        navigate('/musicmanage'); // Navigate to the home directory
      })

      .catch(error => {console.log('Error during login:', error)
      setError('Invalid Login Credential')
    });
  };
  
  const registerUser = () => {
    const user = {
      email: username,
      password: password
    };
console.log('start')
    RegisterUser(user, token['mytoken'])
      .then(resp => {
        console.log('resp', resp);
      })
      .catch(error => console.log('Error during registration:', error));
  };
  
  return (
    <div>
      <div className='log'>
        <br/>
        <br/>

        {isLogin ? <h1>Please Login</h1> : <h1>Please Register</h1>}
        <div className='mb-3'>
          <label htmlFor='username' className='form-label'>Username</label>
          <input type='text' className='form-control' id='username' placeholder='Please enter username' value={username} onChange={e => setusername(e.target.value)} />
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>Password</label>
          <input type='password' className='form-control' id='password' placeholder='Please enter password' value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <p className='text-danger'>{error}</p>
        {isLogin ? (
          <button onClick={loginBtn} className="btn btn-primary">Login</button>
        ) : (
          <button onClick={registerUser} className="btn btn-primary">Register</button>
        )}
        <div className='mb-3'>
          <br/>
          {isLogin ? (
            <h5>If you don't have an account, please <button className='btn btn-primary' onClick={() => setLogin(false)}>Register</button> here</h5>
          ) : (
            <h5>If you have an account, please <button className='btn btn-primary' onClick={() => setLogin(true)}>Login</button> here</h5>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
