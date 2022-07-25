import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
/**
 * Archive: src/pages/Extract.tsx
 *
 * Description: Extract page
 *
 * Date: 2022/07/20
 *
 * Author: Rey
 */

export const Transaction = () => {
  const { transactionId } = useParams<Record<string, string | undefined>>();
  console.log(transactionId);

  return <h1 className="text-white">Transação</h1>;
};
