import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';


function Task({ textDescription, textCreated, id, minutes, seconds, onDeleted, onToggleDone, done, changeTask, changed, taskTimer, onCount, changeTaskText }) {
  const interval = useRef();
  const interval1 = useRef();
  const [label, setLabel] = useState('');

  useEffect(() => {
    interval.current = setInterval(() => {
      onCount();
    }, 1000);

    return () => {
      clearInterval(interval.current);
    };
  }, []);

  useEffect(() => {
    if (done) {
      clearInterval(interval.current);
    }
  });

  useEffect(() => {
    interval1.current = setInterval(() => {
      taskTimer(id);
    }, 1000);

    return () => {
      clearInterval(interval1.current);
    };
  }, []);

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    changeTaskText(id, label);
    setLabel('');
  };

  const onPlay = () => {
    console.log('Play');
    clearInterval(interval.current);
    interval.current = setInterval(() => {
      onCount();
    }, 1000);
  };

  const onPause = () => {
    console.log('Pause');
    clearInterval(interval.current);
  };
  
  let className = '';
  if (done) {
    className += 'completed';
  }

  if (changed) {
    className += ' editing';
  }

  return (
    <li className={className} key={id}>
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onToggleDone} />
        <label>
          <span className='title'>{textDescription}</span>
          <span className="description">
            <button className="icon icon-play" onClick={() => onPlay(id)}></button>
            <button className="icon icon-pause" onClick={onPause}></button>
            {minutes}:{seconds}
          </span>
          <span className="description">{textCreated}</span>
        </label>
        <button className="icon icon-edit" onClick={changeTask} />
        <button className="icon icon-destroy" onClick={onDeleted} />
      </div>
      <form onSubmit={onSubmit}>
        <input type="text" className="edit" onChange={onLabelChange} value={label} />
      </form>
    </li>
  );
}

Task.defaultProps = {
  textDescription: 'Task',
  textCreated: 'created 1 seconds ago',
  id: 100,
  done: false,
  changed: false,
  taskTimer: () => {},
};

Task.propTypes = {
  textDescription: PropTypes.string,
  textCreated: PropTypes.string,
  id: PropTypes.number,
  done: PropTypes.bool,
  changed: PropTypes.bool,
  taskTimer: PropTypes.func,
};

export default Task;
