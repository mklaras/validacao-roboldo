interface Props {
  name: string;
  lowLabel: string;
  highLabel: string;
  value?: number;
  onChange: (value: number) => void;
}

export function SemanticDifferentialItem({
  name,
  lowLabel,
  highLabel,
  value,
  onChange,
}: Props) {
  return (
    <fieldset className="border-t border-slate-200 py-4 first:border-t-0 first:pt-0 last:pb-0">
      <legend className="sr-only">{lowLabel} a {highLabel}</legend>
      <div className="mb-2 flex items-end justify-between gap-3 text-sm font-semibold text-slate-700 sm:text-base">
        <span>{lowLabel}</span>
        <span className="text-right">{highLabel}</span>
      </div>
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {[1, 2, 3, 4, 5].map((number) => (
          <label
            key={number}
            className={`flex min-h-12 cursor-pointer items-center justify-center rounded-xl border-2 font-bold transition focus-within:ring-4 focus-within:ring-brand-100 ${
              value === number
                ? 'border-brand-600 bg-brand-50 text-brand-700'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
            }`}
          >
            <input
              className="sr-only"
              type="radio"
              name={name}
              value={number}
              checked={value === number}
              onChange={() => onChange(number)}
            />
            {number}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
