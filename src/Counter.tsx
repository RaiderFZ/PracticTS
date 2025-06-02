import React, {useState, useEffect} from 'react';

interface CounterProps {
    initialCount: number;
    maxCount?: number;
    minCount?: number; 
}

interface HistoryEntry {
    id: number;
    action: "increment" | "decrement" | "reset" | "limit_reached" | "min_reached";
    value: number;
    timestamp: string;
}

const Counter: React.FC<CounterProps> = ( {initialCount, maxCount, minCount} ) => {
    const [count, setCount] = useState<number>(initialCount);
    const [history, setHistory] = useState<HistoryEntry[]>(() => {
        const savedHistory = localStorage.getItem('counterHistory');
        return savedHistory ? JSON.parse(savedHistory) : [];
    })
    const [maxLimit, setMaxLimit] = useState<number | null>(maxCount ?? null)

    const [ minLimit, setMinLimit ] = useState<number | null>(minCount ?? null)

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
    const increment = (): void => {
        if(maxLimit !== null && count >= maxLimit) {
            addToHistory("limit_reached", count);
            return;
        }
        setCount(count + 1);
        addToHistory("increment", count + 1);
    }

    const decrement = ():void => {
        if(minLimit !== null && count <= minLimit) {
            addToHistory("min_reached", count);
            return; 
        }
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

    const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value;
        const parsedValue = parseInt(value, 10);
        setMaxLimit(isNaN(parsedValue) ? null : parsedValue)
    }

    const handleMinLimitChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value;
        const parsedValue = parseInt(value, 10);
        setMinLimit(isNaN(parsedValue) ? null : parsedValue);
    }

    return(
        <div>
            <h1>Счетчик: {count}</h1>
            <label>
                Максимальный лимит
                <input 
                    type="number"
                    value={maxLimit ?? ""}
                    onChange={handleLimitChange}
                    placeholder='Введите максимум'
                />
            </label>
            <label>
                Минимальный лимит
                <input 
                    type="number"
                    value={minLimit ?? ""}
                    onChange={handleMinLimitChange} 
                    placeholder='Введите минимум'
                />
            </label>
            <button onClick={increment} disabled={maxLimit !== null && count >= maxLimit}>+</button>
            <button onClick={decrement} disabled={minLimit !== null && count <= minLimit} >-</button>
            <button onClick={reset}>Сбросить</button>
            <button onClick={clearHistory}>Очистить историю</button>

            <h3>История изменений</h3>
            {history.length === 0 ? (
                <p>История пуста</p>
            ) : (
                <ul>
                    {history.map((entry) => (
                        <li key={entry.id}>
                            {entry.timestamp}:{" "}
                            {entry.action === "limit_reached"
                            ? "Достигнут максимальный лимит"
                            : entry.action === "min_reached"
                            ? "Достигнут минимальный лимит"
                            : entry.action}{" "}
                            → Значение: {entry.value} 
                        </li>
                    ))}
                </ul>
            )}

           
        </div>
    );
}

export default Counter;