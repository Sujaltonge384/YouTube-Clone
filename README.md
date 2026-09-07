# 🎬 YouTube Clone — MERN Stack

<p align="center">
  A full-stack YouTube-inspired video streaming application built with the MERN stack.
</p>

<p align="center">
  <strong>React</strong> •
  <strong>Node.js</strong> •
  <strong>Express.js</strong> •
  <strong>MongoDB</strong> •
  <strong>JWT</strong>
</p>

---

## 📌 About The Project

This project is a **full-stack YouTube Clone** developed using the **MERN Stack**.

The application replicates the core YouTube experience, including:

- 🎥 Video browsing
- 🔎 Video title search
- 🏷️ Category filtering
- ▶️ Video playback
- 🔐 User authentication
- 📡 Channel creation
- 🎬 Video management
- 💬 Comment management
- 👍 Like / dislike actions
- 📱 Responsive design
- 🗄️ MongoDB data persistence

The project follows a structured frontend and backend architecture with REST APIs, JWT authentication, Mongoose models, and reusable React components.

---

# ✨ Features

| Feature | Description |
|---|---|
| 🏠 Home Page | Displays videos in a YouTube-style responsive grid |
| 🔎 Search | Search videos by title |
| 🏷️ Categories | Filter videos by category |
| 🔐 Authentication | Register and login using JWT |
| 👤 User Profile | Displays authenticated user's information |
| 📡 Channels | Create and view channels |
| 🎥 Video CRUD | Create, update and delete channel videos |
| ▶️ Video Player | Watch videos using embedded video URLs |
| 👍 Like | Like videos |
| 👎 Dislike | Dislike videos |
| 💬 Comments | Full comment CRUD functionality |
| 🖼️ Thumbnails | Video thumbnails stored as URLs |
| 📱 Responsive UI | Desktop, tablet and mobile support |
| 🗄️ MongoDB | Persistent application data |
| 🔒 Authorization | Users can modify only their own content |

---

# 🛠️ Tech Stack

## Frontend

- ⚛️ React
- ⚡ Vite
- 🧭 React Router
- 📡 Axios
- 🎨 CSS

## Backend

- 🟢 Node.js
- 🚂 Express.js
- 🍃 Mongoose
- 🔐 JSON Web Token
- 🔒 bcryptjs
- 🌐 CORS

## Database

- 🍃 MongoDB

---

# 🏗️ Application Architecture

```text
                    ┌─────────────────────┐
                    │       React         │
                    │      Frontend       │
                    └──────────┬──────────┘
                               │
                             Axios
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Express        │
                    │       REST API      │
                    └──────────┬──────────┘
                               │
                         Controllers
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Mongoose       │
                    │       Models        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      MongoDB        │
                    │      Database       │
                    └─────────────────────┘
```

---

# 📁 Project Structure

```text
youtube-clone/
│
├── 📂 frontend/
│   │
│   ├── 📂 src/
│   │   │
│   │   ├── 📂 components/
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── AuthLayout.jsx
│   │   │   ├── VideoCard.jsx
│   │   │   ├── RecommendedVideoCard.jsx
│   │   │   ├── Comments.jsx
│   │   │   └── CommentItem.jsx
│   │   │
│   │   ├── 📂 pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── VideoPlayer.jsx
│   │   │   └── Channel.jsx
│   │   │
│   │   ├── 📂 context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── 📂 services/
│   │   │   └── api.js
│   │   │
│   │   ├── 📂 hooks/
│   │   ├── 📂 utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   └── package.json
│
├── 📂 backend/
│   │
│   ├── 📂 config/
│   │   └── db.js
│   │
│   ├── 📂 controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── channelController.js
│   │   ├── videoController.js
│   │   └── commentController.js
│   │
│   ├── 📂 middleware/
│   │   └── authMiddleware.js
│   │
│   ├── 📂 models/
│   │   ├── User.js
│   │   ├── Channel.js
│   │   ├── Video.js
│   │   └── Comment.js
│   │
│   ├── 📂 routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── channelRoutes.js
│   │   ├── videoRoutes.js
│   │   └── commentRoutes.js
│   │
│   ├── 📂 seed/
│   │   ├── data.js
│   │   └── seed.js
│   │
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
├── 📂 screenshots/
│   ├── home.png
│   ├── video-player.png
│   ├── channel.png
│   ├── login.png
│   ├── register.png
│   └── mobile.png
│
├── .gitignore
└── README.md
```

