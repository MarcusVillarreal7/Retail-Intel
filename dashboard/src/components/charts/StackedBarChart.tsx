import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import type { FullPriceMarkdown } from "../../types";

interface Props {
  data: FullPriceMarkdown[];
}

export default function StackedBarChart({ data }: Props) {
  return (
    <div className="bg-bg-card border border-border rounded-lg p-5">
      <h3 className="text-sm font-medium text-text-secondary mb-4">Full-Price vs Markdown Revenue</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2E" />
          <XAxis dataKey="month" tick={{ fill: "#9A9A9E", fontSize: 11 }} />
          <YAxis
            tick={{ fill: "#9A9A9E", fontSize: 11 }}
            tickFormatter={(v) => `$${(v / 1_000_000).toFixed(1)}M`}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#161618", border: "1px solid #2A2A2E", borderRadius: 8 }}
            labelStyle={{ color: "#F5F5F5" }}
            formatter={(value: number | undefined) => [`$${((value ?? 0) / 1_000_000).toFixed(2)}M`, ""]}
          />
          <Legend wrapperStyle={{ fontSize: 12, color: "#9A9A9E" }} />
          <Bar dataKey="full_price_revenue" name="Full Price" stackId="a" fill="#C9A96E" radius={[0, 0, 0, 0]} />
          <Bar dataKey="markdown_revenue" name="Markdown" stackId="a" fill="#F87171" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
