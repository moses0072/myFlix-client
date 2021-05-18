import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { DirectorView } from '../director-view/director-view';

import './genre-view.scss';

export class GenreView extends React.Component {
  render() {
    const { genre, movies, onBackClick } = this.props;
    return (
      <div className="genre-view">
        <div className="genre-name">
          <span className="label"><span className='text-primary'>Name: </span></span>
          <span className="value">{genre.Name}</span>
        </div>
        <div className="genre-description">
          <span className="label"><span className='text-primary'>Description: </span></span>
          <span className="value">{genre.Description}</span>
        </div>
        <div className="genre-movies">
          <span className="label">Movies Genre {genre.Name}: </span>
          <div>
            {movies.map((m) => {
              if (m.Genre.Name === genre.Name) {
                return (
                  <div key={m._id}>
                    <Card>
                      <Card.Img variant="top" src={m.ImagePath} />
                      <Card.Body>
                        <Card.Title>{m.Title}</Card.Title>
                        <Link to={`/movies/${m._id}`}>
                          <Button className="primary-btn"><span className='text-color'>Details</span></Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <Button className='primary-btn' onClick={() => { onBackClick(null) }}><span className='text-color'>Back</span></Button>
      </div>
    );
  }
}