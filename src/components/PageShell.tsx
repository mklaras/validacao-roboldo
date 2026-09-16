import type { ReactNode } from 'react';

export function PageShell({ children, width = 'max-w-5xl' }: { children: ReactNode; width?: string }) {
  return <main className={`mx-auto w-full ${width} flex-1 px-5 py-7 sm:px-8 sm:py-10`}>{children}</main>;
}
