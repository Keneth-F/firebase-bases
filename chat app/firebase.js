// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import { firebaseConfig } from "./firebaseConfig.js";
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
let userInfo;
export function authVerify({ onSucces, onFailure }) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      nombreUsuario.innerHTML = user.displayName ?? user.email;
      userInfo = user;
      onSucces();
      loadData(user);
    } else {
      onFailure();
    }
  });
}
export const createUser = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential;
};
export const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential;
};
export const logOutFunc = () => {
  signOut(auth);
};
export const loadData = (user) => {
  onGetMessages((query) => {
    contenidoWeb.innerHTML = "";

    query.forEach((doc) => {
      if (user.uid === doc.data().uid) {
        contenidoWeb.innerHTML += /*html*/ `
                      <div class="d-flex justify-content-end mb-2">
                          <span class="badge badge-primary">
                              ${doc.data().texto}
                          </span>
                      </div>
                      `;
      } else {
        contenidoWeb.innerHTML += /*html*/ `
                      <div class="d-flex justify-content-start mb-2">
                          <span class="badge badge-secondary">${
                            doc.data().texto
                          }</span>
                      </div>
                      `;
      }
      contenidoWeb.scrollTop = contenidoWeb.scrollHeight;
    });
  });
};
export const saveMesagge = (message) =>
  addDoc(collection(db, "chat"), { uid: auth.currentUser.uid, ...message });

export const onGetMessages = (callback) =>
  onSnapshot(collection(db, "chat"), callback);
