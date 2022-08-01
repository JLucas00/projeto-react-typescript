import { Bank } from 'phosphor-react';
import React from 'react';
import { Card } from '../../components/Card';
import { HeaderBase } from '../../components/HeaderBase';
import { useUser } from '../../providers/UserProvider';

/**
 * Archive: src/pages/Profile.tsx
 *
 * Description: Profile page
 *
 * Date: 2022/07/20
 *
 * Author: Rey
 */

export const Profile = () => {
  const { user } = useUser();

  return (
    <>
      <div className='h-screen w-full flex flex-col'>
        <HeaderBase>
          <div>teste</div>
        </HeaderBase>
        <div className="h-2/3 w-full flex flex-col justify-around items-center">
          <Card
            title="Extrato de transações"
            icon={<Bank className="text-header-gold" size={20} />}
            notify={true}
          >
            <div>
              <p>Nome:Yeté Abunã Marques Labarca</p>
              <p>Data de nascimento: 09/06/2001</p>
              <p>CPF: 499.649.058-66</p>
            </div>
          </Card>
          <Card
            title="Extrato de transações"
            icon={<Bank className="text-header-gold" size={20} />}
            notify={false}
          >
            <div>
              <p>Nome:Yeté Abunã Marques Labarca</p>
              <p>Data de nascimento: 09/06/2001</p>
              <p>CPF: 499.649.058-66</p>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

{
}
