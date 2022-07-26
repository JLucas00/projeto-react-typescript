import React from 'react';
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

  return <h1 className="text-white">{user?.name}</h1>;
};
