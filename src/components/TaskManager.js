import React, { useState } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";

function TaskManager() {
    // State for tasks themselves
    let [tasks, setTasks] = useState([]);
    // State for subtasks themselves 
    let [subtasks, setSubTask] = useState([]);
    // State for current task description to add
    let [des, setDescription] = useState('');
    // State for current sub task descrtiption to add
    let [subDes, setSubDescription] = useState('');
    // State for id for task list
    let [UUID, setUUID] = useState(0);
    // State for id of subtask list 
    let [subUUID, setSubUUID] = useState(0);
    // State for the uuid of the parent task of a subtask
    let [parentUUID, setParentUUID] = useState(0);

    // tasks and subtasks will be added to their array using
    // this function
    function addTask(isTask) {
        // isTask is used to make sure the task is added
        // to the correct array
        if (isTask) {
            if (des === '') {
                alert("Error: Task description can not be empty");
                return;
            }
            // Tasks is updated to prior tasks + new task
            setTasks([...tasks, {uuid: UUID, description: des}]);
            // taskID is incremented
            setUUID(uuid => uuid + 1);
            // description is reset to empty string
            setDescription('');
        }
        else {
            // for subtasks to be created the normal task the by belong to 
            // must exsist. this checks that that is true
            if (subDes === '') {
                alert("Error: Subtask description can not be empty");
                return;
            }
            if (!tasks.some(task => task.uuid === parseInt(parentUUID))) {
                alert("Error: Subtask can not be created since there is no non-subtask with id " + parentUUID);
                return;
            }
            // subtask is added to array
            setSubTask([...subtasks, {uuid: subUUID, parentUUID: parseInt(parentUUID), subdes: subDes}])
            // the uuid for subtasks is incremented
            setSubUUID(subuuid => subuuid + 1);
            // the description is reset
            setSubDescription('');
            // and the person uuid is reset
            setParentUUID(0);
        }
    }
    
    // After tasks checkmark is checked or unchecked to show
    // status of task, this code will show a line through the
    // task description depending if it checked or not
    function toggleStatus(id, isTask) {
        if (isTask) {
            // gets element (id is used it get single task)
            const text = document.getElementById(id);
            // complete is a css class that just makes the text have 
            // a line through it; this toggles that class on and off
            // element
            text.classList.toggle("complete")
        }
        else {
            // the same is done if it a subtask just the 
            // id that is seached for is includes an s at the beginning
            const text = document.getElementById('s' + id);
            text.classList.toggle("complete")
        }
    }

    // This is called to remove task
    function removeTask(id, isTask) {
        if(isTask) {
            // splice is used to delete it from list, and findIndex
            // just finds the index of that specific task
            tasks.splice(tasks.findIndex(el => el.uuid === id), 1)
            // then tasks is updated
            setTasks([...tasks])
            subtasks.splice(subtasks.filter(subtask => subtask.parentUUID === id));
            setSubTask([...subtasks]);
        }
        else {
            // same as for non subtasks
            subtasks.splice(subtasks.findIndex(el => el.uuid === id), 1)
            setSubTask([...subtasks]) 
        }
    }

    return (
        <div>
            <h1 id="title">Task To Do List Assignment</h1>
            <small>By Ethan Hernandez-Santiago</small>
            <hr />
            <div id="taskManager">
                <section id="taskInputForms">
                    <h2>Task Input Forms</h2>
                    <TaskForm text={"Task"} des={des} addTask={addTask} setDescription={setDescription} />
                    <TaskForm text={"Subtask"} des={subDes} addTask={addTask} pUUID={parentUUID} setDescription={setSubDescription} setParentUUID={setParentUUID}/>
                </section>
                <section id="toDoList">
                    <h1>To Do List</h1>
                    <div id="list">
                        {tasks.length !== 0 ?
                        <ul>
                            {tasks.map(task => {
                                return(
                                    <Task key={task.uuid} id={task.uuid} description={task.description} toggleStatus={toggleStatus} removeTask={removeTask} subtasks={subtasks} />
                                )        
                            })}
                        </ul>
                        : <h3 id="noTasks">No tasks have been created</h3>}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default TaskManager;