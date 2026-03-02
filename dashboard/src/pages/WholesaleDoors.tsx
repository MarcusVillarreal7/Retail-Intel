import Header from "../components/layout/Header";
import KPICard from "../components/cards/KPICard";
import DoorPerformanceChart from "../components/charts/DoorPerformanceChart";
import data from "../data/wholesale.json";
import type { WholesaleDoor } from "../types";

const doors = data.doors as WholesaleDoor[];

export default function WholesaleDoors() {
  return (
    <div>
      <Header title="Wholesale Doors" subtitle="Partner-level performance across global wholesale network" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {data.kpis.map((kpi) => (
          <KPICard key={kpi.label} {...kpi} />
        ))}
      </div>

      <div className="mb-6">
        <DoorPerformanceChart data={doors} />
      </div>

      <div className="bg-bg-card border border-border rounded-lg p-5">
        <h3 className="text-sm font-medium text-text-secondary mb-4">Door Detail</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-text-muted text-xs uppercase tracking-wider">
              <th className="text-left py-2">Door</th>
              <th className="text-left py-2">Region</th>
              <th className="text-right py-2">Revenue</th>
              <th className="text-right py-2">Units</th>
              <th className="text-right py-2">Sell-Through</th>
              <th className="text-right py-2">Reorder Rate</th>
              <th className="text-right py-2">YoY</th>
              <th className="text-right py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {doors.map((d) => (
              <tr key={d.door} className="border-t border-border">
                <td className="py-3 text-text-primary font-medium">{d.door}</td>
                <td className="py-3 text-text-secondary">{d.region}</td>
                <td className="py-3 text-right text-text-primary">${(d.revenue / 1_000_000).toFixed(2)}M</td>
                <td className="py-3 text-right text-text-secondary">{d.units_shipped.toLocaleString()}</td>
                <td className={`py-3 text-right font-medium ${d.sell_through_pct >= 70 ? "text-green" : d.sell_through_pct >= 60 ? "text-gold" : "text-red"}`}>
                  {d.sell_through_pct.toFixed(1)}%
                </td>
                <td className={`py-3 text-right ${d.reorder_rate >= 75 ? "text-green" : d.reorder_rate >= 60 ? "text-gold" : "text-red"}`}>
                  {d.reorder_rate.toFixed(0)}%
                </td>
                <td className={`py-3 text-right ${d.yoy_growth >= 0 ? "text-green" : "text-red"}`}>
                  {d.yoy_growth >= 0 ? "+" : ""}{d.yoy_growth.toFixed(1)}%
                </td>
                <td className="py-3 text-right">
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                    d.status === "top" ? "bg-green/15 text-green" :
                    d.status === "average" ? "bg-gold/15 text-gold" :
                    "bg-red/15 text-red"
                  }`}>
                    {d.status === "top" ? "Top" : d.status === "average" ? "Avg" : "Under"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
