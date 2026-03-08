const html = String.raw;

window.formatDate = function (date) {
  const now = new Date();
  const postTime = date.getTime();
  const timeDif = Math.floor((now.getTime() - postTime) / 1000 / 3600);
  const monthDif =
    (now.getFullYear() - date.getFullYear()) * 12 + (now.getMonth() - date.getMonth());

  if (timeDif < 24) {
    return `${timeDif}h`;
  } else if (monthDif < 12) {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } else {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }
};

function postCard(post) {
  const pfp = localStorage.getItem("pfp");
  return html`
    <div class="post">
      <div class="post-header">
        <div class="author">
          <div class="user-details">
            ${pfp
              ? `
                  <div class="pfp">
                    <img src="${pfp}">
                  </div> 
                  `
              : `
          <div class="default-pfp">
            ${post.authorUsername?.charAt(0).toUpperCase() ?? "U"}
          </div>`}
          </div>
          <div class="author-cred">
            <span class="author-name">${post.authorUsername}</span>
          </div>
        </div>
        <div class="post-details">
          <time datetime="${post.createdAt}"> ${formatDate(new Date(post.createdAt))} </time>
        </div>
      </div>
      <div class="post-title">
        <h2>${post.title}</h2>
      </div>
      <div class="post-body">
        <p class="post-text">${post.body}</p>
      </div>
    </div>
  `;
}

export function posts() {
  return html`<div class="grid-container" id="posts-grid"></div>`;
}

window.renderPosts = async function () {
  try {
    // fetch the posts from server
    const response = await fetch("http://localhost:9090/api/posts", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();
    if (response.ok) {
      document.getElementById("posts-grid").innerHTML = data
        .map((post) => {
          return postCard(post);
        })
        .join("");
    } else {
      console.log("Something wrong: ", response);
    }
  } catch (err) {
    console.log("What went wrong: ", err);
  }
};
