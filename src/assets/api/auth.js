import data from '../data';

const { api } = data;
const apiURL = `${api}/auth`;

class AuthAPI {
  login = (user, cb, signingUp) => {
    const path = signingUp ? 'signup' : 'login';
    const url = `${apiURL}/${path}`;
    console.log('URL', url);
    console.log('USER', user);
    return fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(user),
    })
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        cb(results);
      })
      .catch((error) => {
        cb({ error });
      });
  };
}

export default AuthAPI;