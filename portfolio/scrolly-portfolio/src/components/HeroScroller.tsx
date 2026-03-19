"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import ScrollyCanvas from "./ScrollyCanvas";
import Overlay from "./Overlay";

export default function HeroScroller() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Track scroll progress of this specific 500vh container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <div ref={containerRef} className="h-[500vh] w-full relative bg-[#121212]">
            {/* Sticky container that stays on screen while scrolling the 500vh */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <ScrollyCanvas scrollYProgress={scrollYProgress} />
                <Overlay scrollYProgress={scrollYProgress} />
            </div>
        </div>
    );
}
