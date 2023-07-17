import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { LoginUser, RegisterUser } from '../services/UserServices';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setusername] = useState('');
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [token, setToken] = useCookies(['mytoken']);
  const [isLogin, setLogin] = useState(true);
  const [state, setState] = useState('');

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [message, setmessage] = useState(null);

  const loginBtn = () => {
    LoginUser({ username, password })
      .then((resp) => {
        setToken('mytoken', resp.token);
        navigate('/musicmanage', {replace: true}); // Navigate to the desired page after successful login
      })
      .catch((error) => {
        console.log('Error during login:', error);
        setError('Invalid Login Credential');
      });
  };

  const registerUser = () => {
    const user = {
      first_name: firstname,
      last_name: lastname,
      email: email,
      phone: phone,
      dob: dob,
      gender: gender,
      address: address,
      password: password,
    };

    RegisterUser(user, token['mytoken'])
      .then((resp) => {
        console.log('Successfully registered', resp);
        setmessage('Successfully Registered');
        setLogin(true); // Set the login state to true to display the login form
      })
      .catch((error) => {
        let errorMessage = 'An error occurred User Adding.'; // Default error message

        if (error.response && error.response.data) {
          if (error.response.data.first_name) {
            errorMessage = error.response.data.first_name[0];
          } else if (error.response.data.phone) {
            errorMessage = error.response.data.phone[0];
          } else if (error.response.data.dob) {
            errorMessage = error.response.data.dob[0];
          } else if (error.response.data.password) {
            errorMessage = error.response.data.password[0];
          } else if (error.response.data.email) {
            errorMessage = error.response.data.email[0];
          }
        }
        console.log('error', error.response);
        setError(errorMessage);
      });
  };

  return (
    <div>
      <div className='log'>
        <br />
        <br />

        {isLogin ? (
          <div>
            <h1>Please Login</h1>
            <div className='mb-3'>
              <label htmlFor='username' className='form-label'>
                Username
              </label>
              <input
                type='text'
                className='form-control'
                id='username'
                placeholder='Please enter username'
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>
                Password
              </label>
              <input
                type='password'
                className='form-control'
                id='password'
                placeholder='Please enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p className='text-danger'>{error}</p>
            <p className='text-danger'>{message}</p>
            <button onClick={loginBtn} className='btn btn-primary'>
              Login
            </button>
            <div className='mb-3'>
              <br />
              <h5>
                If you don't have an account, please{' '}
                <button
                  className='btn btn-primary'
                  onClick={() => setLogin(false)}
                >
                  Register
                </button>{' '}
                here
              </h5>
            </div>
          </div>
        ) : (
          <div>
            <h1>Please Register</h1>
            <div className='mb-3'>
              <label htmlFor='first_name' className='form-label'>
                First Name
              </label>
              <input
                type='text'
                className='form-control'
                id='first_name'
                placeholder='Please enter first name'
                value={firstname}
                onChange={(e) => setfirstname(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='last_name' className='form-label'>
                Last Name
              </label>
              <input
                type='text'
                className='form-control'
                id='last_name'
                placeholder='Please enter last name'
                value={lastname}
                onChange={(e) => setlastname(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>
                Email
              </label>
              <input
                type='email'
                className='form-control'
                id='email'
                placeholder='Please enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='phone' className='form-label'>
                Phone
              </label>
              <input
                type='text'
                className='form-control'
                id='phone'
                placeholder='Please enter phone number'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='dob' className='form-label'>
                Date of Birth
              </label>
              <input
                type='date'
                className='form-control'
                id='dob'
                placeholder='Please enter date of birth'
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='gender' className='form-label'>
                Gender
              </label>
              <select
                className='form-control'
                id='gender'
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value=''>Select Gender</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
                <option value='Other'>Other</option>
              </select>
            </div>
            <div className='mb-3'>
              <label htmlFor='address' className='form-label'>
                Address
              </label>
              <input
                type='text'
                className='form-control'
                id='address'
                placeholder='Please enter address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>
                Password
              </label>
              <input
                type='password'
                className='form-control'
                id='password'
                placeholder='Please enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p className='text-danger'>{error}</p>
            <p className='text-danger'>{message}</p>
            <button onClick={registerUser} className='btn btn-primary'>
              Register
            </button>
            <div className='mb-3'>
              <br />
              <h5>
                If you have an account, please{' '}
                <button
                  className='btn btn-primary'
                  onClick={() => setLogin(true)}
                >
                  Login
                </button>{' '}
                here
              </h5>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
