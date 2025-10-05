CCTV-Based Passenger Monitoring, Dashboard 
Visualization, and AI Bus Dispatch System (Mock Data)

Project Links

Mock Data Dashboard (YouTube Unlisted Video): https://youtu.be/wuyiHfK-9YA

Introduction

The Bangalore Metropolitan Transport Corporation (BMTC) serves millions of passengers 
daily. However, managing bus allocation in real-time is challenging due to unpredictable 
passenger demand, traffic conditions, and lack of accurate ground-level data. Traditional 
manual monitoring often leads to inefficiencies, overcrowding, and long waiting times.
 This project introduces a CCTV-based passenger monitoring system integrated with a mock
data powered dashboard and AI-driven bus dispatch recommendations. The CCTV system 
counts passengers at bus stops in real time. The data is visualized on a dashboard to show 
crowd density, and an AI engine recommends optimal bus dispatch numbers for the next few 
hours.

working photos : 
<img width="1574" height="758" alt="Screenshot 2025-10-05 001659" src="https://github.com/user-attachments/assets/bc3f3b6b-d86f-4328-9a17-79e7251a06b1" />
<img width="1339" height="751" alt="Screenshot 2025-10-05 001715" src="https://github.com/user-attachments/assets/fece8285-be86-4695-a7df-b3b599e55440" />
<img width="1550" height="661" alt="Screenshot 2025-10-05 001743" src="https://github.com/user-attachments/assets/90e02881-e83a-4f70-ae1b-a38be19c57ea" />
<img width="1259" height="395" alt="Screenshot 2025-10-05 001759" src="https://github.com/user-attachments/assets/f6a7fe65-2bf9-4eb2-8458-527b63f81c45" />
<img width="1541" height="670" alt="Screenshot 2025-10-05 001808" src="https://github.com/user-attachments/assets/023b4c25-0f42-409d-be6f-4beb64678c39" />
<img width="1558" height="706" alt="Screenshot 2025-10-05 001820" src="https://github.com/user-attachments/assets/926a9361-fb3d-4324-98a6-08e2ac4af1f2" />
<img width="1572" height="619" alt="Screenshot 2025-10-05 001827" src="https://github.com/user-attachments/assets/b61a0848-ce6d-443a-b69a-0d359d952dc3" />
<img width="1552" height="699" alt="Screenshot 2025-10-05 001835" src="https://github.com/user-attachments/assets/471d2487-fedb-42fe-a1a4-4f4a9d77cea6" />
<img width="1549" height="756" alt="Screenshot 2025-10-05 001847" src="https://github.com/user-attachments/assets/5ece5acf-7bf3-4eaf-8dbf-2af722aea751" />


This guide represents the mock data implementation, serving as a proof-of-concept. A future 
version will extend the same pipeline to real-time CCTV feeds.
 Objectives
 Monitor passenger crowd levels at bus stops using CCTV data.
 Develop a dashboard displaying live insights, crowd statistics, and waiting patterns (mock 
data powered).
 Build an AI recommendation system suggesting bus dispatch requirements to depots.
 Reduce passenger waiting times, avoid overcrowding, and improve service efficiency.
 Demonstrate a scalable framework for future integration with real-time feeds.
 Methodology
 The system combines computer vision, dashboard visualization, and AI recommendations 
 
into a unified pipeline:

1. Passenger Counting via CCTV
 CCTV cameras capture live video streams from bus stops.
 YOLO and OpenCV detect and count passengers in real time.
 Metrics such as number of people waiting, queue length, and crowd density are 
extracted.
 
 2. Mock Data Dashboard Development
 Dashboard powered by mock data simulates real CCTV outputs.
 Visualizes:
 Live passenger counts per bus stop
 Historical mock demand patterns
 Alerts when overcrowding thresholds are exceeded
 Serves as a visual decision-making tool for BMTC staff.
 
 3. AI Recommendation Engine
 Processes mock passenger data and recommends bus dispatch counts.
 Recommendations generated for the next 1–3 hours.
 Considers bus capacity, load factors, and waiting time thresholds.
 
 4. Integration
 Complete pipeline: Passenger monitoring → Dashboard visualization → AI dispatch 
recommendations.
 BMTC depots receive actionable guidance to dispatch buses where needed most.
 Data Sources
 Mock Passenger Data: Simulated CCTV outputs for testing.
 Historical Demand Patterns: Example ridership assumptions.
 Bus Capacity and Depot Data: Used to calculate dispatch requirements.
 Future Scope: Real-time CCTV integration.

 
How to Run the Project (Node.js + React Version)

 1. Open Terminal / Command Prompt
 pwd
 cd "your folder path"
 ls
 2. Navigate to Project Folder
 cd BMTC
 ls
 3. Install Dependencies
 npm install
 4. Run the Project
 npm run dev
 React frontend usually runs at http://localhost:3000.
 Node.js backend API usually runs at http://localhost:5000.
 5. Access the App
 Open your browser at http://localhost:3000.
 Ensure backend is running to fetch data correctly.
 (For a quick demo without running the code, see the YouTube video linked above.)
 Workflow
 1. CCTV system detects passengers at bus stops.
 2. Data is processed into structured metrics (occupancy, queue length).
 3. Dashboard displays metrics for BMTC officials.
 4. AI system analyses demand and generates dispatch recommendations.
 5. Depots allocate buses effectively using recommendations.
 Results and Outcomes
 Visualization of Passenger Demand: Dashboard shows mock data in real-time.
 AI-Driven Recommendations: Depots get insights on bus dispatch requirements.
 Efficiency: Better fleet utilization and fewer idle buses.
 Passenger Benefits: Shorter waiting time, reduced overcrowding, improved safety.
 Proof-of-Concept: Demonstrates feasibility for real CCTV data integration.

 Future Scope

 Real-time CCTV feed integration.
 AI-powered incident detection (fights, accidents, overcrowding alerts).
 Multi-modal transport integration with metro and feeder services.
 Predictive demand analytics during festivals, weather fluctuations, or events.
 Fully automated AI scheduling for BMTC’s entire network.
 
 Conclusion
 
 The CCTV-based passenger counting, mock data dashboard, and AI dispatch 
recommendation system showcase how technology can revolutionize BMTC operations. By 
leveraging computer vision, data visualization, and AI, this system provides a smarter, more 
efficient, and commuter-friendly public transport network.
 This document represents the mock data stage and will later evolve into a real-time CCTV 
data dashboard system
