import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
<<<<<<< Updated upstream
=======
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
>>>>>>> Stashed changes

import './movie-view.scss';

export function  MovieView(props) {

  const {movie, onBackClick} = props;
  if (!movie) return null;

  function addFav (e) {
    e.preventDefault();

    axios.post(`https://mytopfilms.herokuapp.com/users/${localStorage.getItem('user')}/movies/${movie._id}`,
    {
      username: localStorage.getItem('user')
    },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }
    ).then(Response => {
      console.log(response);
      alert('Movie has been added to your Favorite list!');
      }). catch (e => {
        console.log('can\'t adding movie to your Favorites');
        alert('Movie could\'t added to favorites!');
      });
  }

    return (
      <Container>
        <Row>
          <div className='movie-view'>
            <div className='movie-poster'>
              <img src={movie.ImagePath} />
            </div>

            <div className='movie-title'>
              <span className='lable'>Title: </span>
              <span className='value'>{movie.Title}</span>
            </div>

            <div className='movie-director'>
              <span className='lable'>Director: </span>
              <span className='value'>{movie.Director.Name}</span>
            </div>

            <div className='movie-genre'>
              <span className='lable'>Genre: </span>
              <span className='value'>{movie.Genre.Name}</span>
            </div>

            <div className='movie-description'>
              <span className='lable'>Description: </span>
              <span className='value'>{movie.Description}</span>
            </div>

            <Link to={`/director/${movie.Director.Name}`}>
            <Button Variant='primary' className='primary-btn'><span className='text-color'>{movie.Director.Name}</span></Button>
            </Link>
            
            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button className='primary-btn'><span className='text-color'>{movie.Genre.Name}</span></Button>
            </Link>

<<<<<<< Updated upstream
        <Button className='primary-btn' variant='primary' onClick={() => { onBackClick(null); }}><span className='text-color'>Back</span></Button>
      </div>
=======
            <Button className='primary-btn' onClick={e => addFav(e)}><span className='text-color'>Add to Favorites</span></Button> 

            <Button className='primary-btn' variant='primary' onClick={() => { onBackClick(null); }}><span className='text-color'>Back</span></Button>
          </div>
        </Row>
      </Container>
>>>>>>> Stashed changes
      
    );
  
}