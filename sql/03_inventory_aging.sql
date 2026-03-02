/*
  Inventory Aging — Bucketed by Days, Dollar Value at Risk
  Business context: Aging inventory erodes margin through markdowns.
  Items 90+ days are candidates for outlet transfer or markdown events.
*/

WITH latest_snapshot AS (
    SELECT DISTINCT ON (product_id)
        product_id,
        units_on_hand,
        days_on_hand
    FROM inventory
    ORDER BY product_id, snapshot_date DESC
)
SELECT
    CASE
        WHEN ls.days_on_hand <= 30  THEN '0-30 days'
        WHEN ls.days_on_hand <= 60  THEN '31-60 days'
        WHEN ls.days_on_hand <= 90  THEN '61-90 days'
        ELSE '90+ days'
    END AS bucket,
    SUM(ls.units_on_hand) AS units,
    SUM(ls.units_on_hand * p.retail_price) AS value_at_risk,
    ROUND(
        SUM(ls.units_on_hand)::NUMERIC /
        (SELECT SUM(units_on_hand) FROM latest_snapshot) * 100,
        1
    ) AS pct_of_total
FROM latest_snapshot ls
JOIN products p ON ls.product_id = p.product_id
GROUP BY bucket
ORDER BY
    CASE bucket
        WHEN '0-30 days'  THEN 1
        WHEN '31-60 days' THEN 2
        WHEN '61-90 days' THEN 3
        ELSE 4
    END;
