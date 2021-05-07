import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import { Link } from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import {DirectorView} from '../director-view/director-view';
import {GenreView} from '../genre-view/genre-view';
import {ProfileView} from '../profile-view/profile-view';



import './main-view.scss';
export class MainView extends React.Component {
  
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
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

  //When a user successfully logs in , this function updates the user property in state to that particular user
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    localStorage.setItem('email', authData.user.Email);
    localStorage.setItem('birthday', authData.user.Birthday);
    localStorage.setItem('favoriteMovies', authData.user.FavoriteMovies);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios.get('https://mytopfilms.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
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

  onloggedOut() {
    localStorage.clear();
    this.setState({
      user:null,
    });
    console.log('Logout successfull');
    window.open('/', '_self');
  }

  onRegister(register) {
    this.setState({
      register: register
    });
  }

  render() {
    const {movies, user} = this.state;

    return (
      <div>
        <Router>
          <div className='insert-navbar'>
            <Link to={`/`}>
              <Button variant='primary' className='primary-btn' onClick={() => this.onloggedOut()}>Logout</Button>
            </Link>
            <Link to={`/users/${user}`}>
              <Button variant='primary' className='primary-btn'>My Profile</Button>
            </Link>
          </div>

          <Row className='main-view justify-content-md-center'>
            <Route exact path='/' render={() => {
              if (!user) 
              return 
                <Col md={6}>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>

                if (movies.length === 0) return <div className ='main-view' />

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
              if (!user) return <Col md={6}>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>

              if (movies.length === 0) return <div className='main-view' />;

              return <Col md={8}>
                <MovieView movie={movies.find(m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path='/director/:name' render={({match, history}) => {
              if (!user) return <Col md={6}>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>

              if (movies.length === 0) return <div className='main-view' />;

              return <Col md={8}>
                <DirectorView director={movies.find(m.Director.Name === match.params.name).Director} movies={movies} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path='/genre/:name' render={({ match, history}) => { 
              if (!user) return <Col md={6}>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              </Col>

              if (movies.length === 0) return <div className="main-view" />;

              return <Col md={8}>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} movies={movies} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path='/users/:userId' render={({history}) => {
              if (!user) return <Col md={6}>
                <LoginView onLoggedIn = {user => this.onLoggedIn(user)} />
              </Col>

              if (movies.length === 0) return <div className="main-view" />;

              return <Col md={8}>
                <ProfileView movies={movies} onBackClick={() => history.goBack()} />
              </Col>
            }} />

          </Row>
        </Router>
      </div>
    );
    

/*
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
    );*/
  }  
}