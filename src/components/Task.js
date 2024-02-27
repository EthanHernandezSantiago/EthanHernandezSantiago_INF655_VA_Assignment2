import React from "react";

function Task(props) { 
    return (
        <li>
            <input type="checkbox" onClick={e => props.toggleStatus(props.id, true)}></input>
            <span id={props.id}>Task {props.id}) {props.description}</span>
            <button classname="status" onClick={e => {e.stopPropagation(); props.removeTask(props.id, true)}}>X</button>
            {/* this unordered list is for the subtask */}
            <ol>
            {/* the subtasks that belong to the current task are filted and then all printed out */}
            {props.subtasks.filter(sub => sub.parentUUID === props.id).map(subtask => {
                return (
                    <li key={subtask.uuid}>
                        <input type="checkbox" onClick={e => props.toggleStatus(subtask.uuid, false)}></input>
                        {/* the id of this span is s + the id becsaue of the toggleStatus function. it is used
                        to differenate the tasks and subtasks */}
                        <span id={"s" + subtask.uuid}>{subtask.subdes}</span>
                        <button className="status" onClick={e => {e.stopPropagation(); props.removeTask(subtask.uuid, false)}}>X</button> 
                    </li>
                )
            })}
            </ol>
        </li>
    );
}

export default Task; 