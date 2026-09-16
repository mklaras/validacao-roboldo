export function Header({ onBack }: { onBack?: () => void }) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-5 px-5 py-4 sm:px-8">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 font-semibold text-slate-600 transition hover:bg-brand-50 hover:text-brand-700 focus:outline-none focus:ring-4 focus:ring-brand-100"
          >
            <span aria-hidden="true">←</span>
            Voltar
          </button>
        ) : <span />}
        <div className="text-right">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-600">LAR • UERN</p>
          <p className="mt-0.5 text-sm font-semibold text-ink sm:text-base">Validação das Expressões do Roboldo</p>
        </div>
      </div>
    </header>
  );
}
