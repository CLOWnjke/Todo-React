import React from "react";
import PropTypes from 'prop-types'

import Task from "../App-main-task/App-main-task";

const TaskList = ({ filtredItems, onDeleted, onToggleDone, changeTask, changeTaskText, taskTimer }) => {

    const elements = filtredItems.map( (item) => {
        return (
            <Task key={item.id}
                  done={item.done}
                  changed={item.changed}
                  id={item.id}
                  textDescription={item.textDescription}
                  textCreated={item.textCreated}
                  onDeleted={() => onDeleted(item.id)}
                  onToggleDone={() => onToggleDone(item.id)}
                  changeTask={() => changeTask(item.id)}
                  changeTaskText={changeTaskText}
                  taskTimer={taskTimer}
            />
        );
    })


    return (
        <section className="main">
            <ul className="todo-list">
                {elements}
            </ul>
        </section>
    );
}

TaskList.defaultProps = {
    filtredItems: [],
    onDeleted:  () => {alert('К сожалению ничего не произошло, вы не передали props')},
    onToggleDone:  () => {alert('К сожалению ничего не произошло, вы не передали props')},
    changeTask:  () => {alert('К сожалению ничего не произошло, вы не передали props')},
}

TaskList.propTypes = {
    filtredItems: PropTypes.arrayOf(PropTypes.object),
    onDeleted: PropTypes.func,
    onToggleDone: PropTypes.func,
    changeTask: PropTypes.func,
}

export default TaskList;