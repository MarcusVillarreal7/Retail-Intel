"""
Retail Intel — Synthetic Data Generator
Generates realistic luxury fashion retail data for analytics dashboard.
All data is synthetic. No real brands or customers.
"""

import os
import random
from datetime import datetime, timedelta

import pandas as pd
from faker import Faker

fake = Faker()
Faker.seed(42)
random.seed(42)

OUT_DIR = os.path.join(os.path.dirname(__file__), "csvs")
os.makedirs(OUT_DIR, exist_ok=True)

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------
CATEGORIES = {
    "RTW": {
        "names": [
            "Oversized Cashmere Coat", "Structured Blazer", "Silk Evening Gown",
            "Wide Leg Trouser", "Cropped Wool Jacket", "Draped Midi Dress",
            "Tailored Vest", "Pleated Maxi Skirt", "Knit Polo Shirt",
            "Double-Breasted Overcoat", "Linen Camp Shirt", "Relaxed Chino",
            "Merino Turtleneck", "Quilted Gilet", "Wrap Blouse",
            "Satin Slip Dress", "Tweed Crop Top", "Cargo Trouser",
            "Mohair Cardigan", "Sheer Panel Shirt", "Ponte Legging",
            "Neoprene Bomber", "Sequin Mini Dress", "Utility Jumpsuit",
        ],
        "price_range": (590, 3490),
    },
    "Footwear": {
        "names": [
            "Leather Low-Top Sneaker", "Suede Chelsea Boot", "Platform Loafer",
            "Ankle Strap Sandal", "Lug Sole Derby", "Knit Runner",
            "Leather Mule", "Western Boot", "Ballet Flat",
            "Hiking Boot", "Leather Slide", "Canvas High-Top",
            "Patent Oxford", "Woven Espadrille", "Sock Sneaker",
            "Chain Loafer", "Zip Ankle Boot", "Raffia Sandal",
            "Combat Boot", "Velvet Slipper", "Sport Clog",
            "Studded Flat", "Shearling Boot", "Mesh Running Shoe",
        ],
        "price_range": (490, 1890),
    },
    "Leather Goods": {
        "names": [
            "Embossed Leather Tote", "Mini Crossbody Bag", "Structured Satchel",
            "Woven Clutch", "Leather Backpack", "Chain Strap Shoulder Bag",
            "Envelope Wallet", "Duffle Bag", "Belt Bag",
            "Document Holder", "Card Case", "Phone Pouch",
            "Bucket Bag", "Frame Bag", "Hobo Bag",
            "Camera Bag", "Zip Pouch", "Trunk Case",
            "Flap Crossbody", "Tote Insert", "Travel Wallet",
            "Key Holder", "Coin Purse", "Laptop Sleeve",
        ],
        "price_range": (390, 2990),
    },
    "Accessories": {
        "names": [
            "Crystal Buckle Belt", "Silk Scarf", "Leather Gloves",
            "Aviator Sunglasses", "Knit Beanie", "Enamel Cuff",
            "Cashmere Wrap", "Logo Cap", "Chain Necklace",
            "Signet Ring", "Wool Fedora", "Pocket Square",
            "Leather Watch Strap", "Tie Bar", "Hair Clip Set",
            "Bead Bracelet", "Satin Headband", "Brooch Pin",
            "Oversized Earring", "Woven Belt", "Visor Hat",
            "Anklet Chain", "Phone Case", "Keychain Charm",
        ],
        "price_range": (290, 990),
    },
    "Denim": {
        "names": [
            "Distressed Slim Jean", "Wide Leg Denim", "Selvedge Straight Jean",
            "Cropped Denim Jacket", "Denim Midi Skirt", "Relaxed Boyfriend Jean",
            "High-Rise Flare", "Denim Overshirt", "Baggy Carpenter Jean",
            "Trucker Jacket", "Denim Shorts", "Skinny Jean",
            "Denim Jumpsuit", "Boot Cut Jean", "Raw Hem Jean",
            "Denim Vest", "Patchwork Jean", "Zip-Off Jean",
            "Coated Denim", "Stretch Slim Jean", "Denim Maxi Skirt",
            "Bleached Jean", "Denim Corset Top", "Utility Denim Short",
        ],
        "price_range": (390, 1290),
    },
}

REGIONS = ["North America", "Europe", "Asia Pacific", "Middle East"]
CHANNELS = ["Boutique", "E-Commerce", "Outlet", "Wholesale"]
VIP_TIERS = ["Standard", "Silver", "Gold", "Platinum"]
REGION_WEIGHTS = [0.39, 0.31, 0.20, 0.10]
CHANNEL_WEIGHTS = [0.42, 0.32, 0.18, 0.08]
SEASON_MULTIPLIERS = {
    1: 0.88, 2: 0.85, 3: 0.95, 4: 0.92,
    5: 1.00, 6: 1.08, 7: 0.90, 8: 0.86,
    9: 1.02, 10: 1.10, 11: 1.25, 12: 1.15,
}

