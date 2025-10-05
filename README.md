Sacnchara Vyuha: The Intelligent Urban Transit Grid
 Smart Bus Allocation • AI Passenger Insights • Data-Driven City Mobility
 📂
 Project Access & Demo
 Demo Video: 
AI-Powered BMTC Bus Dispatch & Passenger Monitoring | Real-Time Dashboard Demo
 Google Drive: 
Sanchara Vyuha- BIT | TRUSST BUILDERS - Google Drive
 🌌
 Our Vision
 Bengaluru’s buses are lifelines for millions, yet they run on static schedules and reactive 
planning.
 Sacnchara Vyuha (“Network of Motion”) is designed as a real-time, adaptive urban transit 
system that uses AI, data analytics, and commuter-centric interfaces to transform public 
transportation into a smart, responsive ecosystem.
 It’s not just software — it’s a mobility revolution, turning raw data into actionable insights, 
and every passenger’s journey into an optimized experience.
 🌆
 The Problem We Solve
 Despite BMTC operating thousands of buses daily:
 Some buses arrive overcrowded, others underutilized
 Commuters face long waits and uncertainty
 BMTC staff lack real-time visibility into passenger flow
 Existing systems are reactive, not predictive.
 💡
 Our Solution
 Sacnchara Vyuha is an AI-powered, multi-layered transit intelligence system.
 Components:
 1. CCTV-Based Passenger Detection
 Counts passengers at stops in real-time using AI models (YOLOv8/OpenCV).
 Outputs structured JSON data for backend processing.
 2. Central Data & API Layer
 Receives live data, filters noise, stores it in a scalable database.
 Exposes RESTful APIs for dashboard and app consumption.
 3. Smart Bus Dispatch Engine
Dynamically allocates buses based on real-time demand.
 Uses heuristic algorithms with crowd density, route data, and fleet availability.
 4. Depot Dashboard
 Visualizes real-time passenger count, historical trends, and bus allocation suggestions.
 Interactive charts, heatmaps, and predictive analytics for BMTC staff.
 5. Commuter App (Prototype)
 Live bus arrival times
 Crowd load visualization
 Journey planning
 🧭
 System Architecture (ASCII Placeholder)
 ┌─────────────┐
 │
 CCTV Cameras
 │
 └─────┬───────┘
 │
 Video Stream
 ▼
 ┌────────────────────┐
 │
 Passenger Detection 
│
 │
   (YOLOv8/OpenCV)  
│
 └─────┬──────────────┘
 │
 JSON Output
 ▼
 ┌────────────────────┐
 │
 Backend API Server 
│
 │
   (Python Flask)   
│
 └─────┬──────────────┘
 │
 REST API
 ┌────────┴─────────┐
 │
                                                                         
│
 
▼
                                                                          
▼
 Dashboard                                                 Commuter App
 (Flask + Dash)                                         (Flutter Prototype)
 🧩
 Module Breakdown
 Module Tech & Description
 Passenger Detection YOLOv8/OpenCV model trained on mock 
CCTV datasets; counts passengers & sends 
JSON.
 Backend API Python Flask; asynchronous endpoints for 
high-frequency data updates.
 Smart Dispatch AI Heuristic + predictive algorithms for real
time bus allocation.
 Dashboard Plotly Dash; interactive charts, depot 
heatmaps, historical trends, real-time 
alerts.
 Commuter App Flutter prototype; displays live crowd and 
bus info for passengers.
 ⚙
 Technology Stack
Component Tools / Frameworks
 AI / Computer Vision YOLOv8, OpenCV, TensorFlow
 Backend Python, Flask, REST APIs
 Database Firebase Realtime DB / MongoDB
 Dashboard Dash, Plotly, HTML/CSS, Bootstrap
 Commuter App Flutter
 Version Control Git, GitHub
 Cloud Google Cloud for deployment & storage
 🔬
 Workflow & Implementation
 1. Research & Requirement Analysis
 Studied BMTC schedules, peak-hour traffic, and commuter behavior.
 2. Mock Data Generation
 Created synthetic CCTV data to simulate passenger flow patterns.
 3. AI Passenger Detection
 Trained object detection model to count passengers with high accuracy.
 4. Backend API Development
 Flask server receives live JSON feeds, handles asynchronous updates, and stores 
data.
 5. Dashboard Design
 Visual analytics with depot-wise breakdown, trend analysis, and real-time alerts.
 6. Bus Dispatch Engine
 Dynamic reallocation recommendations based on demand predictions.
 7. Commuter App Prototype
 Displays live data from backend API to end users.
 8. Testing & Iteration
 Integrated all modules and ran simulations with mock real-time data.
 Shows suggested bus reallocations based on real-time passenger demand.
�
�
 Innovation Highlights
 Existing Infrastructure Reuse – no new CCTV hardware required
 Real-time Adaptive Dispatch – AI dynamically reassigns buses
 Commuter Transparency – live info reduces wait-time anxiety
 Scalable & Modular – can integrate new depots, AI models, or data sources
 ⚡
 Challenges & Solutions
 Challenge
 No access to live CCTV
 Solution
 Generated realistic mock datasets
 Model variance in detection
 Integration lag
 Dashboard refresh delay
 🚀
 Impact
 Transfer learning + data augmentation
 Asynchronous Flask APIs + caching
 Optimized data push & frontend caching
 BMTC Staff: Data-driven, real-time decision-making
 Commuters: Reduced wait times, predictable travel
 City: Smarter public transit grid, reduced congestion
 🗺
 Roadmap / Future Scope
 Live CCTV integration pilot with BMTC depots
 Predictive scheduling & route optimization
 Public-facing dashboard & app deployment
 Edge computing for live AI processing at bus stops
 Multi-city deployment for Smart City initiatives
 📂
 Folder Structure
 sacnchara-vyuha/
 │
 ├──
 
�
�
 ai_model/         # YOLOv8/OpenCV passenger detection
├──
 
�
�
 backend/          # Flask API + data processing
 ├──
 
�
�
 dashboard/        # Plotly Dash dashboard
 ├──
 
�
�
 commuter_app/     # Flutter prototype
 ├──
 
�
�
 screenshots/      # Demo screenshots
 └──
 
�
�
 README.md
 Setup Instructions
 # Clone repository
 git clone https://github.com/your-org/sacnchara-vyuha.git
 cd sacnchara-vyuha
 Backend
 cd backend
 pip install -r requirements.txt
 python app.py
 Dashboard
 cd dashboard
 python app.py
 Commuter App
 cd commuter_app
 f
 lutter run
 Access dashboard: 
http://127.0.0.1:5000/
 💖
 Acknowledgement
 Thanks to BMTC, Smart City Bengaluru, and our mentors for inspiring Sacnchara Vyuha — 
shaping the future of adaptive urban mobility.
 📜
 License
 We can use MIT License, which allows others to:
 Use, copy, modify, or distribute the code
Give credit to original authors
 Protects your ownership while making your project open for learning & collaboration
 Or you can choose “All Rights Reserved” if you don’t want anyone to reuse it.
 ✨
 Developed by Team Trust Builders • Smart Mobility Division
 Turning Data Into Direction — For Every Passenger, Every Journey
