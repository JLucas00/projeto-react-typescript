import React, { ReactElement } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useUser } from '../providers/UserProvider';

import { Login } from '../pages/login';
import { Extract } from '../pages/extract';
import { Transfer } from '../pages/transfer';
import { Deposit } from '../pages/deposit';
import { Withdraw } from '../pages/withdraw';
import { Profile } from '../pages/profile';
import { Transaction } from '../pages/transaction';
import { Register } from '../pages/register';

interface ChildrenTypes {
  children: ReactElement;
}

const Private = ({ children }: ChildrenTypes) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

const Public = ({ children }: ChildrenTypes) => {
  const { user } = useUser();

  if (user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export const Router = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/login" />} />
    <Route
      path="/login"
      element={
        <Private>
          <Login />
        </Private>
      }
    />
    <Route
      path="/deposit"
      element={
        <Private>
          <Deposit />
        </Private>
      }
    />
    <Route
      path="/extract"
      element={
        <Private>
          <Extract />
        </Private>
      }
    />
    <Route
      path="/transfer"
      element={
        <Private>
          <Transfer />
        </Private>
      }
    />
    <Route
      path="/withdraw"
      element={
        <Private>
          <Withdraw />
        </Private>
      }
    />
    <Route
      path="/profile"
      element={
        <Private>
          <Profile />
        </Private>
      }
    />
    <Route
      path="/register"
      element={
        <Private>
          <Register />
        </Private>
      }
    />

    <Route path="/transaction/:transactionId" element={<Transaction />} />

    <Route path="*" element={<h1 className="text-white">Error 404</h1>} />
  </Routes>
);
