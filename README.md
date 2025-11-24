                                           ##Socket.io Real-Time Chat Application
A full-featured real-time chat application built with the MERN stack and Socket.io, featuring instant messaging, user presence, and private conversations.

##🚀 Features
Real-time Messaging - Instant message delivery with Socket.io

User Presence - See who's online in real-time

Typing Indicators - Know when others are typing

Private Messaging - One-on-one conversations

Multiple Rooms - Join different chat rooms

Notifications - Real-time user join/leave alerts

Responsive Design - Works on desktop and mobile

##🛠️ Tech Stack
Frontend: React, Vite, Socket.io-client

Backend: Node.js, Express, Socket.io

Real-time: WebSockets with Socket.io

Styling: CSS3 with modern design

##📦 Quick Start
Prerequisites
Node.js (v18 or higher)

npm or yarn

Installation
Clone the repository

bash
git clone <your-repo-url>
cd socketio-chat
Install dependencies

bash
# Install server dependencies
cd server
npm install

## Install client dependencies  
cd ../client
npm install
Environment Setup

Create server/.env:

env
PORT=5000
CLIENT_URL=http://localhost:5173
NODE_ENV=development
Create client/.env:

env
VITE_SOCKET_URL=http://localhost:5000
Start the application

bash
## Terminal 1 - Start backend
cd server
npm run dev

## Terminal 2 - Start frontend
cd client
npm run dev
Access the application

Frontend: http://localhost:5173

Backend API: http://localhost:5000

##🎯 Usage
Join Chat: Enter your username on the login page

Global Chat: Send messages to everyone in the main room

Private Messages: Click on a user to start a private conversation

User List: See all online users in the sidebar

Typing Indicators: Watch dots animate when others type

##📁 Project Structure
```
socketio-chat/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chat/
│   │   │   │   ├── ChatRoom.jsx
│   │   │   │   ├── MessageList.jsx
│   │   │   │   ├── MessageInput.jsx
│   │   │   │   ├── UserList.jsx
│   │   │   │   └── TypingIndicator.jsx
│   │   │   ├── Auth/
│   │   │   │   └── LoginForm.jsx
│   │   │   └── UI/
│   │   │       ├── Notification.jsx
│   │   │       └── LoadingSpinner.jsx
│   │   ├── context/
│   │   │   └── SocketContext.jsx
│   │   ├── hooks/
│   │   │   ├── useSocket.js
│   │   │   └── useNotifications.js
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Chat.jsx
│   │   │   └── PrivateChat.jsx
│   │   ├── socket/
│   │   │   └── socket.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .env
├── server/
│   ├── config/
│   │   └── socket.js
│   ├── controllers/
│   │   └── chatController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Message.js
│   │   └── Room.js
│   ├── socket/
│   │   └── handlers/
│   │       ├── chatHandlers.js
│   │       ├── userHandlers.js
│   │       └── roomHandlers.js
│   ├── utils/
│   │   ├── helpers.js
│   │   └── rateLimiter.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── .gitignore
└── README.md


##🔌 API Endpoints
Method	Endpoint	Description
GET	/api/health	Server health check
GET	/api/stats	Server statistics

##🎨 Socket Events
Client → Server
user_join - User joins chat

send_message - Send message to room

private_message - Send private message

typing - Typing indicator

Server → Client
receive_message - Receive new message

user_list - Online users update

typing_users - Typing indicators

user_joined - User joined notification

##🚀 Deployment
Frontend (Vercel/Netlify)
bash
cd client
npm run build
Backend (Railway/Render)
Set environment variables

Start command: npm start

##🤝 Contributing
Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

##📝 License
This project is licensed under the MIT License.
