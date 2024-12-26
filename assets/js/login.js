import { login } from "./authService.js";

const loginForm = document.querySelector(".loginForm");
const emailInput = document.querySelector(".emailInput");
const passwordInput = document.querySelector(".passwordInput");
const errorMessageArea = document.querySelector(".errorMessage");

console.log(loginForm)

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    await login(emailInput.value, passwordInput.value);

    window.location.href = "/";
  } catch (e) {
    errorMessageArea.innerHTML = "Invalid Credentials";
  }
});
