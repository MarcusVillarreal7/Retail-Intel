import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import type { InventoryAging } from "../../types";

interface Props {
  data: InventoryAging[];
}

const BUCKET_COLORS: Record<string, string> = {
  "0-30 days": "#4ADE80",
  "31-60 days": "#C9A96E",
  "61-90 days": "#FB923C",
  "90+ days": "#F87171",
};

export default function AgingBarChart({ data }: Props) {
  return (
    <div className="bg-bg-card border border-border rounded-lg p-5">
      <h3 className="text-sm font-medium text-text-secondary mb-4">Inventory Aging — Dollar Value at Risk</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2E" />
          <XAxis dataKey="bucket" tick={{ fill: "#9A9A9E", fontSize: 11 }} />
          <YAxis tick={{ fill: "#9A9A9E", fontSize: 11 }} tickFormatter={(v) => `$${(v / 1_000_000).toFixed(1)}M`} />
          <Tooltip
            contentStyle={{ backgroundColor: "#161618", border: "1px solid #2A2A2E", borderRadius: 8 }}
            labelStyle={{ color: "#F5F5F5" }}
            formatter={(value: number) => [`$${(value / 1_000).toFixed(0)}K`, "Value at Risk"]}
          />
          <Bar dataKey="value_at_risk" radius={[4, 4, 0, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={BUCKET_COLORS[entry.bucket] || "#C9A96E"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
