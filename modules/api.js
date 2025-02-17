import { currentDate } from "./utils.js";

export let token = null;
export const getToken = () => {
  return token;
};
export const setToken = (newToken) => {
  token = newToken;
};

export function getComments() {
  return fetch("https://wedev-api.sky.pro/api/v2/dima-nosov/comments", {
    method: "GET",
  }).then((response) => response.json());
}

export function showLoadingIndicatorComments() {
  const loader = document.querySelector(".comment-loader");
  loader.classList.remove("hidden");
}

export const inputTextElement = document.getElementById("comment-input");
export const inputNameElement = document.getElementById("name-input");

export function postComments(date) {
  const commentInfo = {
    text: inputTextElement.value.replace(/</g, "&lt;").replace(/>/g, "&gt;"),
    nick: inputNameElement.value.replace(/</g, "&lt;").replace(/>/g, "&gt;"),
    date: currentDate(date),
  };

  return fetch("https://wedev-api.sky.pro/api/v2/dima-nosov/comments", {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: JSON.stringify({
      name: commentInfo.nick,
      date: commentInfo.date,
      likes: 0,
      text: commentInfo.text,
      isLiked: false,
      forceError: true,
    }),
  })
    .then((response) => {
      if (response.status === 500) {
        throw new Error("The server has failed");
      } else if (response.status === 400) {
        throw new Error("Something went wrong, try to enter again");
      } else {
        return response.json();
      }
    })
    .then((responseData) => {
      // showAddForm();
      // inputTextElement.value = ""; скорее не вызывать, так как использованы в начале функции
      // inputNameElement.value = "";
      // getFetch(); разобраться
      //deleteLoadingIndicator(); разобраться
    })
    .catch((error) => {
      //showAddForm();
      //deleteLoadingIndicatorComments();
      // buttonElement.disabled = false;
      // console.error(error.message);
    });
}
export function loginUser({ login, password }) {
  return fetch("https://wedev-api.sky.pro/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Wrong login or password");
    }
    return response.json();
  });
}

export function authorizedUser({ login, password, name }) {
  return fetch("https://wedev-api.sky.pro/api/user", {
    method: "POST",
    body: JSON.stringify({
      name,
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("User is already registered");
    }
    return response.json();
  });
}
