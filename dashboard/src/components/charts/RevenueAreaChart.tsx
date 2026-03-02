import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import type { MonthlyRevenue } from "../../types";

interface Props {
  data: MonthlyRevenue[];
}

export default function RevenueAreaChart({ data }: Props) {
  return (
    <div className="bg-bg-card border border-border rounded-lg p-5">
      <h3 className="text-sm font-medium text-text-secondary mb-4">Monthly Revenue Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2E" />
          <XAxis dataKey="month" tick={{ fill: "#9A9A9E", fontSize: 11 }} />
          <YAxis tick={{ fill: "#9A9A9E", fontSize: 11 }} tickFormatter={(v) => `$${(v / 1_000_000).toFixed(1)}M`} />
          <Tooltip
            contentStyle={{ backgroundColor: "#161618", border: "1px solid #2A2A2E", borderRadius: 8 }}
            labelStyle={{ color: "#F5F5F5" }}
            formatter={(value: number | undefined) => [`$${((value ?? 0) / 1_000_000).toFixed(2)}M`, ""]}
          />
          <Legend wrapperStyle={{ fontSize: 12, color: "#9A9A9E" }} />
          <Area type="monotone" dataKey="revenue" name="FY 2025" stroke="#C9A96E" fill="#C9A96E" fillOpacity={0.15} strokeWidth={2} />
          <Area type="monotone" dataKey="prior_year" name="FY 2024" stroke="#6B6B70" fill="#6B6B70" fillOpacity={0.05} strokeWidth={1.5} strokeDasharray="4 4" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
