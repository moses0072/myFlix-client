import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
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
    axios.get('https://mytopfilms.herokuapp.com/movies')
      .then(Response => {
        this.setState ({
          movies: Response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

// when a movie is clicked, this function is invoked and updates the state of the selectedMovie property to that movie   
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  //When a user successfully logs in , this function updates the user property in state to that particular user
  onLoggedIn(user){
    this.setState({
      user
    });
  }

  onRegister(register) {
    this.setState({
      register
    });
  }

  toggleRegister(user) {
    this.setState({
      register: !this.state.register
    })
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
      </Row>
    );
  }  
}