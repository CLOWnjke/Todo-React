import React from 'react';
import PropTypes from 'prop-types';

import TaskFilter from '../App-footer-task-filter/App-footer-task-filter';

function Footer({ doneItems, clearCompleted, filter, onFilterChange }) {
  return (
    <section className="footer">
      <span className="todo-count">{doneItems} items left</span>
      <TaskFilter filter={filter} onFilterChange={onFilterChange} />
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </section>
  );
}

Footer.defaultProps = {
  clearCompleted: () => {},
  doneItems: 0,
};

Footer.propTypes = {
  doneItems: PropTypes.number,
  clearCompleted: PropTypes.func,
};

export default Footer;
