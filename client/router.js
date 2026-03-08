import { isLoggedin } from "./utils.js";

const routes = {};
const protectedRoutes = ["#/home"];

export function buildRoute(path, page) {
  routes[path] = page;

  const currPath = window.location.hash || "#/";

  if (!isLoggedin() && protectedRoutes.includes(path)) {
    window.location.hash = "#/";
    return;
  }

  if (currPath == path) {
    renderRoute(path, page);
  }
}

const renderRoute = function (path, page) {
  if (!path || !page) {
    return;
  }
  const app = document.querySelector(".container");

  app.innerHTML = page();
  if (path === "#/home" && window.renderPosts) {
    window.renderPosts();
  }
};

window.addEventListener("hashchange", () => {
  const currPath = window.location.hash || "#/";
  const page = routes[currPath];

  if (isLoggedin() && currPath === "#/") {
    window.location.hash = "#/home";
    return;
  }

  if (!isLoggedin() && protectedRoutes.includes(currPath)) {
    window.location.hash = "#/";
    return;
  }

  if (page) {
    renderRoute(currPath, page);
  }
});
