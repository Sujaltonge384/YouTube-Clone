# YouTube Clone - MERN Stack

A full-stack YouTube Clone built using the MERN stack.

This project recreates the core YouTube experience with video browsing, search, category filtering, user authentication, channels, video management, video playback, likes, dislikes, comments, recommendations, and responsive design.

---

## 📌 Project Overview

The application is divided into two main parts:

```text
Frontend
   ↓
React + Vite
   ↓
Axios
   ↓
Backend API
   ↓
Node.js + Express
   ↓
MongoDB

The project demonstrates full-stack development using the MERN stack with REST APIs, JWT authentication, MongoDB relationships, CRUD operations, and responsive UI design.

🚀 Features
🏠 Home Page

The Home page provides a YouTube-style browsing experience.

Features:

YouTube-style header
Hamburger menu
Sidebar navigation
Search bar
Category filters
Randomized video ordering
Responsive video grid
Video thumbnails
Video titles
Channel names
Channel logos
View counts
Categories

The application provides the following categories:

All
Music
Gaming
Education
Technology
Sports
Entertainment
🔎 Search

Users can search videos by title using the search bar in the header.

The search functionality:

Searches video titles
Is case-insensitive
Updates the displayed videos
Works together with category filtering

Example:

Search: React

The application displays videos whose titles contain:

React
🎲 Randomized Videos

The Home page randomizes the order of videos whenever the videos are loaded.

This provides a more realistic YouTube-style experience where the same videos do not always appear in the same order.

Recommended videos on the video player page are also randomized.

🔐 Authentication

The application supports user authentication using JWT.

Users can:

Register
Login
Logout
Stay authenticated using JWT
Create a channel
Upload videos
Edit their videos
Delete their videos
Create comments
Edit their comments
Delete their comments
Like videos
Dislike videos

Passwords are securely hashed using bcryptjs.

JWT tokens are used to protect authenticated API routes.

👤 User Interface

Before signing in, the header displays:

Sign In

After signing in, the header displays:

[Avatar] Username
My Channel
Logout

The avatar uses the first letter of the username.

📺 Video Player

The video player page includes:

Embedded YouTube video
Video title
Channel logo
Channel name
View count
Video description
Like button
Dislike button
Comments
Recommended videos

The channel logo and channel name are clickable.

Clicking the channel opens:

/channel/:channelId
👍 Like and Dislike

Authenticated users can like and dislike videos.

Example:

👍 1,250
👎 35

The like and dislike counts are stored in MongoDB and updated through the backend API.

💬 Comments

The project includes a complete comment CRUD system.

Users can:

Create comments
Read comments
Edit their own comments
Delete their own comments

Each comment contains:

text
user
video
createdAt
updatedAt

Users can only modify their own comments.

📺 Channels

Authenticated users can create their own channel.

A channel contains:

Channel name
Channel description
Channel logo
Channel banner
Subscriber count
Uploaded videos

The channel page displays all videos uploaded to that channel.

🎥 Video CRUD

Channel owners can manage their videos.

Authenticated channel owners can:

Create
Read
Update
Delete

videos.

Each video contains:

Title
Description
Video URL
Thumbnail URL
Category
Channel
Uploader
Views
Likes
Dislikes
Upload Date

Only the channel owner can update or delete videos.

🖼️ Video Thumbnails

Video thumbnails are generated using the YouTube video ID.

Example:

https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg

The video player uses the corresponding YouTube embed URL:

https://www.youtube.com/embed/VIDEO_ID

The application stores video URLs and thumbnail URLs rather than storing large video files directly in MongoDB.

🌐 Channel Logos

Channels support real channel avatar images.

The database stores:

channelAvatar

The frontend displays the channel logo in:

Home video cards
Recommended videos
Video player
Channel page

If an avatar is unavailable, the application falls back to the first letter of the channel name.

📱 Responsive Design

The application is designed to work across:

Desktop
Tablet
Mobile

Responsive CSS is used to adjust:

Header
Sidebar
Video grid
Video player
Recommended videos
Channel layout
Forms
🛠️ Technologies Used
Frontend
Technology	Purpose
React	User interface
Vite	Development and build tool
React Router	Client-side routing
Axios	API communication
CSS	Styling and responsive design
Backend
Technology	Purpose
Node.js	Backend runtime
Express.js	REST API
Mongoose	MongoDB object modeling
MongoDB	Database
JWT	Authentication
bcryptjs	Password hashing
CORS	Frontend/backend communication
📁 Project Structure
youtube-clone/
│
├── frontend/
│   │
│   ├── src/
│   │   │
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── AuthLayout.jsx
│   │   │   ├── VideoCard.jsx
│   │   │   ├── RecommendedVideoCard.jsx
│   │   │   ├── CommentItem.jsx
│   │   │   └── Comments.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── VideoPlayer.jsx
│   │   │   └── Channel.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   └── package.json
│
├── backend/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── channelController.js
│   │   ├── videoController.js
│   │   └── commentController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Channel.js
│   │   ├── Video.js
│   │   └── Comment.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── channelRoutes.js
│   │   ├── videoRoutes.js
│   │   └── commentRoutes.js
│   │
│   ├── seed/
│   │   ├── data.js
│   │   └── seed.js
│   │
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
├── screenshots/
│   ├── home.png
│   ├── video-player.png
│   ├── channel.png
│   ├── login.png
│   ├── register.png
│   └── mobile.png
│
├── .gitignore
└── README.md
🗄️ MongoDB Database

The application uses four main MongoDB collections:

MongoDB
│
├── users
├── channels
├── videos
└── comments
Users Collection

Stores user information:

username
email
password
avatar
channels
createdAt
updatedAt

Passwords are hashed before being stored.

Channels Collection

Stores channel information:

channelName
owner
description
channelAvatar
channelBanner
subscribers
videos
createdAt
updatedAt

The owner field references the User collection.

Videos Collection

Stores video information:

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

The channel field references the Channel collection.

Comments Collection

Stores comment information:

text
user
video
createdAt
updatedAt

The user field references a User.

The video field references a Video.

🔗 API Endpoints
Authentication
Register
POST /api/auth/register
Login
POST /api/auth/login
👤 User API
Get Current User
GET /api/users/me

Requires authentication.

📺 Channel API
Create Channel
POST /api/channels

Protected route.

Get My Channel
GET /api/channels/my-channel

Protected route.

Get Channel
GET /api/channels/:id
🎥 Video API
Get All Videos
GET /api/videos
Get Single Video
GET /api/videos/:id
Create Video
POST /api/videos

Protected route.

Update Video
PUT /api/videos/:id

Protected route.

Delete Video
DELETE /api/videos/:id

Protected route.

Like Video
POST /api/videos/:id/like

Protected route.

Dislike Video
POST /api/videos/:id/dislike

Protected route.

💬 Comment API
Create Comment
POST /api/comments

Protected route.

Get Video Comments
GET /api/comments/video/:videoId
Update Comment
PUT /api/comments/:id

Protected route.

Delete Comment
DELETE /api/comments/:id

Protected route.

🔑 JWT Authentication

Protected requests use the following header:

Authorization: Bearer YOUR_JWT_TOKEN

The authentication middleware:

Reads the Authorization header.
Extracts the JWT token.
Verifies the token.
Gets the authenticated user's ID.
Adds the user ID to the request.
Allows the protected controller to continue.
⚙️ Installation
1. Clone the Repository
git clone YOUR_GITHUB_REPOSITORY_URL

Move into the project:

cd youtube-clone
📦 Backend Setup

Move into the backend directory:

cd backend

Install dependencies:

npm install

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Start the backend:

npm run dev

The backend runs on:

http://localhost:5000
🌱 Seed the Database

The project includes seed data for users, channels, videos and comments.

Run:

npm run seed

The seed process creates:

Sample users
Sample channels
Channel avatars
Channel banners
Sample videos
YouTube thumbnails
Video metadata
Sample comments

Warning: The seed script clears the existing users, channels, videos and comments before creating the sample data.

💻 Frontend Setup

Open another terminal.

Move into the frontend:

cd frontend

Install dependencies:

npm install

Start the development server:

npm run dev

The frontend normally runs on:

http://localhost:5173
🧪 Testing
Authentication Flow
Register
   ↓
Login
   ↓
JWT Token
   ↓
Username displayed
   ↓
Logout
Channel Flow
Login
   ↓
My Channel
   ↓
Create Channel
   ↓
Channel Created
Video CRUD Flow
My Channel
   ↓
Upload Video
   ↓
Video appears on Channel
   ↓
Edit Video
   ↓
Updated Video
   ↓
Delete Video
   ↓
Video Removed
Comment CRUD Flow
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
Search Flow
Enter Search Term
        ↓
Search Video Titles
        ↓
Matching Videos Displayed
Category Flow
Click Category
      ↓
Filter Videos
      ↓
Display Matching Videos

Search and category filters can be used together.

📸 Screenshots
🏠 Home Page

The Home page contains the YouTube-style header, sidebar, search bar, category filters and responsive video grid.

📺 Video Player

The Video Player page contains the embedded video, video information, channel details, likes, dislikes, comments and recommended videos.

📡 Channel Page

The Channel page displays the channel banner, channel logo, channel name, subscriber count, description and uploaded videos.

🔐 Login Page

Users can log into the application using their email and password.

📝 Register Page

New users can create an account using their username, email and password.

📱 Mobile Responsive View

The application adapts its layout for smaller mobile screens.

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

Handle HTTP endpoints.

Controllers

Contain application/business logic.

Models

Define MongoDB schemas using Mongoose.

Middleware

Handles authentication and authorization.

🔒 Security

The project implements several basic security practices:

Password hashing with bcryptjs
JWT authentication
Protected API routes
Video owner authorization
Comment owner authorization
Environment variables for sensitive values
.env excluded from Git
🌳 Git Workflow

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

📋 Project Requirements
Requirement	Status
Home Page	✅
YouTube-style Header	✅
Sidebar	✅
Video Grid	✅
Video Thumbnails	✅
Search by Title	✅
Category Filtering	✅
User Registration	✅
User Login	✅
JWT Authentication	✅
Logout	✅
Video Player	✅
Video Details	✅
Likes	✅
Dislikes	✅
Comments CRUD	✅
Channel Creation	✅
Channel Page	✅
Channel Logos	✅
Channel Banner	✅
Video CRUD	✅
Channel Navigation	✅
MongoDB	✅
Responsive Design	✅
REST APIs	✅
Git Version Control	✅
Documentation	✅
🔮 Future Improvements

Possible future improvements include:

Subscribe / unsubscribe functionality
Per-user like/dislike tracking
Watch history
Trending videos
Playlists
Nested comments
Real video upload using cloud storage
Advanced recommendation system
Infinite scrolling
Dark mode
Notifications
YouTube Data API integration
⚠️ Disclaimer

This project is an educational YouTube Clone created for learning and demonstration purposes.

It is not affiliated with, sponsored by, or endorsed by YouTube or Google.

Video content is referenced through YouTube embeds and thumbnail URLs.

👨‍💻 Author
Sujal

Full-stack MERN YouTube Clone project.

Built using:

React
Node.js
Express.js
MongoDB
Mongoose
JWT
Axios
CSS
⭐ Conclusion

This project demonstrates a complete MERN stack application combining:

React
   +
Node.js
   +
Express.js
   +
MongoDB
   +
JWT Authentication
   +
REST APIs
   +
CRUD Operations
   +
Search
   +
Category Filtering
   +
Responsive Design

The project recreates the core YouTube experience while demonstrating practical full-stack web development concepts.


### Screenshot folder

Before pushing the README, create:

```text
screenshots/
├── home.png
├── video-player.png
├── channel.png
├── login.png
├── register.png
└── mobile.png
