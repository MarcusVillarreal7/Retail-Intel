/*
  Channel Revenue Mix — SUM OVER PARTITION
  Business context: Shows each channel's share of total revenue.
  Luxury brands typically target ~50% boutique, 25-30% digital,
  with outlet kept below 20% to protect brand equity.
*/

SELECT
    channel,
    SUM(total_amount) AS channel_revenue,
    SUM(SUM(total_amount)) OVER () AS total_revenue,
    ROUND(
        SUM(total_amount) / SUM(SUM(total_amount)) OVER () * 100,
        1
    ) AS revenue_pct,
    COUNT(DISTINCT transaction_id) AS transactions,
    ROUND(
        SUM(total_amount) / COUNT(DISTINCT transaction_id),
        0
    ) AS aov
FROM transactions
WHERE transaction_date >= '2025-01-01'
GROUP BY channel
ORDER BY channel_revenue DESC;
