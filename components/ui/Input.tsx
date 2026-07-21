'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

type InputProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  helper?: string;
  error?: string;
  maxLength?: number;
  className?: string;
  inputMode?: 'text' | 'numeric' | 'tel' | 'email';
  prefix?: string; // ex: "(11) " pra campo de telefone
  autoFocus?: boolean;
};

export function Input({
  label,
  value,
  onChange,
  type = 'text',
  placeholder = ' ',
  helper,
  error,
  maxLength,
  className,
  inputMode,
  prefix,
  autoFocus,
}: InputProps) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;
  const isFloated = focused || hasValue;

  return (
    <div className={cn('relative', className)}>
      <div className={cn(
        'relative border-[1.5px] rounded-xl bg-white transition-colors h-14',
        error
          ? 'border-error'
          : focused
          ? 'border-text-primary'
          : 'border-border'
      )}>
        {prefix && isFloated && (
          <span className="absolute left-4 bottom-3 text-base text-text-primary">
            {prefix}
          </span>
        )}
        <label className={cn(
          'absolute left-4 transition-all duration-150 pointer-events-none text-text-secondary',
          isFloated
            ? 'top-2 text-xs'
            : 'top-1/2 -translate-y-1/2 text-base'
        )}>
          {label}
        </label>
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          maxLength={maxLength}
          inputMode={inputMode}
          autoFocus={autoFocus}
          placeholder={isFloated ? placeholder : ''}
          className={cn(
            'w-full h-full bg-transparent outline-none text-text-primary text-base',
            'pb-1 pt-5',
            prefix && isFloated ? 'pl-12' : 'pl-4',
            'pr-4'
          )}
        />
      </div>
      {(helper || error) && (
        <p className={cn(
          'text-xs mt-1.5 px-1',
          error ? 'text-error' : 'text-text-secondary'
        )}>
          {error || helper}
        </p>
      )}
    </div>
  );
}
