/*
  Client Retention Cohorts
  Business context: The most complex query — tracks how many customers
  from each acquisition cohort return in subsequent months. High early
  retention (M1–M3) is the strongest predictor of LTV in luxury retail.

  Techniques: CTEs, DATE_TRUNC, window functions, CROSS JOIN for month grid.
*/

WITH customer_first_purchase AS (
    SELECT
        customer_id,
        DATE_TRUNC('quarter', MIN(transaction_date))::DATE AS cohort_quarter,
        MIN(transaction_date) AS first_purchase_date
    FROM transactions
    GROUP BY customer_id
),
cohort_sizes AS (
    SELECT
        cohort_quarter,
        COUNT(DISTINCT customer_id) AS cohort_size
    FROM customer_first_purchase
    GROUP BY cohort_quarter
),
monthly_activity AS (
    SELECT
        cfp.customer_id,
        cfp.cohort_quarter,
        -- Months since first purchase
        EXTRACT(YEAR FROM AGE(DATE_TRUNC('month', t.transaction_date), cfp.cohort_quarter)) * 12
        + EXTRACT(MONTH FROM AGE(DATE_TRUNC('month', t.transaction_date), cfp.cohort_quarter))
        AS months_since_cohort
    FROM transactions t
    JOIN customer_first_purchase cfp ON t.customer_id = cfp.customer_id
),
retention_counts AS (
    SELECT
        cohort_quarter,
        months_since_cohort,
        COUNT(DISTINCT customer_id) AS active_customers
    FROM monthly_activity
    WHERE months_since_cohort >= 0
    GROUP BY cohort_quarter, months_since_cohort
)
SELECT
    TO_CHAR(rc.cohort_quarter, 'YYYY "Q"Q') AS cohort,
    rc.months_since_cohort,
    rc.active_customers,
    cs.cohort_size,
    ROUND(rc.active_customers::NUMERIC / cs.cohort_size * 100, 1) AS retention_pct
FROM retention_counts rc
JOIN cohort_sizes cs ON rc.cohort_quarter = cs.cohort_quarter
WHERE rc.months_since_cohort <= 12
ORDER BY rc.cohort_quarter, rc.months_since_cohort;
