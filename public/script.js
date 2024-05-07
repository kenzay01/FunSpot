const buttonPlay = document.querySelector(".game-btn");
buttonPlay.href = "#";
function createLogoutSection() {
  const logoutSection = document.getElementById("logout-section");

  if (logoutSection) {
    logoutSection.remove();
  } else {
    const newLogoutSection = document.createElement("div");
    newLogoutSection.id = "logout-section";

    const closeButton = document.createElement("button");
    closeButton.textContent = "X";
    closeButton.classList.add("close-button");
    closeButton.onclick = function () {
      newLogoutSection.remove();
    };

    const logoutButton = document.createElement("button");
    logoutButton.textContent = "Logout";
    logoutButton.onclick = function () {
      document.cookie =
        "userEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      newLogoutSection.remove();
      window.location.href = "/";
    };

    newLogoutSection.appendChild(closeButton);
    newLogoutSection.appendChild(logoutButton);

    const loginLink = document.getElementById("login-link");
    if (loginLink) {
      loginLink.parentNode.insertBefore(
        newLogoutSection,
        loginLink.nextSibling
      );
    }
  }
}

const userEmail = document.cookie
  .replace(/(?:(?:^|.*;\s*)userEmail\s*\=\s*([^;]*).*$)|^.*$/, "$1")
  .split("%")[0];
if (userEmail) {
  updateLoginText(userEmail);
}
function updateLoginText(userEmail) {
  buttonPlay.href = "./play-zone/play-zone.html";
  const loginLink = document.getElementById("login-link");
  if (loginLink) {
    loginLink.textContent = userEmail;
    loginLink.href = "#";
    loginLink.onclick = function () {
      createLogoutSection();
    };
  }
}
