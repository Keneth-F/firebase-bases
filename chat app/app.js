import {
  auth,
  authVerify,
  createUser,
  login,
  logOutFunc,
  saveMesagge,
} from "./firebase.js";
const botones = document.querySelector("#botones");
const nombreUsuario = document.querySelector("#nombreUsuario");
const logOut = () => {
  formulario.classList = "input-group mb-3 fixed-bottom container";
  botones.innerHTML = /*html*/ `
        <button class="btn btn-outline-danger" id="btnCerrar">Cerrar Sesión</button>
    `;
  const btnCerrar = document.querySelector("#btnCerrar");
  btnCerrar.addEventListener("click", () => {
    logOutFunc();
    contenidoWeb.innerHTML = "";
  });
};
const logIn = () => {
  formulario.classList = "input-group mb-3 fixed-bottom container d-none";
  nombreUsuario.innerHTML = "Chat";

  const registerHTML = document.createElement("div");

  registerHTML.innerHTML = `
  <div class="d-flex justify-content-center">
    
  <div class="col-md-4">
  <div class="card bg-dark text-white rounded-0 p-4">
    <div class="card-body">
    <h1 class="h5">Signup</h1>
    <h3 class="h6">Create new Account</h3>
    <form id="register-form">
      <div class="mb-2">
      <label for="email">Email:</label>
      <input type="email" name="email" class="
        form-control
        rounded-0
        bg-dark
        border-secondary
        text-white
        " placeholder="email" autofocus="">
      </div>
      <div class="mb-2">
      <label for="password">Password:</label>
      <input type="password" name="password" class="
        form-control
        bg-dark
        rounded-0
        border-secondary
        text-white
        " placeholder="password">
      </div>
      <button type="submit" class="btn btn-primary rounded-0">Register</button>
    </form>
    </div>
  </div>
  </div><div class="col-md-4">
  <div class="card bg-dark text-white rounded-0 p-4">
    <div class="card-body">
    <h1 class="h5">Login</h1>
    <h3 class="h6">Login with Credentials</h3>
    <form id="login-form">
      <div class="mb-2">
      <label for="email">Email:</label>
      <input type="email" name="email" class="
        form-control
        rounded-0
        bg-dark
        border-secondary
        text-white
        " placeholder="email" autofocus="">
      </div>
      <div class="mb-2">
      <label for="password">Password:</label>
      <input type="password" name="password" class="
        form-control
        bg-dark
        rounded-0
        border-secondary
        text-white
        " placeholder="password">
      </div>
      <button type="submit" class="btn btn-primary rounded-0">Login</button>
    </form>
    </div>
  </div>
  </div>
</div>
  `;
  contenidoWeb.appendChild(registerHTML);
  const registerForm = registerHTML.querySelector("#register-form");
  const loginForm = registerHTML.querySelector("#login-form");

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = registerForm["email"].value;
    const password = registerForm["password"].value;
    try {
      await createUser(email, password);
      contenidoWeb.innerHTML = "";
    } catch (error) {
      console.error(error);
    }
  });
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = loginForm["email"].value;
    const password = loginForm["password"].value;
    try {
      await login(email, password);
      contenidoWeb.innerHTML = "";
    } catch (error) {
      console.error(error);
    }
  });
};
authVerify({ onSucces: logOut, onFailure: logIn });

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(texto.value);
  if (!texto.value.trim()) {
    console.log("texto vacio");
    return;
  }
  saveMesagge({
    texto: texto.value,
    fecha: Date.now(),
  }).then((res) => {
    console.log("texto agregado");
  });
  texto.value = "";
});
