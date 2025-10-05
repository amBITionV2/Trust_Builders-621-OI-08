from math import ceil

def recommend_buses(pred_passengers, capacity, load_factor, hour):
    base = max(1, ceil(pred_passengers / max(capacity*load_factor, 1.0)))
    if 7 <= hour <= 9 or 17 <= hour <= 20:
        base = max(1, base)
    return base

def reason_str(ctx):
    return (f"Fused CCTV({ctx.get('people_in',0)},{ctx.get('people_out',0)}) + "
            f"ETM({ctx.get('validations',0)}) + time features; "
            f"tiny embedding + linear head; hour {ctx['timestamp'].hour}.")
