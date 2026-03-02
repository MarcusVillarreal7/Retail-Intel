import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import type { RevenueByRegion } from "../../types";

interface Props {
  data: RevenueByRegion[];
}

export default function RegionalBarChart({ data }: Props) {
  return (
    <div className="bg-bg-card border border-border rounded-lg p-5">
      <h3 className="text-sm font-medium text-text-secondary mb-4">Revenue by Region vs Target</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2E" />
          <XAxis dataKey="region" tick={{ fill: "#9A9A9E", fontSize: 11 }} />
          <YAxis tick={{ fill: "#9A9A9E", fontSize: 11 }} tickFormatter={(v) => `$${(v / 1_000_000).toFixed(0)}M`} />
          <Tooltip
            contentStyle={{ backgroundColor: "#161618", border: "1px solid #2A2A2E", borderRadius: 8 }}
            labelStyle={{ color: "#F5F5F5" }}
            formatter={(value: number) => [`$${(value / 1_000_000).toFixed(2)}M`, ""]}
          />
          <Bar dataKey="revenue" name="Actual" radius={[4, 4, 0, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.pct_to_target >= 100 ? "#4ADE80" : "#C9A96E"} />
            ))}
          </Bar>
          <Bar dataKey="target" name="Target" fill="#2A2A2E" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
