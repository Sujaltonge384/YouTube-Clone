# 🎬 YouTube Clone

### A Full-Stack YouTube Experience Built with MERN

A responsive YouTube Clone built from the ground up using **React, Node.js, Express.js, MongoDB, and JWT authentication**.

The project recreates the core YouTube experience with video browsing, search, categories, authentication, channels, video management, comments, likes/dislikes, recommendations, and responsive design.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🏠 **Home Page** | Browse videos in a responsive YouTube-style layout |
| 🔎 **Search** | Search videos by title |
| 🏷️ **Categories** | Filter videos by category |
| 🔐 **Authentication** | Register, login and logout using JWT |
| 📺 **Video Player** | Watch embedded YouTube videos |
| 👍 **Likes / Dislikes** | Interact with videos |
| 💬 **Comments** | Full comment CRUD functionality |
| 📡 **Channels** | Create and view channels |
| 🎥 **Video CRUD** | Upload, edit and delete channel videos |
| 🖼️ **Channel Logos** | Display channel avatars |
| 🎲 **Randomized Feed** | Videos are randomized on the Home page |
| 📱 **Responsive UI** | Desktop, tablet and mobile support |

---

# 🖥️ Screenshots

## 🏠 Home Page

![Home Page](screenshots/home.png)

The Home page includes:

- YouTube-style header
- Sidebar navigation
- Search bar
- Category filters
- Randomized video feed
- Video thumbnails
- Channel logos
- View counts

---

## 📺 Video Player

![Video Player](screenshots/video-player.png)

The video player page includes:

- Embedded YouTube player
- Video title
- Channel information
- Channel logo
- View count
- Description
- Like / dislike buttons
- Comments
- Recommended videos

---

## 📡 Channel Page

![Channel Page](screenshots/channel.png)

The channel page displays:

- Channel banner
- Channel logo
- Channel name
- Subscriber count
- Channel description
- Uploaded videos
- Video management controls for the owner

---

## 🔐 Authentication

### Login

![Login Page](screenshots/login.png)

### Register

![Register Page](screenshots/register.png)

Users can create an account and securely authenticate using JWT.

---

## 📱 Responsive Design

![Mobile View](screenshots/mobile.png)

The application adapts to:

- 🖥️ Desktop
- 💻 Tablet
- 📱 Mobile

---

# 🛠️ Tech Stack

## Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

## Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

---

# 🧠 How It Works

The application follows a standard full-stack architecture:

