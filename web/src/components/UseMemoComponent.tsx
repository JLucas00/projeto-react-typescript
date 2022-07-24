import React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

interface userTypes {
  id: string;
  name: string;
}

// Filter function used inside UserList component
const filter = (users: userTypes[], query: string) => {
  console.log('Filter re-render');

  return users.filter((user) => user.name.toLowerCase().includes(query));
};

// UserList Component
const UserList = ({ users, query }: any) => {
  const filtered = useMemo(() => {
    return filter(users, query);
  }, [users, query]);

  return (
    <>
      {filtered.map((user) => (
        <div className="text-white text-left" key={user.id}>
          {user.name}
        </div>
      ))}
    </>
  );
};

/**
 * Archive: src/components/UseMemoComponent.tsx
 *
 * Description: Functional component with useMemo Hook
 *
 * Date: 22/17/07
 *
 * Author: Rey
 */

export const UseMemoComponent = () => {
  const [count, setCount] = useState(0);
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<userTypes[]>([]);

  const getUser = useCallback(async () => {
    const { data } = await axios.get(
      'https://jsonplaceholder.typicode.com/users/',
    );
    console.log(data);

    setUsers(data);
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-xl text-zinc-300">useMemo counter: {count}</span>
      <button
        onClick={() => setCount((prev) => prev + 1)}
        type="button"
        className="w-10 h-6 text-zinc-700 bg-zinc-300 rounded"
      >
        +
      </button>
      <input
        className="h-8 pl-2 rounded"
        type="text"
        placeholder="Filtrar"
        onChange={(e) => setQuery(e.target.value)}
      />
      <UserList users={users} query={query} />
    </div>
  );
};

/*
  O useMemo hook retorna uma igualdade referencial da execução de uma função entre cada render.
*/
