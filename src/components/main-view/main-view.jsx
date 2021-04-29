import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [
        {_id: 1, Title: 'The Godfather', Description: 'In 1945 New York City, at his daughter Connie\'s wedding to Carlo, Vito Corleone, the don of the Corleone crime family listens to requests. His youngest son, Michael, who was a Marine during World War II, introduces his girlfriend, Kay Adams, to his family at the reception.', ImagePath: 'https://en.wikipedia.org/wiki/The_Godfather#/media/File:Godfather_ver1.jpg'},
        {_id: 2, Title: 'Indiana Jones and the Temple od Doom', Description: 'After arriving in India, Indiana Jones is asked by desperate villagers to find a mystical stone and rescue their children from a Thuggee cult practicing child slavery, black magic and ritualistic human sacrifice in honor of the goddess Kali.', ImagePath: 'https://en.wikipedia.org/wiki/Indiana_Jones_and_the_Temple_of_Doom#/media/File:Indiana_Jones_and_the_Temple_of_Doom_PosterB.jpg'},
        {_id: 3, Title: 'Heat', Description: 'A group of professional bank robbers start to feel the heat from police when they unknowingly leave a clue at their latest heist.', ImagePath: 'https://en.wikipedia.org/wiki/Heat_(1995_film)#/media/File:Heatposter.jpg'}
      ],
      selectedMovie: null
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const {movies, selectedMovie} = this.state;


    if (movies.length === 0) 
      return <div className="main-view">The list is empty!</div>;
    
    return (
      <div className="main-view">
        { selectedMovie 
          ? <MovieView movie={selectedMovie} onBackClick={ newSelectedMovie => { this.setSelectedMovie(newSelectedMovie);}}/>
          :movies.map(movie => (
          <MovieCard key={movie._id} movie={movie} onMovieClick={ (movie) => { this.setSelectedMovie(movie) }} />
          ))
        }
      </div>
    );
  }
}