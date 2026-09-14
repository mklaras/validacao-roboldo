export function Header() {
  return (
    <header className="border-b border-slate-200/80 bg-white/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-600">LAR • UERN</p>
          <p className="mt-0.5 text-sm font-semibold text-ink sm:text-base">Validação das Expressões do Roboldo</p>
        </div>
        <div className="hidden h-10 w-10 items-center justify-center rounded-xl border border-brand-100 bg-brand-50 text-sm font-extrabold text-brand-700 sm:flex" aria-hidden="true">R</div>
      </div>
    </header>
  );
}
