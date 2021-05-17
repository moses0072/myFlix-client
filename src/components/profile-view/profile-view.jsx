import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';




import './profile-view.scss';

export class ProfileView extends React.Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      email: '',
      birthday: '',
      userData: '',
      favorites: []
    };
  }
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
    this.getUser();
    }
  }

  getUser() {
    this.setState({
      username: localStorage.getItem('user'),
      email: localStorage.getItem('email'),
      birthday: localStorage.getItem('birthday'),
      favorites: JSON.parse(localStorage.getItem('favoriteMovies'))
    });
  }

  //Delete Movie from user favorite list
  removeFavorite(favorite) {   
    axios.delete(`https://mytopfilms.herokuapp.com/users/${localStorage.getItem('user')}/favorites/${favorite._id}/`, 
     { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } 
    }).then(response => {
      localStorage.setItem('favoriteMovies', JSON.stringify(response.data.FavoriteMovies));
      this.getUser();
      console.log(response);
      alert(`${favorite.Title} has been removed from your Favorite list!`);
    }).catch (err => {
      console.log(err.response);
      alert('Movie can\'t be removed')
    });
  }

  /*handleChange(e, favorites) {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ [favorites.target.name]: favorites.target.value });
  }*/
  
  render() {  
    const { username, email, birthday, favorites} = this.state;
     const favoriteMovieList = this.props.movies.filter((movie => {
      return (
        favorites.includes(movie._id)
      );
    }));

    return(
      <div className='log-reg-view'>
        <Card className='log-reg-view'>
          <Card.Body className='log-reg-view'>
            <Card.Title >profile</Card.Title>
            <ListGroup>
              <ListGroup.Item>
                Username: <span className='text-color'>{username}</span>
              </ListGroup.Item>

              <ListGroup.Item>
                E-Mail: <span className='text-color'>{email}</span>
              </ListGroup.Item>

              <ListGroup.Item>
                Birthday:
                <span className="text-color">{birthday}</span>  
              </ListGroup.Item>

              <ListGroup.Item>
                FavoriteMovies:
                <div>
                    <ul>
                      {favoriteMovieList.map(favorite => (
                        <li key={favorite}>
                          <span className='text-color'>
                          {
                            favorite.Title
                          }
                          </span>
                          <Button className='primary-btn' onClick={() => this.removeFavorite(favorite)}><span className='text-color'>Remove Favorite Movie</span></Button>                           
                        </li>                        
                      ))}
                    </ul> 
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
          <div>
            <Container>
              <Row>
                <Link to={`/update/${localStorage.getItem('user')}`} className='btn primary-btn'>
                  <span className='text-color'>Update</span>
                </Link>
                <Link to={`/`} className='btn primary-btn'>
                  <span className='text-color'>Back</span>
                </Link>
              </Row>
            </Container>
          </div>
        </Card>
      </div>
    )
  }
}