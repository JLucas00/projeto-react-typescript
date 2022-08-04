import React, { ReactNode, createContext, useState } from 'react';

interface ContextTypes {
  change: any;
  eye: boolean;
}

interface ProviderTypes {
  children: ReactNode;
}

export const EyeContext = createContext<ContextTypes>({
  change: () => {
    console.log('Start EyeProvider dark');
  },
  eye: true,
});

export const EyeProvider = ({ children }: ProviderTypes) => {
  //começar no modo light
  const [eye, setEye] = useState(true);

  function change() {
    if (eye) {
      console.log('Olho Aberto');
    } else {
      console.log('Olho Fechado');
    }
    setEye(!eye);
  }

  return (
    <EyeContext.Provider value={{ change, eye }}>
      {children}
    </EyeContext.Provider>
  );
};
