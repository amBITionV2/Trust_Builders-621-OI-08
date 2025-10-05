# Minimal stubs to keep pipeline simple on tiny data
import numpy as np, pandas as pd

def make_time_feats(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    df["hour"] = df["timestamp"].dt.hour
    df["dow"]  = df["timestamp"].dt.dayofweek
    df["hour_sin"]=np.sin(2*np.pi*df["hour"]/24); df["hour_cos"]=np.cos(2*np.pi*df["hour"]/24)
    df["dow_sin"]=np.sin(2*np.pi*df["dow"]/7);   df["dow_cos"]=np.cos(2*np.pi*df["dow"]/7)
    return df

def windowize(df: pd.DataFrame, w: int, cols):
    g = df.sort_values("timestamp")
    arr = g[cols].to_numpy().astype("float32")
    if len(arr) < w:
        return None, None
    X = arr[-w:].reshape(1, w, arr.shape[-1])  # last window only
    meta = g.iloc[[-1]][["Bus_Stop_ID","Route_ID","timestamp"]].reset_index(drop=True)
    return X, meta

def dummy_embed(X):
    # Replace GRU with mean pooling to get a 1D embedding
    return X.mean(axis=(1,0))  # shape (1, features)
