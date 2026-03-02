import { useState } from "react";
import Header from "../components/layout/Header";
import FilterBar from "../components/layout/FilterBar";
import KPICard from "../components/cards/KPICard";
import RevenueAreaChart from "../components/charts/RevenueAreaChart";
import RegionalBarChart from "../components/charts/RegionalBarChart";
import DonutChart from "../components/charts/DonutChart";
import { CategoryRevenueChart, CategoryMixChart } from "../components/charts/CategoryGrowthChart";
import data from "../data/executive.json";
import channelData from "../data/channels.json";
import type { CategoryGrowth, CategoryMixShare } from "../types";

const categoryGrowth = data.category_growth as CategoryGrowth[];
const categoryMix = data.category_mix_share as CategoryMixShare[];

const REGIONS = ["All", "North America", "Europe", "Asia Pacific", "Middle East"];

export default function ExecutiveOverview() {
  const [region, setRegion] = useState("All");

  const filteredRegions = region === "All"
    ? data.revenue_by_region
    : data.revenue_by_region.filter((r) => r.region === region);

  return (
    <div>
      <Header title="Executive Overview" subtitle="FY 2025 — All Channels" />
      <FilterBar regions={REGIONS} selected={region} onChange={setRegion} />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {data.kpis.map((kpi) => (
          <KPICard key={kpi.label} {...kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <RevenueAreaChart data={data.monthly_revenue} />
        <RegionalBarChart data={filteredRegions} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DonutChart data={channelData.channel_mix} />
        <div className="bg-bg-card border border-border rounded-lg p-5">
          <h3 className="text-sm font-medium text-text-secondary mb-4">Regional Performance</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-text-muted text-xs uppercase tracking-wider">
                <th className="text-left py-2">Region</th>
                <th className="text-right py-2">Revenue</th>
                <th className="text-right py-2">YoY</th>
                <th className="text-right py-2">% to Target</th>
              </tr>
            </thead>
            <tbody>
              {filteredRegions.map((r) => (
                <tr key={r.region} className="border-t border-border">
                  <td className="py-3 text-text-primary">{r.region}</td>
                  <td className="py-3 text-right text-text-primary">${(r.revenue / 1_000_000).toFixed(1)}M</td>
                  <td className={`py-3 text-right ${r.yoy_growth >= 0 ? "text-green" : "text-red"}`}>
                    {r.yoy_growth >= 0 ? "+" : ""}{r.yoy_growth}%
                  </td>
                  <td className={`py-3 text-right ${r.pct_to_target >= 100 ? "text-green" : "text-red"}`}>
                    {r.pct_to_target.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Category Penetration Section */}
      <h3 className="text-lg font-semibold text-text-primary mt-8 mb-4">Category Penetration</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryRevenueChart data={categoryGrowth} />
        <CategoryMixChart data={categoryMix} />
      </div>
    </div>
  );
}
