import { MAIN_API_URL, MOVIES_API_URL } from "../constants.js";

class MainApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _getResponse(res) {
    if (res.ok) return res.json();
    return res.text().then((text) => {
      throw new Error(text);
    });
  }

  saveMovie({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    id,
  },token) {
    return fetch(`${this._url}/movies`, {
      method: "POST",
      credentials: "include",
      headers: { ...this._headers, 'Authorization': `Bearer ${token}`},
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image: `${MOVIES_API_URL + image.url}`,
        trailerLink,
        nameRU,
        nameEN,
        thumbnail: `${MOVIES_API_URL + image.formats.thumbnail.url}`,
        movieId: id,
      }),
    }).then((res) => {
      return this._getResponse(res);
    });
  }

  forgetMovie(movieId,token) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: "DELETE",
      credentials: "include",
      headers: { ...this._headers, 'Authorization': `Bearer ${token}`},
    }).then((res) => {
      return this._getResponse(res);
    });
  }

  getMovies(token) {
    return fetch(`${this._url}/movies`, {
      headers: { ...this._headers, 'Authorization': `Bearer ${token}`},
      credentials: "include",
    }).then((res) => {
      return this._getResponse(res);
    });
  }

  //   changeLikeCardStatus(, isLiked) {
  //     return isLiked ? this.forgetMovie(cardId) : this.saveMovie(cardId);
  //   }

  register({ name, email, password }) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        password,
        email,
      }),
    }).then((res) => {
      return this._getResponse(res);
    });
  }

  login({ email, password }) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        password,
        email,
      }),
    }).then((res) => {
      return this._getResponse(res);
    });
  }

  logout(token) {
    return fetch(`${this._url}/signout`, {
      credentials: "include",
      headers: { ...this._headers, 'Authorization': `Bearer ${token}`},
    }).then((res) => {
      return this._getResponse(res);
    });
  }

  // Отправка отредактированной информации о пользователе
  updateProfile({ name, email },token) {
    console.log(name, email, 'CHECK');
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: { ...this._headers, 'Authorization': `Bearer ${token}`},
      body: JSON.stringify({
        name,
        email,
      }),
    }).then((res) => {
      return this._getResponse(res);
    });
  }

  // Получение информации о пользователе
  getProfile(token) {
    return fetch(`${this._url}/users/me`, {
      credentials: "include",
      headers: { ...this._headers, 'Authorization': `Bearer ${token}`},
    }).then((res) => {
      return this._getResponse(res);
    });
  }
}

export default new MainApi({
  url: MAIN_API_URL,
  headers: { "Content-Type": "application/json" },
});
