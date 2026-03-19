"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MouseEvent, useRef } from "react";

const PROJECT_DATA = [
    {
        id: 1,
        title: "Gram Setu",
        category: "Blockchain",
        tags: ["Web3", "Governance", "Solidity", "IPFS"],
        description: "Governance issue management platform using voice-based reporting and blockchain for transparent tracking and escrow smart contracts.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
        )
    },
    {
        id: 2,
        title: "Herb Trace",
        category: "Supply Chain",
        tags: ["Web3.js", "Solidity", "Node.js"],
        description: "End-to-end traceability platform for Ayurvedic products utilizing Web3.js, Solidity, and Node.js for verifiable product records.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg>
        )
    },
    {
        id: 3,
        title: "Life Bank",
        category: "AI",
        tags: ["AI", "Web3", "Tokenomics"],
        description: "Resource allocation platform connecting donors with patients, featuring token-based incentives and AI-driven prioritization.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
        )
    },
];

// Staggered Container for scroll animation
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
} as const;

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 24
        }
    }
} as const;

export default function Projects() {
    return (
        <section className="relative min-h-screen bg-[#121212] py-32 px-4 sm:px-8 md:px-24 overflow-hidden z-20">
            {/* Subtle animated background noise/mesh */}
            <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

            {/* Background Glow Orbs */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <h3 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                        Selected Works
                    </h3>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl">
                        A showcase of decentralized applications and full-stack solutions built to scale.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {PROJECT_DATA.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

function ProjectCard({ project }: { project: typeof PROJECT_DATA[0] }) {
    const cardRef = useRef<HTMLDivElement>(null);

    // Mouse position for spotlight (pixel-based)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Mouse position for tilt (normalized -0.5 to 0.5)
    const xPct = useMotionValue(0);
    const yPct = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const rotateX = useSpring(useTransform(yPct, [-0.5, 0.5], [7, -7]), springConfig);
    const rotateY = useSpring(useTransform(xPct, [-0.5, 0.5], [-7, 7]), springConfig);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();

        // Calculate pixel coordinates for the spotlight
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);

        // Calculate normalized coordinates for the 3D tilt
        xPct.set((e.clientX - rect.left) / rect.width - 0.5);
        yPct.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        // Reset tilt values slowly to 0 when mouse leaves
        xPct.set(0);
        yPct.set(0);
    };

    return (
        <motion.div
            variants={itemVariants}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="group relative h-full rounded-2xl bg-white/[0.03] border border-white/5 p-8 transition-all hover:bg-white/[0.05] hover:border-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] overflow-hidden flex flex-col justify-between min-h-[420px] cursor-pointer"
        >
            {/* Interactive Cursor Spotlight Glow */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            600px circle at ${mouseX}px ${mouseY}px,
                            rgba(255,255,255,0.1),
                            transparent 40%
                        )
                    `
                }}
            />

            <div className="relative z-10 flex flex-col h-full" style={{ transform: "translateZ(30px)" }}>

                {/* Header (Icon + Category) */}
                <div className="flex items-start justify-between mb-8">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300">
                        {project.icon}
                    </div>
                    <span className="px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-white/5 text-white/70 border border-white/10 shadow-inner group-hover:border-white/20 group-hover:text-white transition-all duration-300 backdrop-blur-md">
                        {project.category}
                    </span>
                </div>

                {/* Content */}
                <h4 className="text-2xl font-bold tracking-tight text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    {project.title}
                </h4>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 group-hover:text-gray-300 transition-colors duration-300">
                    {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto mb-8">
                    {project.tags.map((tag) => (
                        <span key={tag} className="text-xs font-medium text-gray-500 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* CTA Arrow */}
            <div
                className="relative z-10 mt-auto flex items-center justify-between text-sm font-semibold text-white/50 group-hover:text-white transition-colors duration-300"
                style={{ transform: "translateZ(40px)" }}
            >
                View Case Study
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-0.5 transition-transform duration-300">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </div>
            </div>

            {/* Animated Gradient Bottom Border */}
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-blue-500/0 via-blue-400/50 to-purple-500/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
        </motion.div>
    );
}
