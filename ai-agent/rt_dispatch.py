import pandas as pd, numpy as np, time, os
from datetime import datetime, timedelta
from collections import defaultdict

DATA_DIR = "."
CCTV = "cctv_counts.csv"
ETM  = "etm_transactions.csv"
ROUTE = "365J"
STOPS = ["KBS001","AMC601"]   # set your stops
TICK_SEC = 5                  # how often to check files
WINDOW_H = 3                  # last N hours for smoothing
COOLDOWN_MIN = 8              # min minutes between dispatches per stop
CAPACITY = 60
LOAD_FACTOR = 0.85

ACTIONS_LOG = "dispatch_actions.log"
STATUS_HTML = "dispatch_status.html"

state_last_dispatch = defaultdict(lambda: datetime.min)

def read_latest():
    c = pd.read_csv(os.path.join(DATA_DIR, CCTV))
    e = pd.read_csv(os.path.join(DATA_DIR, ETM))
    for df in (c,e):
        df["timestamp"] = pd.to_datetime(df["timestamp"], errors="coerce").dt.floor("h")
    keys = ["Bus_Stop_ID","Route_ID","timestamp"]
    c = c.groupby(keys, as_index=False).agg({"people_in":"sum","people_out":"sum"})
    e = e.groupby(keys, as_index=False).agg({"validations":"sum","revenue":"sum"})
    df = c.merge(e, on=keys, how="outer").fillna(0.0)
    df = df[df["Route_ID"]==ROUTE].sort_values(keys)
    return df

def compute_signal(df_stop, nowh):
    w = df_stop[df_stop["timestamp"].between(nowh - timedelta(hours=WINDOW_H-1), nowh)]
    if w.empty:
        return 0.0, {}
    cur = w[w["timestamp"]==nowh].tail(1)
    people_in = float(cur["people_in"].iloc[0]) if len(cur) else 0.0
    validations = float(cur["validations"].iloc[0]) if len(cur) else 0.0
    r_in = w["people_in"].mean()
    r_etm = w["validations"].mean()
    demand = 0.6*people_in + 0.4*r_in + 0.5*r_etm
    buses_needed = demand / max(CAPACITY*LOAD_FACTOR, 1.0)
    return buses_needed, {
        "people_in": people_in, "validations": validations,
        "r_in": r_in, "r_etm": r_etm
    }

def should_dispatch(stop_id, buses_needed, nowts):
    last = state_last_dispatch[stop_id]
    if (nowts - last) < timedelta(minutes=COOLDOWN_MIN):
        return False, f"Cooldown {(nowts - last).seconds//60}m/{COOLDOWN_MIN}m"
    return buses_needed >= 1.0, "buses_needed>=1"

def write_action(ts, stop_id, msg, ctx):
    line = f"{ts.isoformat()} | STOP={stop_id} | ACTION={msg} | ctx={ctx}\n"
    with open(ACTIONS_LOG, "a", encoding="utf-8") as f:
        f.write(line)
    print(line, end="")

def render_status(nowh, rows):
    cards = []
    for r in rows:
        cards.append(f"""
        <div class="card">
          <div class="hdr"><span class="tag">Route</span> {ROUTE} &nbsp; <span class="tag">Stop</span> {r['stop']}</div>
          <table class="mini">
            <tr><th>Hour</th><th>In</th><th>ETM</th><th>BusesNeeded</th><th>Decision</th></tr>
            <tr><td>{nowh}</td><td>{r['people_in']:.0f}</td><td>{r['validations']:.0f}</td><td>{r['buses_needed']:.2f}</td><td>{r['decision']}</td></tr>
          </table>
          <p class="meta">Rolling in {r['r_in']:.1f}, rolling etm {r['r_etm']:.1f}; capacity {CAPACITY}, LF {LOAD_FACTOR}</p>
        </div>""")
    html = f"""<!doctype html><html><head><meta charset="utf-8"/>
    <title>Real-Time Dispatch</title>
    <style>
    body{{font-family:Segoe UI,Roboto,Arial,sans-serif;margin:20px;background:#fafafa}}
    .card{{background:#fff;border:1px solid #eee;border-radius:10px;margin:12px 0;padding:12px}}
    .hdr{{font-weight:600;margin-bottom:6px}} .tag{{background:#eef;color:#224;border-radius:6px;padding:2px 6px;margin-right:6px}}
    .mini td,.mini th{{padding:6px 8px;border-bottom:1px solid #eee;text-align:left}}
    .meta{{color:#666;font-size:12px}}
    </style></head><body>
    <h2>Real-Time Dispatch (ETM + CCTV)</h2>
    <div class="sub">Updated at {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}</div>
    {''.join(cards)}
    </body></html>"""
    with open(STATUS_HTML, "w", encoding="utf-8") as f:
        f.write(html)

def main_loop():
    print("Real-time dispatcher started. Ctrl+C to stop.")
    last_seen_hour = None
    while True:
        try:
            df = read_latest()
            if df.empty: time.sleep(TICK_SEC); continue
            nowh = df["timestamp"].max()
            if last_seen_hour is None or nowh > last_seen_hour:
                rows=[]
                for sid in STOPS:
                    s = df[df["Bus_Stop_ID"]==sid]
                    if s.empty: continue
                    buses_needed, ctx = compute_signal(s, nowh)
                    decision, why = should_dispatch(sid, buses_needed, nowh.to_pydatetime())
                    if decision:
                        state_last_dispatch[sid] = nowh.to_pydatetime()
                        write_action(nowh.to_pydatetime(), sid, "DISPATCH_NOW", ctx)
                    else:
                        write_action(nowh.to_pydatetime(), sid, "WAIT", {"why": why, **ctx})
                    rows.append({
                        "stop": sid, "people_in": ctx.get("people_in",0), "validations": ctx.get("validations",0),
                        "r_in": ctx.get("r_in",0), "r_etm": ctx.get("r_etm",0), "buses_needed": buses_needed,
                        "decision": "DISPATCH" if decision else "WAIT"
                    })
                render_status(nowh, rows)
                last_seen_hour = nowh
            time.sleep(TICK_SEC)
        except KeyboardInterrupt:
            print("Stopped."); break

if __name__ == "__main__":
    main_loop()
