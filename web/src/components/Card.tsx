import { Bell, BellRinging } from 'phosphor-react';
import { useState } from 'react';

type cardProps = {
  title: string;
  icon: JSX.Element;
  notify?: boolean;
  children: JSX.Element;
};

export const Card = ({ title, icon, notify, children }: cardProps) => {
  const [notification, setNotification] = useState(false);

  const funcNotification = () => {
    if (notification) {
      console.log('Notificação Ativa');
    } else {
      console.log('Notificação Desativada');
    }
    setNotification(!notification);
  };

  return (
    <div className="w-5/6 px-4 py-3 border rounded-lg border-btn-secondary-base bg-body-dark">
      <div className="h-5 w-full flex">
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
      <div className="mt-6">{children}</div>
    </div>
  );
};
