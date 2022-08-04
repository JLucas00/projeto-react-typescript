import React, { useState } from 'react';

interface inputProps {
  className?: string;
  placeholder: string;
  inputType: 'long' | 'short';
  disabled: boolean;
  value: string;
  name?: string;
  onChange?: any;
  type?: string;
}

export const Input = ({
  className,
  placeholder,
  inputType,
  disabled,
  value,
  name,
  onChange,
  type,
}: inputProps) => {
  const [inputValue, setInputValue] = useState('');
  console.log(inputValue);

  return (
    <input
      placeholder={placeholder}
      name={name}
      // eslint-disable-next-line quotes
      className={`h-8 ${inputType} p-2 rounded ${className} ${
        disabled ? 'bg-input-readonly' : 'border-2 border-slate-300 '
      } `}
      value={value}
      onChange={onChange ? onChange : (e) => setInputValue(e.target.value)}
      disabled={disabled}
      type={type ? type : 'text'}
    />
  );
};
