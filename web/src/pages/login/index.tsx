import React, { useContext } from 'react';
import { Input } from '../../components/Input';
import logoSvg from '../../assets/logo.svg';
import { ModeContext } from '../../providers/ModeProvider';

import { useUser } from '../../providers/UserProvider';
import { Button } from '../../components/Button';
/**
 * Archive: src/pages/Home.tsx
 *
 * Description: Home page
 *
 * Date: 2022/07/20
 *
 * Author: Rey
 */

export const Login = () => {
  const useMode = useContext(ModeContext);

  const theme = useMode.theme;
  const objTheme = {
    light: {
      body: 'h-screen w-full flex flex-col items-center',
      textColorLogin: 'text-2xl',
      registerButton: 'mt-2',
    },
    dark: {
      body: 'h-screen w-full flex flex-col items-center bg-body-dark',
      textColorLogin: 'text-2xl text-white',
      registerButton: 'mt-2 text-white',
    },
  };

  return (
    <div className={objTheme[theme].body}>
      <div className="w-full h-72 flex flex-col items-center justify-center">
        <img src={logoSvg} className="w-28 h-28" />
        <h1 className="mt-2 text-2xl balance-color font-semibold">
          Alpha Bunker
        </h1>
      </div>
      <div className="w-9/12 flex flex-col items-center">
        <h2 className={objTheme[theme].textColorLogin}>Login</h2>
        <Input
          placeholder="Digite seu CPF"
          inputType="long"
          disabled={false}
          className="mt-5"
        />
        <Input
          placeholder="Digite sua senha"
          inputType="long"
          disabled={false}
          className="mt-5"
        />
        <Button category="primary" label="entrar" className="mt-5" />
        <button className={objTheme[theme].registerButton}>
          Crie sua conta
        </button>
      </div>
    </div>
  );
};
