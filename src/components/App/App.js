import {React, useEffect, useState} from 'react';
import { formatDistanceToNow } from 'date-fns';

import AppHeader from '../App-header/App-header';
import TaskList from '../App-main-task-list/App-main-task-list';
import Footer from '../App-footer/App-footer';

function App() {
  let maxId = new Date().getTime();

  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('All');

  // state = {
  //   data: [
  //     this.createTodoItem('First Task', '1', '1'),
  //     this.createTodoItem('Second Task', 1, 1),
  //     this.createTodoItem('Third task', 1, 1),
  //   ],
  //   filter: 'All',
  // };

  const createTodoItem = function(textDescription, minutes, seconds) {
    return {
      textDescription,
      textCreated: '',
      done: false,
      id: maxId++,
      changed: false,
      date: new Date(),
      minutes,
      seconds,
    };
  };

  useEffect(() => {

  });

  const deleteItem = (id) => {
    setData((data) => {
      const idx = data.findIndex((el) => el.id === id);
      const newArr = [...data.slice(0, idx), ...data.slice(idx + 1)];
      return newArr;
    });
  };

  const addItem = (label, minutes, seconds) => {
    setData((data) => {
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
      const newItem = createTodoItem(label, minutes, seconds);
      const newArr = [...data, newItem];
      return newArr;
    });
  };

  const onToggleDone = (id) => {
    setData((data) => {
      const idx = data.findIndex((el) => el.id === id);
      const oldData = data[idx];
      const newData = {
        ...oldData,
        done: !oldData.done,
      };
      const newArr = [...data.slice(0, idx), newData, ...data.slice(idx + 1)];
      return newArr;
    });
  };

  const clearCompleted = () => {
    setData((data) => {
      const newArr = data.filter((el) => !el.done);
      return newArr;
    });
  };

  const filtered = (items, filter) => {
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

  const onFilterChange = (filter) => {
    setFilter(filter);
  };

  const changeTask = (id) => {
    setData((data) => {
      const idx = data.findIndex((el) => el.id === id);
      const oldData = data[idx];
      const newData = {
        ...oldData,
        changed: !oldData.changed,
      };
      const newArr = [...data.slice(0, idx), newData, ...data.slice(idx + 1)];
      return newArr;
    });
  };

  const changeTaskText = (id, label) => {
    setData((data)=> {
      const idx = data.findIndex((el) => el.id === id);
      const oldData = data[idx];
      const newData = {
        ...oldData,
        changed: !oldData.changed,
        textDescription: label,
      };
      const newArr = [...data.slice(0, idx), newData, ...data.slice(idx + 1)];
      return newArr;
    });
  };

  const taskTimer = (id) => {
    setData((data) => {
      const idx = data.findIndex((el) => el.id === id);
      const oldData = data[idx];
      if (oldData) {
        const newData = {
          ...oldData,
          textCreated: `created ${formatDistanceToNow(new Date(oldData.date), { includeSeconds: true })} ago`,
        };
        const newArr = [...data.slice(0, idx), newData, ...data.slice(idx + 1)];
        return newArr;
      }
    });
  };

  const onCount = (id) => {
    setData((data)=> {
      const idx = data.findIndex((el) => el.id === id);
      const oldData = data[idx];

      if(oldData.minutes !== 0 & oldData.seconds === 0) {
        const newData = {...oldData, minutes: oldData.minutes - 1, seconds: 59};
        const newArr = [...data.slice(0, idx), newData, ...data.slice(idx + 1)];
        return newArr;
      } else if (oldData.minutes == 0 & oldData.seconds === 0) {
        const newData = {...oldData, minutes: 0, seconds: 0};
        const newArr = [...data.slice(0, idx), newData, ...data.slice(idx + 1)];
        return newArr;
      } else {
        const newData = {...oldData, seconds: oldData.seconds - 1};
        const newArr = [...data.slice(0, idx), newData, ...data.slice(idx + 1)];
        return newArr;
      }
    });
  };

  const doneItems = data ? data.length - data.filter((el) => el.done).length : undefined;
  const filtredItems = filtered(data, filter);

  return (
    <section className="todoapp">
      <AppHeader addItem={addItem} />
      <TaskList
        filtredItems={filtredItems}
        onDeleted={deleteItem}
        onToggleDone={onToggleDone}
        changeTask={changeTask}
        changeTaskText={changeTaskText}
        taskTimer={taskTimer}
        onCount={onCount}
      />
      <Footer
        doneItems={doneItems}
        clearCompleted={clearCompleted}
        filter={filter}
        onFilterChange={onFilterChange}
      />
    </section>
  );
}

export default App;