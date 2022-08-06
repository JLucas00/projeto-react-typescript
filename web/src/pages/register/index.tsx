import React, { useContext, useEffect, useState } from 'react';
import { ModeContext } from '../../providers/ModeProvider';
import logoSvg from '../../assets/logo.svg';
import { createAccount } from '../../libs/api';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Link } from 'react-router-dom';

export const Register = () => {
  const [formData, setformData] = useState({
    nome: '',
    data: '',
    cpf: '',
    email: '',
    senha: '',
    confirmSenha: '',
  });

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setformData({ ...formData, [name]: value });
    console.log(formData);
  }

  function handleCreateAccount() {
    try {
      createAccount({
        name: formData.cpf,
        email: formData.email,
        cpf: formData.cpf,
        password: formData.senha,
        birthdate: formData.data,
      }).then((response) => console.log(response.data));
    } catch (error) {
      console.log(error);
    }
  }
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
          value={formData.nome}
        />
        <Input
          placeholder="Digite sua data de nascimento"
          inputType="long"
          disabled={false}
          type="date"
          value={formData.data}
        />
        <Input
          placeholder="Digite seu CPF"
          inputType="long"
          disabled={false}
          value={formData.cpf}
        />
        <Input
          placeholder="Digite seu email"
          inputType="long"
          disabled={false}
          value={formData.email}
        />
        <Input
          placeholder="Digite sua senha"
          inputType="long"
          disabled={false}
          value={formData.senha}
        />
        <Input
          placeholder="Confirme sua senha"
          inputType="long"
          disabled={false}
          value={formData.confirmSenha}
        />

        <div className="w-full mt-1 flex flex-col items-center">
          <Button
            category="primary"
            label="Cadastrar"
            onClick={() =>
              formData.senha === formData.confirmSenha
                ? handleCreateAccount()
                : console.log('escreva a mesma senha')
            }
          />
          <Link to="/login">
            <button className={objTheme.registerButton}>Entrar</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
