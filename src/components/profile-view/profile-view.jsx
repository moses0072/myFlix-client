import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';



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
    this.getUser(accessToken);
    }
  }

  getUser() {
    this.setState({
      username: localStorage.getItem("user"),
      email: localStorage.getItem("email"),
      birthday: localStorage.getItem('birthday'),
      favorites: localStorage.getItem("FavoriteMovies"),
    });
  }

  //Delete Movie from user favorite list
  removeFavorite(e, favorites) {
    e.preventDefault();
    
    axios.delete(`https://mytopfilms.herokuapp.com/users/${localStorage.getItem('user')}/movies/${favorites}/${movie._id}`, 
     { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } 
    }).then(response => {
      this.getUser(localStorage.getItem('token'));
    }).catch (err => {
      console.log(err.response);
      alert('Movie can\'t be removed')
    });
  }
  handleChange(e, favorite) {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ [favorite.target.name]: favorite.target.value });
  }
  render() {  
    const { username, email, birthday, favorites} = this.state;
    const movies = JSON.parse(localStorage.getItem('movies')); 
     const favoriteMovieList = movies.filter((movie => {
      return (
        movies.includes(movie._id)
      );
    }));
    console.log(movies);
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
                      {favoriteMovieList.map(favorites => (
                        <li key={favorites}>
                          {
                            favoriteMovieList.find(
                              movie => movie._id === favorites
                            ).Title
                          }
                          <Button className='primary-btn' onClick={() => this.removeFavorite(favorites)}><span className='text-color'>Remove Favorite Movie</span></Button>                           
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
                <Link to={`/update/:username`}>
                  <Button className='primary-btn'><span className='text-color'>Update</span></Button>
                </Link>
                <Link to={`/`}>
                  <Button className='primary-btn'><span className='text-color'>Back</span></Button>
                </Link>
              </Row>
            </Container>
          </div>
        </Card>
      </div>
    )
  }
}