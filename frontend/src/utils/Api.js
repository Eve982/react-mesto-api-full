class Api {
  constructor({ baseUrl, headers, mode, credentials }) {
    this._BASECONFIG = { headers, mode, credentials }
    this._baseUrl = baseUrl;
    this._getServerResponse = this._getServerResponse.bind(this);
  }

  _getServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      `Что-то пошло не так при обмене данными с сервером: ${res.status}`
    );
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, this._BASECONFIG)
    .then(this._getServerResponse);
  }

  getInfo() {
    return fetch(`${this._baseUrl}/users/me`, this._BASECONFIG)
    .then(this._getServerResponse);
  }

  updateInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      ...this._BASECONFIG,
      method: "PATCH",
      body: JSON.stringify(data),
    }).then(this._getServerResponse);
  }

  updateAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      ...this._BASECONFIG,
      method: "PATCH",
      body: JSON.stringify(data),
    }).then(this._getServerResponse);
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      ...this._BASECONFIG,
      method: "POST",
      body: JSON.stringify(data),
    }).then(this._getServerResponse);
  }

  setLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      ...this._BASECONFIG,
      method: "PUT",
    }).then(this._getServerResponse);
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      ...this._BASECONFIG,
      method: "DELETE",
    }).then(this._getServerResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      ...this._BASECONFIG,
      method: "DELETE",
    }).then(this._getServerResponse);
  }
}

const api = new Api({
  baseUrl: "http://localhost:3000",
  mode: 'cors',
  credentials: 'include',
  headers: {
    "Content-Type": "application/json",
  },
});
export default api;