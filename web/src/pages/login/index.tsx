import React, { useContext, useState, useEffect } from 'react';
import { Input } from '../../components/Input';
import logoSvg from '../../assets/logo.svg';
import { ModeContext } from '../../providers/ModeProvider';
import { getLogin } from '../../libs/api';
import { useUser } from '../../providers/UserProvider';
import { Button } from '../../components/Button';
import { Link } from 'react-router-dom';
/**
 * Archive: src/pages/Login.tsx
 *
 * Description: Login page
 *
 * Date: 2022/08/05
 *
 * Author: Augusto, João e Yeté

 */

export const Login = () => {
  const [formData, setformData] = useState({ cpf: '', senha: '' });

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setformData({ ...formData, [name]: value });
    console.log(formData);
  }

  function handleLogin() {
    try {
      getLogin({
        cpf: formData.cpf,
        password: formData.senha,
      }).then((response) => console.log(response.data));
    } catch (error) {
      console.log(error);
    }
  }

  const objTheme = {
    body: 'h-screen w-full flex flex-col items-center bg-body-light-bg dark:bg-body-dark',
    textColorLogin: 'text-2xl text-paragraph-dark dark:text-header-light',
    registerButton:
      'mt-2 text-paragraph-light-200 dark:text-paragraph-light-100',
  };

  return (
    <div className={objTheme.body}>
      <div className="w-full h-72 flex flex-col items-center justify-center">
        <img src={logoSvg} className="w-28 h-28" />
        <h1 className="mt-2 text-2xl balance-color font-semibold">
          Alpha Bunker
        </h1>
      </div>

      <div className="w-9/12 flex flex-col items-center">
        <h2 className={objTheme.textColorLogin}>Login</h2>
        <Input
          placeholder="Digite seu CPF"
          inputType="long"
          disabled={false}
          className="mt-6"
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
        />
        <Input
          placeholder="Digite sua senha"
          inputType="long"
          disabled={false}
          className="mt-5"
          type="password"
          name="senha"
          value={formData.senha}
          onChange={handleChange}
        />

        <Link className="w-full" to="/deposit">
          <Button
            category="primary"
            label="Entrar"
            className="mt-6"
            onClick={handleLogin}
          />
        </Link>

        <Link to="/register">
          <button className={objTheme.registerButton}>Crie sua conta</button>
        </Link>
      </div>
    </div>
  );
};
