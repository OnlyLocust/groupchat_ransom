# 💬 Ransom - Group Chat App

**Ransom** is a real-time group chat application where users can send messages, join public rooms, and see who's online — all powered by **NestJS** and **Socket.io**.  
It also intelligently detects and disconnects **ghost users** (disconnected clients that don't clean up properly) to maintain a clean chat environment.

🚀 [Live Demo](https://ransom-6c1r.onrender.com/)

---

## ✨ Features

- 💬 Real-time group messaging (single public room: `ransom`)
- 🟢 See online users live as they join/leave
- ⚡ Built using **WebSockets** via **Socket.io**
- 🧠 Smart ghost user disconnection (auto cleanup)
- 📱 Mobile-friendly responsive UI
- 🧼 Simple, minimal UI for focus on the conversation

---

## 🛠️ Tech Stack

| Category     | Tech Used          |
|--------------|--------------------|
| **Framework**| NestJS             |
| **Real-time**| Socket.io          |
| **Runtime**  | Node.js            |
| **Frontend** | HTML, CSS, JS (Vanilla or templated) |
| **Deployment** | Render           |

---

## 🧠 Smart Ghost User Disconnect

To handle users who close their browser or lose internet **without formally disconnecting**, Ransom uses a **heartbeat mechanism**:

- Every user sends a ping to the server at regular intervals.
- If the server doesn’t receive a ping for X seconds, it considers the user **disconnected**.
- The user is then removed from the online user list and a `user-disconnected` event is broadcast.

This keeps the UI and server state clean and up-to-date ✅

---

