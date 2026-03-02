import {
  ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import type { DTCMixTrend } from "../../types";

interface Props {
  data: DTCMixTrend[];
}

export default function DTCMixChart({ data }: Props) {
  return (
    <div className="bg-bg-card border border-border rounded-lg p-5">
      <h3 className="text-sm font-medium text-text-secondary mb-4">DTC vs Wholesale Mix Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2E" />
          <XAxis dataKey="quarter" tick={{ fill: "#9A9A9E", fontSize: 11 }} />
          <YAxis
            yAxisId="left"
            tick={{ fill: "#9A9A9E", fontSize: 11 }}
            tickFormatter={(v) => `$${(v / 1_000_000).toFixed(0)}M`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fill: "#9A9A9E", fontSize: 11 }}
            tickFormatter={(v) => `${v}%`}
            domain={[50, 80]}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#161618", border: "1px solid #2A2A2E", borderRadius: 8 }}
            labelStyle={{ color: "#F5F5F5" }}
            formatter={(value: number, name: string) =>
              name === "DTC %"
                ? [`${value.toFixed(1)}%`, name]
                : [`$${(value / 1_000_000).toFixed(2)}M`, name]
            }
          />
          <Legend wrapperStyle={{ fontSize: 12, color: "#9A9A9E" }} />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="dtc_revenue"
            name="DTC Revenue"
            stroke="#C9A96E"
            fill="#C9A96E"
            fillOpacity={0.15}
            stackId="rev"
          />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="wholesale_revenue"
            name="Wholesale Revenue"
            stroke="#6B6B70"
            fill="#6B6B70"
            fillOpacity={0.1}
            stackId="rev"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="dtc_pct"
            name="DTC %"
            stroke="#4ADE80"
            strokeWidth={2}
            dot={{ fill: "#4ADE80", r: 3 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