---

# 🔐 Authentication

Authentication is implemented using **JWT**.

## Authentication Flow

```text
                Register
                   │
                   ▼
           Password Hashing
               bcryptjs
                   │
                   ▼
            MongoDB User
                   │
                   ▼
                 Login
                   │
                   ▼
              JWT Token
                   │
                   ▼
            localStorage
                   │
                   ▼
          Protected Requests
                   │
                   ▼
        Authorization: Bearer
```

### Protected Request

```http
Authorization: Bearer <token>
```

The backend authentication middleware:

1. Reads the `Authorization` header.
2. Extracts the JWT token.
3. Verifies the token.
4. Gets the authenticated user's ID.
5. Adds the user ID to the request.
6. Allows the protected controller to continue.

---

# 🗄️ Database Design

The application uses four main MongoDB collections.

```text
MongoDB
│
├── 👤 users
│
├── 📡 channels
│
├── 🎥 videos
│
└── 💬 comments
```

---

## 👤 Users

```text
username
email
password
avatar
channels
createdAt
updatedAt
```

Passwords are hashed before being stored in MongoDB.

---

## 📡 Channels

```text
channelName
owner
description
channelAvatar
channelBanner
subscribers
videos
createdAt
updatedAt
```

The `owner` field references a `User`.

---

## 🎥 Videos

```text
title
description
videoUrl
thumbnailUrl
category
channel
uploader
views
likes
dislikes
uploadDate
createdAt
updatedAt
```

The `channel` field references a `Channel`.

---

## 💬 Comments

```text
text
user
video
createdAt
updatedAt
```

The `user` field references a `User`.

The `video` field references a `Video`.

---

# 🔗 REST API

## 🔐 Authentication

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login user |

---

## 👤 Users

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/users/me` | Get current authenticated user |

---

## 📡 Channels

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/channels` | Create a channel |
| `GET` | `/api/channels/my-channel` | Get logged-in user's channel |
| `GET` | `/api/channels/:id` | Get channel by ID |

---

## 🎥 Videos

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/videos` | Get all videos |
| `GET` | `/api/videos/:id` | Get video by ID |
| `POST` | `/api/videos` | Create a video |
| `PUT` | `/api/videos/:id` | Update a video |
| `DELETE` | `/api/videos/:id` | Delete a video |
| `POST` | `/api/videos/:id/like` | Like a video |
| `POST` | `/api/videos/:id/dislike` | Dislike a video |

---

## 💬 Comments

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/comments` | Create comment |
| `GET` | `/api/comments/video/:videoId` | Get video comments |
| `PUT` | `/api/comments/:id` | Update comment |
| `DELETE` | `/api/comments/:id` | Delete comment |

---

# ⚙️ Installation

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/Sujaltonge384/YouTube-Clone.git
cd youtube-clone
```

---

# ⚙️ Backend Setup

Open a terminal and run:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `backend` folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

> ⚠️ Never commit your `.env` file to GitHub.

---

## ▶️ Start Backend

```bash
npm run dev
```

Backend server:

```text
http://localhost:5000
```

---

# 🌱 Seed the Database

The project includes seed data for development and demonstration.

Run:

```bash
npm run seed
```

The seed process creates:

- 👤 Users
- 📡 Channels
- 🖼️ Channel avatars
- 🖼️ Channel banners
- 🎥 Videos
- 🖼️ Video thumbnails
- 💬 Comments
- 📊 Random view counts
- 👍 Random like counts
- 👎 Random dislike counts

> ⚠️ **Important:** The seed script clears the existing users, channels, videos and comments before inserting the sample data.

---

# ⚛️ Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 🧪 Application Flow

## 🔐 Authentication

```text
Register
   ↓
Login
   ↓
JWT Token
   ↓
Authenticated User
```

---

## 📡 Channel

```text
Login
   ↓
My Channel
   ↓
Create Channel
   ↓
Channel Page
```

---

## 🎥 Video Management

```text
My Channel
   ↓
Upload Video
   ↓
Video Added
   ↓
Edit Video
   ↓
Video Updated
   ↓
Delete Video
   ↓
