"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

export default function Overlay({
    scrollYProgress,
}: {
    scrollYProgress: MotionValue<number>;
}) {
    // Opacity transforms
    // Section 1: 0-15% (visible), 15-25% (fade out), 45-55% (fade in), 55-65% (visible), 65-75% (fade out)
    const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25, 0.45, 0.55, 0.65, 0.75], [1, 1, 0, 0, 1, 1, 0]);
    // Section 2: 25-35% (fade in), 35% (peak), 35-45% (fade out)
    const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45], [0, 1, 0]);

    // Parallax Y transforms (keeping them subtle)
    // Map section 1 Y movement smoothly across its active zones
    const y1 = useTransform(scrollYProgress, [0, 0.25, 0.45, 0.75], [0, -100, 100, -100]);
    const y2 = useTransform(scrollYProgress, [0.25, 0.45], [100, -100]);

    return (
        <div className="absolute inset-0 z-10 pointer-events-none">
            {/* Section 1 */}
            <motion.div
                style={{ opacity: opacity1, y: y1 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
            >
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-white drop-shadow-md">
                    Indresh Agrawal
                </h1>
                <p className="text-xl md:text-2xl font-light text-gray-300 drop-shadow-md max-w-2xl text-center">
                    Blockchain & Full Stack Developer
                </p>
            </motion.div>

            {/* Section 2 */}
            <motion.div
                style={{ opacity: opacity2, y: y2 }}
                className="absolute inset-0 flex flex-col items-start justify-center px-8 md:px-24"
            >
                <h2 className="text-4xl md:text-6xl font-semibold tracking-tight max-w-2xl text-white drop-shadow-md">
                    Building secure,
                    <br /> decentralised systems.
                </h2>
            </motion.div>

            {/* Section 3 removed per request */}
        </div>
    );
}