```text
                    ┌──────────────────┐
                    │      React       │
                    │    Frontend      │
                    └────────┬─────────┘
                             │
                          Axios
                             │
                             ▼
                    ┌──────────────────┐
                    │     Express      │
                    │      REST API    │
                    └────────┬─────────┘
                             │
                     Controllers
                             │
                             ▼
                    ┌──────────────────┐
                    │     Mongoose     │
                    │      Models      │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │     MongoDB      │
                    │     Database     │
                    └──────────────────┘


## 📁 Project Structure

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


## 🔐 Authentication Flow

## Authentication is implemented using JWT.

             Register
                │
                ▼
          Password Hash
             bcrypt
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
        localStorage Token
                │
                ▼
       Protected API Routes

Protected requests use:

Authorization: Bearer <token>

The backend authentication middleware:

Reads the Authorization header.
Extracts the JWT token.
Verifies the token.
Gets the authenticated user's ID.
Adds the user ID to the request.
Allows the protected controller to continue.
🗄️ Database Design

The application uses four main MongoDB collections:

MongoDB
│
├── 👤 users
│
├── 📡 channels
│
├── 🎥 videos
│
└── 💬 comments
👤 Users
username
email
password
avatar
channels
createdAt
updatedAt

Passwords are hashed before being stored.

📡 Channels
channelName
owner
description
channelAvatar
channelBanner
subscribers
videos
createdAt
updatedAt

The owner field references a User.

🎥 Videos
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

The channel field references a Channel.

💬 Comments
text
user
video
createdAt
updatedAt

The user field references a User.

The video field references a Video.

🔗 API Endpoints
🔐 Authentication
Method	Endpoint	Description
POST	/api/auth/register	Register a user
POST	/api/auth/login	Login a user
👤 Users
Method	Endpoint	Description
GET	/api/users/me	Get current user
📡 Channels
Method	Endpoint	Description
POST	/api/channels	Create channel
GET	/api/channels/my-channel	Get logged-in user's channel
GET	/api/channels/:id	Get channel
🎥 Videos
Method	Endpoint	Description
GET	/api/videos	Get all videos
GET	/api/videos/:id	Get a video
POST	/api/videos	Create video
PUT	/api/videos/:id	Update video
DELETE	/api/videos/:id	Delete video
POST	/api/videos/:id/like	Like video
POST	/api/videos/:id/dislike	Dislike video
💬 Comments
Method	Endpoint	Description
POST	/api/comments	Create comment
GET	/api/comments/video/:videoId	Get video comments
PUT	/api/comments/:id	Update comment
DELETE	/api/comments/:id	Delete comment
⚙️ Installation
1️⃣ Clone the Repository
git clone YOUR_GITHUB_REPOSITORY_URL
cd youtube-clone
2️⃣ Backend Setup

Open a terminal:

cd backend

Install dependencies:

npm install

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Start the backend:

npm run dev

Backend:

http://localhost:5000
3️⃣ Seed the Database

To create sample users, channels, videos and comments:

npm run seed

The seed process creates:

👤 Users
📡 Channels
🖼️ Channel avatars
🖼️ Channel banners
🎥 Videos
🖼️ Video thumbnails
💬 Comments
📊 Random view counts
👍 Random like counts
👎 Random dislike counts

⚠️ Important: The seed script clears the existing users, channels, videos and comments before inserting the sample data.

4️⃣ Frontend Setup

Open another terminal:

cd frontend

Install dependencies:

npm install

Start the frontend:

npm run dev

Frontend:

http://localhost:5173
🧪 Application Flow
🔐 Authentication
Register
   ↓
Login
   ↓
JWT Token
   ↓
Authenticated User
📡 Channel
Login
   ↓
My Channel
   ↓
Create Channel
   ↓
Channel Page
🎥 Video Management
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
💬 Comment Management
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
🔎 Search
Search Bar
     ↓
Search Video Titles
     ↓
Matching Videos

Search is case-insensitive and works together with category filtering.

🏷️ Category Filtering
Click Category
      ↓
Filter Videos
      ↓
Display Matching Videos

Available categories:

All
Music
Gaming
Education
Technology
Sports
Entertainment
📱 Responsive Design

The interface adapts to different screen sizes.

Desktop
   │
   ├── Full Sidebar
   ├── Multi-column Video Grid
   └── Video + Recommendation Layout

Tablet
   │
   ├── Compact Layout
   └── Responsive Video Grid

Mobile
   │
   ├── Compact Header
   ├── Responsive Content
   └── Stacked Video Layout
🛡️ Security

The application includes:

🔒 Password hashing with bcryptjs
🔑 JWT authentication
🛡️ Protected API routes
👤 User authorization
📺 Video owner authorization
💬 Comment owner authorization
🔐 Environment variables
🚫 .env excluded from Git
🌱 Seed Data

The project includes sample data for development and demonstration.

The seed database contains:

👤 Users
📡 Channels
🎥 Videos
💬 Comments

Video metadata includes:

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

The application stores video metadata and external video URLs instead of storing large video files directly in MongoDB.

🧩 Frontend Architecture

The frontend follows a component-based architecture.

Components

Reusable components include:

Header
Sidebar
Layout
AuthLayout
VideoCard
RecommendedVideoCard
Comments
CommentItem
Pages

Application pages include:

Home
Login
Register
VideoPlayer
Channel
Authentication Context

Authentication state is managed using:

AuthContext

The context provides:

user
login()
logout()

to the application.

🧩 Backend Architecture

The backend follows a structured architecture:

Routes
   ↓
Controllers
   ↓
Models
   ↓
MongoDB
Routes

Handle HTTP requests and map them to controllers.

Controllers

Contain the application and business logic.

Models

Define MongoDB schemas using Mongoose.

Middleware

Handles authentication and authorization.

🌳 Git Development

The project was developed using meaningful feature-based Git commits.

Examples:

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

The project uses separate meaningful commits for frontend and backend features.

📋 Requirements Checklist
Area	Status
🏠 Home Page	✅
📺 YouTube-style Header	✅
📂 Sidebar	✅
🎥 Video Grid	✅
🖼️ Video Thumbnails	✅
🔎 Search by Title	✅
🏷️ Category Filters	✅
🔐 Registration	✅
🔑 Login	✅
🚪 Logout	✅
🛡️ JWT Authentication	✅
▶️ Video Player	✅
👍 Like	✅
👎 Dislike	✅
💬 Comment CRUD	✅
📡 Channel Creation	✅
📡 Channel Page	✅
🖼️ Channel Logos	✅
🖼️ Channel Banner	✅
🎥 Video CRUD	✅
🎲 Randomized Home	✅
📱 Responsive Design	✅
🗄️ MongoDB	✅
🔗 REST APIs	✅
🌳 Git Version Control	✅
📖 Documentation	✅
🔮 Future Improvements

Possible future improvements include:

🔔 Notifications
📡 Subscribe / Unsubscribe
❤️ Per-user likes and dislikes
📜 Watch history
📂 Playlists
🔥 Trending videos
💬 Nested comments
☁️ Cloud video uploads
🤖 Advanced recommendation system
🌙 Dark mode
♾️ Infinite scrolling
📡 YouTube Data API integration
⚠️ Disclaimer

This project is created for educational and demonstration purposes.

It is not affiliated with, sponsored by, or endorsed by YouTube or Google.

Videos are displayed using YouTube embeds and publicly available thumbnail URLs.

👨‍💻 Author
Sujal

A full-stack MERN YouTube Clone project created to demonstrate practical frontend and backend development skills.

Built With
React
Vite
React Router
Axios
Node.js
Express.js
MongoDB
Mongoose
JWT
bcryptjs
CSS
⭐ Project Highlights
                 🎬 YouTube Clone
                        │
          ┌─────────────┴─────────────┐
          │                           │
      🎨 Frontend                 ⚙️ Backend
          │                           │
        React                      Express
          │                           │
        Vite                      Node.js
          │                           │
       Axios                         JWT
          │                           │
          └─────────────┬─────────────┘
                        │
                     MongoDB
                        │
             ┌──────────┼──────────┐
             │          │          │
           Users      Videos    Channels
                                   │
                               Comments
❤️ Built with the MERN Stack

React + Node.js + Express + MongoDB
