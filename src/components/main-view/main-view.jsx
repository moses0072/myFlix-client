import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
<<<<<<< Updated upstream
=======
import {DirectorView} from '../director-view/director-view';
import {GenreView} from '../genre-view/genre-view';
import {ProfileView} from '../profile-view/profile-view';
import { ProfileUpdate } from '../profile-view/profile-update';

>>>>>>> Stashed changes

import './main-view.scss';
import { Container } from 'react-bootstrap';
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

// when a movie is clicked, this function is invoked and updates the state of the selectedMovie property to that movie   
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

<<<<<<< Updated upstream
  //When a user successfully logs in , this function updates the user property in state to that particular user
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

=======
>>>>>>> Stashed changes
  getMovies(token) {
    axios.get('https://mytopfilms.herokuapp.com/movies', {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.setState({
        movies: response.data 
      });
    })
      .catch(function(error) {
        console.log(error);
      });
  }

<<<<<<< Updated upstream
  onLoggedOut() {
    localStorage.clear();
=======
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

  //When a user successfully logs in , this function updates the user property in state to that particular user
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  updateUser(data) {
    this.setState({
      userInfo: data
    });
    localStorage.setItem('user', data.username);
  }

  onloggedOut() {
    
>>>>>>> Stashed changes
    this.setState({
      user: null
    });
<<<<<<< Updated upstream
=======
    console.log('Logout successfull');
    window.open('/', '_self');
    localStorage.clear();
    this.setState({
      user:null
    });
    window.open('/login', '_self');
>>>>>>> Stashed changes
  }
  onRegister(register) {
    this.setState({
      register
    });
  }

<<<<<<< Updated upstream
  toggleRegister() {
    this.setState({
      register: !this.state.register
    });
  }

  

  render() {
    const {movies, selectedMovie, user, register} = this.state;

    

    //If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView
    if (!register) return (
      (
        <Row className='justify-content-md-center'>
          <Col md={6}>
            <RegistrationView onRegister={register => this.onRegister(register)}  toggleRegister={user => this.toggleRegister(user)} />
          </Col>
        </Row>
      )
    );
    
    if (!user) return (
      (
        <Row className='justify-content-md-center'>
          <Col md={6}>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} toggleRegister={user => this.toggleRegister(user)}/>
          </Col>
        </Row>
      )
    );      

        

    if (movies.length === 0) 
      return <div className="main-view" />;
    
    return (
      <Row className='main-view justify-content-md-center'>
        { selectedMovie 
          ? ( 
            <Col md={8}>
              <MovieView movie={selectedMovie} onBackClick={ newSelectedMovie => { this.setSelectedMovie(newSelectedMovie);}}/>
            </Col>            
          )
          : movies.map(movie => (
                <Col md={3}>
                  <MovieCard key={movie._id} movie={movie} onMovieClick={ newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                </Col>
            ))  
            
        }
        <Button variant='primary' className='primary-btn' onClick={() => {this.onLoggedOut()}}>Logout</Button>
      </Row>    
    );
=======
  render() {
    const {movies, user, userInfo, token} = this.state;

    return (
      <div>
        <Router basename='/'>
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
                <Button variant='primary' className='primary-btn' onClick={() => this.onloggedOut()}><span className='text-color'>Logout</span></Button>
              </Link>
              </Nav>
              

            </Navbar.Collapse>
          </Navbar>
          <Container>
              <Row className='main-view justify-content-md-center'>
                <Route exact path='/' render={() => {
                  if (!user) 
                  return 
                    <Col md={6}>
                      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                    </Col>

                    if (movies.length === 0) return <div className ='main-view' />;

                    return movies.map(m => (
                      <Col md={4} key={m._id}>
                        <MovieCard movie={m} />
                      </Col>
                    ))
                }} />

                <Route path='/register' render={() => {
                  if (user) return <Redirect to='/' />
                  return <Col md={6}>
                    <RegistrationView  />;
                  </Col>
                }} />

                <Route path='/movies/:movieId' render={({ match, history }) => {
                  if (!user) return <Col md={8}>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>

                  if (movies.length === 0) return <div className='main-view' />;

                  return <Col md={8}>
                    <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                  </Col>
                }} />

                <Route path='/director/:name' render={({match, history}) => {
                  if (!user) return <Col md={8}> 
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />     
                  </Col>

                  if (movies.length === 0) return <div className='main-view' />;

                  return <Col md={8}>
                    <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} movies={movies} onBackClick={() => history.goBack()} />
                  </Col>
                }} />

                <Route path='/genres/:name' render={({ match, history}) => { 
                  if (!user) return <Col md={6}>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                  </Col>

                  if (movies.length === 0) return <div className="main-view" />;

                  return <Col md={8}>
                    <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} movies={movies} onBackClick={() => history.goBack()} />
                  </Col>
                }} />

                <Route path='/users/:user' render={({history}) => {
                  if (!user) return <Col md={6}>
                    <LoginView onLoggedIn = {user => this.onLoggedIn(user)} />
                  </Col>

                  if (movies.length === 0) return <div className="main-view" />;

                  return <Col md={8}>
                    <ProfileView userInfo={userInfo} onBackClick={() => history.goBack()} />
                  </Col>
                }} />
                
                <Route path="/update/:username" render={({ history }) => {
                  if (!user) return <Col md={6}>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>

                  if (movies.length === 0) return <div className="main-view" />;

                  return <Col md={8}>
                    <ProfileUpdate userInfo={userInfo} user={user} token={token} updateUser={data => this.updateUser(data)} onBackClick={() => history.goBack()} /></Col>

                }} />
          
              </Row>
          </Container>    
        </Router>
      </div>
    );
        
>>>>>>> Stashed changes
  }  
}
          