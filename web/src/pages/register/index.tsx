import React, { useContext } from 'react';
import { ModeContext } from '../../providers/ModeProvider';
import logoSvg from '../../assets/logo.svg';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Link } from 'react-router-dom';

export const Register = () => {
  const objTheme = {
    body: 'h-screen w-full flex flex-col items-center bg-body-light-bg dark:bg-body-dark',
    textColorLogin: 'mt-3 text-2xl text-paragraph-dark dark:text-header-light',
    registerButton:
      'mt-1.5 text-paragraph-light-200 dark:text-paragraph-light-100',
  };

  return (
    <div className={objTheme.body}>
      <div className="w-full h-1/3 flex flex-col items-center justify-center">
        <img src={logoSvg} className="w-16" />
        <h1 className="mt-3.5 balance-color font-semibold">Alpha Bunker</h1>
        <h2 className={objTheme.textColorLogin}>Crie sua conta</h2>
      </div>
      <div className="w-full px-14 flex flex-col items-center gap-y-5">
        <Input
          placeholder="Digite seu nome"
          inputType="long"
          disabled={false}
          value={''}
        />
        <Input
          placeholder="Digite sua data de nascimento"
          inputType="long"
          disabled={false}
          value={''}
        />
        <Input
          placeholder="Digite seu CPF"
          inputType="long"
          disabled={false}
          value={''}
        />
        <Input
          placeholder="Digite seu email"
          inputType="long"
          disabled={false}
          value={''}
        />
        <Input
          placeholder="Digite sua senha"
          inputType="long"
          disabled={false}
          value={''}
        />
        <Input
          placeholder="Confirme sua senha"
          inputType="long"
          disabled={false}
          value={''}
        />

        <div className="w-full mt-1 flex flex-col items-center">
          <Button
            category="primary"
            label="Cadastrar"
            onClick={() => console.log('click')}
          />
          <Link to="/login">
            <button className={objTheme.registerButton}>Entrar</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
