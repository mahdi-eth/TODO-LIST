const title = document.getElementById("title");
const Desc = document.getElementById("Desc");
const submit = document.getElementById("submit");
const myAlert = document.getElementById("myAlert");
const alertBtn = document.getElementById("alertBtn");

const arrayParsed = JSON.parse(localStorage.getItem("userLocalData")) || [];
const userLocalstorage = [...arrayParsed];

const makeList = (event) => {
  event.preventDefault();
  const userData = {
    checked: false,
    id: Date.now(),
    title: title.value,
    desc: Desc.value,
  };

  if (!userData.title) {
    myAlert.style.left = "calc(50% - 30rem";
    setTimeout(function () {
      myAlert.style.left = "-100%";
    }, 10000);
    alertBtn.addEventListener("click", () => {
      myAlert.style.left = "-100%";
    });
    return myAlert;
  }

  userLocalstorage.push(userData);
  localStorage.setItem("userLocalData", JSON.stringify(userLocalstorage));
  location.reload();
};

userLocalstorage.forEach((toDo) => {
  let htmlUNList = document.createElement("ul");
  htmlUNList.className = "main-ul";
  htmlUNList.id = toDo.id;
  if (toDo.checked) htmlUNList.style.background = "rgba(0, 162, 255, 0.850)";

  const htmlList = document.createElement("li");

  const htmlTitle = document.createElement("h4");
  let htmlTitleInput = document.createElement("input");
  htmlTitleInput.defaultValue = toDo.title;
  htmlTitleInput.disabled = true;
  htmlTitleInput.style.fontSize = "2.4rem";
  htmlTitle.appendChild(htmlTitleInput);

  const htmlLDesc = document.createElement("p");
  const htmlLDescInput = document.createElement("input");
  htmlLDescInput.defaultValue = toDo.desc;
  htmlLDescInput.disabled = true;
  htmlLDesc.appendChild(htmlLDescInput);

  htmlList.appendChild(htmlTitle);
  htmlList.appendChild(htmlLDesc);

  const htmlDel = document.createElement("button");
  htmlDel.innerHTML = "Del";
  htmlDel.onclick = () => {
    const filtredTodo = userLocalstorage.filter(
      (item) => item.id !== Number(htmlDel.parentElement.id)
    );
    localStorage.setItem("userLocalData", JSON.stringify(filtredTodo));
    location.reload();
  };


  const htmlCheck = document.createElement("button");
  htmlCheck.innerHTML = "Check";
  if (toDo.checked) htmlCheck.innerText = "Uncheck";
  if (!toDo.checked) {
    htmlCheck.onclick = () => {
      const filtredTodo = userLocalstorage.filter(
        (item) => item.id === Number(htmlCheck.parentElement.id)
      );

      const checkedUpdate = { ...filtredTodo[0], checked: true };

      const filtredTodos = userLocalstorage.filter(
        (item) => item.id !== Number(htmlCheck.parentElement.id)
      );
      const updateUserDataCheck = [...filtredTodos, checkedUpdate];
      localStorage.setItem(
        "userLocalData",
        JSON.stringify(updateUserDataCheck)
      );
      location.reload();
    };
  } else {
    htmlCheck.onclick = () => {
      const filtredTodo = userLocalstorage.filter(
        (item) => item.id === Number(htmlCheck.parentElement.id)
      );

      const checkedUpdate = { ...filtredTodo[0], checked: false };

      const filtredTodos = userLocalstorage.filter(
        (item) => item.id !== Number(htmlCheck.parentElement.id)
      );
      const updateUserDataCheck = [...filtredTodos, checkedUpdate];
      localStorage.setItem(
        "userLocalData",
        JSON.stringify(updateUserDataCheck)
      );
      location.reload();
    };
  }


  const htmlEDIT = document.createElement("button");
  htmlEDIT.innerText = "Edit";
  if (htmlTitleInput.disabled == true) {
    htmlEDIT.onclick = () => {
      console.log("hi");
      htmlTitleInput.disabled = false;
      htmlTitleInput.select();
      htmlLDescInput.disabled = false;
      htmlLDescInput.className = "input";
      htmlTitleInput.className = "input";
      htmlEDIT.innerText = "Save";
      if (htmlTitleInput.disabled == false) {
        htmlEDIT.onclick = () => {
          console.log(htmlTitleInput.value , htmlLDescInput.value , htmlTitleInput.parentElement.parentElement.parentElement.id);

          const filtredTodo = userLocalstorage.filter(
            (item) => item.id === Number(htmlCheck.parentElement.id)
          );
    
          const checkedUpdate = { ...filtredTodo[0], title: htmlTitleInput.value, desc: htmlLDescInput.value };
    
          const filtredTodos = userLocalstorage.filter(
            (item) => item.id !== Number(htmlCheck.parentElement.id)
          );
          const updateUserDataCheck = [...filtredTodos, checkedUpdate];
          localStorage.setItem(
            "userLocalData",
            JSON.stringify(updateUserDataCheck)
          );
          location.reload();
        }};
    }};
  


  htmlUNList.appendChild(htmlList);
  htmlUNList.appendChild(htmlDel);
  htmlUNList.appendChild(htmlEDIT);
  htmlUNList.appendChild(htmlCheck);
  document.body.appendChild(htmlUNList);
});

submit.addEventListener("click", makeList);
