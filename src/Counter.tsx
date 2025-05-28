import React, {useState} from 'react';

interface CounterProps {
    initialCount: number;
}

const Counter: React.FC<CounterProps> = ( {initialCount} ) => {
    const [count, setCount] = useState<number>(initialCount);
    
    const increment = (): void => {
        setCount(count + 1);
    }

    const decrement = ():void => {
        setCount(count - 1);
    }

    return(
        <div>
            <h1>Счетчик: {count}</h1>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </div>
    );
}

export default Counter;