import React from 'react';

type headerProps = {
  children: JSX.Element;
};

export const HeaderBase = ({ children }: headerProps) => {
  return (
    <div className="header-base h-1/3 w-full flex rounded-b-3xl mb-6">
      {children}
    </div>
  );
};
