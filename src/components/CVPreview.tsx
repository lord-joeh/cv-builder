import { CVData } from "@/lib/schema";

export default function CVPreview({ data }: { data: Partial<CVData> }) {
  const toBullets = (text?: string) => {
    if (!text) return null;
    return text
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line, i) => <li key={i}>{line.trim()}</li>);
  };

  return (
    <div className="bg-white text-gray-800 text-[13px] leading-relaxed w-[210mm] min-h-[297mm] p-12 shadow-2xl mx-auto font-sans">
      {/* HEADER */}
      <header className="text-center mb-5">
        <h1 className="text-2xl font-bold tracking-wide uppercase text-gray-900">
          {data?.personalInfo?.fullName || "Your Name"}
        </h1>
        <p className="text-xs font-semibold tracking-widest text-gray-600 uppercase mt-0.5">
          {data?.personalInfo?.role || "Your Role"}
        </p>
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-gray-600 mt-1.5">
          <span>{data?.personalInfo?.location}</span>
          {data?.personalInfo?.phone && (
            <span>&bull; {data.personalInfo.phone}</span>
          )}
          {data?.personalInfo?.email && (
            <span>&bull; {data.personalInfo.email}</span>
          )}
          {data?.personalInfo?.github && (
            <span>&bull; {data.personalInfo.github}</span>
          )}
          {data?.personalInfo?.linkedin && (
            <span>&bull; {data.personalInfo.linkedin}</span>
          )}
          {data?.personalInfo?.portfolio && (
            <span>&bull; {data.personalInfo.portfolio}</span>
          )}
        </div>
      </header>

      {/* SUMMARY */}
      {data?.personalInfo?.summary && (
        <p className="text-justify mb-5 text-gray-700">
          {data.personalInfo.summary}
        </p>
      )}

      {/* TECHNICAL SKILLS */}
      <section className="mb-5">
        <h2 className="text-sm font-bold tracking-wider text-gray-900 uppercase border-b border-gray-400 pb-0.5 mb-2">
          Technical Skills
        </h2>
        <div className="space-y-0.5">
          {data?.technicalSkills?.languages && (
            <p>
              <strong>Languages:</strong> {data.technicalSkills.languages}
            </p>
          )}
          {data?.technicalSkills?.frameworks && (
            <p>
              <strong>Frameworks:</strong> {data.technicalSkills.frameworks}
            </p>
          )}
          {data?.technicalSkills?.databases && (
            <p>
              <strong>Databases & ORMs:</strong>{" "}
              {data.technicalSkills.databases}
            </p>
          )}
          {data?.technicalSkills?.devops && (
            <p>
              <strong>DevOps & Infra:</strong> {data.technicalSkills.devops}
            </p>
          )}
        </div>
      </section>

      {/* PROFESSIONAL EXPERIENCE */}
      {data?.experience && data.experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold tracking-wider text-gray-900 uppercase border-b border-gray-400 pb-0.5 mb-2">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between font-semibold text-gray-900 text-[13.5px]">
                  <span>{exp.company}</span>
                  <span>{exp.duration}</span>
                </div>
                <div className="italic text-gray-700 mb-1">{exp.role}</div>
                <ul className="list-disc pl-5 space-y-0.5 text-gray-700">
                  {toBullets(exp.description)}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* KEY ENGINEERING PROJECTS */}
      {data?.projects && data.projects.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold tracking-wider text-gray-900 uppercase border-b border-gray-400 pb-0.5 mb-2">
            Key Engineering Projects
          </h2>
          <div className="space-y-4">
            {data.projects.map((proj, index) => (
              <div key={index}>
                <div className="flex justify-between font-semibold text-gray-900 text-[13.5px]">
                  <span>
                    {proj.name} -{" "}
                    <span className="font-normal italic">{proj.tagline}</span>
                  </span>
                  <span>{proj.date}</span>
                </div>
                <div className="text-gray-700 mb-1 font-medium">
                  Technologies: {proj.technologies}
                </div>
                <ul className="list-disc pl-5 space-y-0.5 text-gray-700">
                  {toBullets(proj.description)}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EDUCATION */}
      {data?.education && data.education.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold tracking-wider text-gray-900 uppercase border-b border-gray-400 pb-0.5 mb-2">
            Education
          </h2>
          <div className="space-y-3">
            {data.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between font-semibold text-gray-900 text-[13.5px]">
                  <span>{edu.institution}</span>
                  <span>{edu.location}</span>
                </div>
                <div className="flex justify-between text-gray-700 mb-1">
                  <span>{edu.degree}</span>
                  <span>{edu.duration}</span>
                </div>
                <ul className="list-disc pl-5 space-y-0.5 text-gray-700">
                  {toBullets(edu.description)}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
