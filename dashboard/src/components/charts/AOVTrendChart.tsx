import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import type { AOVTrend } from "../../types";

interface Props {
  data: AOVTrend[];
}

export default function AOVTrendChart({ data }: Props) {
  return (
    <div className="bg-bg-card border border-border rounded-lg p-5">
      <h3 className="text-sm font-medium text-text-secondary mb-4">AOV Trend by Channel</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2E" />
          <XAxis dataKey="month" tick={{ fill: "#9A9A9E", fontSize: 11 }} />
          <YAxis tick={{ fill: "#9A9A9E", fontSize: 11 }} tickFormatter={(v) => `$${v}`} />
          <Tooltip
            contentStyle={{ backgroundColor: "#161618", border: "1px solid #2A2A2E", borderRadius: 8 }}
            labelStyle={{ color: "#F5F5F5" }}
            formatter={(value: number | undefined) => [`$${(value ?? 0).toFixed(0)}`, ""]}
          />
          <Legend wrapperStyle={{ fontSize: 12, color: "#9A9A9E" }} />
          <Line type="monotone" dataKey="boutique" name="Boutique" stroke="#C9A96E" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="ecommerce" name="E-Commerce" stroke="#818CF8" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="outlet" name="Outlet" stroke="#FB923C" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
