/*
  Revenue by Region — YoY Growth & % to Target
  Business context: Tracks regional revenue performance against targets,
  highlighting regions that are over/under-indexing.
*/

WITH current_year AS (
    SELECT
        region,
        SUM(total_amount) AS revenue
    FROM transactions
    WHERE transaction_date >= '2025-01-01'
      AND transaction_date < '2026-01-01'
    GROUP BY region
),
prior_year AS (
    SELECT
        region,
        SUM(total_amount) AS revenue
    FROM transactions
    WHERE transaction_date >= '2024-01-01'
      AND transaction_date < '2025-01-01'
    GROUP BY region
),
annual_targets AS (
    SELECT
        region,
        SUM(revenue_target) AS target
    FROM targets
    WHERE quarter LIKE '2025%'
    GROUP BY region
)
SELECT
    cy.region,
    cy.revenue,
    at.target,
    ROUND((cy.revenue - py.revenue) / py.revenue * 100, 1) AS yoy_growth,
    ROUND(cy.revenue / at.target * 100, 1) AS pct_to_target
FROM current_year cy
JOIN prior_year py ON cy.region = py.region
JOIN annual_targets at ON cy.region = at.region
ORDER BY cy.revenue DESC;