Video Removed
```

---

## 💬 Comment Management

```text
Open Video
   ↓
Add Comment
   ↓
Comment Appears
   ↓
Edit Comment
   ↓
Comment Updated
   ↓
Delete Comment
   ↓
Comment Removed
```

---

# 🔎 Search

The application supports searching videos by title.

```text
Search Bar
     ↓
Search Video Titles
     ↓
Matching Videos
```

Search is **case-insensitive** and works together with category filtering.

---

# 🏷️ Category Filtering

```text
Click Category
      ↓
Filter Videos
      ↓
Display Matching Videos
```

Available categories:

- All
- Music
- Gaming
- Education
- Technology
- Sports
- Entertainment

---

# 📱 Responsive Design

The interface adapts to different screen sizes.

## 🖥️ Desktop

```text
┌─────────────────────────────────────────────┐
│ Header                                      │
├────────────┬────────────────────────────────┤
│ Sidebar    │ Video Grid                     │
│            │                                │
│            │ ┌────┐ ┌────┐ ┌────┐ ┌────┐ │
│            │ │ 🎥 │ │ 🎥 │ │ 🎥 │ │ 🎥 │ │
│            │ └────┘ └────┘ └────┘ └────┘ │
└────────────┴────────────────────────────────┘
```

## 📱 Mobile

```text
┌─────────────────────┐
│ Header              │
├─────────────────────┤
│                     │
│ Video               │
│                     │
│ ┌─────────────────┐ │
│ │     Thumbnail   │ │
│ └─────────────────┘ │
│ Title               │
│ Channel             │
│ Views               │
│                     │
└─────────────────────┘
```

The layout supports:

- 🖥️ Desktop
- 💻 Tablet
- 📱 Mobile

---

# 🛡️ Security

The application includes:

- 🔒 Password hashing with `bcryptjs`
- 🔑 JWT authentication
- 🛡️ Protected API routes
- 👤 User authorization
- 📺 Video owner authorization
- 💬 Comment owner authorization
- 🔐 Environment variables
- 🚫 `.env` excluded from Git

---

# 🌱 Seed Data

The project includes sample data for development and demonstration.

The seed database contains:

```text
👤 Users
📡 Channels
🎥 Videos
💬 Comments
```

Video metadata includes:

```text
YouTube Video ID
Video URL
Thumbnail URL
Category
Channel
Uploader
Views
Likes
Dislikes
Upload Date
```

The application stores **video metadata and external video URLs** instead of storing large video files directly inside MongoDB.

---

# 🧩 Frontend Architecture

The frontend follows a **component-based architecture**.

## Components

Reusable components include:

```text
Header
Sidebar
Layout
AuthLayout
VideoCard
RecommendedVideoCard
Comments
CommentItem
```

---

## Pages

Application pages include:

```text
Home
Login
Register
VideoPlayer
Channel
```

---

## Authentication Context

Authentication state is managed using:

```text
AuthContext
```

The context provides:

```text
user
login()
logout()
```

to the application.

---

# 🧩 Backend Architecture

The backend follows a structured architecture:

```text
Routes
   ↓
Controllers
   ↓
Models
   ↓
MongoDB
```

### Routes

Handle HTTP requests and map them to controllers.

### Controllers

Contain application and business logic.

### Models

Define MongoDB schemas using Mongoose.

### Middleware

Handles authentication and authorization.

---

# 🌳 Git Development

The project was developed using meaningful, feature-based Git commits.

Examples:

```text
chore: initialize YouTube clone project

chore: initialize React frontend with Vite

chore: initialize Express backend

feat: implement user registration

feat: implement user login with JWT

feat: add JWT authentication middleware

feat: add video data model

feat: implement channel creation and retrieval

feat: implement video creation API

feat: implement video update and delete APIs

feat: implement comments CRUD APIs

feat: implement frontend authentication

feat: implement video title search

feat: add video category filters

feat: add channel navigation

