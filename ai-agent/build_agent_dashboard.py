# build_agent_dashboard.py — renders dashboard_agent.html from agent CSV
import pandas as pd
from datetime import datetime

SRC = "dispatch_next_3h_agent.csv"
OUT = "dashboard_agent.html"

df = pd.read_csv(SRC, parse_dates=["T+1_Timestamp","T+2_Timestamp","T+3_Timestamp"])
df = df.sort_values(["Route_ID","Bus_Stop_ID"])

def row_html(r):
    return f"""
    <div class="card">
      <div class="hdr"><span class="tag">Route</span> {r['Route_ID']} &nbsp; <span class="tag">Stop</span> {r['Bus_Stop_ID']}</div>
      <div class="grid">
        <div>
          <h4>Next 3 hours</h4>
          <table class="mini">
            <tr><th>Timestamp</th><th>Pred</th><th>Buses</th></tr>
            <tr><td>{r['T+1_Timestamp']}</td><td>{r['Pred_t+1']:.1f}</td><td>{int(r['Buses_t+1'])}</td></tr>
            <tr><td>{r['T+2_Timestamp']}</td><td>{r['Pred_t+2']:.1f}</td><td>{int(r['Buses_t+2'])}</td></tr>
            <tr><td>{r['T+3_Timestamp']}</td><td>{r['Pred_t+3']:.1f}</td><td>{int(r['Buses_t+3'])}</td></tr>
          </table>
          <p class="reason">{r['Dispatch_Reason']}</p>
          <p class="meta">Capacity {int(r['Bus_Capacity'])}, Load factor {r['Load_Factor']:.2f}</p>
        </div>
      </div>
    </div>"""

cards = "\n".join(row_html(r) for _, r in df.iterrows())

html=f"""<!doctype html><html><head><meta charset="utf-8"/>
<title>AI Agent Dispatch (Demo)</title>
<style>
 body{{font-family:Segoe UI,Roboto,Arial,sans-serif;margin:24px;background:#fafafa;color:#222}}
 .card{{background:#fff;border:1px solid #eee;border-radius:10px;margin:16px 0;padding:16px;box-shadow:0 1px 3px rgba(0,0,0,.05)}}
 .hdr{{font-weight:600;margin-bottom:8px}} .tag{{background:#eef;color:#224;border-radius:6px;padding:2px 6px;margin-right:6px}}
 .grid{{display:grid;grid-template-columns:1fr;gap:16px;align-items:center}}
 .mini{{border-collapse:collapse;width:100%}} .mini th,.mini td{{border-bottom:1px solid #eee;padding:6px 8px;text-align:left}}
 .mini th{{background:#f7f7fb}} .reason{{background:#f9f9f9;border-left:4px solid #6aa84f;padding:8px;border-radius:6px}}
 .meta{{color:#666;font-size:12px}}
</style></head>
<body>
<h1>AI Agent Dispatch (Demo)</h1>
<div class="sub">Generated at {datetime.now().strftime("%Y-%m-%d %H:%M")}</div>
{cards if cards else "<p>No rows. Run run_agent.py first.</p>"}
</body></html>"""

with open(OUT,"w",encoding="utf-8") as f:
    f.write(html)
print("Wrote", OUT)

    