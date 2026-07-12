"use client";

import { useEffect } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cvSchema, CVData } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Trash2, Plus } from "lucide-react";

interface CVFormProps {
  onChange: (data: Partial<CVData>) => void;
}

export default function CVForm({ onChange }: CVFormProps) {
  const form = useForm<CVData>({
    resolver: zodResolver(cvSchema),
    defaultValues: {
      personalInfo: {
        fullName: "",
        role: "",
        location: "",
        phone: "",
        email: "",
        github: "",
        linkedin: "",
        summary: "",
      },
      technicalSkills: {
        languages: "",
        frameworks: "",
        databases: "",
        devops: "",
      },
      experience: [],
      projects: [],
      education: [],
    },
  });

  const {
    fields: expFields,
    append: appendExp,
    remove: removeExp,
  } = useFieldArray({ control: form.control, name: "experience" });
  const {
    fields: projFields,
    append: appendProj,
    remove: removeProj,
  } = useFieldArray({ control: form.control, name: "projects" });

  const {
    fields: eduFields,
    append: appendEdu,
    remove: removeEdu,
  } = useFieldArray({ control: form.control, name: "education" });

  const formValues = useWatch({ control: form.control });

  useEffect(() => {
    onChange(formValues as Partial<CVData>);
  }, [formValues, onChange]);

  return (
    <Form {...form}>
      <form className="p-6 space-y-6">
        <Accordion
          type="multiple"
          defaultValue={["personal"]}
          className="w-full"
        >
          {/* PERSONAL INFO */}
          <AccordionItem value="personal">
            <AccordionTrigger className="text-lg font-semibold">
              Personal Information
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              <FormField
                control={form.control}
                name="personalInfo.fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Joseph Mensah" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="personalInfo.role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Input placeholder="Full-Stack Engineer" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="personalInfo.location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Accra, Ghana" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="personalInfo.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email@example.com" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="personalInfo.phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+233 XX XXX XXXX" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="personalInfo.github"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GitHub</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="github.com/user-name"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="personalInfo.linkedin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="linkedin.com/in/user-name"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="personalInfo.portfolio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Portfolio</FormLabel>
                    <FormControl>
                      <Input placeholder="portfolio.com" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="personalInfo.summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Professional Summary</FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-24"
                        placeholder="Highly analytical and results-driven..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>

          {/* TECHNICAL SKILLS */}
          <AccordionItem value="skills">
            <AccordionTrigger className="text-lg font-semibold">
              Technical Skills
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              <FormField
                control={form.control}
                name="technicalSkills.languages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Languages</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="JavaScript, TypeScript, Python..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="technicalSkills.frameworks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frameworks & Mobile</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="React, Flutter, NestJS..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="technicalSkills.databases"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Databases</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="MongoDb, MySQL, PostgreSQL..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="technicalSkills.devops"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>DeveOps</FormLabel>
                    <FormControl>
                      <Input placeholder="Git, Docker, Nginx..." {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>

          {/* EXPERIENCE (Dynamic Array) */}
          <AccordionItem value="experience">
            <AccordionTrigger className="text-lg font-semibold">
              Experience
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              {expFields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-4 border rounded-md relative bg-slate-50"
                >
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 text-red-500"
                    onClick={() => removeExp(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <FormField
                      control={form.control}
                      name={`experience.${index}.company`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input placeholder="Amalitech" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`experience.${index}.role`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Frontend Instructor"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name={`experience.${index}.duration`}
                    render={({ field }) => (
                      <FormItem className="mb-2">
                        <FormLabel>Duration</FormLabel>
                        <FormControl>
                          <Input placeholder="Nov 2025 - Present" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`experience.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bullets (Enter for new line)</FormLabel>
                        <FormControl>
                          <Textarea className="h-24" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() =>
                  appendExp({
                    company: "",
                    role: "",
                    duration: "",
                    description: "",
                  })
                }
              >
                <Plus className="w-4 h-4 mr-2" /> Add Experience
              </Button>
            </AccordionContent>
          </AccordionItem>

          {/* PROJECTS (Dynamic Array) */}
          <AccordionItem value="projects">
            <AccordionTrigger className="text-lg font-semibold">
              Projects
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              {projFields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-4 border rounded-md relative bg-slate-50"
                >
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 text-red-500"
                    onClick={() => removeProj(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <FormField
                      control={form.control}
                      name={`projects.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Name</FormLabel>
                          <FormControl>
                            <Input placeholder="AgroMarket" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`projects.${index}.date`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <Input placeholder="2026" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name={`projects.${index}.tagline`}
                    render={({ field }) => (
                      <FormItem className="mb-2">
                        <FormLabel>Tagline</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Agricultural Marketplace Platform"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`projects.${index}.technologies`}
                    render={({ field }) => (
                      <FormItem className="mb-2">
                        <FormLabel>Technologies</FormLabel>
                        <FormControl>
                          <Input placeholder="Flutter, NestJS..." {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`projects.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bullets (Enter for new line)</FormLabel>
                        <FormControl>
                          <Textarea className="h-24" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() =>
                  appendProj({
                    name: "",
                    tagline: "",
                    technologies: "",
                    date: "",
                    description: "",
                  })
                }
              >
                <Plus className="w-4 h-4 mr-2" /> Add Project
              </Button>
            </AccordionContent>
          </AccordionItem>

          {/* EDUCATIONS (Dynamic Array) */}
          <AccordionItem value="educations">
            <AccordionTrigger className="text-lg font-semibold">
              Educations
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              {eduFields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-4 border rounded-md relative bg-slate-50"
                >
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 text-red-500"
                    onClick={() => removeEdu(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <FormField
                      control={form.control}
                      name={`education.${index}.institution`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Institution Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ghana Commuincation Technology University"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`education.${index}.duration`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duration</FormLabel>
                          <FormControl>
                            <Input placeholder="2024 - 2028" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name={`education.${index}.degree`}
                    render={({ field }) => (
                      <FormItem className="mb-2">
                        <FormLabel>Degree</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Bachelor of Science in Information Technology"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`education.${index}.location`}
                    render={({ field }) => (
                      <FormItem className="mb-2">
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Accra, Ghana" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`education.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bullets (Enter for new line)</FormLabel>
                        <FormControl>
                          <Textarea className="h-24" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() =>
                  appendEdu({
                    institution: "",
                    degree: "",
                    duration: "",
                    location: "",
                    description: "",
                  })
                }
              >
                <Plus className="w-4 h-4 mr-2" /> Add Education
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </form>
    </Form>
  );
}
