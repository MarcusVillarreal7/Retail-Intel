import Header from "../components/layout/Header";
import KPICard from "../components/cards/KPICard";
import AgingBarChart from "../components/charts/AgingBarChart";
import data from "../data/inventory.json";

export default function InventoryAging() {
  const totalUnits = data.aging.reduce((s, a) => s + a.units, 0);
  const totalValue = data.aging.reduce((s, a) => s + a.value_at_risk, 0);
  const aged90 = data.aging.find((a) => a.bucket === "90+ days");

  return (
    <div>
      <Header title="Inventory & Aging" subtitle="Inventory health and aging risk analysis" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard label="Total Units" value={totalUnits.toLocaleString()} change={-3.2} />
        <KPICard label="Total Value" value={`$${(totalValue / 1_000_000).toFixed(1)}M`} change={-2.1} />
        <KPICard label="90+ Day Units" value={(aged90?.units || 0).toLocaleString()} change={-8.5} />
        <KPICard label="90+ Day Value" value={`$${((aged90?.value_at_risk || 0) / 1_000_000).toFixed(1)}M`} change={-12.0} />
      </div>

      <div className="mb-6">
        <AgingBarChart data={data.aging} />
      </div>

      <div className="bg-bg-card border border-border rounded-lg p-5">
        <h3 className="text-sm font-medium text-text-secondary mb-4">Top At-Risk Items (90+ Days)</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-text-muted text-xs uppercase tracking-wider">
              <th className="text-left py-2">Product</th>
              <th className="text-left py-2">Category</th>
              <th className="text-right py-2">Days on Hand</th>
              <th className="text-right py-2">Units</th>
              <th className="text-right py-2">Retail Value</th>
            </tr>
          </thead>
          <tbody>
            {data.at_risk_items.map((item) => (
              <tr key={item.product_name} className="border-t border-border">
                <td className="py-3 text-text-primary">{item.product_name}</td>
                <td className="py-3 text-text-secondary">{item.category}</td>
                <td className="py-3 text-right text-red">{item.days_on_hand}</td>
                <td className="py-3 text-right text-text-primary">{item.units}</td>
                <td className="py-3 text-right text-text-primary">${item.retail_value.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
