import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import type { WholesaleDoor } from "../../types";

interface Props {
  data: WholesaleDoor[];
}

const STATUS_COLORS: Record<string, string> = {
  top: "#4ADE80",
  average: "#C9A96E",
  underperformer: "#F87171",
};

export default function DoorPerformanceChart({ data }: Props) {
  const sorted = [...data].sort((a, b) => b.revenue - a.revenue);

  return (
    <div className="bg-bg-card border border-border rounded-lg p-5">
      <h3 className="text-sm font-medium text-text-secondary mb-1">Wholesale Door Revenue</h3>
      <p className="text-xs text-text-muted mb-4">
        <span className="inline-block w-2 h-2 rounded-full bg-green mr-1" />Top
        <span className="inline-block w-2 h-2 rounded-full bg-gold ml-3 mr-1" />Average
        <span className="inline-block w-2 h-2 rounded-full bg-red ml-3 mr-1" />Underperformer
      </p>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={sorted} layout="vertical" margin={{ left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2E" horizontal={false} />
          <XAxis
            type="number"
            tick={{ fill: "#9A9A9E", fontSize: 11 }}
            tickFormatter={(v) => `$${(v / 1_000_000).toFixed(1)}M`}
          />
          <YAxis
            type="category"
            dataKey="door"
            tick={{ fill: "#9A9A9E", fontSize: 11 }}
            width={140}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#161618", border: "1px solid #2A2A2E", borderRadius: 8 }}
            labelStyle={{ color: "#F5F5F5" }}
            formatter={(value: number) => [`$${(value / 1_000_000).toFixed(2)}M`, "Revenue"]}
          />
          <Bar dataKey="revenue" radius={[0, 4, 4, 0]}>
            {sorted.map((entry, i) => (
              <Cell key={i} fill={STATUS_COLORS[entry.status]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
