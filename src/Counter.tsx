import React, {useState, useEffect} from 'react';

interface CounterProps {
    initialCount: number;
}

interface HistoryEntry {
    id: number;
    action: "increment" | "decrement" | "reset";
    value: number;
    timestamp: string;
}

const Counter: React.FC<CounterProps> = ( {initialCount} ) => {
    const [count, setCount] = useState<number>(initialCount);
    const [history, setHistory] = useState<HistoryEntry[]>(() => {
        const savedHistory = localStorage.getItem('counterHistory');
        return savedHistory ? JSON.parse(savedHistory) : [];
    })

    useEffect(() => {
        localStorage.setItem('counterHistory', JSON.stringify(history));
    }, [history]);

    const addToHistory = (action: HistoryEntry['action'], newValue: number): void => {
        const newEntry: HistoryEntry = {
            id: history.length + 1,
            action,
            value: newValue,
            timestamp: new Date().toLocaleTimeString(),
        }
        setHistory([newEntry, ...history].slice(0, 10));
    }
 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const increment = (event: React.MouseEvent<HTMLButtonElement>): void => {
        setCount(count + 1);
        addToHistory("increment", count + 1);
    }

    const decrement = ():void => {
        if(count > 0) {
            setCount(count - 1);
            addToHistory("decrement", count - 1)
        }
    }

    const reset = ():void => {
        setCount(initialCount);
        addToHistory("reset", initialCount);
    }

    const clearHistory = () => {
        setHistory([]);
    }

    return(
        <div>
            <h1>Счетчик: {count}</h1>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
            <button onClick={reset}>Сбросить</button>
            <button onClick={clearHistory}>Очистить историю</button>

            <h3>История изменений</h3>
            {history.length === 0 ? (
                <p>История пуста</p>
            ) : (
                <ul>
                    {history.map((entry) => (
                        <li key={entry.id}>
                            {entry.timestamp}: {entry.action} → Значение: {entry.value} 
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Counter;