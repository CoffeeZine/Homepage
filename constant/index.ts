export const NavLinks = [
  { href: "/note", key: "Note", text: "Note" },
  { href: "/", key: "Find Projects", text: "Find Projects" },
  { href: "/", key: "Learn Development", text: "Learn Development" },
  { href: "/", key: "Career Advancement", text: "Career Advancement" },
  { href: "/", key: "Hire Developers", text: "Hire Developers" },
];

export const categoryFilters = [
  "Frontend",
  "Backend",
  "Full-Stack",
  "Mobile",
  "UI/UX",
  "Game Dev",
  "DevOps",
  "Data Science",
  "Machine Learning",
  "Cybersecurity",
  "Blockchain",
  "E-commerce",
  "Chatbots",
];

export const footerLinks = [
  {
    title: "For developers",
    links: [
      "Go Pro!",
      "Explore development work",
      "Development blog",
      "Code podcast",
      "Open-source projects",
      "Refer a Friend",
      "Code of conduct",
    ],
  },
  {
    title: "Hire developers",
    links: [
      "Post a job opening",
      "Post a freelance project",
      "Search for developers",
    ],
  },
  {
    title: "Brands",
    links: ["Advertise with us"],
  },
  {
    title: "Company",
    links: [
      "About",
      "Careers",
      "Support",
      "Media kit",
      "Testimonials",
      "API",
      "Terms of service",
      "Privacy policy",
      "Cookie policy",
    ],
  },
  {
    title: "Directories",
    links: [
      "Development jobs",
      "Developers for hire",
      "Freelance developers for hire",
      "Tags",
      "Places",
    ],
  },
  {
    title: "Development assets",
    links: [
      "Code Marketplace",
      "GitHub Marketplace",
      "NPM Registry",
      "Packagephobia",
    ],
  },
  {
    title: "Development Resources",
    links: [
      "Freelancing",
      "Development Hiring",
      "Development Portfolio",
      "Development Education",
      "Creative Process",
      "Development Industry Trends",
    ],
  },
];

export interface Notes {
  notes: {
    id: string;
    title: string;
    content: string;
  }[];
}
export interface Comments {
  comments: {
    id: string;
    title: string;
    comment: string;
  }[];
}
export interface CommentFormData {
  comment: string;
  id: string;
}
export interface Author {
  id: string;
  email: string;
  password: string;
  name?: string;
  address?: string;
}
export interface Posts {
  posts: {
    id: string;
    title: string;
    body: string;
    slug: string;
  }[];
}

export interface PostFormData {
  title: string;
  body: string;
  slug: string;
  id: string;
}
export interface LoginFormData {
  email: string;
  password: string;
}
export interface NoteFormData {
  title: string;
  content: string;
  id: string;
}
export interface RegisterFormData {
  email: string;
  password: string;
  name: string;
}
export interface Logins {
  login: {
    id: string;
    name: string;
    password: string;
  }[];
}
