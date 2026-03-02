interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="mb-6">
      <h2 className="text-2xl font-semibold text-text-primary">{title}</h2>
      {subtitle && (
        <p className="text-sm text-text-secondary mt-1">{subtitle}</p>
      )}
    </header>
  );
}
