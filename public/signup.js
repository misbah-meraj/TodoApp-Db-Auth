// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import {
  ref,
  getDatabase,
  set,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCuW_gEVIcITw_aaHxKswzqStoCNTvZo5w",
    authDomain: "todoapp-db-auth.firebaseapp.com",
    databaseURL: "https://todoapp-db-auth-default-rtdb.firebaseio.com",
    projectId: "todoapp-db-auth",
    storageBucket: "todoapp-db-auth.appspot.com",
    messagingSenderId: "497300682944",
    appId: "1:497300682944:web:b60ce15c19bf4a2d489525",
    measurementId: "G-N8JWPKEL2H"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();
const auth = getAuth();

var model = {};
var userName = document.getElementById("userName");
var email = document.getElementById("email");
var password = document.getElementById("password");

window.signUp = function (e) {
  e.preventDefault();
  model.userName = userName.value;
  model.email = email.value;
  model.password = password.value;
  console.log(model);

  createUserWithEmailAndPassword(auth, model.email, model.password)
    .then(function (res) {
      console.log(res.user.uid, "success response");
      model.id = res.user.uid;
      var reference = ref(database, `users/${model.id}`);
      set(reference, model)
        .then(function (dbRes) {
          alert("user created successfully");
          window.location.href = "./todo.html";
        })
        .catch(function (dbErr) {
          alert(dbErr.message);
        });
      userName.value = "";
      email.value = "";
      password.value = "";
    })
    .catch(function (err) {
      console.log(err, "error response");
      alert(err.message);
    });
};
