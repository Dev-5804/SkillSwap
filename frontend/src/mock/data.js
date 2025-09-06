// Mock data for SkillSwap app
export const mockUsers = [
  {
    id: 1,
    name: "Sarah Chen",
    bio: "Passionate about technology and teaching. Love sharing knowledge!",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    teachSkills: ["React", "JavaScript", "UI Design", "Python"],
    learnSkills: ["Machine Learning", "Data Science", "Mobile Development"],
    rating: 4.8,
    swapsCompleted: 12
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    bio: "Full-stack developer with 5 years experience. Always eager to learn new technologies.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    teachSkills: ["Node.js", "MongoDB", "Express", "API Development"],
    learnSkills: ["React Native", "DevOps", "AWS"],
    rating: 4.9,
    swapsCompleted: 18
  },
  {
    id: 3,
    name: "Emma Johnson",
    bio: "Digital marketing expert who loves combining creativity with analytics.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    teachSkills: ["Digital Marketing", "SEO", "Content Strategy", "Analytics"],
    learnSkills: ["Web Development", "Graphic Design", "Photography"],
    rating: 4.7,
    swapsCompleted: 8
  },
  {
    id: 4,
    name: "David Kim",
    bio: "Product designer with expertise in user experience and interface design.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    teachSkills: ["UX Design", "Figma", "User Research", "Prototyping"],
    learnSkills: ["Frontend Development", "Animation", "3D Design"],
    rating: 4.6,
    swapsCompleted: 15
  },
  {
    id: 5,
    name: "Lisa Wang",
    bio: "Data scientist passionate about solving real-world problems with data.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    teachSkills: ["Data Science", "Python", "Machine Learning", "SQL"],
    learnSkills: ["Deep Learning", "Cloud Computing", "Blockchain"],
    rating: 4.9,
    swapsCompleted: 22
  },
  {
    id: 6,
    name: "Alex Thompson",
    bio: "Mobile app developer specializing in cross-platform solutions.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    teachSkills: ["React Native", "Flutter", "iOS Development", "Android"],
    learnSkills: ["Backend Development", "System Design", "Cybersecurity"],
    rating: 4.8,
    swapsCompleted: 11
  }
];

export const mockRequests = [
  {
    id: 1,
    fromUser: mockUsers[1],
    toUser: mockUsers[0],
    teachSkill: "Node.js",
    learnSkill: "React",
    status: "pending",
    message: "Hi! I'd love to learn React from you in exchange for Node.js knowledge.",
    createdAt: "2024-01-15T10:30:00Z",
    type: "incoming"
  },
  {
    id: 2,
    fromUser: mockUsers[0],
    toUser: mockUsers[3],
    teachSkill: "JavaScript",
    learnSkill: "UX Design",
    status: "accepted",
    message: "Would you be interested in swapping JavaScript knowledge for UX design insights?",
    createdAt: "2024-01-14T14:20:00Z",
    type: "outgoing"
  },
  {
    id: 3,
    fromUser: mockUsers[2],
    toUser: mockUsers[0],
    teachSkill: "Digital Marketing",
    learnSkill: "Python",
    status: "pending",
    message: "I can teach you digital marketing strategies in exchange for Python basics!",
    createdAt: "2024-01-13T09:15:00Z",
    type: "incoming"
  },
  {
    id: 4,
    fromUser: mockUsers[0],
    toUser: mockUsers[4],
    teachSkill: "UI Design",
    learnSkill: "Data Science",
    status: "rejected",
    message: "Interested in trading UI design knowledge for data science fundamentals?",
    createdAt: "2024-01-12T16:45:00Z",
    type: "outgoing"
  }
];

export const mockMessages = [
  {
    id: 1,
    senderId: 2,
    senderName: "Marcus Rodriguez",
    text: "Hey Sarah! Thanks for accepting my request. When would be a good time to start our skill swap?",
    timestamp: "2024-01-16T10:30:00Z",
    isOwn: false
  },
  {
    id: 2,
    senderId: 1,
    senderName: "You",
    text: "Hi Marcus! I'm excited to learn Node.js from you. How about we start this weekend?",
    timestamp: "2024-01-16T10:35:00Z",
    isOwn: true
  },
  {
    id: 3,
    senderId: 2,
    senderName: "Marcus Rodriguez",
    text: "Perfect! Saturday works great for me. Should we do a video call first to discuss our learning goals?",
    timestamp: "2024-01-16T10:40:00Z",
    isOwn: false
  },
  {
    id: 4,
    senderId: 1,
    senderName: "You",
    text: "Absolutely! I'll send you a calendar invite. Looking forward to it! 🚀",
    timestamp: "2024-01-16T10:42:00Z",
    isOwn: true
  }
];

export const currentUser = {
  id: 1,
  name: "Sarah Chen",
  email: "sarah@example.com",
  bio: "Passionate about technology and teaching. Love sharing knowledge!",
  avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  teachSkills: ["React", "JavaScript", "UI Design", "Python"],
  learnSkills: ["Machine Learning", "Data Science", "Mobile Development"],
  rating: 4.8,
  swapsCompleted: 12,
  joinedDate: "2023-06-15"
};

export const skillOptions = [
  "React", "JavaScript", "Python", "Node.js", "HTML/CSS", "Vue.js", "Angular",
  "UI Design", "UX Design", "Figma", "Adobe Creative Suite", "Photoshop",
  "Machine Learning", "Data Science", "SQL", "MongoDB", "PostgreSQL",
  "Mobile Development", "React Native", "Flutter", "iOS Development", "Android",
  "Digital Marketing", "SEO", "Content Strategy", "Social Media Marketing",
  "Backend Development", "API Development", "DevOps", "AWS", "Docker",
  "Graphic Design", "Web Design", "Photography", "Video Editing",
  "Business Strategy", "Project Management", "Agile", "Scrum",
  "Cybersecurity", "Blockchain", "Cloud Computing", "System Design"
];