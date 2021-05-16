import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import {DirectorView} from '../director-view/director-view';
import {GenreView} from '../genre-view/genre-view';
import {ProfileView} from '../profile-view/profile-view';
import { ProfileUpdate } from '../profile-view/profile-update';



import './main-view.scss';

export class MainView extends React.Component {
  
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      userInfo:{},
      register: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token')
    if (accessToken !== null) {
      this.setState({
        user:localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://mytopfilms.herokuapp.com/movies', {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(response => {
      //Assign the result to the state
      this.setState({
        movies: response.data 
      });
      localStorage.setItem('movies', JSON.stringify(response.data));
    })
      .catch(function(error) {
        console.log(error);
      });
  }

  //When a user successfully logs in , this function updates the user property in state to that particular user
  onLoggedIn(authData) {
    // console.log(authData);
    const userInfo = {
      username: authData.user.Username,
      email: authData.user.Email,
      birthday: authData.user.Birthday
    };

    this.setState({
      user: authData.user.Username,
      userInfo: userInfo
    });

    
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    localStorage.setItem('email', authData.user.Email);
    localStorage.setItem('birthday', authData.user.Birthday);
    localStorage.setItem('favoriteMovies', JSON.stringify(authData.user.FavoriteMovies));
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    this.setState({
      user:null
    });
    console.log('Logout successfull');
    window.open('/', '_self');
    localStorage.clear();
    this.setState({
      user:null
    });
    window.open('/', '_self');
  }

  
    getUser(token) {
    axios.get('https://mytopfilms.herokuapp.com', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => { 
      this.props.setUser(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }

  updateUser(data) {
    this.setState({
      userInfo: data
    });
    localStorage.setItem('user', data.username);
  }


    
  onRegister(register) {
    this.setState({
      register:true
    });
  }

  
  render() {
    const {movies, user, userInfo, token} = this.state;

    return (
      <div>
        <Router>
          <Navbar  className='log-reg-view' expand='lg'>
            <Navbar.Brand id='navbar-brand'><span className='text-color'>MyTopFilms</span></Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='mr-auto'>
              
              <Link to={`/`}>
                {!!user && <Button className='primary-btn' href='#home'><span className='text-color'>Home </span></Button>}
              </Link>
              
              <Link to={`/users/${user}`}>
                <Button variant='primary' className='primary-btn'><span className='text-color'>My Profile</span></Button>
              </Link>

              <Link to={`/`}>
                <Button variant='primary' className='primary-btn' onClick={() => this.onLoggedOut()}><span className='text-color'>Logout</span></Button>
              </Link>  
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Container>
              <Row className='main-view justify-content-md-center'>
                <Route exact path='/' render={() => {
                  if (!user) 
                  return (
                    <Col md={6}>
                      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                    </Col>);

                    if (movies.length === 0) return <div className ='main-view' />;

                    return (
                      movies.map(m => (
                      <Col md={4} key={m._id}>
                        <MovieCard movie={m} />
                      </Col>
                    )))
                }} />

                <Route path='/register' render={() => {
                  if (user) return <Redirect to='/' />
                  return ( <Col md={6}>
                    <RegistrationView  />;
                  </Col>);
                }} />

                <Route path='/movies/:movieId' render={({ match, history }) => {
                  if (!user) return (
                  <Col md={8}>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>);

                  if (movies.length === 0) return <div className='main-view' />;

                  return (
                  <Col md={8}>
                    <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                  </Col>)
                }} />

                <Route path='/director/:name' render={({match, history}) => {
                  if (!user) return (
                  <Col md={8}> 
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />     
                  </Col>)

                  if (movies.length === 0) return <div className='main-view' />;

                  return (
                  <Col md={8}>
                    <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} movies={movies} onBackClick={() => history.goBack()} />
                  </Col>)
                }} />

                <Route path='/genres/:name' render={({ match, history}) => { 
                  if (!user) return (
                  <Col md={6}>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                  </Col>)

                  if (movies.length === 0) return <div className='main-view' />;

                  return (
                  <Col md={8}>
                    <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} movies={movies} onBackClick={() => history.goBack()} />
                  </Col>)
                }} />

                <Route path='/users/:user' render={({history}) => {
                  if (!user) return (
                  <Col md={6}>
                    <LoginView onLoggedIn = {user => this.onLoggedIn(user)} />
                  </Col>)

                  if (movies.length === 0) return <div className='main-view' />;

                  return (
                  <Col md={8}>
                    <ProfileView userInfo={userInfo} movies={movies} onBackClick={() => history.goBack()} />
                  </Col>)
                }} />
                
                <Route path='/update/:username' render={({ history }) => {
                  if (!user) return (
                  <Col md={6}>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>)

                  if (movies.length === 0) return <div className='main-view' />;

                  return (
                  <Col md={8}>
                    <ProfileUpdate userInfo={userInfo} user={user} token={token} updateUser={data => this.updateUser(data)} onBackClick={() => history.goBack()} />
                  </Col>)

                }} />
          
              </Row>
          </Container>    
        </Router>
      </div>
    );
        
  }  
}