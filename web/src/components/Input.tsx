import React, { useState } from 'react';

interface inputProps {
  className?: string;
  placeholder: string;
  inputType: 'long' | 'short';
  disabled: boolean;
}

export const Input = ({
  className,
  placeholder,
  inputType,
  disabled,
}: inputProps) => {
  const [inputValue, setInputValue] = useState('');
  console.log(inputValue);

  return (
    <input
      placeholder={placeholder}
      type="text"
      // eslint-disable-next-line quotes
      className={`h-8 ${inputType} p-2 rounded ${className} ${
        disabled ? 'bg-input-readonly' : 'border-2 border-slate-300 '
      } `}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      disabled={disabled}
    />
  );
};
