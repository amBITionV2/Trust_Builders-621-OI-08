# etm_small.py — writes a tiny ETM mock with 6 hours for 2 stops
import pandas as pd
from datetime import datetime, timedelta
import numpy as np

STOPS = ["KBS001","AMC601"]
ROUTE = "365J"
HOURS = 6

base = datetime.now().replace(minute=0, second=0, microsecond=0) - timedelta(hours=HOURS)
rows=[]
rng = np.random.default_rng(17)

def peak_mult(h):
    return 1.10 if (7 <= h <= 9 or 17 <= h <= 20) else 1.0

for h in range(HOURS):
    ts = base + timedelta(hours=h)
    mult = peak_mult(ts.hour)
    for sid in STOPS:
        scale = 1.3 if sid=="KBS001" else 1.0
        validations = max(0, rng.normal(14*mult*scale, 2.0))
        validations = int(round(validations))
        avg_fare = rng.uniform(12, 18) * mult
        revenue = round(validations * avg_fare * rng.uniform(0.97, 1.03), 2)
        rows.append({
            "Bus_Stop_ID": sid,
            "Route_ID": ROUTE,
            "timestamp": ts.strftime("%Y-%m-%d %H:00"),
            "validations": validations,
            "revenue": revenue,
        })

pd.DataFrame(rows).to_csv("etm_transactions.csv", index=False)
print("Wrote etm_transactions.csv with", len(rows), "rows")
