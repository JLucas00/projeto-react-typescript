import React, { useEffect, useState } from 'react';

/**
 * Archive: src/components/UseEffectComponent.tsx
 *
 * Description: Functional component with useEffect Hook
 *
 * Date: 22/17/07
 *
 * Author: Rey
 */

export const UseEffectComponent = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
    // console.log('useEffect counter:', count);
  };

  useEffect(() => {
    console.log('useEffect counter:', count);
  }, [count]);

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-xl text-zinc-300">useEffect counter: {count}</span>
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
  O hook useEffect diz ao React para executar a sua função de “efeito” após liberar as mudanças para o DOM.
  useEffect substitui os métodos de ciclo de vida de uma classe React ("componentDidMount", "componentDidUpdate", "componentWillUnmount").
*/
