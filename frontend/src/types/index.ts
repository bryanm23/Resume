export interface User {
  id: number;
  name: string;
  email: string;
  isAdmin?: boolean;
}

export interface Resume {
  id: number;
  title: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  certifications: Certification[];
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface Skill {
  category: string;
  items: string[];
  proficiencyLevel?: number; // 1-5
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  githubUrl?: string;
  liveUrl?: string;
  technologies: string[];
  featured: boolean;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface AuthResponse {
  message: string;
  user: User;
} 