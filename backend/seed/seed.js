// ======================================================
// USERS
// ======================================================

const users = [
  {
    username: "TechCreator",
    email: "techcreator@example.com",
    password: "password123",
  },
  {
    username: "MusicHub",
    email: "musichub@example.com",
    password: "password123",
  },
  {
    username: "GameZone",
    email: "gamezone@example.com",
    password: "password123",
  },
  {
    username: "LearnWithMe",
    email: "learnwithme@example.com",
    password: "password123",
  },
  {
    username: "CodeMaster",
    email: "codemaster@example.com",
    password: "password123",
  },
  {
    username: "BeatStudio",
    email: "beatstudio@example.com",
    password: "password123",
  },
  {
    username: "PixelGamer",
    email: "pixelgamer@example.com",
    password: "password123",
  },
  {
    username: "StudyCentral",
    email: "studycentral@example.com",
    password: "password123",
  },
];


// ======================================================
// CHANNELS
// ======================================================

const channels = [
  {
    channelName: "Tech Creator",
    description:
      "Technology tutorials, programming and developer tips.",
    youtubeHandle: "TechCreator",
  },
  {
    channelName: "Music Hub",
    description:
      "Music, performances and entertainment.",
    youtubeHandle: "MusicHub",
  },
  {
    channelName: "Game Zone",
    description:
      "Gaming videos, reviews and gameplay.",
    youtubeHandle: "GameZone",
  },
  {
    channelName: "Learn With Me",
    description:
      "Educational content and useful learning resources.",
    youtubeHandle: "LearnWithMe",
  },
  {
    channelName: "Code Master",
    description:
      "Programming tutorials, coding projects and software development.",
    youtubeHandle: "CodeMaster",
  },
  {
    channelName: "Beat Studio",
    description:
      "Music, playlists, performances and relaxing sounds.",
    youtubeHandle: "BeatStudio",
  },
  {
    channelName: "Pixel Gamer",
    description:
      "Gaming news, gameplay, reviews and gaming highlights.",
    youtubeHandle: "PixelGamer",
  },
  {
    channelName: "Study Central",
    description:
      "Study tips, productivity, education and learning resources.",
    youtubeHandle: "StudyCentral",
  },
];


// ======================================================
// VIDEOS
// ======================================================

