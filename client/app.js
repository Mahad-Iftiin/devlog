import { buildRoute } from "./router.js";
import homePage from "./homePage.js";
import { authenticateUser } from "./auth.js";

buildRoute("#/", authenticateUser);
buildRoute("#/home", homePage);
