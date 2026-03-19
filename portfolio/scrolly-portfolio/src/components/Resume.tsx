"use client";

import { motion } from "framer-motion";

const EDUCATION = [
    {
        institution: "Bennett University",
        degree: "Bachelor of Technology - Computer Science and Engineering",
        duration: "August 2023 - May 2027",
        location: "Greater Noida, India",
        details: "Current CGPA: 8.8",
    },
    {
        institution: "Parvati Radhakishen Fomra School",
        degree: "High School",
        duration: "March 2022 - April 2023",
        location: "Mathura, India",
        details: "Grade: 85%",
    },
];

const EXPERIENCE = [
    {
        role: "MDRT (Million Dollar Round Table)",
        company: "Axis Max Life",
        duration: "March 2025 - Present",
        location: "Mathura",
        description: "Gained valuable experience in financial services, developing skills in client relations and sales strategies.",
    },
    {
        role: "PR and Outreach Head",
        company: "Indian Blockchain Fraternity - Bennett University",
        duration: "August 2024 - Present",
        description: "Organized and managed high-impact workshops, attracting over 200 participants in each event. Led and inspired a team to achieve successful event outcomes.",
    },
    {
        role: "Technical Sub Head",
        company: "IOT and Robotics Club – Bennett University",
        duration: "August 2023 - Present",
        description: "Oversaw technical projects and workshops, fostering innovation and teamwork among club members.",
    },
];

const SKILLS = {
    "Business & Analytics": ["Requirements Analysis", "Process Mapping", "Stakeholder Communication", "KPI Tracking"],
    "Analytical": ["Excel", "SQL", "Power BI", "Data Analysis"],
    "Languages": ["C++", "JavaScript", "Solidity"],
    "Frameworks": ["NodeJS", "ReactJS"],
    "Databases": ["PostgreSQL", "MySQL"],
};

export default function Resume() {
    return (
        <section className="bg-[#121212] py-24 px-4 sm:px-8 md:px-24 border-t border-white/10">
            <div className="max-w-7xl mx-auto text-white">

                {/* Education & Experience Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">

                    {/* Experience Section */}
                    <div>
                        <h3 className="text-3xl md:text-5xl font-bold mb-12 tracking-tight">Experience</h3>
                        <div className="space-y-12">
                            {EXPERIENCE.map((exp, idx) => (
                                <div key={idx} className="relative pl-8 border-l border-white/20">
                                    <div className="absolute w-3 h-3 bg-white rounded-full -left-[6.5px] top-2 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                                    <h4 className="text-2xl font-semibold">{exp.role}</h4>
                                    <p className="text-lg text-gray-400 mt-1">{exp.company} | {exp.duration}</p>
                                    <p className="text-gray-300 mt-4 leading-relaxed">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Education Section */}
                    <div>
                        <h3 className="text-3xl md:text-5xl font-bold mb-12 tracking-tight">Education</h3>
                        <div className="space-y-12">
                            {EDUCATION.map((edu, idx) => (
                                <div key={idx} className="relative pl-8 border-l border-white/20">
                                    <div className="absolute w-3 h-3 bg-white rounded-full -left-[6.5px] top-2 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                                    <h4 className="text-2xl font-semibold">{edu.degree}</h4>
                                    <p className="text-lg text-gray-400 mt-1">{edu.institution}</p>
                                    <p className="text-sm text-gray-500">{edu.duration} | {edu.location}</p>
                                    <p className="text-gray-300 mt-4 font-medium px-3 py-1 bg-white/10 inline-block rounded-md">{edu.details}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Skills Section */}
                <div>
                    <h3 className="text-3xl md:text-5xl font-bold mb-12 tracking-tight text-center">Tech Arsenal</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {Object.entries(SKILLS).map(([category, items]) => (
                            <div key={category} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors duration-300 w-full md:w-[calc(33%-1rem)] lg:w-[calc(20%-1rem)] min-w-[200px]">
                                <h5 className="text-xl font-medium text-gray-200 mb-4">{category}</h5>
                                <div className="flex flex-wrap gap-2">
                                    {items.map((item) => (
                                        <span key={item} className="px-3 py-1 text-sm bg-white/10 text-gray-300 rounded-full">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
