import React from 'react'

import Counter from './Counter';
import TodoList from './TodoList';

import type { Task } from './TodoList';
import './App.css'

const App: React.FC = () => {
  const defaultTask: Task[] = [
    { id: 1, text: "Купить молоко", completed: false },
    { id: 2, text: "Сделать домашку", completed: true }, 
  ]
  return (
    <div>
      <h1>Counter</h1>
      <Counter initialCount={5}/>

      <div>
        <TodoList title="Мои звдчи" defaultTask={defaultTask}/>
      </div>
    </div>
  )
}

export default App;
