/*
  Sell-Through Rate by Channel × Category
  Business context: Measures inventory efficiency — what percentage of
  received units actually sold. Low sell-through signals overbuying or
  weak product-market fit.
*/

SELECT
    t.channel,
    p.category,
    SUM(t.quantity)       AS units_sold,
    SUM(i.units_received) AS units_received,
    ROUND(
        SUM(t.quantity)::NUMERIC / NULLIF(SUM(i.units_received), 0) * 100,
        1
    ) AS sell_through_pct
FROM transactions t
JOIN products p ON t.product_id = p.product_id
JOIN inventory i ON i.product_id = p.product_id
    AND DATE_TRUNC('month', t.transaction_date) = i.snapshot_date
WHERE t.transaction_date >= '2025-01-01'
GROUP BY t.channel, p.category
ORDER BY t.channel, sell_through_pct DESC;
