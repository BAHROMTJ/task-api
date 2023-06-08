import { arr, handleOpen } from "./data.js";

function render() {
  let tbody = document.querySelector(".styled-tbody");
  tbody.innerHTML = "";

  arr.forEach((elem) => {
    
    let tr = document.createElement("tr");
    let tdName = document.createElement("td");
    tdName.innerText = elem.name;
    let tdPoints = document.createElement("td");
    tdPoints.innerText = elem.points;
    let tdActions = document.createElement("td");
    
    let btnEdit = document.createElement("button");
    btnEdit.innerText = "Edit";
    btnEdit.style.marginRight = "5px";
    btnEdit.onclick = () =>
      handleOpen("#editUser", elem.id, ".editUserForm", elem);
    let btnDel = document.createElement("button");
    btnDel.innerText = "Del";
    btnDel.onclick = () => handleOpen("#delUser", elem.id);
    tdActions.appendChild(btnEdit);
    tdActions.appendChild(btnDel);
    tr.appendChild(tdName);
    tr.appendChild(tdPoints);
    tr.appendChild(tdActions);
    tbody.appendChild(tr);
  });
}

export { render };
