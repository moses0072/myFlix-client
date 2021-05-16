import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { Link } from "react-router-dom";
import './profile-view.scss';

export function ProfileUpdate(props) {
 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  //const user = props.user;
  
  //Update profile
  const handleUpdate = e => {
    e.preventDefault();
    const userInfo = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    axios.put(`https://mytopfilms.herokuapp.com/users/${user}`, userInfo, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => {
      updateUser(userInfo);
      alert("Profile has been Updated");
      })
      .catch(e => {
        const errors = e.response.data.errors || [];
        let errorMessage = "";
        errors.forEach(err => {
          errorMessage += err.msg;
        });
        alert(`There was an error ${errorMessage}`);
        console.log(`Error updating the user info.`);
      });
  };

  //Delete Profile
  const handleDelete = e => {
    e.preventDefault();
    axios
      .delete(`https://mytopfilms.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then(response => {
        alert("Your account has been deleted");
        localStorage.clear();
        window.open("/", "_self");
      })
      .catch(e => {
        console.log("Error deleting your account");
      });
  };
  return (
    <Container>
      <Row>
        <Form className='log-reg-view'>
          <div>
            <Form.Group controlId='formUsername'>
              <Form.Label>Username</Form.Label>
              <Form.Control type='text' value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='formPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='formEmail'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='formBirthday'>
              <Form.Label>Birthday</Form.Label>
              <Form.Control type='date' value={birthday} onChange={e => setBirthday(e.target.value)} />
            </Form.Group>

            <div>
              <Button className='primary-btn' type='submit' onClick={handleUpdate}><span className='text-color'>Update</span> </Button>

              <Link to={`/users/${user}`}>
                <Button className='primary-btn'><span className='text-color'>Profile</span></Button>
              </Link>

              <Link to={`/`}>
                <Button className='primary-btn'><span className='text-color'>Back</span></Button>
              </Link>

              <div>
                <Button variant='danger' className='primary-btn' type='submit' onClick={handleDelete}><span className='text-color'>Delete Profile</span></Button>
              </div>
            </div>
          </div>
        </Form>
      </Row>
    </Container>
  )

}