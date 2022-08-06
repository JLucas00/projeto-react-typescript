import { Bank } from 'phosphor-react';
import React, { useContext } from 'react';
import { Card } from '../../components/Card';
import { HeaderBase } from '../../components/HeaderBase';
import { HeaderProfile } from '../../components/HeaderProfile';
import { MyAccounts } from '../../components/MyAccounts';
import { MyData } from '../../components/MyData';
import { ModeContext } from '../../providers/ModeProvider';
import { useUser } from '../../providers/UserProvider';

/**
 * Archive: src/pages/Profile.tsx
 *
 * Description: Profile page
 *
 * Date: 2022/08/05
 *
 * Author: Augusto, João e Yeté

 */

export const Profile = () => {
  const { user } = useUser();

  const useMode = useContext(ModeContext);

  const theme = useMode.theme;
  const objTheme = {
    light: {
      body: 'h-screen w-full flex flex-col bg-body-light-200',
    },
    dark: {
      body: 'h-screen w-full flex flex-col bg-body-dark',
    },
  };

  return (
    <>
      <div className={objTheme[theme].body}>
        <HeaderBase>
          <HeaderProfile name="Orlando" />
        </HeaderBase>
        <div className="h-2/3 w-full flex flex-col justify-around items-center">
          <Card
            title="Meus dados"
            icon={<Bank className="text-header-gold" size={20} />}
            notify={false}
          >
            <MyData
              name="Orlando"
              birthdate="09/06/2001"
              document="499.649.058-66"
            />
          </Card>
          <Card
            title="Minhas contas correntes"
            icon={<Bank className="text-header-gold" size={20} />}
            notify={false}
          >
            <MyAccounts userId="123456789" />
          </Card>
        </div>
      </div>
    </>
  );
};
