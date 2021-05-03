import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
export class MovieView extends React.Component {
  
  /*keypressCallback(event) {
    console.log(event.key);
  }
  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);   
    }
  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }*/

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
        <Button variant='primary' onClick={() => { onBackClick(null); }}>Back</Button>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description:PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string,
    }),
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};