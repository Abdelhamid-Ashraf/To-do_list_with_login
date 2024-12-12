//! Start Global
const formElement = document.querySelector("form");
const inputElement = document.querySelector("input");
let myApiKey;
const loadingScreen = document.querySelector(".loading");
let allData = [];

let dataList = [];
if (localStorage.getItem("user") !== null) {
  dataList = JSON.parse(localStorage.getItem("user"));
}

let subName;
if (localStorage.getItem("sessionUser") !== null) {
  subName = localStorage.getItem("sessionUser");
}

document.querySelector(".wel-msg").innerHTML = `<h1>Welcome, ${subName}</h1>`;

for (let i = 0; i < dataList.length; i++) {
  if (dataList[i].userName === subName) {
    myApiKey = dataList[i].userApi;
  }
}
getAllTodos();
//! End Global

//! Start Form Event
formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  if (inputElement.value.trim().length > 0) {
    addTodo();
  }
});
//! End Form Event

//^ Start Add function
async function addTodo() {
  showLoading();
  const todo = {
    title: inputElement.value,
    apiKey: myApiKey,
  };
  const opj = {
    method: "POST",
    body: JSON.stringify(todo),
    headers: {
      "content-type": "application/json",
    },
  };
  const response = await fetch("https://todos.routemisr.com/api/v1/todos", opj);
  if (response.ok) {
    const data = await response.json();
    if (data.message === "success") {
      toastr.success("Added Successfully", "Add Todo");
      await getAllTodos();
      formElement.reset();
    }
  }
  hideLoading();
}
//* End Add function

//^ Start GetData function
async function getAllTodos() {
  showLoading();
  const response = await fetch(
    `https://todos.routemisr.com/api/v1/todos/${myApiKey}`
  );
  if (response.ok) {
    const data = await response.json();
    if (data.message === "success") {
      allData = data.todos;
      displayData();
    }
  }
  hideLoading();
}
//* End GetData function

//^ Start DisplayData function
function displayData() {
  let todoList = "";
  for (const todo of allData) {
    todoList += `
    <li class="my-li text-capitalize">

            <span
                onclick="markTodo('${todo._id}')"
                style="${todo.completed ? "text-decoration:line-through;" : ""}"
                class="task-name">${todo.title}
            </span>


        <div class="icon ">
            
            ${
              todo.completed
                ? ' <span class="pe-3 check-icon"><i class="fa-solid fa-check" style="color: #63E6BE;"></i></span> '
                : ""
            }

            <span onclick="deleteTodo('${
              todo._id
            }')" class="pe-2 delete-icon"><i class="fa-regular fa-trash-can"></i></span>

        </div>
    </li>
    `;
  }
  document.querySelector(".task-list").innerHTML = todoList;

  changeProgress();
}
//* End DisplayData function

//^ Start Delete function
async function deleteTodo(i) {
  Swal.fire({
    title: "Delete todo ?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      showLoading();
      const ID = {
        todoId: i,
      };
      const opj = {
        method: "DELETE",
        body: JSON.stringify(ID),
        headers: {
          "content-type": "application/json",
        },
      };

      const response = await fetch(
        "https://todos.routemisr.com/api/v1/todos",
        opj
      );
      if (response.ok) {
        const data = await response.json();
        if (data.message === "success") {
          Swal.fire({
            title: "Deleted!",
            text: "Your todo has been deleted.",
            icon: "success",
          });
          await getAllTodos();
        }
      }
    }
  });
  hideLoading();
}
//* End Delete function

//^ Start Marking function
async function markTodo(i) {
  Swal.fire({
    title: "Complete todo ?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Complete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      showLoading();
      const ID = {
        todoId: i,
      };
      const opj = {
        method: "PUT",
        body: JSON.stringify(ID),
        headers: {
          "content-type": "application/json",
        },
      };
      const response = await fetch(
        "https://todos.routemisr.com/api/v1/todos",
        opj
      );
      if (response.ok) {
        const data = await response.json();
        if (data.message === "success") {
          Swal.fire({
            title: "Completed",
            icon: "success",
          });
          await getAllTodos();
        }
      }
    }
  });
  hideLoading();
}
//* End Marking function

//^ Start LoadingScreen
function showLoading() {
  loadingScreen.classList.remove("d-none");
}
function hideLoading() {
  loadingScreen.classList.add("d-none");
}
//* End LoadingScreen

//^ Start Progress function
function changeProgress() {
  const completedTask = allData.filter((todo) => todo.completed).length;
  const totalTask = allData.length;

  document.getElementById("progress").style.width = `${
    (completedTask / totalTask) * 100
  }%`;

  const statusNums = document.querySelectorAll(".status-nums span");
  statusNums[0].innerHTML = completedTask;
  statusNums[1].innerHTML = totalTask;
}
//* End Progress function

//*===> Start logout Btn

document.getElementById("logoutBtn").addEventListener("click", () => {
  Swal.fire({
    title: "Do you want logout?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        text: "Have a nice day",
        icon: "success",
      });
      localStorage.removeItem("sessionUser");
      location = "./../index.html";
    }
  });
});

//! Start Delete Account Btn
document.getElementById("delAcc").addEventListener("click", () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      for (let i = 0; i < dataList.length; i++) {
        if (myApiKey === dataList[i].userApi) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          dataList.splice([i], 1);
          localStorage.setItem("user", JSON.stringify(dataList));
          localStorage.removeItem("sessionUser");
          location = "./../index.html";
        }
      }
    }
  });
});
