import { register } from "./authService.js";

const registerForm = document.querySelector(".registerForm");
const passwordInput = document.getElementById("password");
const emailInput = document.getElementById("email");
const fullNameInput = document.getElementById("fullName");
const confirmPasswordInput = document.getElementById("confirmPassword");
const errorMessageArea = document.querySelector(".errorMessage");

registerForm.addEventListener("submit",async (e) => {
  e.preventDefault();

  try {
   await register(
      fullNameInput.value,
      emailInput.value,
      passwordInput.value,
      confirmPasswordInput.value
    );

    window.location.href = "/";
  } catch (e) {
    errorMessageArea.innerHTML = e.message;
  }
});
