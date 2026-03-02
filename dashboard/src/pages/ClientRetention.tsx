import Header from "../components/layout/Header";
import KPICard from "../components/cards/KPICard";
import CohortHeatmap from "../components/charts/CohortHeatmap";
import data from "../data/retention.json";

export default function ClientRetention() {
  const { summary } = data;

  return (
    <div>
      <Header title="Client Retention" subtitle="Cohort analysis and lifetime value metrics" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard label="Total Clients" value={summary.total_customers.toLocaleString()} change={11.5} />
        <KPICard label="Repeat Rate" value={summary.repeat_rate.toFixed(1)} change={2.4} suffix="%" />
        <KPICard label="Avg LTV" value={`$${summary.avg_ltv.toLocaleString()}`} change={6.8} />
        <KPICard label="VIP Clients" value={summary.vip_pct.toFixed(1)} change={1.9} suffix="%" />
      </div>

      <div className="mb-6">
        <CohortHeatmap data={data.cohorts} />
      </div>

      <div className="bg-bg-card border border-border rounded-lg p-5">
        <h3 className="text-sm font-medium text-text-secondary mb-4">Retention Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-text-muted uppercase tracking-wider mb-1">First Purchase to Second</p>
            <p className="text-xl font-semibold text-gold">~41%</p>
            <p className="text-xs text-text-secondary mt-1">Average M1 retention across cohorts</p>
          </div>
          <div>
            <p className="text-xs text-text-muted uppercase tracking-wider mb-1">6-Month Retention</p>
            <p className="text-xl font-semibold text-gold">~19%</p>
            <p className="text-xs text-text-secondary mt-1">Customers active at M6</p>
          </div>
          <div>
            <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Best Performing Cohort</p>
            <p className="text-xl font-semibold text-gold">2024 Q4</p>
            <p className="text-xs text-text-secondary mt-1">44% M1 retention — holiday acquisition</p>
          </div>
        </div>
      </div>
    </div>
  );
}
