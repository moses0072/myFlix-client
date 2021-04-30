import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
export class MainView extends React.Component {
  
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
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

  render() {
    const {movies, selectedMovie, user} = this.state;

    //If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    if (movies.length === 0) 
      return <div className="main-view" />;
    
    return (
      <div className="main-view">
        { selectedMovie 
          ? <MovieView movie={selectedMovie} onBackClick={ newSelectedMovie => { this.setSelectedMovie(newSelectedMovie);}}/>
          :movies.map(movie => (
          <MovieCard key={movie._id} movie={movie} onMovieClick={ (newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
          ))
        }
      </div>
    );
  }
  
}