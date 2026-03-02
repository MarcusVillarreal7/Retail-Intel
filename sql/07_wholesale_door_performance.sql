/*
  Wholesale Door Performance — CTEs + CASE for status classification
  Business context: AMIRI manages ~50 wholesale doors globally.
  This query surfaces per-door sell-through and reorder rates so the
  wholesale team can decide which doors to expand or pull back from.
*/

WITH door_shipments AS (
    SELECT
        wo.door_name,
        wo.region,
        SUM(wo.units_shipped)                         AS total_shipped,
        SUM(wo.units_sold)                            AS total_sold,
        ROUND(SUM(wo.units_sold)::NUMERIC
              / NULLIF(SUM(wo.units_shipped), 0) * 100, 1) AS sell_through_pct,
        SUM(wo.wholesale_revenue)                     AS revenue
    FROM wholesale_orders wo
    WHERE wo.order_date >= '2025-01-01'
    GROUP BY wo.door_name, wo.region
),

reorders AS (
    SELECT
        door_name,
        COUNT(*) FILTER (WHERE is_reorder = TRUE)     AS reorder_count,
        COUNT(*)                                       AS total_orders,
        ROUND(
            COUNT(*) FILTER (WHERE is_reorder = TRUE)::NUMERIC
            / NULLIF(COUNT(*), 0) * 100, 1
        ) AS reorder_rate
    FROM wholesale_orders
    WHERE order_date >= '2025-01-01'
    GROUP BY door_name
),

yoy AS (
    SELECT
        door_name,
        SUM(CASE WHEN EXTRACT(YEAR FROM order_date) = 2025
                 THEN wholesale_revenue ELSE 0 END)   AS cy_rev,
        SUM(CASE WHEN EXTRACT(YEAR FROM order_date) = 2024
                 THEN wholesale_revenue ELSE 0 END)   AS py_rev
    FROM wholesale_orders
    GROUP BY door_name
)

SELECT
    ds.door_name,
    ds.region,
    ds.revenue,
    ds.total_shipped,
    ds.sell_through_pct,
    r.reorder_rate,
    ROUND((y.cy_rev - y.py_rev) / NULLIF(y.py_rev, 0) * 100, 1) AS yoy_growth,
    CASE
        WHEN ds.sell_through_pct >= 70 AND r.reorder_rate >= 75 THEN 'top'
        WHEN ds.sell_through_pct >= 60 AND r.reorder_rate >= 55 THEN 'average'
        ELSE 'underperformer'
    END AS status
FROM door_shipments ds
JOIN reorders r     ON r.door_name = ds.door_name
JOIN yoy y          ON y.door_name = ds.door_name
ORDER BY ds.revenue DESC;
