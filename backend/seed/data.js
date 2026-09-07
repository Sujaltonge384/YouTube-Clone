const users = [
  {
    username: "FreeCodeCamp",
    email: "freecodecamp@example.com",
    password: "password123",
  },
  {
    username: "TraversyMedia",
    email: "traversy@example.com",
    password: "password123",
  },
  {
    username: "NetNinja",
    email: "netninja@example.com",
    password: "password123",
  },
  {
    username: "Fireship",
    email: "fireship@example.com",
    password: "password123",
  },
  {
    username: "ProgrammingMosh",
    email: "mosh@example.com",
    password: "password123",
  },
  {
    username: "TechWorldNana",
    email: "nana@example.com",
    password: "password123",
  },
  {
    username: "Shirrako",
    email: "shirrako@example.com",
    password: "password123",
  },
  {
    username: "CS50",
    email: "cs50@example.com",
    password: "password123",
  },
];

const channels = [
  {
    channelName: "freeCodeCamp.org",
    description:
      "Learn to code for free with programming tutorials and full courses.",
    youtubeHandle: "freeCodeCamp",
  },
  {
    channelName: "Traversy Media",
    description:
      "Web development tutorials, crash courses and programming projects.",
    youtubeHandle: "TraversyMedia",
  },
  {
    channelName: "The Net Ninja",
    description:
      "Programming tutorials covering modern web development technologies.",
    youtubeHandle: "NetNinja",
  },
  {
    channelName: "Fireship",
    description:
      "High-intensity code tutorials and developer technology videos.",
    youtubeHandle: "Fireship",
  },
  {
    channelName: "Programming with Mosh",
    description:
      "Clear and practical programming tutorials for developers.",
    youtubeHandle: "programmingwithmosh",
  },
  {
    channelName: "TechWorld with Nana",
    description:
      "DevOps, Docker, Kubernetes, cloud and software engineering tutorials.",
    youtubeHandle: "TechWorldwithNana",
  },
  {
    channelName: "Shirrako",
    description:
      "Gaming walkthroughs, gameplay and gaming highlights.",
    youtubeHandle: "Shirrako",
  },
  {
    channelName: "CS50",
    description:
      "Harvard University's introduction to computer science and programming.",
    youtubeHandle: "cs50",
  },
];

