interface KPICardProps {
  label: string;
  value: string;
  change: number;
  prefix?: string;
  suffix?: string;
}

export default function KPICard({ label, value, change, prefix, suffix }: KPICardProps) {
  const isPositive = change >= 0;

  return (
    <div className="bg-bg-card border border-border rounded-lg p-5 hover:border-gold-dim transition-colors">
      <p className="text-xs text-text-muted uppercase tracking-wider mb-2">{label}</p>
      <p className="text-2xl font-semibold text-text-primary">
        {prefix}{value}{suffix}
      </p>
      <p className={`text-sm mt-1 ${isPositive ? "text-green" : "text-red"}`}>
        {isPositive ? "+" : ""}{change.toFixed(1)}% vs PY
      </p>
    </div>
  );
}
