import React, { useState } from 'react';

interface inputProps {
  placeholder: string;
  inputType: 'long' | 'short';
  disabled: boolean;
}

export const Input = ({ placeholder, inputType, disabled }: inputProps) => {
  const [inputValue, setInputValue] = useState('');
  console.log(inputValue);

  return (
    <input
      placeholder={placeholder}
      type="text"
      // eslint-disable-next-line quotes
      className={`h-8 ${inputType} p-2 rounded ${
        disabled ? 'bg-input-readonly' : 'border bg-input-base'
      } `}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      disabled={disabled}
    />
  );
};
