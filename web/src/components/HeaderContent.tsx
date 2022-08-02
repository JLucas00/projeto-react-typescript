import React from 'react';
import {
  UserCircle,
  ArrowsLeftRight,
  Bank,
  DownloadSimple,
  UploadSimple,
  CaretDown,
  Eye,
} from 'phosphor-react';
import { Link } from 'react-router-dom';

interface headerContentProps {
  content_data: {
    username: string;
    agency_number: string;
    agency_verification_code: string;
    account_number: string;
    account_verification_code: string;
    balance: string;
  };
}

export const HeaderContent = ({ content_data }: headerContentProps) => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full h-min mt-5 flex justify-around text-white items-center">
        <h1 className="text-xl">Bem-vindo, {content_data.username}!</h1>
        <Link to="/profile">
          <UserCircle className="w-7 h-7" />
        </Link>
      </div>

      <div className="w-3/4 flex justify-around mt-5">
        <div className="flex flex-col items-center">
          <Link to="/extract" className="header-button">
            <Bank className="w-8 h-8" />
          </Link>
          <h3 className="text-xs text-white mt-1">Extrato</h3>
        </div>
        <div className="flex flex-col items-center">
          <Link to="/transfer" className="header-button">
            <ArrowsLeftRight className="w-8 h-8" />
          </Link>
          <h3 className="text-xs text-white mt-1">Transferir</h3>
        </div>
        <div className="flex flex-col items-center">
          <Link to="/deposit" className="header-button">
            <UploadSimple className="w-8 h-8" />
          </Link>
          <h3 className="text-xs text-white mt-1">Depositar</h3>
        </div>
        <div className="flex flex-col items-center">
          <Link to="/withdraw" className="header-button">
            <DownloadSimple className="w-8 h-8" />
          </Link>
          <h3 className="text-xs text-white mt-1">Sacar</h3>
        </div>
      </div>

      <div className="w-3/4 h-20 bg-white mt-40 absolute rounded-lg shadow-lg">
        <div className="h-min flex items-center justify-around mt-1 header-gold text-sm">
          <p>
            Agência {content_data.agency_number}-
            {content_data.agency_verification_code}
          </p>
          <p>
            Conta {content_data.account_number}-
            {content_data.account_verification_code}
          </p>
          <CaretDown className="text-black" />
        </div>
        <div className="h-min flex mt-1 items-center ml-3">
          <Eye />
          <h2 className="text-2xl font-bold balance-color ml-1">
            {content_data.balance}
          </h2>
          <p className="ml-1 self-end currency-color font-bold">R$</p>
        </div>
      </div>
    </div>
  );
};
