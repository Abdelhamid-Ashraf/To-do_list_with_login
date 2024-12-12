//!============= Start Global Variables

let loginEmailInput = document.getElementById("loginEmail");
let loginPasswordInput = document.getElementById("loginPassword");
let username = "";

let emailList = [];
if (localStorage.getItem("user") !== null) {
  emailList = JSON.parse(localStorage.getItem("user"));
}
//!============= End Global Variables

//*===> Start Check User Email Function
function validEmail() {
  let email = loginEmailInput.value;
  let res = false;
  let msgRemail = document.getElementById("msgRemail");
  let msgNemail = document.getElementById("msgNemail");
  for (let i = 0; i < emailList.length; i++) {
    if (email === emailList[i].userEmail) {
      res = true;
      username = emailList[i].userName;
    }
  }
  if (res) {
    msgRemail.classList.add("d-none");
    return true;
  } else {
    msgRemail.classList.remove("d-none");
    return false;
  }
}
function emptyEmail() {
  let email = loginEmailInput.value;
  let msgNemail = document.getElementById("msgNemail");
  for (let i = 0; i < emailList.length; i++) {
    if (email === emailList[i].userEmail) {
      res = true;
      username = emailList[i].userName;
    }
  }
  if (email !== "") {
    msgNemail.classList.add("d-none");
    return true;
  } else {
    msgNemail.classList.remove("d-none");
    return false;
  }
}
//*===> End Check User Email Function

//*===> Start Check User Password Function

function validPassword() {
  let password = loginPasswordInput.value;
  let res = false;
  let msgRPassword = document.getElementById("msgRpassword");
  for (let i = 0; i < emailList.length; i++) {
    if (password === emailList[i].userPassword) {
      res = true;
    }
  }

  if (res) {
    msgRPassword.classList.add("d-none");
    return true;
  } else {
    msgRPassword.classList.remove("d-none");
    return false;
  }
}
//*===> End Check User Password Function

//&===> Start Event Function

document.querySelector('form').addEventListener('submit',(e)=>{
  e.preventDefault();
  if (emptyEmail() && validEmail() && validPassword()) {
    localStorage.setItem("sessionUser", username);

    window.location = "./pages/todo.html";
    clearInfo();
  }
})

//&===> End Event Function

//^===> Start Save User Function


//^===> End Save User Function

//&===> Start ClearData

function clearInfo() {
  loginEmailInput.value = null;
  loginPasswordInput.value = null;
}
//&===> Start ClearData
