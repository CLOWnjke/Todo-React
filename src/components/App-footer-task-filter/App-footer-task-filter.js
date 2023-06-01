import React from 'react';
import PropTypes from 'prop-types';

function TaskFilter({filter, onFilterChange}) {
  const buttons = [
    { name: 'All', label: 'All' },
    { name: 'Active', label: 'Active' },
    { name: 'Complete', label: 'Complete' },
  ];

  const buttonsList = buttons.map(({ name, label }) => {
    const isActive = filter === name;
    const classNames = isActive ? 'selected' : '';
    return (
      <li key={name}>
        <button type="button" className={classNames} onClick={() => onFilterChange(name)}>
          {label}
        </button>
      </li>
    );
  });

  return <ul className="filters">{buttonsList}</ul>;
}

TaskFilter.defaultProps = {
  onFilterChange: () => {},
  filter: 'All',
};

TaskFilter.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
};

export default TaskFilter;