import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  tagline: z.string(),
  technologies: z.string(),
  date: z.string(),
  description: z.string(),
});

export const experienceSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  role: z.string(),
  duration: z.string(),
  description: z.string(),
});

export const educationSchema = z.object({
  institution: z.string().min(1, "Institution is required"),
  degree: z.string(),
  duration: z.string(),
  location: z.string(),
  description: z.string(),
});

export const cvSchema = z.object({
  personalInfo: z.object({
    fullName: z.string().min(1, "Full name is required"),
    role: z.string(),
    location: z.string(),
    phone: z.string(),
    email: z.string().email("Invalid email address"),
    github: z.string(),
    linkedin: z.string(),
    portfolio: z.string(),
    summary: z.string(),
  }),
  technicalSkills: z.object({
    languages: z.string(),
    frameworks: z.string(),
    databases: z.string(),
    devops: z.string(),
  }),
  experience: z.array(experienceSchema),
  projects: z.array(projectSchema),
  education: z.array(educationSchema),
});

export type CVData = z.infer<typeof cvSchema>;
