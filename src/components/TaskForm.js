import React from "react";

function TaskForm(props) {
    return (
        <form onSubmit={e => {e.preventDefault(); props.addTask(props.text === "Task");}}>
            <fieldset>
                <legend>Enter {props.text} Information</legend>
                <div>
                    <label htmlFor="des">{props.text} Description: </label>
                    <input type="text" value={props.des} onChange={e => props.setDescription(e.target.value)} placeholder="Description"></input>
                </div>
                {/* if props.text is "subtask" (which means this form is for adding subtasks) then this additional input
                is added so use can enter the parent uuid of the subtask it belongs to */}
                {props.text === "Subtask" ? 
                    <div>
                        <label htmlFor="subdes">Parent Task ID: </label>
                        <input type="number" value={props.pUUID} onChange={e => props.setParentUUID(e.target.value)}></input>
                    </div> 
                    : null}
                <input type="submit"></input>
            </fieldset>
        </form>
    )
}

export default TaskForm;