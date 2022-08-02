import React, { useState } from 'react';

interface inputProps {
  placeholder: string;
  inputType: 'long' | 'short';
}

export const Input = ({ placeholder, inputType }: inputProps) => {
  const [inputValue, setInputValue] = useState('');
  console.log(inputValue);

  return (
    <input
      placeholder={placeholder}
      type="text"
      // eslint-disable-next-line quotes
      className={`h-9 ${inputType} p-2 rounded border input-color`}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
};
