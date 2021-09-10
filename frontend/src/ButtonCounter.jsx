import React, { useState } from 'react';

// Display the current count, which can be increased by pressing button.
// Will complete no useState and by using useState.

function ButtonCounter() {
    const [count, setCount] = useState(0);


    return (
        <div>
            <h1>{count}</h1>
            <button onClick={() => {
                setCount(count + 1)
            }}>
                Click me!
            </button>
        </div>
    )
}

export default ButtonCounter