const videos = [

  // ------------------------------------------------------
  // TECH CREATOR
  // ------------------------------------------------------

  {
    title: "Learn JavaScript in 20 Minutes",
    description:
      "A beginner-friendly introduction to JavaScript fundamentals.",
    category: "Education",
    videoId: "W6NZfCO5SIk",
    channelIndex: 0,
  },

  {
    title: "React JS Full Course",
    description:
      "Learn React fundamentals and build modern React applications.",
    category: "Technology",
    videoId: "bMknfKXIFA8",
    channelIndex: 0,
  },

  {
    title: "Node.js Backend Tutorial",
    description:
      "Learn how to build backend applications using Node.js.",
    category: "Technology",
    videoId: "Oe421EPjeBE",
    channelIndex: 0,
  },

  {
    title: "MongoDB Beginner Tutorial",
    description:
      "Learn MongoDB databases, collections and CRUD operations.",
    category: "Education",
    videoId: "c2M-rlkkT5o",
    channelIndex: 0,
  },

  {
    title: "HTML Full Course",
    description:
      "Learn HTML from the basics and build your first webpage.",
    category: "Technology",
    videoId: "pQN-pnXPaVg",
    channelIndex: 0,
  },

  {
    title: "CSS Full Course",
    description:
      "Learn CSS styling, layouts, Flexbox and Grid.",
    category: "Technology",
    videoId: "1Rs2ND1ryYc",
    channelIndex: 0,
  },

  {
    title: "Git and GitHub Tutorial",
    description:
      "Learn Git version control and GitHub workflows.",
    category: "Technology",
    videoId: "RGOj5yH7evk",
    channelIndex: 0,
  },

  {
    title: "Python Programming for Beginners",
    description:
      "Learn Python programming from the fundamentals.",
    category: "Education",
    videoId: "rfscVS0vtbw",
    channelIndex: 0,
  },


  // ------------------------------------------------------
  // MUSIC HUB
  // ------------------------------------------------------

  {
    title: "Relaxing Music Mix",
    description:
      "Relaxing music for studying, working and concentration.",
    category: "Music",
    videoId: "5qap5aO4i9A",
    channelIndex: 1,
  },

  {
    title: "Best Guitar Performance",
    description:
      "Enjoy an amazing guitar performance.",
    category: "Music",
    videoId: "2Vv-BfVoq4g",
    channelIndex: 1,
  },

  {
    title: "Top Music Collection",
    description:
      "A collection of popular music and entertainment.",
    category: "Entertainment",
    videoId: "kJQP7kiw5Fk",
    channelIndex: 1,
  },


  // ------------------------------------------------------
  // GAME ZONE
  // ------------------------------------------------------

  {
    title: "Epic Gaming Gameplay",
    description:
      "An exciting gaming gameplay session.",
    category: "Gaming",
    videoId: "aqz-KE-bpKQ",
    channelIndex: 2,
  },

  {
    title: "Gaming Setup Tour",
    description:
      "Check out a complete gaming setup.",
    category: "Gaming",
    videoId: "3AtDnEC4zak",
    channelIndex: 2,
  },

  {
    title: "Gaming Highlights",
    description:
      "Amazing gaming moments and highlights.",
    category: "Gaming",
    videoId: "mK9xZQJQY6M",
    channelIndex: 2,
  },


  // ------------------------------------------------------
  // LEARN WITH ME
  // ------------------------------------------------------

  {
    title: "How to Study Effectively",
    description:
      "Useful techniques for studying more effectively.",
    category: "Education",
    videoId: "IlU-zDU6aQ0",
    channelIndex: 3,
  },

  {
    title: "Learn Faster With These Techniques",
    description:
      "Practical learning techniques to improve your study habits.",
    category: "Education",
    videoId: "UB1O30fR-EE",
    channelIndex: 3,
  },

  {
    title: "Study Productivity Tips",
    description:
      "Simple productivity tips for students.",
    category: "Education",
    videoId: "arj7oStGLkU",
    channelIndex: 3,
  },


  // ------------------------------------------------------
  // CODE MASTER
  // ------------------------------------------------------

  {
    title: "C++ Programming Tutorial",
    description:
      "Learn the fundamentals of C++ programming.",
    category: "Technology",
    videoId: "vLnPwxZdW4Y",
    channelIndex: 4,
  },

  {
    title: "SQL Tutorial for Beginners",
    description:
      "Learn SQL queries and database fundamentals.",
    category: "Education",
    videoId: "HXV3zeQKqGY",
    channelIndex: 4,
  },

  {
    title: "Express.js REST API Tutorial",
    description:
      "Build REST APIs using Express.js and Node.js.",
    category: "Technology",
    videoId: "LgdSEWfGIlc",
    channelIndex: 4,
  },


  // ------------------------------------------------------
  // BEAT STUDIO
  // ------------------------------------------------------

  {
    title: "Relaxing Beats",
    description:
      "Relaxing beats for studying and working.",
    category: "Music",
    videoId: "DWcJFNfaw9c",
    channelIndex: 5,
  },

  {
    title: "Music for Concentration",
    description:
      "Background music for focus and concentration.",
    category: "Music",
    videoId: "sjkrrmBnpGE",
    channelIndex: 5,
  },

  {
    title: "Chill Music Mix",
    description:
      "A relaxing collection of chill music.",
    category: "Music",
    videoId: "7NOSDKb0HlU",
    channelIndex: 5,
  },


  // ------------------------------------------------------
  // PIXEL GAMER
  // ------------------------------------------------------

  {
    title: "Minecraft Gameplay",
    description:
      "Minecraft gameplay and adventure.",
    category: "Gaming",
    videoId: "MmB9b5njVbA",
    channelIndex: 6,
  },

  {
    title: "Gaming Walkthrough",
    description:
      "Complete gaming walkthrough and gameplay.",
    category: "Gaming",
    videoId: "xvFZjo5PgG0",
    channelIndex: 6,
  },

  {
    title: "Best Gaming Moments",
    description:
      "A collection of exciting gaming moments.",
    category: "Gaming",
    videoId: "dQw4w9WgXcQ",
    channelIndex: 6,
  },


  // ------------------------------------------------------
  // STUDY CENTRAL
  // ------------------------------------------------------

  {
    title: "Study Tips for Students",
    description:
      "Useful study strategies for students.",
    category: "Education",
    videoId: "TQMbvJNRpLE",
    channelIndex: 7,
  },

  {
    title: "Time Management for Students",
    description:
      "Learn practical time management techniques.",
    category: "Education",
    videoId: "oTugjssqOT0",
    channelIndex: 7,
  },

  {
    title: "How to Stay Focused",
    description:
      "Practical techniques to improve focus while studying.",
    category: "Education",
    videoId: "z6X5oEIg6Ak",
    channelIndex: 7,
  },
];


// ======================================================
// EXPORT
// ======================================================

export {
  users,
  channels,
  videos,
};