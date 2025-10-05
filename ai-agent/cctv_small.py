# cctv_small.py — writes a tiny CCTV mock with 6 hours for 2 stops
import pandas as pd
from datetime import datetime, timedelta
import numpy as np

STOPS = ["KBS001","AMC601"]
ROUTE = "365J"
HOURS = 6  # small size

base = datetime.now().replace(minute=0, second=0, microsecond=0) - timedelta(hours=HOURS)
rows=[]
rng = np.random.default_rng(11)

for h in range(HOURS):
    ts = base + timedelta(hours=h)
    hour = ts.hour
    peak = 1.25 if (7 <= hour <= 9 or 17 <= hour <= 20) else 1.0
    for sid in STOPS:
        bias = 1.3 if sid=="KBS001" else 1.0
        lam = 18 * peak * bias
        people_in  = max(0, rng.normal(lam, max(2, 0.15*lam)))
        people_out = max(0, rng.normal(0.5*lam, max(1.5, 0.12*lam)))
        rows.append({
            "Bus_Stop_ID": sid,
            "Route_ID": ROUTE,
            "timestamp": ts.strftime("%Y-%m-%d %H:00"),
            "people_in": int(round(people_in)),
            "people_out": int(round(people_out)),
        })

pd.DataFrame(rows).to_csv("cctv_counts.csv", index=False)
print("Wrote cctv_counts.csv with", len(rows), "rows")
