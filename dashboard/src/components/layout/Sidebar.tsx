import { NavLink } from "react-router-dom";

const navItems = [
  { path: "/", label: "Executive Overview", icon: "grid" },
  { path: "/channels", label: "Channel Mix", icon: "layers" },
  { path: "/inventory", label: "Inventory & Aging", icon: "package" },
  { path: "/retention", label: "Client Retention", icon: "users" },
  { path: "/wholesale", label: "Wholesale Doors", icon: "store" },
];

const icons: Record<string, JSX.Element> = {
  grid: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
    </svg>
  ),
  layers: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  package: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  users: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  store: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h18l-2 4H5L3 3zm0 0v2m2 2v12a1 1 0 001 1h12a1 1 0 001-1V9M9 21v-6h6v6" />
    </svg>
  ),
};

export default function Sidebar() {
  return (
    <aside className="w-60 h-screen bg-bg-card border-r border-border flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b border-border">
        <h1 className="text-lg font-semibold tracking-widest text-gold uppercase">
          Retail Intel
        </h1>
        <p className="text-xs text-text-muted mt-1">Omnichannel Analytics</p>
      </div>
      <nav className="flex-1 py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                isActive
                  ? "text-gold bg-bg-hover border-r-2 border-gold"
                  : "text-text-secondary hover:text-text-primary hover:bg-bg-hover"
              }`
            }
          >
            {icons[item.icon]}
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-border">
        <p className="text-xs text-text-muted">Synthetic Data</p>
        <p className="text-xs text-text-muted">Portfolio Project</p>
      </div>
    </aside>
  );
}
