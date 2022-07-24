import './styles/global.css';

import { PureFunctionComponent } from './components/PureFunctionComponent';
import { UseStateComponent } from './components/UseStateComponent';
import { UseEffectComponent } from './components/UseEffectComponent';
import { UseCallbackComponent } from './components/UseCallbackComponent';
import { UseMemoComponent } from './components/UseMemoComponent';

/**
 * Archive: src/App.tsx
 *
 * Description: Main application component
 *
 * Date: 22/17/07
 *
 * Author: Rey
 */

export const App = () => {
  return (
    <>
      <PureFunctionComponent />
      {/* <UseStateComponent /> */}
      {/* <UseEffectComponent /> */}
      {/* <UseCallbackComponent /> */}
      {/* <UseMemoComponent /> */}
    </>
  );
};

/*
  Em programação de computadores, o termo hooking (em português, "enganchar") cobre uma série de técnicas utilizadas para
 modificar ou melhorar o comportamento de um sistema operacional, aplicações ou outros componentes de software através da
 interceptação de chamadas de funções, mensagens ou eventos passados entre componentes de software.
  O código que manipula tais chamadas de funções, mensagens ou eventos interceptados é chamado de "hook" (gancho).

  Hooks são funções que permitem a você “ligar-se” aos recursos de state e ciclo de vida do React a partir de
componentes funcionais.
  Hooks não funcionam dentro de classes — eles permitem que você use React sem classes.
*/
