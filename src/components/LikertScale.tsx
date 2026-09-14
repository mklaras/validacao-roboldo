interface Props { name: string; value?: number; onChange: (value: number) => void; lowLabel: string; highLabel: string; middleLabel?: string }

export function LikertScale({ name, value, onChange, lowLabel, highLabel, middleLabel }: Props) {
  return (
    <div>
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {[1, 2, 3, 4, 5].map((number) => (
          <label key={number} className={`flex min-h-14 cursor-pointer items-center justify-center rounded-xl border-2 text-lg font-bold transition focus-within:ring-4 focus-within:ring-brand-100 ${value === number ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'}`}>
            <input className="sr-only" type="radio" name={name} value={number} checked={value === number} onChange={() => onChange(number)} />{number}
          </label>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-2 text-xs font-medium leading-tight text-slate-500 sm:text-sm">
        <span>1 — {lowLabel}</span><span className="text-right">5 — {highLabel}</span>
      </div>
      {middleLabel && <p className="mt-1 text-center text-xs text-slate-400">3 — {middleLabel}</p>}
    </div>
  );
}
