import { nav } from "./nav.js";
import { posts } from "./posts.js";
const html = String.raw;
export default function homePage() {
  return html` ${nav(true)} ${posts()} `;
}
