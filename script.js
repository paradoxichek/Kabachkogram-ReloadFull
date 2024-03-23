import { users } from "./db.js";

let russian = document.querySelector("#russian");
let american = document.querySelector("#american");
let subscriptions = [];

function reload(users, place) {
  for (let item of users) {
    let card = document.createElement("div");
    let avatar = document.createElement("div");
    let img = document.createElement("img");
    let name = document.createElement("div");
    let email = document.createElement("div");
    let btn = document.createElement("button");
    let btn2 = document.createElement("button");
    let tick = " 🗸";
    let follow = document.querySelector(".follow");

    card.classList.add("card");
    avatar.classList.add("avatar");
    name.classList.add("name");
    email.classList.add("email");
    btn.classList.add("btn");
    btn2.classList.add("btn2");

    img.setAttribute("src", item.photo);

    btn.textContent = "Follow";
    btn2.textContent = "Message";
    name.innerHTML = item.name + tick;
    email.innerHTML = item.email;

    avatar.append(img);
    card.append(avatar, name, email, btn, btn2);
    place.append(card);

    btn.onclick = () => {
      if (btn.classList.contains("unfollow")) {
        btn.classList.remove("unfollow");
        btn.textContent = "Follow";
      } else {
        btn.classList.add("unfollow");
        btn.textContent = "Unfollow";
      }
      followButtonClickHandler(item);
    };
  }
}

function followButtonClickHandler(user) {
  if (!subscriptions.includes(user)) {
    subscriptions.push(user);
    updateSubscriptionList();
  } else {
    subscriptions = subscriptions.filter(
      (subscription) => subscription !== user
    );
    updateSubscriptionList();
  }
}

function updateSubscriptionList() {
  let subscriptionList = document.getElementById("subscription-list");
  subscriptionList.innerHTML = "";
  subscriptions.forEach((user) => {
    let listItem = document.createElement("div");
    listItem.textContent = user.name;
    subscriptionList.appendChild(listItem);
  });
}

function loadUsersByNation(nationId, container) {
  let filteredUsers = users.filter((user) => user.nation === nationId);
  reload(filteredUsers, container);
}
loadUsersByNation("russian", russian);
loadUsersByNation("american", american);

let closeButton = document.querySelector(".close");
closeButton.onclick = () => {
  let modal = document.getElementById("modal");
  modal.style.display = "none";
  document.body.classList.remove("modal-open");
};

let followButton = document.querySelector(".follow");
followButton.onclick = () => {
  let modal = document.getElementById("modal");
  modal.style.display = "block";
  document.body.classList.add("modal-open");
};
