import { createPost } from "./createPost.js";

window.logout = function () {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("username");
  window.location.hash = "/";
};

window.postModal = function () {
  const overlay = document.createElement("div");
  overlay.id = "modal-container";
  overlay.innerHTML = createPost();
  document.getElementById("create-post-btn").appendChild(overlay);
};

const html = String.raw;
export function nav() {
  const pfp = localStorage.getItem("pfp");
  return html`
    <nav class="nav-bar">
      <div class="title"><span>DevLog</span></div>
      <div class="left-side">
        <div id="create-post-btn" class="create-post-btn">
          <button onclick="postModal()">Create Post</button>
        </div>
        <div id="user-details" class="user-details" onclick="overlay()">
          ${pfp
            ? `
                  <div class="pfp">
                    <img src="${pfp}">
                  </div> 
                  `
            : `
          <div class="default-pfp">
            ${localStorage.getItem("username")?.charAt(0).toUpperCase() ?? "U"}
          </div>`}
        </div>
      </div>
    </nav>
  `;
}

window.overlay = function () {
  const overlay = document.createElement("div");
  overlay.id = "overlay";
  overlay.innerHTML = `
    <div class="overlay"> 
      <ul>
        <li>
          <span onclick="logout()">Log Out</span>
        </li>
      </ul>
    </div>
  `;
  window.addEventListener("click", (e) => {
    if (!document.getElementById("user-details").contains(e.target)) {
      overlay.remove();
    }
  });

  document.getElementById("user-details").appendChild(overlay);
};
