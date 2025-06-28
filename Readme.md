# 🧾 NOSH Assignment - Fullstack Dish Dashboard

## ✅ Overview
This project is a full-stack solution to manage and display dish information with real-time updates. It includes:
- MongoDB database
- Express.js backend API with WebSocket support
- React.js frontend (Vite-based) dashboard

## 📁 Project Structure
```
nosh-assignment/
├── backend/         # Node.js + Express + MongoDB + Socket.io
│   └── server.js
├── frontend/        # React app (created using Vite)
│   ├── src/
│   │   └── App.jsx
│   └── vite.config.js
└── README.md
```

---

## 🔧 How to Run Locally

### 1. 📦 Backend Setup
```bash
cd backend
npm install
```
- Create `.env` or hardcode your MongoDB URI in `server.js` at:
```js
const MONGO_URI = "mongoURI";
```
- Start the backend:
```bash
node server.js
```

### 2. ⚛️ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
- Opens app at `http://localhost:5173`

---

## 🚀 Features
- Dish list from MongoDB
- Toggle `isPublished` status
- Real-time UI sync via WebSocket
- Auto-database seeding if empty

---

## 🧪 API Collection (Postman)

### `GET /api/dishes`
- Returns all dishes

### `PATCH /api/dishes/:dishId/toggle`
- Toggles `isPublished` for the given dish

You can import the Postman collection from this JSON:
```
https://restless-shuttle-958110.postman.co/workspace/My-Workspace~db5af207-f501-4e72-8be4-2d1693ce2fa8/collection/27181311-9e7ed6c6-801b-4bdd-abc6-6ef30b395e56?action=share&creator=27181311
```