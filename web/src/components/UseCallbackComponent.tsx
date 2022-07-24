import React from 'react';
import { useCallback, useEffect, useState } from 'react';

const Button = ({ ...props }: any) => {
  useEffect(() => {
    console.log('Button re-render');
  });

  useEffect(() => {
    console.log('Onclick changed');
  }, [props.onClick]);

  return <button {...props} />;
};

/**
 * Archive: src/components/UseCallbackComponent.tsx
 *
 * Description: Functional component with useCallback Hook
 *
 * Date: 22/17/07
 *
 * Author: Rey
 */

export const UseCallbackComponent = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('UseCallbackComponent re-render');
  });

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-xl text-zinc-300">
        UseCallback counter: {count}
      </span>

      <Button
        onClick={useCallback(() => {
          setCount((prev) => prev + 1);
        }, [])}
        type="button"
        className="w-10 h-6 text-zinc-700 bg-zinc-300 rounded"
      >
        +
      </Button>
    </div>
  );
};

/*
  O useCallback hook retorna uma igualdade referencial de uma função entre cada render.
*/
