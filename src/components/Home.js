import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import io from 'socket.io-client';

import data from '../assets/data';

const { baseAPI } = data;

class Home extends Component {
  state = {
    gameId: null,
    waiting: false,
    whiteId: null,
  }

  componentDidMount() {
    this.socket = io(baseAPI);

    this.socket.on('connection', () => {
      console.log('CONNECTED');
    });

    // TODO: this is a bug
    this.socket.on('START_GAME', (game) => {
      this.startGame(game);
    });
  }

  componentWillUnmount() {
    this.socket.close();
  }

  createGame = () => {
    const { user } = this.props;
    const data = {
      userId: user.id,
      username: user.username,
    };
    this.socket.emit('CREATE_GAME', data);
    this.setState({ waiting: true }, () => {
      setTimeout(() => {
        this.socket.on('RECEIVE_GAME', (game) => {
          this.receiveGame(game);
        });
      }, 1000);
      this.stopWaiting = setTimeout(() => {
        this.socket.removeListener('RECEIVE_GAME');
      }, 5000);
    });
  }

  joinGame = (game) => {
    console.log('JOINING GAME', game);
  }
  
  receiveGame = (game) => {
    clearTimeout(this.stopWaiting);
    console.log('RECEIVE GAME', game);
    this.socket.removeListener('RECEIVE_GAME');
    this.socket.emit('JOIN_GAME', game);
  }

  startGame = (game) => {
    console.log('START GAME', game);
    this.setState({
      gameId: game.id,
      whiteId: game.userId,
    });
  }

  render() {
    const { gameId, whiteId } = this.state;
    const redirect = gameId ?
      <Redirect to={`/game/${gameId}?start_id=${whiteId}`} />
      :
      null;

    console.log('REDIRECT', redirect);

    return (
      <div className="Home">
        {redirect}
        <h1>Home Component</h1>
        <button
          onClick={this.createGame}
        >
          Start A New Game
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user,
});

const mapDispatchToProps = dispatch => ({
  addGame: (game) => {
    const action = { type: 'ADD_GAME', game };
    dispatch(action);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);