import { CVData } from "@/lib/schema";

export default function CVPreview({ data }: { data: Partial<CVData> }) {
  const toBullets = (text?: string) => {
    if (!text) return null;
    return text
      .split("\n")
      .map((line) => line.replace(/^[\s\-\•\*\·]+/, "").trim())
      .filter((line) => line !== "")
      .map((line, i) => <li key={i}>{line}</li>);
  };

  return (
    <div className="bg-white text-slate-800 text-[13px] leading-relaxed w-[210mm] min-h-[297mm] p-12 mx-auto font-sans shadow-[0_20px_50px_rgba(0,0,0,0.3),_0_5px_15px_rgba(0,0,0,0.1)] rounded-sm relative z-10 transition-all duration-300">
      {/* HEADER */}
      <header className="text-center mb-6 pb-4 border-b-2 border-slate-900">
        <h1 className="text-3xl font-extrabold tracking-tight uppercase text-slate-900">
          {data?.personalInfo?.fullName || "Your Name"}
        </h1>
        <p className="text-sm font-medium tracking-widest text-slate-600 uppercase mt-1">
          {data?.personalInfo?.role || "Your Role"}
        </p>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-3 font-medium">
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

      {/* DYNAMIC SECTIONS */}
      {(data?.sectionOrder?.length
        ? data.sectionOrder
        : [
            "summary",
            "technicalSkills",
            "experience",
            "projects",
            "education",
          ]
      ).map((section) => {
        switch (section) {
          case "summary":
            if (!data?.personalInfo?.summary) return null;
            return (
              <p key={section} className="text-justify mb-5 text-slate-700">
                {data.personalInfo.summary}
              </p>
            );

          case "technicalSkills":
            if (
              !data?.technicalSkills?.languages &&
              !data?.technicalSkills?.frameworks &&
              !data?.technicalSkills?.databases &&
              !data?.technicalSkills?.devops
            )
              return null;
            return (
              <section key={section} className="mb-5">
                <h2 className="text-sm font-bold tracking-wider text-slate-900 uppercase border-b border-slate-400 pb-0.5 mb-2">
                  Technical Skills
                </h2>
                <div className="space-y-0.5">
                  {data?.technicalSkills?.languages && (
                    <p>
                      <strong>Languages:</strong>{" "}
                      {data.technicalSkills.languages}
                    </p>
                  )}
                  {data?.technicalSkills?.frameworks && (
                    <p>
                      <strong>Frameworks:</strong>{" "}
                      {data.technicalSkills.frameworks}
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
                      <strong>DevOps & Infra:</strong>{" "}
                      {data.technicalSkills.devops}
                    </p>
                  )}
                </div>
              </section>
            );

          case "experience":
            if (!data?.experience || data.experience.length === 0) return null;
            return (
              <section key={section} className="mb-5">
                <h2 className="text-sm font-bold tracking-wider text-slate-900 uppercase border-b border-slate-400 pb-0.5 mb-2">
                  Professional Experience
                </h2>
                <div className="space-y-4">
                  {data.experience.map((exp, index) => (
                    <div key={index}>
                      <div className="flex justify-between font-semibold text-slate-900 text-[13.5px]">
                        <span>{exp.company}</span>
                        <span>{exp.duration}</span>
                      </div>
                      <div className="italic text-slate-700 mb-1">
                        {exp.role}
                      </div>
                      <ul className="list-disc pl-5 space-y-0.5 text-slate-700">
                        {toBullets(exp.description)}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            );

          case "projects":
            if (!data?.projects || data.projects.length === 0) return null;
            return (
              <section key={section} className="mb-5">
                <h2 className="text-sm font-bold tracking-wider text-slate-900 uppercase border-b border-slate-400 pb-0.5 mb-2">
                  Key Engineering Projects
                </h2>
                <div className="space-y-4">
                  {data.projects.map((proj, index) => (
                    <div key={index}>
                      <div className="flex justify-between font-semibold text-slate-900 text-[13.5px]">
                        <span>
                          {proj.name} -{" "}
                          <span className="font-normal italic">
                            {proj.tagline}
                          </span>
                        </span>
                        <span>{proj.date}</span>
                      </div>
                      <div className="text-slate-700 mb-1 font-medium">
                        Technologies: {proj.technologies}
                      </div>
                      <ul className="list-disc pl-5 space-y-0.5 text-slate-700">
                        {toBullets(proj.description)}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            );

          case "education":
            if (!data?.education || data.education.length === 0) return null;
            return (
              <section key={section} className="mb-5">
                <h2 className="text-sm font-bold tracking-wider text-slate-900 uppercase border-b border-slate-400 pb-0.5 mb-2">
                  Education
                </h2>
                <div className="space-y-3">
                  {data.education.map((edu, index) => (
                    <div key={index}>
                      <div className="flex justify-between font-semibold text-slate-900 text-[13.5px]">
                        <span>{edu.institution}</span>
                        <span>{edu.location}</span>
                      </div>
                      <div className="flex justify-between text-slate-700 mb-1">
                        <span>{edu.degree}</span>
                        <span>{edu.duration}</span>
                      </div>
                      <ul className="list-disc pl-5 space-y-0.5 text-slate-700">
                        {toBullets(edu.description)}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
