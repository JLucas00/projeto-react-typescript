import React, { useState } from 'react';

interface inputProps {
  placeholder: string;
}

export const Input = ({ placeholder }: inputProps) => {
  const [inputValue, setInputValue] = useState('');
  console.log(inputValue);

  return (
    <input
      placeholder={placeholder}
      type="text"
      className={'h-9 w-45 p-2 rounded border input-color'}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
};
