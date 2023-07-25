/*This is used to create a tasks list */
let tasks = [];
/*Below these are used to get the elements by their respective id's */
const taskList = document.getElementById('displayList');
const addTaskInput = document.getElementById('taskInput');
const tasksCounter = document.getElementById('taskCounter');

/*This function will help us to initalize our app */
initalizeApp();

/*This function will call the event listener on our entire body page and also on addTaskInput */
function initalizeApp(){
    document.addEventListener('click',handleClickListener);
    addTaskInput.addEventListener('keyup',handleInputPressKey);
}
/*This function is used to create task Schema from the given task */
function handleInputPressKey(e){
    if(e.key==='Enter'){
        const text=e.target.value;
    if(!text){
        showNotification('Please enter a valid text');
        return;
    }
    const task={
        text:text,
        id:Date.now(),
        done:false
    }
    e.target.value='';
    addTask(task);
}
}
 /*This function is used to have a listener on delete and checkbox and class their respective functions */
function handleClickListener(e){
    const target = e.target;
    if(target.className === 'delete'){
        const taskId =target.dataset.id;
        deleteTask(taskId);
        return;
    }else if(target.className === 'custom-checkbox'){
        const taskId = target.id;
        toggleTask(taskId);
        return;
    }
}
/*This function is used to add the task */
function addTask (task) {
    if(task){
    tasks.push(task);
    renderList();
    showNotification('Task has been added succesfully');
    return;
    }
    showNotification('Task cannot be added');
}
/*This function is used to show the notifications */
function showNotification(text) {
    alert(text);
}
/*This function is used to create the list item inside unordered list and display it */
function addTaskToDOM(task){
    const listitem = document.createElement('li');
    listitem.innerHTML=`
    <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
    <label for="${task.id}">${task.text}</label>
    <img src="dustbin.png" class="delete" data-id="${task.id}">
    `;
    taskList.append(listitem);
}
/*This function is used for rendering the page*/
function renderList () {
    taskList.innerHTML='';
    for(let i=0;i<tasks.length;i++){
        addTaskToDOM(tasks[i]);
    }
    tasksCounter.innerHTML=tasks.length;
}
/*This function is used to for toggling the task */
function toggleTask(taskId) {
    const task=tasks.filter(function(task){
        return task.id=== Number(taskId);
    });
    if(task.length>0){
        const currTask=task[0];
        currTask.done=!currTask.done;
        renderList();
        showNotification('Toggled Task Successfully');
        return;
    }
    showNotification('Toggle task failed');
}
/*This function is used for deleting the task*/
function deleteTask (taskId) {
    const newTasks=tasks.filter(function(task){
        return task.id!==Number(taskId);
    });
    tasks=newTasks;
    renderList();
    showNotification('Task Deleted Successfully');
}



