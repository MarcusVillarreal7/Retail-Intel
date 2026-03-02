-- Retail Intel — Schema Creation & CSV Import
-- Run: psql -U analyst -d retail_intel -f seed.sql

DROP TABLE IF EXISTS wholesale_orders CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS inventory CASCADE;
DROP TABLE IF EXISTS targets CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS products CASCADE;

-- Products
CREATE TABLE products (
    product_id    INT PRIMARY KEY,
    product_name  VARCHAR(100) NOT NULL,
    category      VARCHAR(50)  NOT NULL,
    retail_price  NUMERIC(10,2) NOT NULL,
    cost_price    NUMERIC(10,2) NOT NULL
);

-- Customers
CREATE TABLE customers (
    customer_id   INT PRIMARY KEY,
    first_name    VARCHAR(50)  NOT NULL,
    last_name     VARCHAR(50)  NOT NULL,
    email         VARCHAR(150) UNIQUE NOT NULL,
    region        VARCHAR(50)  NOT NULL,
    vip_tier      VARCHAR(20)  NOT NULL,
    signup_date   DATE         NOT NULL
);

-- Transactions
CREATE TABLE transactions (
    transaction_id   INT PRIMARY KEY,
    customer_id      INT REFERENCES customers(customer_id),
    product_id       INT REFERENCES products(product_id),
    transaction_date DATE         NOT NULL,
    channel          VARCHAR(30)  NOT NULL,
    region           VARCHAR(50)  NOT NULL,
    quantity         INT          NOT NULL,
    unit_price       NUMERIC(10,2) NOT NULL,
    total_amount     NUMERIC(12,2) NOT NULL,
    discount_pct     NUMERIC(5,1)  NOT NULL DEFAULT 0
);

-- Inventory snapshots
CREATE TABLE inventory (
    snapshot_id    INT PRIMARY KEY,
    product_id     INT REFERENCES products(product_id),
    snapshot_date  DATE NOT NULL,
    units_received INT  NOT NULL,
    units_sold     INT  NOT NULL,
    units_on_hand  INT  NOT NULL,
    days_on_hand   INT  NOT NULL
);

-- Revenue targets
CREATE TABLE targets (
    target_id      INT PRIMARY KEY,
    region         VARCHAR(50) NOT NULL,
    channel        VARCHAR(30) NOT NULL,
    quarter        VARCHAR(10) NOT NULL,
    revenue_target NUMERIC(12,2) NOT NULL
);

-- Wholesale orders
CREATE TABLE wholesale_orders (
    order_id          INT PRIMARY KEY,
    door_name         VARCHAR(100) NOT NULL,
    region            VARCHAR(50)  NOT NULL,
    product_id        INT REFERENCES products(product_id),
    order_date        DATE         NOT NULL,
    units_shipped     INT          NOT NULL,
    units_sold        INT          NOT NULL,
    wholesale_revenue NUMERIC(12,2) NOT NULL,
    is_reorder        BOOLEAN      NOT NULL DEFAULT FALSE
);

-- Load CSVs (paths relative to Docker mount)
COPY products    FROM '/data/csvs/products.csv'     CSV HEADER;
COPY customers   FROM '/data/csvs/customers.csv'    CSV HEADER;
COPY transactions FROM '/data/csvs/transactions.csv' CSV HEADER;
COPY inventory   FROM '/data/csvs/inventory.csv'    CSV HEADER;
COPY targets     FROM '/data/csvs/targets.csv'      CSV HEADER;

COPY wholesale_orders FROM '/data/csvs/wholesale_orders.csv' CSV HEADER;

-- Indexes for query performance
CREATE INDEX idx_txn_date    ON transactions(transaction_date);
CREATE INDEX idx_txn_channel ON transactions(channel);
CREATE INDEX idx_txn_region  ON transactions(region);
CREATE INDEX idx_txn_cust    ON transactions(customer_id);
CREATE INDEX idx_inv_product ON inventory(product_id);
CREATE INDEX idx_inv_date    ON inventory(snapshot_date);
CREATE INDEX idx_wo_door     ON wholesale_orders(door_name);
CREATE INDEX idx_wo_date     ON wholesale_orders(order_date);