feat: finalize video data, channel logos, and randomized home
```

The project uses separate meaningful commits for frontend and backend development.

---

# 📋 Requirements Checklist

| Area | Status |
|---|:---:|
| 🏠 Home Page | ✅ |
| 📺 YouTube-style Header | ✅ |
| 📂 Sidebar | ✅ |
| 🎥 Video Grid | ✅ |
| 🖼️ Video Thumbnails | ✅ |
| 🔎 Search by Title | ✅ |
| 🏷️ Category Filters | ✅ |
| 🔐 Registration | ✅ |
| 🔑 Login | ✅ |
| 🚪 Logout | ✅ |
| 🛡️ JWT Authentication | ✅ |
| ▶️ Video Player | ✅ |
| 👍 Like | ✅ |
| 👎 Dislike | ✅ |
| 💬 Comment CRUD | ✅ |
| 📡 Channel Creation | ✅ |
| 📡 Channel Page | ✅ |
| 🖼️ Channel Logos | ✅ |
| 🖼️ Channel Banner | ✅ |
| 🎥 Video CRUD | ✅ |
| 🎲 Randomized Home | ✅ |
| 📱 Responsive Design | ✅ |
| 🗄️ MongoDB | ✅ |
| 🔗 REST APIs | ✅ |
| 🌳 Git Version Control | ✅ |
| 📖 Documentation | ✅ |

---

# 🔮 Future Improvements

Possible future improvements include:

- 🔔 Notifications
- 📡 Subscribe / Unsubscribe
- ❤️ Per-user likes and dislikes
- 📜 Watch history
- 📂 Playlists
- 🔥 Trending videos
- 💬 Nested comments
- ☁️ Cloud video uploads
- 🤖 Advanced recommendation system
- 🌙 Dark mode
- ♾️ Infinite scrolling
- 📡 YouTube Data API integration

---

# ⚠️ Disclaimer

This project is created for **educational and demonstration purposes**.

It is not affiliated with, sponsored by, or endorsed by **YouTube or Google**.

Videos are displayed using external video embeds and publicly available thumbnail URLs.

---

# 👨‍💻 Author

## Sujal

A full-stack MERN YouTube Clone project created to demonstrate practical:

- Frontend development
- Backend development
- REST API development
- Database integration
- Authentication
- Authorization
- Responsive UI development
- Git and GitHub workflow

---

# 🧰 Built With

<p align="center">

⚛️ React  
⚡ Vite  
🧭 React Router  
📡 Axios  
🟢 Node.js  
🚂 Express.js  
🍃 MongoDB  
🦫 Mongoose  
🔐 JWT  
🔒 bcryptjs  
🎨 CSS

</p>

---

# ⭐ Project Highlights

```text
                    🎬 YOUTUBE CLONE
                           │
              ┌────────────┴────────────┐
              │                         │
         🎨 FRONTEND                ⚙️ BACKEND
              │                         │
            React                    Express
              │                         │
            Vite                    Node.js
              │                         │
           Axios                      JWT
              │                         │
              └────────────┬────────────┘
                           │
                        MongoDB
                           │
             ┌─────────────┼─────────────┐
             │             │             │
           👤 Users     🎥 Videos    📡 Channels
                                         │
                                     💬 Comments
```

---

# ❤️ Built with the MERN Stack

<p align="center">

**React + Node.js + Express + MongoDB**

</p>

---

<p align="center">
  ⭐ If you found this project useful, consider giving it a star!
</p>

---

## Screenshots

# Home Page
<img width="1917" height="978" alt="image" src="https://github.com/user-attachments/assets/1d668bfe-4239-4d01-a054-109b0e526d3a" />

# Register page
<img width="1917" height="997" alt="image" src="https://github.com/user-attachments/assets/edc05cd2-2cc0-4404-9b5e-a6b33b3431f2" />

# login page
<img width="1917" height="982" alt="image" src="https://github.com/user-attachments/assets/1bc2fd0a-4442-4833-a7e8-29abbd4cbf5c" />

# Create Channel page
<img width="1917" height="952" alt="image" src="https://github.com/user-attachments/assets/de17e448-38b7-4e9e-a2c2-603626db3fba" />


# myChannel page
<img width="1913" height="977" alt="image" src="https://github.com/user-attachments/assets/4e41ba2b-8723-42d5-9c09-477a22e8e0ba" />

# Channel page
<img width="1917" height="992" alt="image" src="https://github.com/user-attachments/assets/fe4c712d-9887-4c32-86b1-3bcaf31ab92f" />

# uplode video 
<img width="1915" height="986" alt="image" src="https://github.com/user-attachments/assets/8d201b4a-b341-44da-9fdf-2ff88db750a6" />
