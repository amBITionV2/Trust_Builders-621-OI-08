import pandas as pd

def load_tables(cfg):
    base = cfg["data_dir"].rstrip("/\\")
    cctv = pd.read_csv(f"{base}/{cfg['cctv_csv']}")
    etm  = pd.read_csv(f"{base}/{cfg['etm_csv']}")
    # Peak optional
    peak_path = f"{base}/{cfg.get('peak_csv','')}" if cfg.get('peak_csv') else ""
    try:
        peak = pd.read_csv(peak_path)
        if "timestamp" in peak.columns:
            peak["timestamp"] = pd.to_datetime(peak["timestamp"], errors="coerce")
        else:
            peak["timestamp"] = pd.to_datetime(peak["Date"]+" "+peak["Time"], errors="coerce")
    except Exception:
        peak = pd.DataFrame(columns=["Bus_Stop_ID","Route_ID","timestamp"])
    # Normalize timestamps
    for df_name, df in [("cctv", cctv), ("etm", etm)]:
        df["timestamp"] = pd.to_datetime(df["timestamp"], errors="coerce").dt.floor("h")
    if not peak.empty:
        peak["timestamp"] = peak["timestamp"].dt.floor("h")
    return cctv, etm, peak

def fuse(cctv, etm, peak):
    keys = ["Bus_Stop_ID","Route_ID","timestamp"]
    cctv = cctv.groupby(keys, as_index=False).agg({"people_in":"sum","people_out":"sum"})
    etm  = etm.groupby(keys,  as_index=False).agg({"validations":"sum","revenue":"sum"})
    base = peak[keys].drop_duplicates() if not peak.empty else cctv[keys].drop_duplicates()
    df = base.merge(cctv, on=keys, how="left").merge(etm, on=keys, how="left")
    for c in ["people_in","people_out","validations","revenue"]:
        if c in df: df[c] = df[c].fillna(0)
    return df.sort_values(keys)
