export interface Education {
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  highlights: string[];
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  securityFeatures?: string[];
  github?: string;
  link?: string;
  type: 'offensive' | 'defensive' | 'research' | 'tool';
}

export interface Skill {
  category: string;
  items: string[];
  proficiencyLevel?: number; // 1-5
}

export interface Resume {
  basics: {
    name: string;
    label: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    profiles: {
      network: string;
      url: string;
    }[];
  };
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skill[];
}

// Example resume data
export const resumeData: Resume = {
  basics: {
    name: "Bryan Madewell",
    label: "Software Engineer",
    email: "bm47@njit.edu",
    phone: "(123) 456-7890",
    location: "New Jersey",
    summary: "Passionate software engineer with experience in full-stack development, focusing on creating efficient and user-friendly applications.",
    profiles: [
      {
        network: "GitHub",
        url: "https://github.com/yourusername"
      },
      {
        network: "LinkedIn",
        url: "https://linkedin.com/in/yourusername"
      }
    ]
  },
  education: [
    {
      school: "New Jersey Institute of Technology",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2020",
      endDate: "2024",
      description: "Relevant coursework: Data Structures, Algorithms, Web Development, Database Management"
    }
  ],
  experience: [
    {
      company: "Example Company",
      position: "Software Engineer Intern",
      startDate: "June 2023",
      endDate: "August 2023",
      description: "Developed and maintained web applications using modern technologies",
      highlights: [
        "Implemented new features using React and TypeScript",
        "Improved application performance by 30%",
        "Collaborated with team members using Git and Agile methodologies"
      ]
    }
  ],
  projects: [
    {
      name: "Personal Resume Website",
      description: "A responsive resume website built with React and TypeScript",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      github: "https://github.com/yourusername/resume-website",
      type: "tool",
      securityFeatures: [
        "Secure authentication",
        "Data encryption",
        "XSS protection"
      ]
    }
  ],
  skills: [
    {
      category: "Programming Languages",
      items: ["JavaScript", "TypeScript", "Python", "Java"],
      proficiencyLevel: 4
    },
    {
      category: "Frontend",
      items: ["React", "HTML5", "CSS3", "Tailwind CSS"],
      proficiencyLevel: 5
    },
    {
      category: "Tools & Technologies",
      items: ["Git", "VS Code", "Docker", "GitHub Pages"],
      proficiencyLevel: 4
    }
  ]
}; 