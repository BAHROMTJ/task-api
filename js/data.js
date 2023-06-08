import { render } from "./dom.js";
let arr = [];
let idx = null;
let url = "https://6264fc9e94374a2c506bde51.mockapi.io/tasks";

function handlClose(modalSelect) {
  let modal = document.querySelector(modalSelect);
  modal.close();
}
function handleOpen(modalSelect, id = null, form = null, user = {}) {
  let modal = document.querySelector(modalSelect);
  if (modalSelect.includes("edit") && id && form) {
    let editForm = document.querySelector(form);
    let { id, ...others } = user;
    for (let key in others) {
      editForm[key].value = others[key];
    }
    idx = id;
  } else if (modalSelect.includes("del") && id) {
    idx = id;
  }
  modal.show();
}

let add = document.querySelector(".add");
add.onclick = () => handleOpen("#addUser");
let addCancel = document.querySelector(".addCancel");
addCancel.onclick = () => handlClose("#addUser");

let addUserForm = document.querySelector(".addUserForm");
addUserForm.onsubmit = (e) => {
  e.preventDefault();
  const target = e.target;
  let user = {
    name: target["name"].value,
    points: target["points"].value,
  };
  postuser(user);
  handlClose("#addUser");
};

let editCancel = document.querySelector(".editCancel");
editCancel.onclick = () => handlClose("#editUser");

let editUserForm = document.querySelector(".editUserForm");
editUserForm.onsubmit = (e) => {
  e.preventDefault();

  const target = e.target;
  const user = arr.find((elem) => elem.id === idx);
  user.name = target["name"].value;
  user.points = target["points"].value;
  edituser(user, user.id);
  handlClose("#editUser");
};

let no = document.querySelector(".no");
no.onclick = () => handlClose("#delUser");

let yes = document.querySelector(".yes");
yes.onclick = () => {
  daletuser(idx);
  handlClose("#delUser");
  render();
};

async function getuser() {
  try {
    let { data } = await axios.get(url);
    arr = [...data];
    render();
    console.log(arr);
  } catch (error) {
    console.log(error);
  }
}

async function postuser(user) {
  try {
    let { data } = await axios.post(url, user);
    getuser();
  } catch (error) {
    console.log(error);
  }
}

async function daletuser(id) {
  try {
    let { data } = await axios.delete(`${url}/${id}`);
    getuser();
  } catch (error) {
    console.log(error);
  }
}

async function edituser(user, userid) {
  try {
    let { data } = await axios.put(`${url}/${userid}`, user);
    getuser();
  } catch (error) {
    console.log(error);
  }
}

export { arr, handleOpen, getuser };
