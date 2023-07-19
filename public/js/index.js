//Login Functionality and Api Calls
const LoginForm = document.querySelector(".loginForm");

const Login = async (email, password) => {
  const data = {
    email: email,
    password: password,
  };
  const response = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const res = await response.json();

  if (res.message === "fail") {
    showAlert(`error`, res.payload);
  } else {
    showAlert(`success`, `Hello user your email id is ${res.payload.email}`);
  }
};

if (LoginForm) {
  LoginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = LoginForm.elements["email"].value;
    const passwrod = LoginForm.elements["password"].value;
    Login(email, passwrod);
  });
}

//Alert handling
const HideAlert = () => {
  const el = document.querySelector(".alert");
  if (el) {
    el.parentElement.removeChild(el);
  }
};

const showAlert = (type, msg) => {
  HideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(HideAlert, 2000);
};
