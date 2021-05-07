import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import './movie-view.scss';

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

        <Link to={`/director/${movie.Director.Name}`}>
        <Button Variant='primary' className='primary-btn'>{movie.Director.Name}</Button>
        </Link>
        <Link to={`/genres/${movie.Genre.Name}`}>
          <Button className='primary-btn'>{movie.Genre.Name}</Button>
        </Link>

        <Button className='primary-btn' variant='primary' onClick={() => { onBackClick(null); }}><span className='text-color'>Back</span></Button>
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