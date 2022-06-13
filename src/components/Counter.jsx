import React, {useState} from 'react';

const Counter = function () {
    const [count,setCount]=useState(0);

    function increment() {
        setCount(count=>count+1)
    }
    function decrement() {
        setCount(count=>count+1)
    }
    return(
        <div>
            <h1>{count}</h1>
            <button onClick={increment}>Incr</button>
            <button onClick={decrement}>Decr</button>
        </div>
    )


}
export default Counter;