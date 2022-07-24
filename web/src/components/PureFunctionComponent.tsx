/**
 * Archive: src/components/PureFunctionComponent.tsx
 *
 * Description: Functional state-less component
 *
 * Date: 22/17/07
 *
 * Author: Rey
 */

export const PureFunctionComponent = () => {
  let count = 0;

  const increment = () => {
    count++;
    console.log('Pure function counter:', count);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-xl text-zinc-300">
        Pure function counter: {count}
      </span>
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
  Embora seja possível desenvolvermos componentes funcionais com funções puras,
 componentes deste tipo não possuem os mecanismos necessários para lidarmos satisfatoriamente com:
    1- Efeitos colaterais
    2- Controle de vida dos componentes
    3- Controle de estado
*/
