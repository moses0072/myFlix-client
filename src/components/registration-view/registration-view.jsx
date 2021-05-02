import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function RegistrationView(props) {
  const [ username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  
  const handleRegister = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    props.onRegister(username);
  };

  const toggleRegister = (e) => {
    e.preventDefault();
    props.toggleRegister();
  }
  

  return (
    
    <Form>
      <Form.Group controlId='formUsername'>
        <Form.Label>Username:</Form.Label>
        <Form.Control type='text' onChange= { e => setUsername(e.target.value)} />
        <Form.Text className='text-muted'>* required</Form.Text>
      </Form.Group>

      <Form.Group controlId='formPassword'>
        <Form.Label>Password:</Form.Label>
        <Form.Control type='password' onChange= {e => setPassword(e.target.value)} />
        <Form.Text className='text-muted'>* required</Form.Text>
      </Form.Group>

      <Form.Group controlId='formEmail'>
        <Form.Label>Email address:</Form.Label>
        <Form.Control type='email' placeholder='Enter valid email please' onChange={e => setEmail(e.target.value)} />
        <Form.Text className='text-muted'>* required</Form.Text>
        <Form.Text className='text-muted'>I'll never share your email with anyone else.</Form.Text>
      </Form.Group>

      <Form.Group controlId='formBirthday'>
        <Form.Label>Birthday:</Form.Label>
        <Form.Control type='date' placeholder='Date of Birth' onChange={e => setBirthday(e.target.value)} />
      </Form.Group>
     
      <Button variant='primary' type='submit' onClick={toggleRegister}>Register</Button>
      <Button variant='primary' type='submit' onClick={handleRegister}>Login</Button>
    </Form>
    
     
    /*<form>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>

      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>

        <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </label>

        <label>
        Birthday:
        <input type="birthday" value={birthday} onChange={e => setBirthday(e.target.value)} />
        </label>

        <button type="register" onClick={handleRegister}>Register</button>
    </form> */     
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
  onRegister: PropTypes.func,
  toggleRegister: PropTypes 
};