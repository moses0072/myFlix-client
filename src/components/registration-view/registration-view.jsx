import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import './registration-view.scss';

export function RegistrationView(props) {
  const [ username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const [usernameError, setUsernameError] = useState({});
  const [passwordError, setPasswordError] = useState({});
  const [emailError, setEmailError] = useState({});
  
  const handleRegister = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    const isValid = formValidation();
    
    if (isValid) {
      axios.post('https://mytopfilms.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      }).then (response => {
        const data = response.data;
        console.log(data);
        window.open('/', 'self');
      }).catch (e => {
        console.log('User can\'t be registerd')
      });
    }
  };

  const formValidation = () => {
    const usernameError = {};
    const passwordError = {};
    const emailError = {};
    const birthdayError = {};
    let isValid = true;

    if (username.trim().length < 5) {
      usernameError.usernameShort = ' Username must be at least 5 characters';
      isValid = false;
    }

    if (password.trim().length === 0) {
      passwordError.passwordMissing = 'Password is required';
      isValid = false;
    }

    if (password.trim().length < 6) {
      passwordError.passwordMissing = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (!email.includes('.') && !email.includes('@')) {
      emailError.notEmail = 'Enter a valid email';
      isValid = false;
    }

    setUsernameError(usernameError);
    setPasswordError(passwordError);
    setEmailError(emailError);
    return isValid;
  };

  const toggleRegister = (e) => {
    e.preventDefault();
    props.toggleRegister();
  }
  

  return (
    
    <Form className='log-reg-view'>
      <Form.Group controlId='formUsername'>
        <Form.Label>Username:</Form.Label>
        <Form.Control type='text' value='username' onChange= { e => setUsername(e.target.value)} />
        <Form.Text className='text-muted'>* required</Form.Text>
      </Form.Group>

        {Object.keys(usernameError).map((key) => {
          return (
            <div className ='alert' key={key} >{usernameError[key]}</div>
          );
        })}

      <Form.Group controlId='formPassword'>
        <Form.Label>Password:</Form.Label>
        <Form.Control type='password' onChange= {e => setPassword(e.target.value)} />
        <Form.Text className='text-muted'>* required</Form.Text>
      </Form.Group>

        {Object.keys(passwordError).map((key) => {
          return (
            <div className ='alert' key = {key} >{passwordError[key]}</div>
          );
        })}

      <Form.Group controlId='formEmail'>
        <Form.Label>Email address:</Form.Label>
        <Form.Control type='email' value={email} placeholder='Enter valid email please' onChange={e => setEmail(e.target.value)} />
        <Form.Text className='text-muted'>* required <span className='alert'> I'll never share your email with anyone else. </span></Form.Text>
      </Form.Group>

      {Object.keys(emailError).map((key) => {
        return (
          <div className ='alert' key={key}>{emailError[key]} </div>
        )
      })}

      <Form.Group controlId='formBirthday'>
        <Form.Label>Birthday:</Form.Label>
        <Form.Control type='date' value={birthday} placeholder='Date of Birth' onChange={e => setBirthday(e.target.value)} />
      </Form.Group>
      
<<<<<<< Updated upstream
      <Button className='primary-btn'  type='submit' onClick={toggleRegister}><span className='text-color'>Login</span></Button>
      <Button className='primary-btn'  type='submit' onClick={handleRegister}><span className='text-color'>Register</span></Button>  
=======
      <Button variant='primary' className='primary-btn'  type='submit' onClick={handleRegister}><span className='text-color'>Register</span></Button>
>>>>>>> Stashed changes
    </Form>
    
  );
}

//Avoiding bugs with prop-types
RegistrationView.propTypes ={
  register: PropTypes.shape ({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string
    }),
<<<<<<< Updated upstream
  onRegister: PropTypes.func,
  toggleRegister: PropTypes .func
=======
>>>>>>> Stashed changes
};