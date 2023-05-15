import React from "react";
import PropTypes from 'prop-types'

export default class Task extends React.Component {

  state = {
        label: ''
    }

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.changeTaskText(this.props.id, this.state.label)
        this.setState({
          label: ''
        })
    }

 

  render () {


    const {textDescription, textCreated, id, onDeleted, onToggleDone, done, changeTask, changed, taskTimer } = this.props;

    let className = '';
    if(done) {
      className += 'completed'
    }

    if(changed) {
      className += ' editing'
    }

    if (textCreated === '') {
      taskTimer(id)
    }

    return (
        <li className={className} key={id}>
            <div className="view">
              <input className="toggle" type="checkbox" onClick={onToggleDone}></input>
              <label>
                <span className="description">{textDescription}</span>
                <span className="created">{textCreated}</span>
              </label>
              <button className="icon icon-edit" onClick={changeTask}></button>
              <button className="icon icon-destroy" onClick={onDeleted}></button>
            </div>
            <form onSubmit={this.onSubmit}>
              <input type="text" className="edit" onChange={this.onLabelChange} value={this.state.label}></input>   
            </form>
        </li>
    );
}
}

Task.defaultProps = {
  textDescription: 'Task',
  textCreated: "created 1 seconds ago",
  id: 100,
  done: false,
  changed: false,
  taskTimer: () => {alert('К сожалению ничего не произошло, вы не передали props')},
}

Task.propTypes = {
  textDescription: PropTypes.string,
  textCreated: PropTypes.string,
  id: PropTypes.number,
  done: PropTypes.bool,
  changed: PropTypes.bool,
  taskTimer: PropTypes.func
}