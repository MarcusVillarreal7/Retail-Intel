/*
  Average Order Value by Channel — Monthly Trend
  Business context: AOV is a key health metric. Boutique should index
  highest; declining AOV in any channel signals discounting pressure
  or product mix shift.
*/

SELECT
    DATE_TRUNC('month', transaction_date)::DATE AS month,
    channel,
    ROUND(
        SUM(total_amount) / COUNT(DISTINCT transaction_id),
        0
    ) AS aov,
    COUNT(DISTINCT transaction_id) AS transactions,
    SUM(total_amount) AS revenue
FROM transactions
WHERE transaction_date >= '2025-01-01'
GROUP BY DATE_TRUNC('month', transaction_date), channel
ORDER BY month, channel;
