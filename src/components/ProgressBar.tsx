interface Props { value: number; label?: string }

export function ProgressBar({ value, label = 'Progresso do estudo' }: Props) {
  const percent = Math.min(100, Math.max(0, value));
  return (
    <div className="w-full" aria-label={`${label}: ${Math.round(percent)}%`}>
      <div className="mb-2 flex justify-between text-xs font-semibold text-slate-500"><span>{label}</span><span>{Math.round(percent)}%</span></div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-brand-600 transition-[width] duration-300" style={{ width: `${percent}%` }} /></div>
    </div>
  );
}
