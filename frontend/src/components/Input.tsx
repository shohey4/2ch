import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

// eslint-disable-next-line react/display-name
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, disabled, ...props }, ref) => {
    return (
      <input
        type={type}
        className={twMerge(
          `
            flex
            w-full
            rounded-md
            bg-neutral-50
            border
            border-transparent
            my-1
            px-2
            py-2
            text-m
            file:border-0
            file:bg-transparent
            file:text-medium
            fle:font-medium
            placeholder:text-neutral-500
            disabled:cursor-not-allowed
            disabled:opacity-50
            focus:outline-none
          `,
          className
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      />
    );
  }
);
export default Input;
