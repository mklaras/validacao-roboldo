interface Props { name: string; value: string; label: string; checked: boolean; onChange: (value: string) => void }

export function ExpressionOption({ name, value, label, checked, onChange }: Props) {
  return (
    <label className={`flex min-h-14 cursor-pointer items-center justify-center rounded-xl border-2 px-4 py-3 text-center font-semibold transition focus-within:ring-4 focus-within:ring-brand-100 ${checked ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'}`}>
      <input className="sr-only" type="radio" name={name} value={value} checked={checked} onChange={() => onChange(value)} />
      <span>{label}</span><span className="sr-only">{checked ? ', selecionado' : ''}</span>
    </label>
  );
}
