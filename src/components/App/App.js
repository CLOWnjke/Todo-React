import React from 'react';
import { formatDistanceToNow } from 'date-fns';

import AppHeader from '../App-header/App-header';
import TaskList from '../App-main-task-list/App-main-task-list';
import Footer from '../App-footer/App-footer';

export default class App extends React.Component {
  maxId = 100;
  interval;

  state = {
    data: [
      this.createTodoItem('First Task', '1', '1'),
      this.createTodoItem('Second Task', 1, 1),
      this.createTodoItem('Third task', 1, 1),
    ],
    filter: 'All',
  };

  createTodoItem(textDescription, minutes, seconds) {
    return {
      textDescription,
      textCreated: '',
      done: false,
      id: this.maxId++,
      changed: false,
      date: new Date(),
      minutes,
      seconds,
    };
  }

  deleteItem = (id) => {
    this.setState(({ data }) => {
      const idx = data.findIndex((el) => el.id === id);

      const newArr = [...data.slice(0, idx), ...data.slice(idx + 1)];

      return {
        data: newArr,
      };
    });
  };

  addItem = (label, minutes, seconds) => {
    if(!minutes.match(/^\d+$/) && !seconds.match(/^\d+$/)) {
      alert('Неверно указан формат времени');
      return;
    }
    if (seconds > 59) {
      alert('Секунда не может быть больше 60');
      return;
    }
    if(minutes === '') {
      alert('вы не ввели время');
    }

    const newItem = this.createTodoItem(label, minutes, seconds);

    this.setState(({ data }) => {
      const newArr = [...data, newItem];

      return {
        data: newArr,
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ data }) => {
      const idx = data.findIndex((el) => el.id === id);

      const oldData = data[idx];

      const newData = {
        ...oldData,
        done: !oldData.done,
      };

      const newArr = [...data.slice(0, idx), newData, ...data.slice(idx + 1)];

      return {
        data: newArr,
      };
    });
  };

  clearCompleted = () => {
    this.setState(({ data }) => {
      const newArr = data.filter((el) => !el.done);

      return {
        data: newArr,
      };
    });
  };

  filter = (items, filter) => {
    switch (filter) {
      case 'All':
        return items;
      case 'Active':
        return items.filter((item) => !item.done);
      case 'Complete':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  changeTask = (id) => {
    this.setState(({ data }) => {
      const idx = data.findIndex((el) => el.id === id);

      const oldData = data[idx];
      const newData = {
        ...oldData,
        changed: !oldData.changed,
      };

      const newArr = [...data.slice(0, idx), newData, ...data.slice(idx + 1)];

      return {
        data: newArr,
      };
    });
  };

  changeTaskText = (id, label) => {
    this.setState(({ data }) => {
      const idx = data.findIndex((el) => el.id === id);

      const oldData = data[idx];

      const newData = {
        ...oldData,
        changed: !oldData.changed,
        textDescription: label,
      };

      const newArr = [...data.slice(0, idx), newData, ...data.slice(idx + 1)];

      return {
        data: newArr,
      };
    });
  };

  taskTimer = (id) => {
    setInterval(() => {
      this.setState(({ data }) => {
        const idx = data.findIndex((el) => el.id === id);
        const oldData = data[idx];
        if (oldData) {
          const newData = {
            ...oldData,
            textCreated: `created ${formatDistanceToNow(new Date(oldData.date), { includeSeconds: true })} ago`,
          };

          const newArr = [...data.slice(0, idx), newData, ...data.slice(idx + 1)];

          return {
            data: newArr,
          };
        }
      });
    }, 1000);
  };

  onCount = (id) => {
    this.setState(({ data }) => {
      const idx = data.findIndex((el) => el.id === id);
      const oldData = data[idx];

      if(oldData.minutes !== 0 & oldData.seconds === 0) {
        const newData = {...oldData, minutes: oldData.minutes - 1, seconds: 59};
        const newArr = [...data.slice(0, idx), newData, ...data.slice(idx + 1)];
        return {
          data: newArr,
        };
      } else if (oldData.minutes == 0 & oldData.seconds === 0) {
        const newData = {...oldData, minutes: 0, seconds: 0};
        const newArr = [...data.slice(0, idx), newData, ...data.slice(idx + 1)];
        return {
          data: newArr,
        };
      } else {
        const newData = {...oldData, seconds: oldData.seconds - 1};
        const newArr = [...data.slice(0, idx), newData, ...data.slice(idx + 1)];
        return {
          data: newArr,
        };
      }
    });
  };

  render() {
    const doneItems = this.state.data.length - this.state.data.filter((el) => el.done).length;
    const filtredItems = this.filter(this.state.data, this.state.filter);

    return (
      <section className="todoapp">
        <AppHeader addItem={this.addItem} />
        <TaskList
          filtredItems={filtredItems}
          onDeleted={this.deleteItem}
          onToggleDone={this.onToggleDone}
          changeTask={this.changeTask}
          changeTaskText={this.changeTaskText}
          taskTimer={this.taskTimer}
          onCount={this.onCount}
        />
        <Footer
          doneItems={doneItems}
          clearCompleted={this.clearCompleted}
          filter={this.state.filter}
          onFilterChange={this.onFilterChange}
        />
      </section>
    );
  }
}
