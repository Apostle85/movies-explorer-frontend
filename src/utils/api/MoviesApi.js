import { MOVIES_API_URL, MOVIES_PATH } from "../constants.js";

class MoviesApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _getResponse(res) {
    if(res.ok) return res.json();
    return Promise.reject(res);
  }

  getCards() {
    return fetch(`${this._url}`, {
        headers: this._headers,
    }).then((res) => this._getResponse(res));
  }
}

export default new MoviesApi({ url: `${MOVIES_API_URL + MOVIES_PATH}`});
