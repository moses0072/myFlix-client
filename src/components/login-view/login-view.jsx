import React, {useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';


import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] =useState('');
  const [password, setPassword] =useState('');

  const [usernameError, setUsernameError] = useState({});
  const [passwordError, setPasswordError] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    
    const isValid = formValidation();
    if (isValid) {
      axios.post('https://mytopfilms.herokuapp.com/login', {
        Username: username,
        Password: password
      }).then (response => {
        const data = response.data;
        props.onLoggedIn(data);
      }).catch(e => {
        console.log('User does\'t exist');
      });
    }  
  };

  const formValidation = () => {
    const usernameError = {};
    const passwordError = {};
    let isValid = true;

    if (username.trim().length < 5) {
      usernameError.usernameShort ='Username must be at least 5 characters';
      isValid =false;
    }

    if (password.trim().length === 0) {
      passwordError.passwordRequired = 'Password is required';
      isValid = false;
    }

    if (password.trim().length < 6) {
      passwordError.passwordMissing = 'Password must be at least 6 characters';
      isValid = false;
    }

    setUsernameError(usernameError);
    setPasswordError(passwordError);
    return isValid;
  };


  return (
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
  );
}
//Avoiding bugs with prop-types
LoginView.propTypes ={
  user: PropTypes.shape({
    Username: PropTypes.string,
    Password: PropTypes.string
    }),
  onLoggedIn: PropTypes.func,
};