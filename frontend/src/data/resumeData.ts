export interface ResumeData {
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
    certifications: {
      name: string;
      issuer: string;
      date: string;
      verificationId?: string;
    }[];
  };
  experience: {
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    description: string;
    highlights: string[];
    securityTools?: string[];
  }[];
  education: {
    school: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    description: string;
    relevantCourses?: string[];
  }[];
  skills: {
    category: string;
    items: string[];
    proficiencyLevel?: number; // 1-5
  }[];
  projects: {
    name: string;
    description: string;
    technologies: string[];
    securityFeatures?: string[];
    github?: string;
    link?: string;
    type: 'offensive' | 'defensive' | 'research' | 'tool' | 'full-stack';
  }[];
}

export const resumeData: ResumeData = {
  basics: {
    name: "Bryan Madewell",
    label: "Aspiring Cybersecurity Professional",
    email: "bryan@bryanmadewell.com",
    phone: "(123) 456-7890",
    location: "New Jersey",
    summary: "Aspiring cybersecurity professional with experience in threat mitigation, malware analysis, and network security. Proven leader in project and team environments, driven to enhance digital infrastructure and security architectures.",
    profiles: [
      {
        network: "GitHub",
        url: "https://github.com/bryanm23"
      },
      {
        network: "LinkedIn",
        url: "https://www.linkedin.com/in/bryan-madewell-21367823a/"
      }
    ],
    certifications: [
      {
        name: "CompTIA Security+",
        issuer: "CompTIA",
        date: "2025"
      },
      {
        name: "Switching, Routing, and Wireless Essentials",
        issuer: "Cisco",
        date: "2024"
      },
      {
        name: "Introduction to Networks",
        issuer: "Cisco",
        date: "2024"
      }
    ]
  },
  experience: [],
  education: [
    {
      school: "New Jersey Institute of Technology",
      degree: "B.S.",
      field: "Information Technology - Network and Information Security",
      startDate: "",
      endDate: "May 2025",
      description: "Focus on network security, system administration, and cybersecurity fundamentals.",
      relevantCourses: [
        "Systems Integration",
        "Ethical Hacking",
        "Networking Technology",
        "Computer Systems Security",
        "Introduction to System Administration"
      ]
    }
  ],
  skills: [
    {
      category: "Operating Systems",
      items: ["Windows OS", "MacOS", "Linux", "Ubuntu", "Kali Linux"],
      proficiencyLevel: 4
    },
    {
      category: "Security Skills",
      items: ["Cybersecurity Fundamentals", "Threat Mitigation", "Malware Analysis", "Network Security"],
      proficiencyLevel: 4
    },
    {
      category: "Networking",
      items: ["Network Architecture", "IP", "Subnetting", "Cabling", "Networking Fundamentals"],
      proficiencyLevel: 4
    },
    {
      category: "Leadership",
      items: ["Project Management", "Team Leadership", "Fraternity President"],
      proficiencyLevel: 5
    }
  ],
  projects: [
    {
      name: "InvestorIQ - Real Estate Investment Platform",
      description: "Capstone project at NJIT. Project Manager for a team that developed a full-stack SaaS platform, enabling potential real estate investors to analyze properties, view rental data, and calculate projected ROI and profitability.",
      technologies: ["RabbitMQ", "Microservices", "HAProxy", "Grafana"],
      securityFeatures: [
        "Load-balancing",
        "Rate limiting",
        "DoS protection",
        "Real-time log monitoring and analysis"
      ],
      github: "https://github.com/bryanm23/InvestorIQ",
      type: "full-stack"
    },
    {
      name: "Antivirus - Independent Study",
      description: "Under the supervision of a University Lecturer, I developed a comprehensive Windows antivirus solution focused on detecting and mitigating over-permissive services, unverified programs, and unauthorized autorun entries.",
      technologies: ["Microsoft Sysinternals Suite", "Python", "ProcMon", "Process Explorer", "Active Directory"],
      securityFeatures: [
        "Principle of least privilege implementation",
        "Service permission monitoring",
        "Unauthorized autorun detection",
        "Active Directory integration"
      ],
      github: "https://github.com/bryanm23/IS488",
      type: "defensive"
    },
    {
      name: "Lookio - Freelance Project",
      description: "Focused on application security, implementing user authentication, basic threat modeling, and industry standard practices.",
      technologies: ["CloudFlare", "Authentication", "Threat Modeling"],
      securityFeatures: [
        "DDoS protection",
        "WAF protection",
        "Traffic filtering",
        "User authentication"
      ],
      github: "https://lookio.io",
      type: "full-stack"
    }
  ]
}; 
