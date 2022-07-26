import React, { useState } from 'react';

/**
 * Archive: src/components/UseStateComponent.tsx
 *
 * Description: Functional component with useState Hook
 *
 * Date: 22/17/07
 *
 * Author: Rey
 */

export const UseStateComponent = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
    console.log('UseState counter:', count);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-xl text-zinc-300">useState counter: {count}</span>
      <button
        onClick={increment}
        type="button"
        className="w-10 h-6 text-zinc-700 bg-zinc-300 rounded"
      >
        +
      </button>
    </div>
  );
};

/*
  O useState hook te permite adicionar o state do React a um componente de função.
*/
