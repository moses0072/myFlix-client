import React from 'react';

export class MovieView extends React.Component {
  
  keypressCallback(event) {
    console.log(event.key);
  }
  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);   
    }
  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }  

  render() {
    const {movie, onBackClick} = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath}/>
        </div>

        <div className="movie-title">
          <span className="lable">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>

        <div className="movie-description">
          <span className="lable">Description: </span>
          <span>{movie.Description}</span>

        </div>
        <button onClick={() => { onBackClick(null); }}>Back</button>
      </div>
    );
  }
}