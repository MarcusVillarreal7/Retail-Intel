export interface KPI {
  label: string;
  value: string;
  change: number;
  prefix?: string;
  suffix?: string;
}

export interface RevenueByRegion {
  region: string;
  revenue: number;
  target: number;
  yoy_growth: number;
  pct_to_target: number;
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  prior_year: number;
}

export interface ChannelMixData {
  channel: string;
  revenue: number;
  pct: number;
  aov: number;
  transactions: number;
}

export interface AOVTrend {
  month: string;
  boutique: number;
  ecommerce: number;
  outlet: number;
}

export interface SellThrough {
  channel: string;
  category: string;
  units_sold: number;
  units_received: number;
  sell_through_pct: number;
}

export interface InventoryAging {
  bucket: string;
  units: number;
  value_at_risk: number;
  pct_of_total: number;
}

export interface InventoryDetail {
  product_name: string;
  category: string;
  days_on_hand: number;
  units: number;
  retail_value: number;
}

export interface CohortRow {
  cohort: string;
  months: number[];
}

export interface RetentionSummary {
  total_customers: number;
  repeat_rate: number;
  avg_ltv: number;
  vip_pct: number;
}

export interface WholesaleDoor {
  door: string;
  region: string;
  revenue: number;
  units_shipped: number;
  sell_through_pct: number;
  reorder_rate: number;
  yoy_growth: number;
  status: "top" | "average" | "underperformer";
}

export interface FullPriceMarkdown {
  month: string;
  full_price_revenue: number;
  markdown_revenue: number;
  markdown_depth: number;
}

export interface CategoryGrowth {
  quarter: string;
  rtw: number;
  footwear: number;
  leather_goods: number;
  accessories: number;
  denim: number;
}

export interface CategoryMixShare {
  quarter: string;
  rtw: number;
  footwear: number;
  leather_goods: number;
  accessories: number;
  denim: number;
}

export interface DTCMixTrend {
  quarter: string;
  dtc_revenue: number;
  wholesale_revenue: number;
  dtc_pct: number;
}
