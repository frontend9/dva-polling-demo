import fetch from 'dva/fetch';

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function json(response) {
  return response.json();
}

function err(err) {
  console.error(err);
}

export default function request(url, option) {
  return fetch(url, option)
    .then(status)
    .then(json)
}
