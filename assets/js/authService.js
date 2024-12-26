let loggedUser = JSON.parse(localStorage.getItem("loggedUser")) || undefined;

export async function login(email, password) {
  const response = await fetch("https://localhost:7049/api/Users/Login", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  const user = await response.json();
  loggedUser = user;

  localStorage.setItem("loggedUser", JSON.stringify(loggedUser));

  console.log(`${loggedUser.fullname}, Welcome`);
}

export function getLoggedUser() {
  return loggedUser;
}

export function logout() {
  loggedUser = undefined;
  localStorage.removeItem("loggedUser");
}

export async function register(fullname, email, password, confirmPassword) {
  if (confirmPassword !== password) {
    throw new Error("Passwords do not match");
  }

  const response = await fetch("https://localhost:7049/api/Users/Register", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ fullname, email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Registration failed");
  }

  const user = await response.json();
  loggedUser = user;

  // Persist user in localStorage
  localStorage.setItem("loggedUser", JSON.stringify(loggedUser));

  console.log(`${loggedUser.fullname}, Welcome`);
}
