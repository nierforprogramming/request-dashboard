# 📋 Request Operations Dashboard

A role-based request management dashboard that allows Supervisors and Operators to monitor, update, and manage task requests efficiently.

## 🚀 Features

- 📊 View all requests with status indicators (Pending, Active, Completed, Cancelled)

- 🔍 Filter requests by status using dropdown filter

- 👨‍💼 Supervisor view with full visibility and workload summary per operator

- 👨‍🔧 Operator view showing only assigned tasks with allowed actions

- 🔄 Change request status using modal with optional supervisor message

- 🔁 Reassign tasks to different operators using modal interface

- ⚡ Instant UI updates using React state and json-server backend

- 🎨 Color-coded status badges for better visual clarity

## 🛠️ Tech Stack

- Frontend: React (Vite)

- Styling: Tailwind CSS

- Backend (Mock API): json-server

- State Management: React Context API

## ▶️ How to Run the App

### 1. Clone the repository

```bash
git clone https://github.com/nierforprogramming/request-operations-dashboard.git
cd request-operations-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start frontend and backend together

```bash
npm run dev
```

### This runs both:

- Vite frontend → localhost:5173

- json-server API → localhost:3000

## 🧩 Roles & Permissions

### Supervisor

- View all requests

- Change request status

- Reassign tasks to operators

- View workload summary per operator

### Operator

- View only assigned tasks

- Start pending tasks

- Mark active tasks as complete

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

Name: Niraj
GitHub: https://github.com/nierforprogramming
