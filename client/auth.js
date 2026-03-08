let authMode = {
  login: true,
};

window.setAuthMode = function () {
  authMode.login = !authMode.login;
  reRender();
};

async function login() {
  // get the credentials
  const email = document.getElementById("auth-email").value.trim();
  const password = document.getElementById("auth-password").value.trim();

  if (!email || !password) {
    errorMsg("Fields cannot be empty.");
    return;
  }
  //talk to server
  const j = JSON.stringify({ email, password });
  try {
    //send the data to the server
    const response = await fetch("http://localhost:9090/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: j,
    });

    const data = await response.json();
    // check the response
    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("role", data.role);

      // redirect the user to homepage
      window.location.hash = "/home";
    } // server sent back bad code
    else {
      errorMsg("Your email or password is incorrect.");
    }
  } catch (err) {
    console.log("What went wrong: ", err);
  }
}

async function signup() {
  // get the credentials
  const email = document.getElementById("auth-email").value.trim();
  const username = document.getElementById("auth-username").value.trim();
  const password = document.getElementById("auth-password").value.trim();
  const confirm = document.getElementById("auth-confirm").value.trim();

  if (!email || !password || !confirm || !username) {
    errorMsg("Fields cannot be empty.");
    return;
  }

  if (!(confirm === password)) {
    errorMsg("Passwords do not match.");
    return;
  }

  // build the data into a json
  const j = JSON.stringify({ email, username, password, confirm });

  //send the data to the server
  try {
    const response = await fetch("http://localhost:9090/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: j,
    });

    if (response.ok) {
      //login the user

      authMode.login = true;
      reRender();
    } else {
      errorMsg("Something went wrong. Maybe try another email");
    }
  } catch (err) {
    console.log("What went wrong: ", err);
  }
}

function errorMsg(msg) {
  const element = document.getElementById("auth-error");
  element.textContent = msg;
  element.style.display = "block";
}

// Html

const html = String.raw;
function auth() {
  return html`
    <div class="auth-body">
      <div class="title">${authMode.login ? `<h1>Login</h1>` : `<h1>Signup</h1>`}</div>
      
      <p id="auth-error"></p>

      <div class="inputs"> 

        <label for="auth-email">Email</label>
        <input id = "auth-email" type="email" required />

        ${
          !authMode.login
            ? `  <label for="auth-username">Username</label>
            <input id = "auth-username" type="text" required>
            `
            : ""
        }
      
  
        <label for="auth-password">Password</label>
        <input id="auth-password" type="password" required />

        ${
          !authMode.login
            ? ` <label for="auth-confirm">Enter password again</label>
                <input id="auth-confirm" type="password" required>
`
            : ""
        } 
      </div>


      <div class="submit-btn">
        <button 
          onclick="${authMode.login ? "login()" : "signup()"}"> 
           ${authMode.login ? "Login" : "Signup"}
        </button>
      </div>


      <div class="footer">
        <div class="auth-toggle">
          <span>${authMode.login ? "Don't have an account?" : "Already have an account?"}</span>
          <button class="auth-toggle-btn" onclick="setAuthMode()">
            ${authMode.login ? "Signup" : "Login"}
          </button>
        </div>
        ${authMode.login ? `<a href="">Forgot password?</a>` : ""}
      
      </div>

      </div>
    </div>
  `;
}
export function authenticateUser() {
  return html` <div id="auth-container" class="auth-window">${auth()}</div> `;
}

function reRender() {
  const container = document.getElementById("auth-container");
  container.innerHTML = auth();
}

window.login = login;
window.signup = signup;
