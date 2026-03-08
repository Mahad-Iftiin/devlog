import { closeModal } from "./utils.js";

const html = String.raw;
export function createPost() {
  return html`
    <div class="post-modal">
      <div class="modal-close">
        <button onclick="closeModal('modal-container')" style="float:right;">X</button>
      </div>
      <div class="modal-header">
        <h1>Create a post</h1>
      </div>

      <div class="post-title">
        <label for="post-title-input" required>Title</label>
        <input id="post-title-input" type="text" required />
      </div>

      <div class="post-body">
        <textarea id="post-body-input" placeholder="Text body"></textarea>
      </div>

      <p id="post-error"></p>

      <div class="post-footer">
        <button onclick="submitPost()">Post</button>
      </div>
    </div>
  `;
}

window.submitPost = async function () {
  const title = document.getElementById("post-title-input").value.trim();
  const body = document.getElementById("post-body-input").value.trim();

  const data = JSON.stringify({ title, body });

  try {
    const response = await fetch("http://localhost:9090/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: data,
    });

    if (response.ok) {
      closeModal("modal-container");
      window.renderPosts();
      return;
    } else {
      console.log("Something went wrong with the post");
    }
  } catch (err) {
    console.log("What went wrong ", err);
  }
};
