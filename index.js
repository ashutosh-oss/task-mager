const taskContainer = document.querySelector(".task_container");

const globalStore = [];

const getInitialCardData = () => {
  // to access the initial data from localstorage 
  const getCardData = localStorage.getItem("tasky");

  //to convert strings back to normal objects 
  const {hello} = JSON.parse(getCardData);

  //to loop over the cardObjects and add the html cards, inject it to the DOM
  hello.map((cardObject) => {
    taskContainer.insertAdjacentHTML("beforeend", generateNewcard(cardObject));
    globalStore.push(cardObject);
  });
};


const generateNewcard = (taskData) => `<div class="col-md-6 col-lg-4" id=${taskData.id}>
<div class="card">
  <div class="card-header d-flex justify-content-end gap-2">
    <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
    <button type="button" class="btn btn-outline-danger"><i class="fas fa-trash-alt"></i></button>
  
  </div>
  <img src="${taskData.imageUrl}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${taskData.taskTitle}</h5>
    <p class="card-text">${taskData.taskDescription}</p>
    <a href="#" class="btn btn-primary">${taskData.taskType}</a>
  </div>
  <div class="card-footer">
    <button type="button" class="btn btn-primary float-end">Open Task</button>
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


