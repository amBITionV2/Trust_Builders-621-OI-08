Sanchara Vyuha: The Intelligent Urban Transit Grid

Project Access:
🎥 Demo Video: https://youtu.be/QbDRnvdhE1k
📂 Project Repository & Files: https://drive.google.com/drive/folders/11InUbFcrawQykgF5Wj7FJsMhMq_1EKow?usp=sharing

Overview:

Sanchara Vyuha (“Network of Motion”) is an intelligent urban transit grid designed to transform Bengaluru’s bus network through AI-driven decision-making, real-time passenger analytics, and dynamic bus dispatching.

The system combines computer vision, machine learning, and predictive analytics to optimize routes, reduce wait times, and create a responsive, data-driven public transport ecosystem.

Vision
Bengaluru’s public buses serve millions daily, yet operate on fixed schedules that fail to match live passenger demand.
Sanchara Vyuha envisions an AI-powered adaptive system where each bus movement is driven by real-time commuter insights — turning raw data into intelligent, actionable mobility decisions.

Problem Statement
Despite BMTC’s scale and reach:
Buses often run overcrowded or underutilized.
Commuters face unpredictable wait times.
Staff lack live visibility into demand and crowd flow.
Systems are static, not predictive.

Proposed Solution

Sanchara Vyuha introduces a multi-layer AI-powered architecture that integrates:

CCTV-Based Passenger Detection:
Real-time passenger counting using YOLOv8 and OpenCV, generating structured JSON outputs for backend processing.
Centralized Data & API Layer:
Flask-based backend handling live updates, data cleaning, and API access for dashboard and app integration.
Smart Bus Dispatch Engine:
Powered by GRU, GBM, and LSTM models that forecast passenger density, identify peak hours, and recommend bus allocation.

Depot Dashboard:
An interactive dashboard that visualizes real-time passenger data, heatmaps, historical trends, and dispatch suggestions.

Commuter App Prototype:
Built using Flutter, showing live bus tracking, occupancy visualization, and journey planning options.

AI System & Models
GRU (Gated Recurrent Unit): Learns sequential data from CCTV and ETM onboarding patterns to predict real-time crowd flow.
GBM (Gradient Boosting Machine): Optimizes decision-making using multiple route and demand parameters.
LSTM (Long Short-Term Memory): Predicts peak-hour passenger spikes and assists the AI Agent in dynamic dispatching.
AI Agent: The decision core combining outputs from GRU, GBM, and LSTM to determine where and when buses should be allocated.
Real-Time Data Workflow
CCTV cameras stream live data to the YOLOv8 detection model.
Passenger counts are sent to the Flask backend and stored in Firebase/MongoDB.
The dashboard visualizes live updates and predictive analytics.
The AI Dispatch Engine processes data and triggers smart bus allocation.
Commuter app displays real-time information to passengers.

Technology Stack

AI / ML: YOLOv8, OpenCV, TensorFlow, GRU, GBM, LSTM
Backend: Python, Flask, REST APIs
Database: Firebase Realtime DB, MongoDB
Dashboard: Plotly Dash, HTML, CSS, Bootstrap
App: Flutter (Commuter Interface)
Cloud & Version Control: Google Cloud, GitHub

Key Innovations

AI-based Auto Dispatching System integrating GRU + GBM + LSTM
CCTV Infrastructure Reuse — no new hardware required
Predictive Peak-Hour Forecasting using time-series models
Data Fusion AI Agent for multi-model decision accuracy
Scalable & Modular design for future expansion

Impact

BMTC: Data-backed bus allocation, real-time insights, and reduced manual planning.
Commuters: Reduced wait times and live journey updates.
City: Smarter, eco-efficient, and adaptive mobility grid.

Future Scope

Integration with live BMTC CCTV systems for real deployment.
Predictive scheduling and AI-based route optimization.
Edge AI systems for real-time processing at bus stops.
Multi-city implementation under Smart City initiatives.

Acknowledgement
Developed with the support and guidance of BMTC, Smart City Bengaluru, and our academic mentors — leading the path to data-driven, intelligent public mobility.

Developed By
Team TRUST BUILDERS – Smart Mobility Division
Turning Data Into Direction — For Every Passenger, Every Journey.
