<<<<<<< HEAD
import React from 'react';

type headerProps = {
  children: JSX.Element;
};

export const HeaderBase = ({ children }: headerProps) => {
  return (
    <div className="header-base h-1/3 w-full flex rounded-b-3xl">
      {children}
    </div>
  );
};
=======
type headerProps = {
  children: JSX.Element;
};

export const HeaderBase = ({ children }: headerProps) => {
  return <div className="header-base h-1/3 w-full flex rounded-b-3xl">{children}</div>;
};
>>>>>>> 893714e6169a5703001f01fb4f84ea4bd57ff888
