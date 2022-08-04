import React from 'react';
import { Link } from 'react-router-dom';

type linkProps = {
  transferType: string;
  transferColor: string;
  transferValue: number;
  transferSign: string;
  transferId: string;
};

export const LinkTransaction = ({
  transferType,
  transferColor,
  transferValue,
  transferSign,
  transferId,
}: linkProps) => {
  return (
    <Link
      to={'/transaction/:' + transferId}
      className="w-11/12 flex justify-between"
    >
      <p className="text-sm extract-text-color">{transferType}</p>
      <p className={transferColor}>
        {transferSign}R${transferValue}
      </p>
    </Link>
  );
};
