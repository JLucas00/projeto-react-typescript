import { Bell, BellRinging } from 'phosphor-react';
import React, { useContext, useState } from 'react';
import { ModeContext } from '../providers/ModeProvider';

type cardProps = {
  title: string;
  icon: JSX.Element;
  notify?: boolean;
  content: JSX.Element;
};

export const Card = ({ title, icon, notify, content }: cardProps) => {
  const [notification, setNotification] = useState(false);

  const funcNotification = () => {
    if (notification) {
      console.log('Notificação Ativa');
    } else {
      console.log('Notificação Desativada');
    }
    setNotification(!notification);
  };

  const useMode = useContext(ModeContext);

  const theme = useMode.theme;
  const objTheme = {
    light: {
      icons: 'text-icon-light',
      card: 'w-5/6 px-4 py-3 border rounded-lg bg-white',
    },
    dark: {
      icons: 'text-icon-dark',
      card: 'w-5/6 px-4 py-3 border rounded-lg border-btn-secondary-base bg-body-dark',
    },
  };

  return (
    <div className={objTheme[theme].card}>
      <div className="h-5 w-full flex text-header-gold">
        {icon}
        <h1 className="w-full text-left pl-2 text-sm flex items-center text-header-gold">
          {title}
        </h1>
        {notify ? (
          <button onClick={funcNotification}>
            {notification ? (
              <BellRinging className="text-icon-dark-100" size={20} />
            ) : (
              <Bell className="text-icon-dark-100" size={20} />
            )}
          </button>
        ) : (
          false
        )}
      </div>
      <div className="mt-4 flex items-center justify-center">{content}</div>
    </div>
  );
};
