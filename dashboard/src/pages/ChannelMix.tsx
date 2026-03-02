import Header from "../components/layout/Header";
import KPICard from "../components/cards/KPICard";
import AOVTrendChart from "../components/charts/AOVTrendChart";
import DonutChart from "../components/charts/DonutChart";
import StackedBarChart from "../components/charts/StackedBarChart";
import DTCMixChart from "../components/charts/DTCMixChart";
import data from "../data/channels.json";
import type { FullPriceMarkdown, DTCMixTrend } from "../types";

const fullPriceData = data.full_price_markdown as FullPriceMarkdown[];
const dtcData = data.dtc_mix as DTCMixTrend[];

const totalRev = fullPriceData.reduce((s, r) => s + r.full_price_revenue + r.markdown_revenue, 0);
const totalFP = fullPriceData.reduce((s, r) => s + r.full_price_revenue, 0);
const fpPct = ((totalFP / totalRev) * 100).toFixed(1);
const avgSellThrough = "74.6";
const avgMarkdownDepth = (fullPriceData.reduce((s, r) => s + r.markdown_depth, 0) / fullPriceData.length).toFixed(1);

export default function ChannelMix() {
  return (
    <div>
      <Header title="Channel Mix" subtitle="Revenue distribution and AOV trends across channels" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {data.channel_mix.map((ch) => (
          <KPICard
            key={ch.channel}
            label={ch.channel}
            value={`$${(ch.revenue / 1_000_000).toFixed(1)}M`}
            change={ch.pct}
            suffix=""
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <DonutChart data={data.channel_mix} />
        <AOVTrendChart data={data.aov_trend} />
      </div>

      <div className="bg-bg-card border border-border rounded-lg p-5">
        <h3 className="text-sm font-medium text-text-secondary mb-4">Sell-Through Rate by Channel &times; Category</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-text-muted text-xs uppercase tracking-wider">
              <th className="text-left py-2">Channel</th>
              <th className="text-left py-2">Category</th>
              <th className="text-right py-2">Units Sold</th>
              <th className="text-right py-2">Units Received</th>
              <th className="text-right py-2">Sell-Through %</th>
            </tr>
          </thead>
          <tbody>
            {data.sell_through.map((row, i) => (
              <tr key={i} className="border-t border-border">
                <td className="py-2 text-text-primary">{row.channel}</td>
                <td className="py-2 text-text-secondary">{row.category}</td>
                <td className="py-2 text-right text-text-primary">{row.units_sold.toLocaleString()}</td>
                <td className="py-2 text-right text-text-secondary">{row.units_received.toLocaleString()}</td>
                <td className={`py-2 text-right font-medium ${row.sell_through_pct >= 70 ? "text-green" : row.sell_through_pct >= 60 ? "text-gold" : "text-red"}`}>
                  {row.sell_through_pct.toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Full-Price vs Markdown Section */}
      <h3 className="text-lg font-semibold text-text-primary mt-8 mb-4">Full-Price Integrity</h3>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <KPICard label="Full-Price Revenue %" value={fpPct} change={2.1} suffix="%" />
        <KPICard label="Avg Full-Price Sell-Through" value={avgSellThrough} change={3.4} suffix="%" />
        <KPICard label="Avg Markdown Depth" value={avgMarkdownDepth} change={-1.8} suffix="%" />
      </div>
      <div className="mb-6">
        <StackedBarChart data={fullPriceData} />
      </div>

      {/* DTC Mix Trending Section */}
      <h3 className="text-lg font-semibold text-text-primary mt-8 mb-4">DTC Mix Trending</h3>
      <div className="mb-6">
        <DTCMixChart data={dtcData} />
      </div>
    </div>
  );
}
