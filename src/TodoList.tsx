import React, { useState } from "react";

import './App.css'

interface PropsTask {
    title: string;
    defaultTask?: Task[];
}

export interface Task {
    id: number;
    text: string;
    completed: boolean;
}

const initilisation = (defTask: Task[] | undefined): Task[] => {
    if(defTask) {
        return defTask
    } else {
        return []
    }
} 

const TodoList: React.FC<PropsTask> = ({title, defaultTask}) => {
    const [task, setTask] = useState<Task[]>(initilisation(defaultTask))
    const [textTitle, setTextTitle] = useState('') 

    const handleText = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTextTitle(event.target.value)
    }

    const addNewTask = (): void => {
        const newTask: Task = {
            id: Date.now(),
            text:textTitle,
            completed: false,
        }
        setTask([...task, newTask])
        setTextTitle('')
    }

    const changeCompleted = (id: number): void => {
        setTask(
            task.map(item => {
                if(item.id === id) {
                    return {...item, completed: !item.completed}
                } else {
                    return item
                }
            })
        )
    }
    
    const deleteTask = (id: number): void => {
        setTask(
            task.filter(item => {
                return item.id !== id
            })
        )
    }
    return (
        <div>
            <h1>{title}</h1>
            <input 
                type="text"
                value={textTitle}
                onChange={handleText}
            />  
            <button onClick={addNewTask}>Добавить</button>
            <div>
                {task.length === 0 ? (<p>'Нет задач'</p>) : (
                    <ul>
                        {task.map(item => (
                            <li key={item.id}>
                                <p>{item.text}</p>
                                <input type="checkbox" checked={item.completed} onChange={() => changeCompleted(item.id)}/>
                                <button onClick={() => deleteTask(item.id)}>deleted</button>
                            </li>
                        ))}
                </ul>
                )}
                
            </div> 
        </div>
    )
}

export default TodoList;