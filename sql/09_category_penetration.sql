/*
  Category Penetration & Mix Shift — LAG window function
  Business context: AMIRI is diversifying beyond RTW into Leather Goods.
  This query tracks category mix share over 8 quarters, highlighting
  Leather Goods' growth from ~8% to ~16% of total revenue.
*/

WITH quarterly_category AS (
    SELECT
        CONCAT(EXTRACT(YEAR FROM t.transaction_date)::TEXT, '-Q',
               EXTRACT(QUARTER FROM t.transaction_date)::TEXT) AS quarter,
        p.category,
        SUM(t.total_amount) AS category_revenue
    FROM transactions t
    JOIN products p ON p.product_id = t.product_id
    WHERE t.transaction_date >= '2024-01-01'
    GROUP BY
        EXTRACT(YEAR FROM t.transaction_date),
        EXTRACT(QUARTER FROM t.transaction_date),
        p.category
),

with_total AS (
    SELECT
        qc.*,
        SUM(category_revenue) OVER (PARTITION BY quarter) AS quarter_total
    FROM quarterly_category qc
),

with_growth AS (
    SELECT
        wt.quarter,
        wt.category,
        wt.category_revenue,
        ROUND(wt.category_revenue / NULLIF(wt.quarter_total, 0) * 100, 1)
            AS mix_pct,
        LAG(wt.category_revenue) OVER (
            PARTITION BY wt.category ORDER BY wt.quarter
        ) AS prev_quarter_revenue,
        ROUND(
            (wt.category_revenue - LAG(wt.category_revenue) OVER (
                PARTITION BY wt.category ORDER BY wt.quarter
            )) / NULLIF(
                LAG(wt.category_revenue) OVER (
                    PARTITION BY wt.category ORDER BY wt.quarter
                ), 0
            ) * 100, 1
        ) AS qoq_growth
    FROM with_total wt
)

SELECT
    quarter,
    category,
    category_revenue,
    mix_pct,
    qoq_growth
FROM with_growth
ORDER BY quarter, category;
