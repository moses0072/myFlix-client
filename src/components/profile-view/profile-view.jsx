<<<<<<< Updated upstream
=======
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
      email: '',
      birthday: '',
      FavoriteMovies: [],
      userData: ''
    };
  }
  
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
    this.getUser(accessToken);
    }
  }

  getUser(token) {
    let username =localStorage.getItem('user');
    axios.get (`https://mytopmovies.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => { 
    this.setState({
      userData: response.data,
      username: response.data.username,
      password: response.data.password,
      email: response.data.email,
      birthday: response.data.birthday,
      FavoriteMovies: response.data.FavoriteMovies
    });
  }).catch(function (error) {
    console.log(error);
  });
}
  
  //Delete Movie from user favorite list
  removeFavorite(e, favorite) {
    e.preventDefault();
    console.log(favorite);
    
    axios.delete(`https://mytopmovies.herokuapp.com/users/${localStorage.getItem('user')}/movies/${favorite}`, 
     { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } 
    }).then(response => {
      this.getUser(localStorage.getItem('token'));
    }).catch (err => {
      console.log(err.response);
      alert('Movie can\'t be removed')
    });
  }
  
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {  
    const { username, email, birthday, FavoriteMovies} = this.state;

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
                  {FavoriteMovies.length === 0 && (
                    <div>
                      <span className='text-color'>Favoritelist is still empty!</span>
                    </div>
                  )}
                  {FavoriteMovies.length > 0 && (
                    <ul>
                      {FavoriteMovies.map(favorite => (
                        <li key={favorite}>
                          {
                            JSON.parse(localStorage.getItem('movies')).find(
                              movie => movie._id === favorite
                            ).title
                          }
                          <Button className='primary-btn' onClick={e => this.removeFavorite(e, favorite)}><span className='text-color'>Remove Favorite Movie</span></Button>  
                        </li>
                      ))}
                    </ul>
                  )}
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

>>>>>>> Stashed changes
