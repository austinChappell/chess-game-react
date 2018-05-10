const deleteRoute = (url, token, cb) => (
  fetch(url, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    method: 'DELETE',
  }).then(res => res.json())
    .then((results) => {
      cb(results);
    })
    .catch((err) => {
      throw err;
    })
);

const get = (url, token, cb) => (
  fetch(url, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(res => res.json())
    .then((results) => {
      cb(results);
    }).catch((err) => {
      throw err;
    })
);

const post = (url, token, body, cb) => {
  fetch(url, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
    body: JSON.stringify(body),
  }).then(res => res.json())
    .then((results) => {
      cb(results);
    }).catch((err) => {
      throw err;
    });
};

const put = (url, token, body, cb) => (
  fetch(url, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    method: 'PUT',
    body: JSON.stringify(body),
  }).then(res => res.json())
    .then((results) => {
      cb(results);
    }).catch((err) => {
      throw err;
    })
);

export {
  deleteRoute,
  get,
  post,
  put,
};
