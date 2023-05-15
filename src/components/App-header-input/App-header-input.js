import React, { Component } from "react";
import PropTypes from 'prop-types'

export default class AppHeaderInput extends Component {

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
        this.props.addItem(this.state.label)
        this.setState({
            label: ''
        })
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} readOnly>
                <input className='new-todo'
                       placeholder="What needs to be done?" 
                       autoFocus
                       onChange={this.onLabelChange}
                       type="text" value={this.state.label}></input>
            </form>
        )
    }
}

AppHeaderInput.defaultProps = {
    addItem:  () => {alert('К сожалению ничего не произошло, вы не передали props')}
}

AppHeaderInput.propTypes = {
    addItem: PropTypes.func
}