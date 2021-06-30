const taskContainer = document.querySelector(".task_container");

let globalStore = [];

const getInitialCardData = () => {
  // to access the initial data from localstorage 
  const getCardData = localStorage.getItem("tasky");

  //to convert strings back to normal objects 
  const {hello} = JSON.parse(getCardData);

  //to loop over the cardObjects and add the html cards, inject it to the DOM
  hello.map((cardObject) => {
    //inject to DOM
    taskContainer.insertAdjacentHTML("beforeend", generateNewcard(cardObject));
    //UPDATE TO OUR GLOBALsTORE
    globalStore.push(cardObject);
  })
};


const generateNewcard = (taskData) => `<div class="col-md-6 col-lg-4">
<div class="card">
  <div class="card-header d-flex justify-content-end gap-2">
    <button type="button" class="btn btn-outline-success" id=${taskData.id} onclick="editCard.apply(this,arguments)"><i class="fas fa-pencil-alt" id=${taskData.id} onclick="editCard.apply(this,arguments)"></i></button>
    <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"><i class="fas fa-trash-alt" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"></i></button>
  
  </div>
  <img src="${taskData.imageUrl}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${taskData.taskTitle}</h5>
    <p class="card-text">${taskData.taskDescription}</p>
    <a href="#" class="btn btn-primary">${taskData.taskType}</a>
  </div>
  <div class="card-footer">
    <button type="button" id=${taskData.id} class="btn btn-primary float-end">Open Task</button>
  </div>
</div>`;

const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}`, //unique id retuns
        imageUrl: document.getElementById("imageUrl").value,
        taskTitle: document.getElementById("taskTitle").value,
        taskType: document.getElementById("taskType").value,
        taskDescription: document.getElementById("taskDescription").value,
    };

    taskContainer.insertAdjacentHTML("beforeend", generateNewcard(taskData));

    // pushing raw data into localstorage so the data will not be deleted when the "tasky" web page is refreshed.
    globalStore.push(taskData);

    localStorage.setItem("tasky",JSON.stringify({hello: globalStore}));
   
   
}; 

const deleteCard = (event) => {
  event = window.event;
  //id
  const targetID = event.target.id;
  const tagname = event.target.tagName;

  //match the id of the element with the id inside the globalstore
  //if match found delete

   globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID);
   localStorage.setItem("tasky",JSON.stringify({hello: globalStore}));

   // CONTACT parent

   if(tagname === "BUTTON"){
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
   }else{
     return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
   }
};
const editCard = (event) => {
  event = window.event;
  const targetID = event.target.id;
  const tagname = event.target.tagName;

  let parentElement;

  if(tagname === "BUTTON"){
    parentElement = event.target.parentNode.parentNode;
  }else{
    parentElement = event.target.parentNode.parentNode.parentNode;
  }

  
  let taskTitle = parentElement.childNodes[5].childNodes[1];
  let taskDescription = parentElement.childNodes[5].childNodes[3];
  let taskType = parentElement.childNodes[5].childNodes[5];
  let submitButton = parentElement.childNodes[7].childNodes[1];


  taskTitle.setAttribute("contenteditable","true");
  taskDescription.setAttribute("contenteditable","true");
  taskType.setAttribute("contenteditable","true");
  submitButton.setAttribute("onclick","saveEditchanges.apply(this,arguments)");
  submitButton.innerHTML ="Save Changes";

};
const saveEditchanges = (event) => {
  event = window.event;
  const targetID = event.target.id;
  const tagname = event.target.tagName;

  let parentElement;

  if(tagname === "BUTTON"){
    parentElement = event.target.parentNode.parentNode;
  }else{
    parentElement = event.target.parentNode.parentNode.parentNode;
  }

  
  let taskTitle = parentElement.childNodes[5].childNodes[1];
  let taskDescription = parentElement.childNodes[5].childNodes[3];
  let taskType = parentElement.childNodes[5].childNodes[5];
  let submitButton = parentElement.childNodes[7].childNodes[1];

  const updatedData = {
    taskTitle: taskTitle.innerHTML,
    taskType: taskType.innerHTML,
    taskDescription: taskDescription.innerHTML,
  };
  globalStore = globalStore.map((task) => {
    if(task.id === targetID){
      return{
        id: task.id, //unique id retuns
        imageUrl: updatedData.imageUrl,
        taskTitle: updatedData.taskTitle,
        taskType: updatedData.taskType,
        taskDescription: updatedData.taskDescription,
      };
    }
    return task;//important
  });
  
  localStorage.setItem("tasky",JSON.stringify({hello: globalStore}));
  taskTitle.setAttribute("contenteditable","false");
  taskDescription.setAttribute("contenteditable","false");
  taskType.setAttribute("contenteditable","false");
  submitButton.innerHTML ="Open task";
   
};
 