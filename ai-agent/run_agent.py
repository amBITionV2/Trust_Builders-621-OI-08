import yaml, pandas as pd, numpy as np, os
from datetime import timedelta
from data_fusion import load_tables, fuse
from model_gru import make_time_feats, windowize, dummy_embed
from model_gbm import predict_gbm
from policy import recommend_buses, reason_str

cfg = yaml.safe_load(open("config.yaml","r"))
cap, lf = cfg["capacity"], cfg["load_factor"]
nowh = pd.Timestamp.now().floor("h")

# Load + fuse
cctv, etm, peak = load_tables(cfg)
df = fuse(cctv, etm, peak)
df = df[df["Route_ID"]==cfg["route_id"]].copy()
df = make_time_feats(df)

# Columns for the tiny demo
features_seq = ["people_in","people_out","validations","hour_sin","hour_cos","dow_sin","dow_cos"]
tab_cols = ["validations","people_in","people_out"]

rows=[]
for sid in cfg["stops"]:
    s = df[df["Bus_Stop_ID"]==sid].copy().sort_values("timestamp")
    s = s[s["timestamp"]<=nowh]
    if len(s) < max(cfg["window_hours"], 2):
        continue
    Xseq, meta = windowize(s, cfg["window_hours"], features_seq)
    if Xseq is None:
        continue
    emb = dummy_embed(Xseq)      # shape (features,)
    tab = s[tab_cols].tail(1).to_numpy().astype("float32").reshape(-1)
    # Next-hour demand (simple one-step)
    p1 = max(0.0, predict_gbm(emb, tab))
    p2 = p1 * 0.95
    p3 = p1 * 0.90

    for k, pred in enumerate([p1,p2,p3], start=1):
        ts = nowh + pd.Timedelta(hours=k)
        buses = recommend_buses(pred, cap, lf, ts.hour)
        ctx = s.iloc[-1][["timestamp","people_in","people_out","validations"]].to_dict()
        rows.append({
            "Route_ID": cfg["route_id"], "Bus_Stop_ID": sid,
            f"T+{k}_Timestamp": ts, f"Pred_t+{k}": pred, f"Buses_t+{k}": buses,
            "Dispatch_Reason": reason_str(ctx), "Bus_Capacity": cap, "Load_Factor": lf
        })

# Pivot to one row per stop for dashboard compatibility
out=[]
for sid in cfg["stops"]:
    r=[x for x in rows if x["Bus_Stop_ID"]==sid]
    if not r: continue
    base = {"Route_ID":cfg["route_id"], "Bus_Stop_ID":sid,
            "Bus_Capacity":cap,"Load_Factor":lf,"Dispatch_Reason":r[0]["Dispatch_Reason"]}
    for d in r:
        for k,v in d.items():
            if "Timestamp" in k or "Pred" in k or "Buses" in k:
                base[k]=v
    out.append(base)

# Write next to scripts
out_path = os.path.join(os.getcwd(), "dispatch_next_3h_agent.csv")
pd.DataFrame(out).to_csv(out_path, index=False)
print("Wrote", out_path, "rows:", len(out))
