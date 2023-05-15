import React from 'react';
import { formatDistanceToNow } from 'date-fns';


import AppHeader from '../App-header/App-header';
import TaskList from '../App-main-task-list/App-main-task-list';
import Footer from '../App-footer/App-footer';

import '/Code/todo-react/src/main.css'

export default class App extends React.Component {

    maxId = 100;

    state = {
        data: [
            this.createTodoItem('Completed task'),
            this.createTodoItem('Editing task'),
            this.createTodoItem('Active task')
          ],
        filter: 'All',
    }

    createTodoItem(textDescription) {
        return {
            textDescription,
            textCreated: '',
            done: false,
            id: this.maxId++,
            changed: false,
            date: new Date()
        }
    }

    deleteItem = (id) => {
        this.setState(({ data }) => {
            const idx = data.findIndex((el) => el.id === id);

            const newArr = [
                ...data.slice(0, idx),
                ...data.slice(idx + 1)
            ]

            return {
                data: newArr
            }
        })
    }

    addItem = (label) => {
        this.setState(( { data } ) => {
            const newArr = [
                ...data,
                this.createTodoItem(label)
            ];

            return {
                data: newArr
            }
        })
    }

    onToggleDone = (id) => {
        this.setState(({ data }) => {
            const idx = data.findIndex((el) => el.id === id);

            const oldData = data[idx];

            const newData = {
                ...oldData,
                done: !oldData.done
            }

            const newArr = [
                ...data.slice(0, idx),
                newData,
                ...data.slice(idx + 1)
            ]
            

            return {
                data: newArr
            }
        })
    }

    clearCompleted = () => {
        this.setState(({ data }) => {
            const newArr = data.filter((el) => !el.done)

            return {
                data: newArr
            }
        })
    }

    filter = (items, filter) => {

        switch(filter) {
            case 'All':
                return items;
            case 'Active':
                return items.filter((item) => !item.done);
            case 'Complete':
                return items.filter((item) => item.done)
            default:
                return items;
        }
    }

    onFilterChange = (filter) => {
        this.setState({filter});
    }

    changeTask = (id) => {
        this.setState(({ data }) => {
            const idx = data.findIndex((el) => el.id === id);

            const oldData = data[idx];
            const newData = {
                ...oldData,
                changed: !oldData.changed
            }

            const newArr = [
                ...data.slice(0, idx),
                newData,
                ...data.slice(idx + 1)
            ]
            
            return {
                data: newArr
            }
        })
    }

    changeTaskText = (id, label) => {
        this.setState(({ data }) => {
            const idx = data.findIndex((el) => el.id === id);

            const oldData = data[idx];

            const newData = {
                ...oldData,
                changed: !oldData.changed,
                textDescription: label
            }

            const newArr = [
                ...data.slice(0, idx),
                newData,
                ...data.slice(idx + 1)
            ]
            

            return {
                data: newArr
            }
        })
    }

    taskTimer = (id) => {
        setInterval(() => {
            this.setState(({ data }) => {
                const idx = data.findIndex((el) => el.id === id);
                const oldData = data[idx];
                if(oldData) {
                    const newData = {
                        ...oldData,
                        textCreated: `created ${formatDistanceToNow(new Date(oldData.date), {includeSeconds: true})} ago`,
                    }
        
                    const newArr = [
                        ...data.slice(0, idx),
                        newData,
                        ...data.slice(idx + 1)
                    ]
                    
        
                    return {
                        data: newArr
                    }
                }
            })
        }, 1000);
    }


    render() {

        const doneItems = this.state.data.length - this.state.data.filter((el) => el.done).length ;
        const filtredItems = this.filter(this.state.data, this.state.filter)
        
        return (
            <section className='todoapp'>
                <AppHeader addItem={this.addItem} />
                <TaskList filtredItems={filtredItems} 
                          onDeleted={this.deleteItem}
                          onToggleDone={this.onToggleDone}
                          changeTask={this.changeTask}
                          changeTaskText={this.changeTaskText}
                          taskTimer={this.taskTimer}
                />
                <Footer doneItems={doneItems} 
                        clearCompleted={this.clearCompleted}
                        filter={this.state.filter}
                        onFilterChange={this.onFilterChange}
                />
            </section>
        )
    }
}