import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

// eslint-disable-next-line react/display-name
const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, disabled, ...props }, ref) => {
    return (
      <textarea
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
            text-sm
            file:border-0
            file:bg-transparent
            file:text-medium
            fle:font-medium
            placeholder:text-neutral-500
            disabled:cursor-not-allowed
            disabled:opacity-50
            focus:outline-none
            resize-none
          `,
          className
        )}
        ref={ref}
        disabled={disabled}
        {...props}
      />
    );
  }
);

export default TextArea;
