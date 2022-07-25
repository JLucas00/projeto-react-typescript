import { useUser } from '../../providers/UserProvider';
/**
 * Archive: src/pages/Home.tsx
 *
 * Description: Home page
 *
 * Date: 2022/07/20
 *
 * Author: Rey
 */

export const Home = () => {
  const { loading } = useUser();

  return <h1 className="text-white">Login</h1>;
};
