import type { ReactNode } from 'react';

export function QuestionCard({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <fieldset className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <legend className="px-1 text-base font-bold text-ink sm:text-lg">{title}</legend>
      {description && <p className="mb-4 mt-1 text-sm leading-relaxed text-slate-600">{description}</p>}
      <div className={description ? '' : 'mt-3'}>{children}</div>
    </fieldset>
  );
}
