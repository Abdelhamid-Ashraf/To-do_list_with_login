//!============= Start Global Variables
let signupNameInput = document.getElementById("signupName");
let signupEmailInput = document.getElementById("signupEmail");
let signupPasswordInput = document.getElementById("signupPassword");

let userInfo = [];
let userKey;
if (localStorage.getItem("user") !== null) {
  userInfo = JSON.parse(localStorage.getItem("user"));
}
//!============= End Global Variables

//*===> Start Check Exists User Function
function existsEmail() {
  let email = signupEmailInput.value;
  let res = true;
  let msgExists = document.getElementById("msgExists");
  for (let i = 0; i < userInfo.length; i++) {
    if (email === userInfo[i].userEmail) {
      res = false;
    }
  }
  if (res) {
    msgExists.classList.add("d-none");
    return true;
  } else {
    msgExists.classList.remove("d-none");
    return false;
  }
}
//*===> End Check User Function

//&===> Start Event Function

document.querySelector("form").addEventListener("submit",(e)=>{
e.preventDefault();
addUser();
})

//&===> End Event Function


async function getApiKey() {
  const respone = await fetch("https://todos.routemisr.com/api/v1/getApiKey");
  if (respone.ok) {
    const data = await respone.json();
    if (data.message === "success") {
      userKey = data.apiKey;
      
    }
  }
}

//^===> Start Add User Function

async function addUser() {
  if (
    validationName() &&
    validationEmail() &&
    validationPassword() &&
    existsEmail()
  ) {
    await getApiKey();
    let user = {
      userName: signupNameInput.value,
      userEmail: signupEmailInput.value,
      userPassword: signupPasswordInput.value,
      userApi:userKey,
    };
  
    userInfo.push(user);
    
    localStorage.setItem("user", JSON.stringify(userInfo));

    clearData();

    location="./../index.html";
  }
}
//^===> End Add User Function




//&===> Start ClearData

function clearData() {
  signupNameInput.value = null;
  signupEmailInput.value = null;
  signupPasswordInput.value = null;
}
//&===> End ClearData

//!===> Start Validation-Name
function validationName() {
  let regex = /^[a-zA-Z][a-zA-Z0-9 _-]{3,15}$/;
  let text = signupNameInput.value;
  let msgName = document.getElementById("msgName");

  if (regex.test(text)) {
    signupNameInput.classList.add("is-valid");
    signupNameInput.classList.remove("is-invalid");
    msgName.classList.add("d-none");
    return true;
  } else {
    signupNameInput.classList.add("is-invald");
    signupNameInput.classList.remove("is-valid");
    msgName.classList.remove("d-none");
    return false;
  }
}
//!===> End Validation-Name

//!===> Start Validation-Email
function validationEmail() {
  let regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  let text = signupEmailInput.value;
  let msgEmail = document.getElementById("msgEmail");

  if (regex.test(text)) {
    signupEmailInput.classList.add("is-valid");
    signupEmailInput.classList.remove("is-invalid");
    msgEmail.classList.add("d-none");
    return true;
  } else {
    signupEmailInput.classList.add("is-invalid");
    signupEmailInput.classList.remove("is-valid");
    msgEmail.classList.remove("d-none");
    return false;
  }
}
//!===> End Validation-Email

//!===> End Validation-Password
function validationPassword() {
  let regex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,20}$/;
  let text = signupPasswordInput.value;
  let msgPass = document.getElementById("msgPass");

  if (regex.test(text)) {
    signupPasswordInput.classList.add("is-valid");
    signupPasswordInput.classList.remove("is-invalid");
    msgPass.classList.add("d-none");
    return true;
  } else {
    signupPasswordInput.classList.add("is-invalid");
    signupPasswordInput.classList.remove("is-valid");
    msgPass.classList.remove("d-none");
  }
}
//!===> End Validation-Password
