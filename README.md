# 📊 DevTracker: GitHub & LeetCode Stats

A full-stack application that tracks, visualizes, and analyzes coding activity across **GitHub** and **LeetCode**. This project is structured as a monorepo containing both the client (Frontend) and the server (Backend).

## 🚀 Features

* **GitHub Tracking:** View commit streaks, top repositories, and language usage.
* **LeetCode Analysis:** Track problems solved (Easy/Medium/Hard), acceptance rates, and submission history.
* **Unified Dashboard:** See all your coding metrics in one place.

## 📂 Project Structure

This project is organized into two main modules:

* **`/front`**: The Frontend user interface (Built with React/Next.js).
* **`/back`**: The Backend API service (Built with Node.js/Express).

---

## 🛠️ Quick Start Guide

To run this project locally, you will need **Node.js** installed.

### 1. Setup the Backend
The backend handles data fetching from external APIs.

```bash
cd back
npm install
# Create a .env file (see back/README.md for details)
npm run dev