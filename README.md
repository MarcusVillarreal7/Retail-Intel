# Retail Intel — Omnichannel Retail Intelligence Dashboard

A full-stack analytics dashboard for luxury fashion retail, demonstrating SQL proficiency, data modeling, Python data generation, and React dashboard development. Designed around the business model of a high-growth luxury brand managing DTC expansion, wholesale door strategy, full-price integrity, and category diversification.

**All data is synthetic.** No real brands, customers, or proprietary information.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Database | PostgreSQL 16 (Docker) |
| Data Generation | Python, pandas, Faker |
| SQL Analytics | 9 standalone query files |
| Frontend | Vite + React 19 + TypeScript |
| Charts | Recharts (area, bar, composed, donut, heatmap) |
| Styling | Tailwind CSS v4 (dark luxury theme) |

## Dashboard Pages

### 1. Executive Overview
KPI cards (revenue, transactions, AOV, sell-through, margin, active clients), monthly revenue trend vs prior year, regional performance with filter, channel donut, and **category penetration charts** showing revenue trends and mix share shift across 5 categories over 8 quarters — Leather Goods growing from 8% to 17%.

### 2. Channel Mix
Channel revenue distribution (Boutique / E-Commerce / Outlet / Wholesale), AOV trends, sell-through rate matrix by channel × category, **full-price vs markdown analysis** with seasonal markdown pattern (Jul/Aug spikes), and **DTC mix trending** showing DTC share growing from 59% to 72% over 8 quarters.

### 3. Inventory & Aging
Age bucket analysis (0–30, 31–60, 61–90, 90+ days), dollar value at risk, detailed at-risk items table.

### 4. Client Retention
Cohort heatmap showing month-over-month retention, repeat purchase rate, average LTV, VIP concentration.

### 5. Wholesale Doors
Partner-level wholesale performance across 12 global doors (Bergdorf, Neiman, SSENSE, Saks, Harrods, Selfridges, Galeries Lafayette, Isetan, Harvey Nichols, Level Shoes, Dover Street Market, Matches Fashion). Color-coded horizontal bar chart by status (top / average / underperformer), detail table with sell-through, reorder rate, and YoY growth.

## Quick Start

### 1. Generate Data
```bash
pip install pandas faker
python data/generate_data.py
```

### 2. Start Database
```bash
docker-compose up -d
```

### 3. Run SQL Queries
```bash
psql -U analyst -d retail_intel -f sql/01_revenue_by_region.sql
```

### 4. Launch Dashboard
```bash
cd dashboard
npm install
npm run dev
```

## Project Structure

```
Retail-Intel/
├── data/
│   ├── generate_data.py       # Synthetic data generator (6 tables)
│   ├── seed.sql               # Schema + CSV import
│   └── csvs/                  # Generated CSV files
├── sql/                       # 9 standalone SQL analytics queries
├── dashboard/                 # Vite + React + TypeScript app
│   └── src/
│       ├── components/        # Layout, cards, charts (14 components)
│       ├── pages/             # 5 dashboard pages
│       └── data/              # Static JSON data files
├── docker-compose.yml
└── README.md
```

## SQL Queries

| # | File | Techniques |
|---|------|-----------|
| 1 | Revenue by Region | CTEs, YoY growth, % to target |
| 2 | Sell-Through by Channel | JOIN, GROUP BY, NULLIF |
| 3 | Inventory Aging | DISTINCT ON, CASE buckets, subquery |
| 4 | AOV by Channel | DATE_TRUNC, COUNT DISTINCT |
| 5 | Client Retention Cohorts | CTEs, window functions, AGE |
| 6 | Channel Revenue Mix | SUM OVER PARTITION BY |
| 7 | Wholesale Door Performance | CTEs, CASE status, FILTER, YoY |
| 8 | Full-Price vs Markdown | CASE WHEN price type, AVG depth |
| 9 | Category Penetration | LAG window function, QoQ growth, mix % |

## Data Model

- **Products**: 120 SKUs across 5 categories (RTW, Footwear, Leather Goods, Accessories, Denim)
- **Customers**: 8,000 with VIP tiers and regional distribution
- **Transactions**: 50,000 with channel, region, seasonal patterns, and discount tracking
- **Inventory**: ~1,440 monthly snapshots
- **Targets**: 64 region × channel × quarter targets
- **Wholesale Orders**: ~600 door-level shipments across 12 global partners
