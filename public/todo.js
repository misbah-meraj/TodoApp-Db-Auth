// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  ref,
  set,
  getDatabase,
  push,
  onValue,
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
  measurementId: "G-N8JWPKEL2H",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();

var inp = document.getElementById("inp");
var showList = document.getElementById("showList");
var list;

window.add = function () {
  var obj = {
    text: inp.value,
  };
  obj.id = push(ref(database, "Tasks/")).key;
  var reference = ref(database, `Tasks/${obj.id}`);
  set(reference, obj);
};

// Rendering the list with edit and delete functionality
function renderList() {
  showList.innerHTML = "";

  for (var i = 0; i < list.length; i++) {
    (function (index) {
      var div = document.createElement("div");
      div.textContent = list[index].text;

      var editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.style.backgroundColor = "#4f3cdd";
      editBtn.onclick = function () {
        editTask(list[index].id);
      };

      var delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.style.backgroundColor = "#dc3545";
      delBtn.onclick = function () {
        deleteTask(list[index].id);
      };

      div.appendChild(editBtn);
      div.appendChild(delBtn);

      showList.appendChild(div);
    })(i);
  }
}

// Function to edit a task
function editTask(id) {
  var newText = prompt("Enter new text for the task:");
  if (newText !== null && newText.trim() !== "") {
    set(ref(database, `Tasks/${id}/text`), newText.trim());
  }
}

// Function to delete a task
function deleteTask(id) {
  if (confirm("Are you sure you want to delete this task?")) {
    // Remove the task from the database
    set(ref(database, `Tasks/${id}`), null);
  }
}

// Function to delete all tasks
window.deleteAllTasks = function () {
  if (confirm("Are you sure you want to delete all tasks?")) {
    set(ref(database, "Tasks"), null);
    location.reload();
  }
};

function getData() {
  var reference = ref(database, "Tasks/");

  onValue(reference, function (data) {
    list = Object.values(data.val());
    renderList();
    console.log(list);
  });
}
getData();
