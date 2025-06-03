import React, { useEffect, useState, useMemo } from "react";
import TaskStats from './TaskStats';

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

const initialization = (defTask: Task[] | undefined): Task[] => {
    if (!defTask) return [];
    return defTask.filter(
        (task, index, self) =>
            typeof task.id === 'number' &&
            typeof task.text === 'string' &&
            typeof task.completed === 'boolean' &&
            self.findIndex(t => t.id === task.id) === index
    );
} 

type TaskFilter = "all" | "completed" | "uncompleted"

const TodoList: React.FC<PropsTask> = ({title, defaultTask}) => {
    const [task, setTask] = useState<Task[]>(() => {
        const saved = localStorage.getItem("todoTask");
        try {
            return saved ? JSON.parse(saved) as Task[] : initialization(defaultTask);
        } catch {
            return initialization(defaultTask); // безопасное восстановление
        }
    })
    const [textTitle, setTextTitle] = useState('') ;
    const [filter, setFilter] = useState<TaskFilter>("all");
    
    const filteredTasks = useMemo(() => {
        switch (filter) {
            case "completed":
                return task.filter((item) => item.completed);
            case "uncompleted":
                return task.filter((item) => !item.completed);
            default:
                return task;
        }
    }, [task, filter]);


    const handleText = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTextTitle(event.target.value)
    }

    const addNewTask = (): void => {
        if (!textTitle.trim()) return;
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

    useEffect(() => {
        localStorage.setItem('todoTask', JSON.stringify(task))
    }, [task])

    const changeFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(event.target.value as TaskFilter);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') {
            addNewTask()
        }
    }

    return (
        <div>
            <h1>{title}</h1>
            <select 
                name="filter" 
                id="filter" 
                value={filter} 
                onChange={changeFilter}
            >
                <option value="all">Все</option>
                <option value="completed">Выполненные</option>
                <option value="uncompleted">Невыполненные</option>
            </select>
            <hr />
            <input 
                type="text"
                value={textTitle}
                onChange={handleText}
                onKeyDown={handleKeyDown}
            />  
            <button onClick={addNewTask}>Добавить</button>
            <div>
                {filteredTasks.length === 0 ? (<p> Нет задач </p>) : (
                    <ul>
                        {filteredTasks.map(item => (
                            <li key={item.id}>
                                <p>{item.text}</p>
                                <input type="checkbox" checked={item.completed} onChange={() => changeCompleted(item.id)}/>
                                <button onClick={() => deleteTask(item.id)}>Удалить</button>
                            </li>
                        ))}
                </ul>
                )}
            </div> 
             <div>
                <TaskStats tasks={task}/>
            </div>
        </div>
    )
}

export default TodoList;