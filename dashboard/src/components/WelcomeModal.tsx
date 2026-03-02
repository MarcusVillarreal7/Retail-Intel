import { useState } from "react";

const TABS = [
  { name: "Executive Overview", desc: "KPI cards, revenue trends, regional targets, category penetration over 8 quarters" },
  { name: "Channel Mix", desc: "Revenue by channel, AOV trends, full-price vs markdown analysis, DTC mix trending" },
  { name: "Inventory & Aging", desc: "Age bucket analysis, dollar value at risk, at-risk item detail" },
  { name: "Client Retention", desc: "Cohort retention heatmap, repeat rate, LTV, VIP concentration" },
  { name: "Wholesale Doors", desc: "12 global wholesale partners — sell-through, reorder rates, YoY by door" },
];

const TECH = ["React", "TypeScript", "Tailwind CSS", "Recharts", "PostgreSQL", "Python"];

export default function WelcomeModal() {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="animate-fade-in relative w-full max-w-xl mx-4 bg-bg-card border border-border rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="px-8 pt-8 pb-4">
          <h1 className="text-2xl font-semibold tracking-widest text-gold uppercase">Retail Intel</h1>
          <p className="text-sm text-text-secondary mt-1">Omnichannel Analytics Dashboard</p>
          <p className="text-xs text-text-muted mt-3 leading-relaxed">
            A full-stack analytics dashboard for luxury fashion retail — tracking revenue, inventory, customer retention,
            pricing integrity, and wholesale partner performance across all sales channels.
          </p>
          <p className="text-xs text-text-muted mt-1">All data is synthetic. Built as a portfolio project.</p>
        </div>

        {/* Tabs */}
        <div className="px-8 pb-4">
          <h3 className="text-xs text-text-muted uppercase tracking-wider mb-3">5 Dashboard Views</h3>
          <div className="space-y-2">
            {TABS.map((tab) => (
              <div key={tab.name} className="flex items-start gap-3">
                <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                <div>
                  <span className="text-sm font-medium text-text-primary">{tab.name}</span>
                  <span className="text-xs text-text-muted ml-2">{tab.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech */}
        <div className="px-8 pb-4">
          <h3 className="text-xs text-text-muted uppercase tracking-wider mb-2">Built With</h3>
          <div className="flex flex-wrap gap-2">
            {TECH.map((t) => (
              <span key={t} className="text-xs px-2.5 py-1 rounded-full border border-border text-text-secondary">
                {t}
              </span>
            ))}
            <span className="text-xs px-2.5 py-1 rounded-full border border-border text-text-secondary">
              9 SQL Queries
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="px-8 pb-8 pt-4">
          <button
            onClick={() => setOpen(false)}
            className="w-full py-3 rounded-lg bg-gold text-bg-primary font-semibold text-sm tracking-wide hover:bg-gold-light transition-colors"
          >
            Continue to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
