import React from "react";
import type { Task } from "./TodoList";

import './App.css'

interface TaskStatsProps {
    tasks: Task[],
}

const TaskStats: React.FC<TaskStatsProps> = ({tasks}) => {

    return(
        <div>
            <p>Всего задач: {tasks.length}</p>
            <p>Задач закончено: {tasks.filter(item => item.completed).length}</p>
            <p>Задач не выполненно: {tasks.filter(item => item.completed).length}</p>
        </div>
    )
}

export default TaskStats;