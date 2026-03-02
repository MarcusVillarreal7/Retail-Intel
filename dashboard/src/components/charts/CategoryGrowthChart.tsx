import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import type { CategoryGrowth, CategoryMixShare } from "../../types";

const CATEGORY_COLORS: Record<string, string> = {
  rtw: "#C9A96E",
  footwear: "#4ADE80",
  leather_goods: "#60A5FA",
  accessories: "#A78BFA",
  denim: "#F87171",
};

const CATEGORY_LABELS: Record<string, string> = {
  rtw: "RTW",
  footwear: "Footwear",
  leather_goods: "Leather Goods",
  accessories: "Accessories",
  denim: "Denim",
};

interface GrowthProps {
  data: CategoryGrowth[];
}

export function CategoryRevenueChart({ data }: GrowthProps) {
  return (
    <div className="bg-bg-card border border-border rounded-lg p-5">
      <h3 className="text-sm font-medium text-text-secondary mb-4">Category Revenue Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2E" />
          <XAxis dataKey="quarter" tick={{ fill: "#9A9A9E", fontSize: 11 }} />
          <YAxis
            tick={{ fill: "#9A9A9E", fontSize: 11 }}
            tickFormatter={(v) => `$${(v / 1_000_000).toFixed(0)}M`}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#161618", border: "1px solid #2A2A2E", borderRadius: 8 }}
            labelStyle={{ color: "#F5F5F5" }}
            formatter={(value: number, name: string) => [`$${(value / 1_000_000).toFixed(2)}M`, name]}
          />
          <Legend wrapperStyle={{ fontSize: 12, color: "#9A9A9E" }} />
          {Object.keys(CATEGORY_COLORS).map((key) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              name={CATEGORY_LABELS[key]}
              stroke={CATEGORY_COLORS[key]}
              fill={CATEGORY_COLORS[key]}
              fillOpacity={0.1}
              strokeWidth={2}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

interface MixProps {
  data: CategoryMixShare[];
}

export function CategoryMixChart({ data }: MixProps) {
  return (
    <div className="bg-bg-card border border-border rounded-lg p-5">
      <h3 className="text-sm font-medium text-text-secondary mb-4">Category Mix Share Shift</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2E" />
          <XAxis dataKey="quarter" tick={{ fill: "#9A9A9E", fontSize: 11 }} />
          <YAxis
            tick={{ fill: "#9A9A9E", fontSize: 11 }}
            tickFormatter={(v) => `${v}%`}
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#161618", border: "1px solid #2A2A2E", borderRadius: 8 }}
            labelStyle={{ color: "#F5F5F5" }}
            formatter={(value: number, name: string) => [`${value.toFixed(1)}%`, name]}
          />
          <Legend wrapperStyle={{ fontSize: 12, color: "#9A9A9E" }} />
          {Object.keys(CATEGORY_COLORS).map((key) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              name={CATEGORY_LABELS[key]}
              stroke={CATEGORY_COLORS[key]}
              fill={CATEGORY_COLORS[key]}
              fillOpacity={0.3}
              stackId="mix"
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
