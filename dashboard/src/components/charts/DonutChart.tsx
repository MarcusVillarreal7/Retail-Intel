import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { ChannelMixData } from "../../types";

interface Props {
  data: ChannelMixData[];
}

const COLORS = ["#C9A96E", "#818CF8", "#FB923C", "#4ADE80"];

export default function DonutChart({ data }: Props) {
  return (
    <div className="bg-bg-card border border-border rounded-lg p-5">
      <h3 className="text-sm font-medium text-text-secondary mb-4">Revenue by Channel</h3>
      <div className="flex items-center gap-6">
        <ResponsiveContainer width="50%" height={220}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="revenue"
              nameKey="channel"
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: "#161618", border: "1px solid #2A2A2E", borderRadius: 8 }}
              formatter={(value: number | undefined) => [`$${((value ?? 0) / 1_000_000).toFixed(2)}M`, ""]}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-col gap-3">
          {data.map((d, i) => (
            <div key={d.channel} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
              <span className="text-sm text-text-secondary">{d.channel}</span>
              <span className="text-sm font-medium text-text-primary ml-auto">{d.pct.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
