import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AppHeaderInput extends Component {
  state = {
    label: '',
    minutes: '',
    seconds: ''
  };

  onLabelChange = (e) => {
    console.log(e.target.value);

    this.setState({
      label: e.target.value,
    });
  };

  onMinutesChange = (e) => {
    console.log(e.target.value);
    this.setState({
      minutes: e.target.value
    });
  };

  onSecondsChange = (e) => {
    console.log(e.target.value);
    this.setState({
      seconds: e.target.value
    });
    
  };

  onSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    this.props.addItem(this.state.label, this.state.minutes, this.state.seconds);
    this.setState({
      label: '',
      minutes: '',
      seconds: ''
    });
  };

  render() {
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit} readOnly>
        <label>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onChange={this.onLabelChange}
            type="text"
            value={this.state.label}
          />
        </label>
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          autoFocus
          onChange={this.onMinutesChange}
          value={this.state.minutes} />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          autoFocus
          onChange={this.onSecondsChange}
          value={this.state.seconds} />
        <input className="new-todo-form__submit" type="submit" />
      </form>
    );
  }
}

AppHeaderInput.defaultProps = {
  addItem: () => {},
};

AppHeaderInput.propTypes = {
  addItem: PropTypes.func,
};