# ---------------------------------------------------------------------------
# 1. Products  (120 rows)
# ---------------------------------------------------------------------------
def generate_products() -> pd.DataFrame:
    rows = []
    pid = 1
    for category, info in CATEGORIES.items():
        for name in info["names"]:
            price = random.randint(info["price_range"][0] // 10, info["price_range"][1] // 10) * 10
            cost = round(price * random.uniform(0.28, 0.38), 2)
            rows.append({
                "product_id": pid,
                "product_name": name,
                "category": category,
                "retail_price": price,
                "cost_price": cost,
            })
            pid += 1
    df = pd.DataFrame(rows)
    df.to_csv(os.path.join(OUT_DIR, "products.csv"), index=False)
    print(f"  products.csv — {len(df)} rows")
    return df


# ---------------------------------------------------------------------------
# 2. Customers  (8,000 rows)
# ---------------------------------------------------------------------------
def generate_customers() -> pd.DataFrame:
    rows = []
    for cid in range(1, 8001):
        tier_roll = random.random()
        if tier_roll < 0.60:
            tier = "Standard"
        elif tier_roll < 0.82:
            tier = "Silver"
        elif tier_roll < 0.94:
            tier = "Gold"
        else:
            tier = "Platinum"
        rows.append({
            "customer_id": cid,
            "first_name": fake.first_name(),
            "last_name": fake.last_name(),
            "email": fake.unique.email(),
            "region": random.choices(REGIONS, weights=REGION_WEIGHTS, k=1)[0],
            "vip_tier": tier,
            "signup_date": fake.date_between(start_date="-3y", end_date="today"),
        })
    df = pd.DataFrame(rows)
    df.to_csv(os.path.join(OUT_DIR, "customers.csv"), index=False)
    print(f"  customers.csv — {len(df)} rows")
    return df


# ---------------------------------------------------------------------------
# 3. Transactions  (50,000 rows)
# ---------------------------------------------------------------------------
def generate_transactions(products: pd.DataFrame, customers: pd.DataFrame) -> pd.DataFrame:
    product_ids = products["product_id"].tolist()
    product_prices = dict(zip(products["product_id"], products["retail_price"]))
    customer_ids = customers["customer_id"].tolist()

    start_date = datetime(2024, 1, 1)
    end_date = datetime(2025, 12, 31)
    date_range_days = (end_date - start_date).days

    rows = []
    for tid in range(1, 50001):
        day_offset = random.randint(0, date_range_days)
        txn_date = start_date + timedelta(days=day_offset)
        month = txn_date.month
        season_mult = SEASON_MULTIPLIERS[month]

        # Weighted channel selection (boutique higher in Q4)
        cw = list(CHANNEL_WEIGHTS)
        if month in (11, 12):
            cw[0] += 0.06
            cw[1] -= 0.03
            cw[2] -= 0.02
            cw[3] -= 0.01
        channel = random.choices(CHANNELS, weights=cw, k=1)[0]

        pid = random.choice(product_ids)
        base_price = product_prices[pid]

        # Channel price adjustments
        if channel == "Outlet":
            price = round(base_price * random.uniform(0.55, 0.75), 2)
        elif channel == "E-Commerce":
            price = round(base_price * random.uniform(0.90, 1.0), 2)
        elif channel == "Wholesale":
            price = round(base_price * random.uniform(0.45, 0.55), 2)
        else:
            price = float(base_price)

        qty = 1 if random.random() < 0.82 else random.randint(2, 3)

        # Discount logic: outlets always discounted, seasonal markdowns in Jul/Aug
        if channel == "Outlet":
            discount_pct = round(random.uniform(25, 45), 1)
        elif month in (7, 8) and random.random() < 0.35:
            discount_pct = round(random.uniform(10, 30), 1)
        elif month == 6 and random.random() < 0.15:
            discount_pct = round(random.uniform(10, 20), 1)
        else:
            discount_pct = 0.0

        rows.append({
            "transaction_id": tid,
            "customer_id": random.choice(customer_ids),
            "product_id": pid,
            "transaction_date": txn_date.strftime("%Y-%m-%d"),
            "channel": channel,
            "region": random.choices(REGIONS, weights=REGION_WEIGHTS, k=1)[0],
            "quantity": qty,
            "unit_price": price,
            "total_amount": round(price * qty * season_mult, 2),
            "discount_pct": discount_pct,
        })

    df = pd.DataFrame(rows)
    df.to_csv(os.path.join(OUT_DIR, "transactions.csv"), index=False)
    print(f"  transactions.csv — {len(df)} rows")
    return df


# ---------------------------------------------------------------------------
# 4. Inventory  (~1,400 monthly snapshots)
# ---------------------------------------------------------------------------
def generate_inventory(products: pd.DataFrame) -> pd.DataFrame:
    rows = []
    snap_id = 1
    for _, prod in products.iterrows():
        # Monthly snapshots for 12 months of 2025
        for month in range(1, 13):
            snap_date = f"2025-{month:02d}-01"
            units_received = random.randint(20, 200)
            units_sold = int(units_received * random.uniform(0.45, 0.90))
            units_on_hand = units_received - units_sold + random.randint(0, 40)
            days_on_hand = random.randint(5, 160)
            rows.append({
                "snapshot_id": snap_id,
                "product_id": prod["product_id"],
                "snapshot_date": snap_date,
                "units_received": units_received,
                "units_sold": units_sold,
                "units_on_hand": max(units_on_hand, 0),
                "days_on_hand": days_on_hand,
            })
            snap_id += 1
    df = pd.DataFrame(rows)
    df.to_csv(os.path.join(OUT_DIR, "inventory.csv"), index=False)
    print(f"  inventory.csv — {len(df)} rows")
    return df


# ---------------------------------------------------------------------------
# 5. Targets  (48 rows: 4 regions × 4 channels × 3 quarters kept, plus extra)
# ---------------------------------------------------------------------------
def generate_targets() -> pd.DataFrame:
    rows = []
    tid = 1
    for region in REGIONS:
        for channel in CHANNELS:
            for q in range(1, 5):
                quarter = f"2025-Q{q}"
                base = random.randint(800_000, 3_500_000)
                # Weight targets by region/channel size
                region_mult = {
                    "North America": 1.3, "Europe": 1.1,
                    "Asia Pacific": 0.85, "Middle East": 0.55,
                }[region]
                channel_mult = {
                    "Boutique": 1.4, "E-Commerce": 1.1,
                    "Outlet": 0.65, "Wholesale": 0.35,
                }[channel]
                target = round(base * region_mult * channel_mult, 2)
                rows.append({
                    "target_id": tid,
                    "region": region,
                    "channel": channel,
                    "quarter": quarter,
                    "revenue_target": target,
                })
                tid += 1
    df = pd.DataFrame(rows)
    df.to_csv(os.path.join(OUT_DIR, "targets.csv"), index=False)
    print(f"  targets.csv — {len(df)} rows")
    return df


# ---------------------------------------------------------------------------
# 6. Wholesale Orders  (~600 rows)
# ---------------------------------------------------------------------------
WHOLESALE_DOORS = [
    ("Bergdorf Goodman", "North America"),
    ("Neiman Marcus", "North America"),
    ("SSENSE", "North America"),
    ("Saks Fifth Avenue", "North America"),
    ("Harrods", "Europe"),
    ("Selfridges", "Europe"),
    ("Galeries Lafayette", "Europe"),
    ("Isetan", "Asia Pacific"),
    ("Harvey Nichols", "Europe"),
    ("Level Shoes", "Middle East"),
    ("Dover Street Market", "North America"),
    ("Matches Fashion", "Europe"),
]


def generate_wholesale_orders(products: pd.DataFrame) -> pd.DataFrame:
    product_ids = products["product_id"].tolist()
    product_prices = dict(zip(products["product_id"], products["retail_price"]))
    rows = []
    oid = 1
    for year in (2024, 2025):
        for month in range(1, 13):
            order_date = f"{year}-{month:02d}-15"
            for door_name, region in WHOLESALE_DOORS:
                # Not every door orders every month
                if random.random() < 0.15:
                    continue
                pid = random.choice(product_ids)
                base_price = product_prices[pid]
                units_shipped = random.randint(30, 250)
                sell_rate = random.uniform(0.45, 0.88)
                units_sold = int(units_shipped * sell_rate)
                wholesale_price = round(base_price * random.uniform(0.45, 0.55), 2)
                is_reorder = random.random() < 0.65
                rows.append({
                    "order_id": oid,
                    "door_name": door_name,
                    "region": region,
                    "product_id": pid,
                    "order_date": order_date,
                    "units_shipped": units_shipped,
                    "units_sold": units_sold,
                    "wholesale_revenue": round(wholesale_price * units_shipped, 2),
                    "is_reorder": is_reorder,
                })
                oid += 1
    df = pd.DataFrame(rows)
    df.to_csv(os.path.join(OUT_DIR, "wholesale_orders.csv"), index=False)
    print(f"  wholesale_orders.csv — {len(df)} rows")
    return df


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    print("Generating synthetic luxury retail data...\n")
    products = generate_products()
    customers = generate_customers()
    transactions = generate_transactions(products, customers)
    inventory = generate_inventory(products)
    targets = generate_targets()
    wholesale_orders = generate_wholesale_orders(products)
    print(f"\nDone — all CSVs saved to {OUT_DIR}/")
