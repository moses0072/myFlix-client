import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


import './profile-view.scss';


export function ProfileView (props) {

 
  const  favoriteMovie = localStorage.getItem('favoriteMovies');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [favoriteMovieUpdate, setFavoriteMovieUpdate] = useState(favoriteMovies);

  const [usernameError, setUsernameErr] = useState({});
  const [passwordError, setPasswordErr] = useState({});
  const [emailError, setEmailErr] = useState({});
  const [birthdayError, setBirthdayErr] = useState({});
  
  let convertDate = new Date(birthday).toISOString().slice(0, 10);
  //Delete Movie from user favorite list
  const removeFavorite = (movie) => {
    const token = localStorage.getItem('token')
    const url = 'https://mytopmovies.herokuapp.com/users/' + localStorage.getItem('user') + '/favorites/' + movie._id;
    axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` }, 
    }).then((response) => {
      console.log(response);
      let favMovies = response.data.favoriteMovies;
      localStorage.setItem('favoriteMovies', favMovies);
    });
  }

  //Updating user Information
  const handleUpdate = (e) => {
    e.preventDefault();
    const isValid = formValidation();

    const url = 'https://mytopfilms.herokuapp.com/users/' + localStorage.getItem('user');

    if (isValid) {
      axios.put(url, {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      },
      {
        headers: {
          Authorization: 'Bearer' + localStorage.getItem('token'),
        },
      }
      ).then((response) => {
        const data = response.data;
        localStorage.setItem('user', data.Username);
        localStorage.setItem('email', data.Email);
        localStorage.setItem('birthday', data.Birthday);
        alert('Your profile was successfully updated');
        window.open('/', '_self');
      }).catch((e) => {
        console.log(e);
      });
    }
  }

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


  //Delete user account
  const handleDelete = () => {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    axios.delete(`https://mytopmovies.herokuapp.com/users/${user}`, {headers: {Authorization: `Bearer ${token}`}
  }).then(() => {
    alert(user + ' ' + 'has been deleted');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.pathname = '/';
  });
  }

  
    const {movies, onBackClick } = this.props;

    const favoriteMovieList = movies.filter((movie) => {
      return this.state.favoriteMovies.includes(movie._id);
    });

    return(
      <div>
        <Form className='log-reg-view'>
          <Form.Group controlId='formUsername'>
            <Form.Label>{this.state.username}</Form.Label>
            <Form.Control type='text' value={username} required onChange={(e) => setUsername(e.target.value)} />

            {Object.keys(usernameError).map((key) => {
              return (
              <div className ='alert' key={key} >{usernameError[key]}</div>
              );
            })}
          </Form.Group>

          <Form.Group controlId='formPassword'>
            <Form.Label>{this.state.password}</Form.Label>
            <Form.Control type="password" value={password} required onChange={(e) => setPassword(e.target.value)}/>

            {Object.keys(passwordError).map((key) => {
              return (
                <div className ='alert' key={key} >{passwordError[key]}</div>
              );
            })}
            </Form.Group>

          <Form.Group controlId='formEmail'>
            <Form.Label>{this.state.email}</Form.Label>
            <Form.Control type="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
            
            {Object.keys(emailError).map((key) => {
              return (
                <div className ='alert' key={key}>{emailError[key]} </div>
              )
            })}
          </Form.Group>

          <Form.Group controlId='formBirthday'>
            <Form.Label>{this.state.birthday}</Form.Label>
            <Form.Control type='date' value={convertDate} onChange={(e) => setBirthday(e.target.value)} />

            {Object.keys(birthdayError).map((key) => {
              return (
                <div className ='alert' key={key}>{birthdayError[key]}</div>
              )  
            })}  
          </Form.Group>

          <Link to={`/users`}>
            <Button className='primary-btn' type='submit' onClick={handleUpdate}><span className='text-color'>Update</span></Button>
          </Link>

          <Link to ={`/update/${this.state.username}`}>
            <Button variant='primary' className='primary-btn'><span className='text-color'>Edit profile</span></Button>
          </Link>

          <Button variant='danger' className='primary-btn' onClick={() => {this.handleDelete() }} ><span className='text-color'>Delete Profile</span></Button>
          <Button variant='primary' className='primary-btn' onClick={() => {onBackClick}}> <span className='text-color'>Back</span></Button>
        </Form>

        <div>
          {favoriteMovieList.map((movie) => {
            return (
              
              <Col md={3} key={movie._id}>
                 <Card>
                   <Card.Img variant='top' src={movie.ImagePath} />
                  <Card.Body>
                    <Link to={`/movies/${movie._id}`}>
                      <Card.Title>{movie.Title}</Card.Title>
                    </Link>
                  </Card.Body>
                </Card>
                <Button className='primary-btn' onClick={() => {this.removeFavorite(movie)}}> <span className='text-color'>Remove</span> </Button>
              </Col>
              
            )
          })}
        </div>          
      </div>
    )
  
}
ProfileView.propTypes = {
  user: PropTypes.string.isRequired,
  email:PropTypes.string.isRequired,
  birthday:PropTypes.string,

}