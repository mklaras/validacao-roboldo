import { PageShell } from '../components/PageShell';
import type { ScenarioId } from '../config/expressions';

export function ScenarioSelectionPage({
  onContinue,
}: {
  onContinue: (scenario: ScenarioId) => void;
}) {
  return (
    <PageShell width="max-w-5xl">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-card sm:p-9">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-600">
          Uso do pesquisador
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Configuração do estudo
        </h1>
        <p className="mt-3 text-slate-600">
          Selecione o cenário desta participação.
        </p>

        <div className="mx-auto mt-8 grid max-w-2xl gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => onContinue('cenario1')}
            className="min-h-24 rounded-2xl border-2 border-brand-600 bg-brand-50 px-6 text-xl font-extrabold text-brand-700 transition hover:bg-brand-100 focus:outline-none focus:ring-4 focus:ring-brand-100"
          >
            Cenário 1
          </button>
          <button
            type="button"
            onClick={() => onContinue('cenario2')}
            className="min-h-24 rounded-2xl border-2 border-brand-600 bg-brand-50 px-6 text-xl font-extrabold text-brand-700 transition hover:bg-brand-100 focus:outline-none focus:ring-4 focus:ring-brand-100"
          >
            Cenário 2
          </button>
        </div>
      </section>
    </PageShell>
  );
}
