import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> { children: ReactNode; fullWidth?: boolean }

export function PrimaryButton({ children, fullWidth = false, className = '', ...props }: Props) {
  return (
    <button {...props} className={`min-h-14 rounded-xl bg-brand-600 px-7 py-3 text-base font-bold text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus:ring-4 focus:ring-brand-100 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 ${fullWidth ? 'w-full' : ''} ${className}`}>
      {children}
    </button>
  );
}
