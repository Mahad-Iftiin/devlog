export function isLoggedin() {
  return localStorage.getItem("token") ? true : false;
}

function closeModal(id) {
  console.log("The Id is: ", id);
  const element = document.getElementById(id);
  if (element) element.remove();
}

window.closeModal = closeModal;
export { closeModal };
