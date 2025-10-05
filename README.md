Sanchara Vyuha: The Intelligent Urban Transit Grid

🎥 Demo Video: https://youtu.be/QbDRnvdhE1k

📂 Project Repository & Files: https://drive.google.com/drive/folders/11InUbFcrawQykgF5Wj7FJsMhMq_1EKow?usp=sharing

Overview

Sanchara Vyuha (“Network of Motion”) is an AI-powered urban transit grid designed to revolutionize Bengaluru’s bus transportation system through real-time analytics, predictive dispatching, and smart commuter integration.
The project integrates computer vision, machine learning, and data-driven intelligence to ensure optimized routes, reduced wait times, and adaptive mobility operations.

Vision

Bengaluru’s public transport system caters to millions daily but operates on static schedules that don’t reflect live commuter demand.
Sanchara Vyuha envisions a future where AI-driven adaptive scheduling and real-time passenger data guide every bus movement, creating an intelligent, responsive, and efficient city transit ecosystem.

Problem Statement

Despite BMTC’s wide reach and infrastructure:

Buses are often overcrowded or underutilized.

Commuters face unpredictable wait times.

Depot staff lack real-time demand visibility.

Existing systems are static and not predictive.

Proposed Solution

The project introduces a multi-layered AI-powered architecture integrating the following components:

CCTV-Based Passenger Detection: Real-time passenger counting using YOLOv8 and OpenCV, generating structured data for analytics.

Centralized Data & API Layer: Flask backend for live updates, data preprocessing, and seamless integration with the dashboard and commuter app.

Smart Bus Dispatch Engine: Driven by GRU, GBM, and LSTM models to forecast demand, identify peak hours, and recommend bus dispatch.

System Modules
Depot Dashboard

An interactive dashboard built with Plotly Dash displaying:

Live passenger counts

Route heatmaps

Historical demand trends

AI-based dispatch suggestions

Commuter App

A Flutter-based prototype providing:

Live bus tracking

Occupancy status visualization

Smart journey planning assistance

AI System & Models

GRU (Gated Recurrent Unit): Predicts real-time passenger flow using sequential ETM and CCTV data.

GBM (Gradient Boosting Machine): Optimizes decisions using multiple route and demand metrics.

LSTM (Long Short-Term Memory): Identifies peak-hour patterns and aids the AI Agent in dynamic scheduling.

AI Agent: The decision-making core, combining GRU, GBM, and LSTM outputs to determine optimal bus dispatching.

Real-Time Data Workflow

CCTV cameras stream passenger data to YOLOv8 for detection.

Processed data sent to Flask backend → stored in Firebase/MongoDB.

Dashboard visualizes live metrics and predictions.

AI Dispatch Engine computes bus allocation decisions.

Commuter App displays live bus and occupancy updates to passengers.

Technology Stack

AI / ML: YOLOv8, OpenCV, TensorFlow, GRU, GBM, LSTM
Backend: Python, Flask, REST APIs
Database: Firebase Realtime DB, MongoDB
Dashboard: Plotly Dash, HTML, CSS, Bootstrap
Mobile App: Flutter
Cloud & Version Control: Google Cloud, GitHub

Key Innovations

AI-based Auto Dispatch System integrating GRU + GBM + LSTM

CCTV Infrastructure Reuse — no additional hardware required

Predictive Peak-Hour Forecasting using time-series modeling

Data Fusion AI Agent for intelligent decision-making

Scalable & Modular Architecture for multi-city expansion

Impact

BMTC: Smarter bus allocation, reduced manual scheduling, real-time data insights.

Commuters: Lower wait times, improved reliability, and live journey tracking.

City: Eco-efficient, intelligent, and future-ready transport grid.

Future Scope

Integration with BMTC live CCTV networks for city-scale deployment.

AI-driven route optimization and predictive scheduling.

Edge AI processing at bus stops for real-time decision autonomy.

Multi-city implementation under Smart City projects.

Acknowledgement

Developed with guidance from BMTC, Smart City Bengaluru, and academic mentors, this project represents a step toward data-driven public mobility and AI-powered smart cities.

Developed By
Team TRUST BUILDERS – Smart Mobility Division

Turning Data Into Direction — For Every Passenger, Every Journey
