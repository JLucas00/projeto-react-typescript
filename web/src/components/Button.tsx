import React, { MouseEventHandler } from 'react';

interface PropTypes {
  className?: string;
  category: 'primary' | 'secondary' | 'cancel';
  label: string;
  type?: 'button' | 'submit';
  onClick: MouseEventHandler<HTMLButtonElement>;
}

/**
 * Archive: src/components/Button.tsx
 *
 * Description: Button component
 *
 * Date: 2022/08/05
 *
 * Author: Augusto, João e Yeté

 */

export const Button = ({
  className,
  label,
  type = 'button',
  onClick,
  category,
}: PropTypes) => (
  <button
    className={`w-full h-10 px-3 text-btn-text rounded btn-${category} ${className}`}
    type={type}
    onClick={onClick}
  >
    {label}
  </button>
);
