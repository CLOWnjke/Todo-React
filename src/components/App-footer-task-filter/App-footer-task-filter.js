import React from "react";
import PropTypes from 'prop-types'

export default class TaskFilter extends React.Component {

  buttons = [
    {name: 'All', label: "All"},
    {name: 'Active', label: 'Active'},
    {name: 'Complete', label: 'Complete'},
  ]

  render () {

    const {filter, onFilterChange} = this.props
    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
      const classNames = isActive ? 'selected' : '';
      return (
        <li key={name}>
          <button type="button" className={classNames} 
                                onClick={() => onFilterChange(name)}
                                >{label}</button>
        </li>
      )
    })

    return (
        <ul className="filters">
            {buttons}
        </ul>
    )
}
}

TaskFilter.defaultProps = {
  onFilterChange: () => {alert('К сожалению ничего не произошло, вы не передали props')},
  filter: 'All'
}

TaskFilter.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func
}