import { getUsers } from "./main";
import { attachLikeButtonListener } from "./render";

import { postComments } from "./api";
import { buttonElement } from "./render";
export function renderUsers(users, listElement) {
  // listElement remove if not working

  const appElement = document.getElementById("app");
  const usersHTML = users
    .map((user, index) => {
      return `<li class="comment" data-index="${index}" >
          <div class="comment-header">
            <div>${user.name}</div>
            <div>${user.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              <a class="comment__link" href="#" id="text-button-${
                user.text
              }"></a>
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${user.likes}</span>
              <button data-index="${index}" class="like-button ${
        user.isLiked ? "-active-like" : "-no-active-like"
      }"></button>
            </div>
          </div>
        </li> `;
    })
    .join("");
  const usersPageHTML = `
    <div class="container">
    <ul id="list" class="comments">
    ${usersHTML}
    </ul>
    ${
      token
        ? `<div class="add-form">
    <input id="name-input"
      type="text"
      value=""
      class="add-form-name"
      placeholder="Введите ваше имя"
    />
    <textarea
      id="comment-input"
      class="add-form-text"
      placeholder="Введите ваш комментарий"
      rows="4"
    ></textarea>
    <div class="add-form-row">
      <button id="add-button" class="add-form-button">Написать</button>
    </div>
    </div>`
        : `<p>Для добавления комментария, <a id="login-link" class="add-form-link" href='#'>зарегистрируйтесь</а></p>`
    }
    <div class="comment-loader hidden">
            <span>Comment is being posted</span>
          </div>
    </div>
    </div>
    
    `;
  appElement.innerHTML = usersPageHTML;

  // listElement ->clarify
  const list = document.getElementById("list");
  const buttonElement = document.getElementById("add-button");

  list.innerHTML = usersHTML;
  const linkToLogin = document.getElementById("login-link");
  linkToLogin?.addEventListener("click", () => {
    renderLogin();
  });
  getUsers();
  attachLikeButtonListener();
}
postComments(commentInfo);
