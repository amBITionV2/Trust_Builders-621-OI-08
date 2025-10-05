 Sacnchara Vyuha: CCTV Dashboard (Real Video Data)
 Passenger Monitoring • Depot Analytics • Data-Driven Transit Insights🌌
 
Demo Video YouTube Link : https://youtu.be/vV8exDKDxsw
 
 Project Vision
 Sacnchara Vyuha evolves from mock simulations to real-world data.
 We recorded 9 videos from 9 different bus stops in Bengaluru to analyze actual passenger flow.
 The dashboard visualizes this data, helping BMTC staff understand crowd patterns and bus 
 stop utilization in a data-driven way.
 This project demonstrates how CCTV footage + AI analytics can provide actionable insights for urban transit

 🌆Problem
 BMTC depots and bus stops often face:
 Overcrowding during peak hours
 Unused capacity at some stops
 Lack of real-time insights for bus allocation
 Real video analysis bridges the gap between simulation and reality.
 
 💡Our Solution
 AI Passenger Detection: YOLOv8/OpenCV model analyzes each video to count 
 passengers.
 Dashboard Visualization: Shows per-stop passenger counts, trends, and heatmaps.
 Data-Driven Insights: Enables planning and optimization based on real-world video 
 footage.

demo images:
![WhatsApp Image 2025-10-05 at 08 57 10_4d0586c2](https://github.com/user-attachments/assets/bed1c086-b7e5-43f8-8aba-15a0bad8fe75)
![WhatsApp Image 2025-10-05 at 08 57 19_99beddc5](https://github.com/user-attachments/assets/bb5fd388-f3f7-4e2c-be21-d70a12288dc7)


 🧭
 System Architecture
 ┌──────────────┐
 │
 9 CCTV Videos
 │
  (Recorded)
 └──────┬───────┘
 │
 Video Input
 ▼
 ┌────────────────────┐
│
 Passenger Detection 
│
 │
  (YOLOv8/OpenCV)   
│
 └──────┬─────────────┘
 │
 JSON Output
 ▼
 ┌────────────────────┐
 │
 Dashboard Backend  
│
 │
   (Flask / Dash)   
│
 └──────┬─────────────┘
 │
 ▼
 ┌─────────────┐
 │
 Dashboard UI
 │
 │
 Visualization
 │
 └─────────────┘
 🧩
 Module Breakdown
 Module
 Passenger Detection
 Description
 Counts passengers per frame using 
YOLOv8/OpenCV.
 Backend
 Dashboard
 Flask/Dash server receives JSON from 
video analysis.
 Interactive charts and heatmaps showing 
per-stop passenger statistics.

 ⚙
 Technology Stack
 Component
 AI / Computer Vision
 Backend
 Database
 Dashboard
 Version Control
 
 🔬
 Workflow
 Tools / Frameworks
 YOLOv8, OpenCV
 Python, Flask, Dash
 CSV / JSON (processed video outputs)
 Plotly Dash, HTML/CSS, Bootstrap
 Git, GitHub
 1. Video Collection: Recorded 9 videos from 9 different bus stops.
 2. AI Processing: Passenger detection and counting for each video.
 3. Data Export: JSON files generated with per-frame counts.
 4. Dashboard Integration: Visualizations created from these JSON files.
 5. Analysis: Insights for bus stop crowd patterns and planning.

 📂
 Folder Structure
 cctv-dashboard-real/
 │
 ├──
 videos/          # 9 recorded videos
 ├──
 ai_model/        # YOLOv8/OpenCV detection scripts
 ├──
 backend/         # Flask/Dash dashboard backend
 ├──
 screenshots/     # Demo screenshots
 └──
 README.md

 
