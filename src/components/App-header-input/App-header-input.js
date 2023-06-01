import React, { useState } from 'react';
import PropTypes from 'prop-types';


function AppHeaderInput({ addItem }) {

  const [label, setLabel] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  // state = {
  //   label: '',
  //   minutes: '',
  //   seconds: ''
  // };

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const onMinutesChange = (e) => {
    setMinutes(e.target.value);
  };

  const onSecondsChange = (e) => {
    setSeconds(e.target.value);
  };

  const onSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    addItem(label, minutes, seconds);
    setLabel('');
    setMinutes('');
    setSeconds('');
  };

  return (
    <form className="new-todo-form" onSubmit={onSubmit} readOnly>
      <label>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={onLabelChange}
          type="text"
          value={label}
        />
      </label>
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        autoFocus
        onChange={onMinutesChange}
        value={minutes} />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        autoFocus
        onChange={onSecondsChange}
        value={seconds} />
      <input className="new-todo-form__submit" type="submit" />
    </form>
  );
}

AppHeaderInput.defaultProps = {
  addItem: () => {},
};

AppHeaderInput.propTypes = {
  addItem: PropTypes.func,
};

export default AppHeaderInput;
