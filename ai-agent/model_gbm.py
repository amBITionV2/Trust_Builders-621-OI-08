# Minimal GBM-like head using linear combo to avoid training for the tiny demo
import numpy as np

def predict_gbm(emb, tab):
    # Simple weighted sum as a placeholder for LightGBM
    e = emb.reshape(1, -1)
    t = tab.reshape(1, -1)
    w_e = np.linspace(0.6, 1.0, e.shape[-1])
    w_t = np.linspace(1.0, 1.4, t.shape[-1])
    y = (e @ w_e.reshape(-1,1) + t @ w_t.reshape(-1,1)) * 1.2
    return float(y.ravel()[0])
