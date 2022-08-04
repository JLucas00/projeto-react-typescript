import React, { useContext } from 'react';
import { ModeContext } from '../../providers/ModeProvider';
import logoSvg from '../../assets/logo.svg';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Link } from 'react-router-dom';

export const Register = () => {
  const useMode = useContext(ModeContext);

  const theme = useMode.theme;
  const objTheme = {
    light: {
      body: 'h-screen w-full flex flex-col items-center',
      textColor: 'mt-4 text-xl',
      registerButton: 'mt-2',
    },
    dark: {
      body: 'h-screen w-full flex flex-col items-center bg-body-dark',
      textColor: 'mt-4 text-xl text-white',
      registerButton: 'mt-2 text-white',
    },
  };

  return (
    <div className={objTheme[theme].body}>
      <div className="w-full h-1/3 flex flex-col items-center justify-center">
        <img src={logoSvg} className="w-16" />
        <h1 className="mt-2 balance-color font-semibold">Alpha Bunker</h1>
        <h2 className={objTheme[theme].textColor}>Crie sua conta</h2>
      </div>
      <div className="w-9/12 flex flex-col items-center">
        <Input
          placeholder="Digite seu nome"
          inputType="long"
          disabled={false}
        />
        <Input
          placeholder="Digite sua data de nascimento"
          inputType="long"
          disabled={false}
          className="mt-5"
        />
        <Input
          placeholder="Digite seu CPF"
          inputType="long"
          disabled={false}
          className="mt-5"
        />
        <Input
          placeholder="Digite seu email"
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
        <Input
          placeholder="Confirme sua senha"
          inputType="long"
          disabled={false}
          className="mt-5"
        />
        <Button category="primary" label="entrar" className="mt-5" />
        <Link to="/login">
          <button className={objTheme[theme].registerButton}>Entrar</button>
        </Link>
      </div>
    </div>
  );
};
