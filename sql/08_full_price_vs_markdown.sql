/*
  Full-Price vs Markdown Split — CASE WHEN price classification
  Business context: Luxury brands protect full-price integrity.
  AMIRI targets >85% full-price sell-through, with markdown depth
  kept under 10% except during end-of-season (Jul/Aug).
*/

SELECT
    TO_CHAR(t.transaction_date, 'Mon') AS month,
    EXTRACT(MONTH FROM t.transaction_date) AS month_num,
    SUM(CASE WHEN t.discount_pct = 0 THEN t.total_amount ELSE 0 END)
        AS full_price_revenue,
    SUM(CASE WHEN t.discount_pct > 0 THEN t.total_amount ELSE 0 END)
        AS markdown_revenue,
    ROUND(
        SUM(CASE WHEN t.discount_pct > 0 THEN t.total_amount ELSE 0 END)::NUMERIC
        / NULLIF(SUM(t.total_amount), 0) * 100, 1
    ) AS markdown_pct,
    ROUND(
        AVG(CASE WHEN t.discount_pct > 0 THEN t.discount_pct END), 1
    ) AS avg_markdown_depth
FROM transactions t
WHERE t.transaction_date >= '2025-01-01'
  AND t.channel IN ('Boutique', 'E-Commerce')   -- DTC channels only
GROUP BY
    TO_CHAR(t.transaction_date, 'Mon'),
    EXTRACT(MONTH FROM t.transaction_date)
ORDER BY month_num;
