import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
<<<<<<< Updated upstream
=======
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
>>>>>>> Stashed changes


import './login-view.scss';
export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState({});
  const [passwordError, setPasswordError] = useState({});
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    const isValid = formValidation();
    if (isValid) {
<<<<<<< Updated upstream
      // Send a request to the server for authentication
      axios.post('https://mytopfilms.herokuapp.com/login', {
        Username: username,
        Password: password
      })
      .then(response => {
       const data = response.data;
=======

      //Request to the server for authentication
      axios.post('https://mytopfilms.herokuapp.com/login', {
        Username: username,
        Password: password
      }).then (response => {
        const data = response.data;
        //triggers onLoggedIn method on main-view
>>>>>>> Stashed changes
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('User doesn\'t exist');
      }); 
    } 
  };

   const formValidation = () => {
     const usernameError = {};
     const passwordError = {};
     let isValid = true;
   

    if (username.trim().length < 5) {
      usernameError.usernameShort = 'Username must be at least 5 characters';
      isValid = false;
    }
    if (username.trim().length === 0) {
      usernameError.userNameRequired = 'Username is required';
      isValid = false;
    }

    if (password.trim().length < 6 ) {
      passwordError.passwordShort= 'Password must be at least 6 characters';
      isValid = false;
    }

    if (password.trim().length === 0) {
      passwordError.passwordRequired = 'Password is required';
    }
    setUsernameError(usernameError);
    setPasswordError(passwordError);
    return isValid;
  };
  
  const toggleRegister = (e) => {
    e.preventDefault();
    props.toggleRegister();
    
  };


  return (
<<<<<<< Updated upstream
    <Form className='log-reg-view'>
      <Form.Group controlId='formUsername'>
        <Form.Label>Username:</Form.Label>
        <Form.Control type='text' placeholder='Enter user name' value={username} onChange= { e => setUsername(e.target.value)} />
      </Form.Group>
      {Object.keys(usernameError).map((key) =>{
        return (
          <div className='alert' key={key} >{usernameError[key]}</div>
        );
      })}

      <Form.Group controlId='formPassword'>
        <Form.Label>Password:</Form.Label>
        <Form.Control type='password' placeholder='Password' value={password} onChange= {e => setPassword(e.target.value)} />
      </Form.Group>
      {Object.keys(passwordError).map((key) => {
        return (
          <div className='alert' key={key} > {passwordError[key]} </div>
        );
      })}
      
      <Button className='primary-btn' variant='primary' type='submit' onClick={handleSubmit}><span className='text-color'>Login</span></Button>
      <Button className='primary-btn' variant='primary' type='submit' onClick={toggleRegister}><span className='text-color'>Register</span></Button>
    </Form>
=======
    <Container>
      <Row>
        <div>
          <Form className='log-reg-view'>
            <Form.Group controlId= 'formUsername'>
              <Form.Label>Username:</Form.Label>
              <Form.Control type='text' placeholder= 'Enter username' value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>
    
              {Object.keys(usernameError).map((key) => {
                return (
                <div key={key} className ='alert'>{usernameError[key]} </div>
                );
              })}

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
              </Form.Group>
        
                {Object.keys(passwordError).map((key) => {
                  return (
                  <div key={key} className='alert'>{passwordError[key]}</div>  
                  );
                })}
      
              <Button className='primary-btn' variant='primary' type='submit' onClick={handleSubmit}><span className='text-color'>Login</span></Button>
              <Link to={`/register`}>
                <Button className='primary-btn' variant='primary' type='submit' ><span className='text-color'>Register</span></Button>   
              </Link>
          </Form> 
        </div>
      </Row>
    </Container>
>>>>>>> Stashed changes
  );
}

//Avoiding bugs with prop-types
LoginView.propTypes ={
  user: PropTypes.shape ({
    Username: PropTypes.string,
    Password: PropTypes.string
    }),
  onLoggedIn: PropTypes.func,
<<<<<<< Updated upstream
  toggleRegister: PropTypes.func
=======
  onClick: PropTypes.func
>>>>>>> Stashed changes
};