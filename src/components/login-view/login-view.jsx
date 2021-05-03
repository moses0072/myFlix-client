import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './login-view.scss';
export function LoginView(props) {
  const [ username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    
    //Send a request to the server for authentication
    //then call props.onLoggedIn(username)

    props.onLoggedIn(username);
  };

  const toggleRegister = (e) => {
    e.preventDefault();
    props.toggleRegister();
    
  };


  return (
    <Form className='log-reg-view'>
      <Form.Group controlId='formUsername'>
        <Form.Label>Username:</Form.Label>
        <Form.Control type='text' onChange= { e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId='formPassword'>
        <Form.Label>Password:</Form.Label>
        <Form.Control type='password' onChange= {e => setPassword(e.target.value)} />
      </Form.Group>
      
      <Button className='primary-btn' variant='primary' type='submit' onClick={handleSubmit}><span className='text-color'>Login</span></Button>
      <Button className='primary-btn' variant='primary' type='submit' onClick={toggleRegister}><span className='text-color'>Register</span></Button>
    </Form>
  );
}

//Avoiding bugs with prop-types
LoginView.propTypes ={
  user: PropTypes.shape ({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired
    }),
  onLoggedIn: PropTypes.func,
  toggleRegister: PropTypes.func
};