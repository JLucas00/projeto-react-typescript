import React, { ReactNode, createContext, useState, useContext } from 'react';

interface ContextTypes {
  user: UserTypes;
  loading: boolean;
}

interface UserTypes {
  name: string;
  email: string;
  cpf: string;
  birthDate: string;
}

export const UserContext = createContext<Partial<ContextTypes>>({});

interface UserProviderTypes {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderTypes) => {
  const [user, setUser] = useState<UserTypes>({
    name: 'string',
    email: 'string',
    cpf: 'string',
    birthDate: 'string',
  });
  const [loading, setLoading] = useState(true);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
