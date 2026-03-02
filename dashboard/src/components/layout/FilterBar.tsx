interface FilterBarProps {
  regions: string[];
  selected: string;
  onChange: (region: string) => void;
}

export default function FilterBar({ regions, selected, onChange }: FilterBarProps) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <span className="text-xs text-text-muted uppercase tracking-wider mr-2">Region</span>
      {regions.map((r) => (
        <button
          key={r}
          onClick={() => onChange(r)}
          className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
            selected === r
              ? "bg-gold text-bg-primary font-medium"
              : "bg-bg-card text-text-secondary border border-border hover:border-gold-dim"
          }`}
        >
          {r}
        </button>
      ))}
    </div>
  );
}