const videos = [
  // ======================================================
  // FREECODECAMP
  // ======================================================

  {
    title: "Learn JavaScript - Full Course for Beginners",
    description:
      "Complete JavaScript course covering the fundamentals.",
    category: "Education",
    videoId: "PkZNo7MFNFg",
    channelIndex: 0,
  },
  {
    title: "React Course - Beginner's Tutorial",
    description:
      "Learn React fundamentals and build real-world projects.",
    category: "Technology",
    videoId: "bMknfKXIFA8",
    channelIndex: 0,
  },
  {
    title: "Node.js and Express.js - Full Course",
    description:
      "Learn Node.js, Express and REST API development.",
    category: "Technology",
    videoId: "Oe421EPjeBE",
    channelIndex: 0,
  },
  {
    title: "Learn MongoDB in 1 Hour",
    description:
      "Learn MongoDB databases and CRUD operations.",
    category: "Technology",
    videoId: "c2M-rlkkT5o",
    channelIndex: 0,
  },
  {
    title: "HTML Full Course",
    description:
      "Build websites with HTML from the ground up.",
    category: "Technology",
    videoId: "pQN-pnXPaVg",
    channelIndex: 0,
  },
  {
    title: "CSS Tutorial - Zero to Hero",
    description:
      "Complete CSS course covering layouts, Flexbox and Grid.",
    category: "Technology",
    videoId: "1Rs2ND1ryYc",
    channelIndex: 0,
  },
  {
    title: "Git and GitHub for Beginners",
    description:
      "Learn Git and GitHub with this beginner-friendly crash course.",
    category: "Technology",
    videoId: "RGOj5yH7evk",
    channelIndex: 0,
  },
  {
    title: "Learn Python - Full Course",
    description:
      "Complete Python programming course for beginners.",
    category: "Education",
    videoId: "rfscVS0vtbw",
    channelIndex: 0,
  },
  {
    title: "SQL Tutorial - Full Database Course",
    description:
      "Learn SQL and database fundamentals.",
    category: "Education",
    videoId: "HXV3zeQKqGY",
    channelIndex: 0,
  },
  {
    title: "TypeScript Course for Beginners",
    description:
      "Learn TypeScript from scratch.",
    category: "Technology",
    videoId: "BwuLxPH8IDs",
    channelIndex: 0,
  },

  // ======================================================
  // TRAVERSY MEDIA
  // ======================================================

  {
    title: "React JS Crash Course",
    description:
      "Learn React by building a practical task tracker application.",
    category: "Technology",
    videoId: "w7ejDZ8SWv8",
    channelIndex: 1,
  },
  {
    title: "JavaScript Crash Course",
    description:
      "Learn the fundamentals of modern JavaScript.",
    category: "Technology",
    videoId: "hdI2bqOjy3c",
    channelIndex: 1,
  },
  {
    title: "Vue JS Crash Course",
    description:
      "Learn Vue.js by building practical applications.",
    category: "Technology",
    videoId: "qZXt1Aom3Cs",
    channelIndex: 1,
  },
  {
    title: "Next.js Crash Course",
    description:
      "Learn routing, APIs, SSR and SSG with Next.js.",
    category: "Technology",
    videoId: "mTz0GXj8NN0",
    channelIndex: 1,
  },
  {
    title: "MongoDB Crash Course",
    description:
      "Learn MongoDB Atlas and database CRUD operations.",
    category: "Technology",
    videoId: "2QQGWYe7IDU",
    channelIndex: 1,
  },
  {
    title: "Express JS Crash Course",
    description:
      "Learn Express.js for Node.js backend development.",
    category: "Technology",
    videoId: "L72fhGm1tfE",
    channelIndex: 1,
  },

  // ======================================================
  // THE NET NINJA
  // ======================================================

  {
    title: "JavaScript DOM Manipulation",
    description:
      "Learn DOM manipulation with JavaScript.",
    category: "Education",
    videoId: "5fb2aPlgoys",
    channelIndex: 2,
  },
  {
    title: "Introduction to Programming",
    description:
      "Introduction to programming and computer science.",
    category: "Education",
    videoId: "zOjov-2OZ0E",
    channelIndex: 2,
  },
  {
    title: "Data Structures Full Course",
    description:
      "Learn fundamental data structures using C and C++.",
    category: "Education",
    videoId: "B31LgI4Y4DQ",
    channelIndex: 2,
  },

  // ======================================================
  // FIRESHIP
  // ======================================================

  {
    title: "Modern Web Development",
    description:
      "Developer-focused technology and web development content.",
    category: "Technology",
    videoId: "7t2alSnE2-I",
    channelIndex: 3,
  },

  // ======================================================
  // PROGRAMMING WITH MOSH
  // ======================================================

  {
    title: "JavaScript Programming Tutorial",
    description:
      "Learn practical JavaScript programming concepts.",
    category: "Technology",
    videoId: "PkZNo7MFNFg",
    channelIndex: 4,
  },

  // ======================================================
  // TECHWORLD WITH NANA
  // ======================================================

  {
    title: "GitHub Actions CI/CD Tutorial",
    description:
      "Learn GitHub Actions and CI/CD with Docker.",
    category: "Technology",
    videoId: "R8_veQiYBjI",
    channelIndex: 5,
  },
  {
    title: "Docker Tutorial for Beginners",
    description:
      "Complete Docker course with practical examples.",
    category: "Technology",
    videoId: "3c-iBn73dDE",
    channelIndex: 5,
  },
  {
    title: "Kubernetes Tutorial for Beginners",
    description:
      "Complete Kubernetes course with hands-on examples.",
    category: "Technology",
    videoId: "X48VuDVv0do",
    channelIndex: 5,
  },
  {
    title: "Python Tutorial for Beginners",
    description:
      "Complete Python course for beginners.",
    category: "Education",
    videoId: "t8pPdKYpowI",
    channelIndex: 5,
  },

  // ======================================================
  // SHIRRAKO
  // ======================================================

  {
    title: "Minecraft Gameplay Walkthrough",
    description:
      "Full Minecraft gameplay walkthrough.",
    category: "Gaming",
    videoId: "mxHIFijxTZY",
    channelIndex: 6,
  },
  {
    title: "Minecraft Full Game Walkthrough",
    description:
      "Complete Minecraft gameplay walkthrough.",
    category: "Gaming",
    videoId: "ET9n1aKzY-0",
    channelIndex: 6,
  },
  {
    title: "Gran Turismo 7 Gameplay",
    description:
      "Gran Turismo 7 gameplay in 4K.",
    category: "Gaming",
    videoId: "56RvP3NHYCY",
    channelIndex: 6,
  },

  // ======================================================
  // CS50
  // ======================================================

  {
    title: "This is CS50",
    description:
      "Harvard University's introduction to computer science.",
    category: "Education",
    videoId: "3oFAJtFE8YU",
    channelIndex: 7,
  },
  {
    title: "CS50x 2025 Introduction",
    description:
      "Introduction to Harvard's CS50x computer science course.",
    category: "Education",
    videoId: "h6lqxDwUmJQ",
    channelIndex: 7,
  },

  // ======================================================
  // MUSIC
  // ======================================================

  {
    title: "LoFi Hip Hop Radio",
    description:
      "Relaxing beats for studying and working.",
    category: "Music",
    videoId: "5qap5aO4i9A",
    channelIndex: 3,
  },
  {
    title: "Ed Sheeran - Perfect",
    description:
      "Official music video.",
    category: "Music",
    videoId: "2Vv-BfVoq4g",
    channelIndex: 3,
  },
  {
    title: "Charlie Puth - We Don't Talk Anymore",
    description:
      "Official music video.",
    category: "Music",
    videoId: "3AtDnEC4zak",
    channelIndex: 3,
  },
  {
    title: "Luis Fonsi - Despacito",
    description:
      "Official music video.",
    category: "Music",
    videoId: "kJQP7kiw5Fk",
    channelIndex: 3,
  },
  {
    title: "Relaxing Stress Relief Music",
    description:
      "Relaxing music for study and meditation.",
    category: "Music",
    videoId: "lFcSrYw-ARY",
    channelIndex: 3,
  },
];

export {
  users,
  channels,
  videos,
};