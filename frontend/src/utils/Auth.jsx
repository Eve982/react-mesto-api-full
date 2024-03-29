import BASE_URL from "./constants";

// export const BASE_URL = "https://api.eve982.pet-project.nomoredomains.work/";
// export const BASE_URL = "http://localhost:3000";

function getServerResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(
    `Что-то пошло не так при обмене данными с сервером: ${res.status}`
  );
}

export const register = ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    mode: 'cors',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    return getServerResponse(res);
  });
};

export const authorize = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    mode: 'cors',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => getServerResponse(res))
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        return data;
      }
    });
};

export const checkTokenApi = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    mode: 'cors',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => getServerResponse(res));
};
