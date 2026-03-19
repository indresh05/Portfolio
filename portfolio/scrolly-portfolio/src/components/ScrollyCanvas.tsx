"use client";

import { useEffect, useRef, useState } from "react";
import { MotionValue, useTransform, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 75;

const currentFrame = (index: number) =>
    `/sequence/ezgif-frame-${index.toString().padStart(3, "0")}.png`;

export default function ScrollyCanvas({
    scrollYProgress,
}: {
    scrollYProgress: MotionValue<number>;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);

    const frameIndex = useTransform(scrollYProgress, [0, 1], [1, FRAME_COUNT]);

    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, []);

    const drawImage = (img: HTMLImageElement) => {
        const canvas = canvasRef.current;
        if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // object-fit: cover logic
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            centerShift_x,
            centerShift_y,
            img.width * ratio,
            img.height * ratio
        );
    };

    useEffect(() => {
        if (images.length > 0) {
            const firstImage = images[0];
            if (firstImage.complete) {
                drawImage(firstImage);
            } else {
                firstImage.onload = () => drawImage(firstImage);
            }
        }
    }, [images]);

    useMotionValueEvent(frameIndex, "change", (latest) => {
        if (images.length > 0) {
            const index = Math.min(
                FRAME_COUNT - 1,
                Math.max(0, Math.floor(latest) - 1)
            );
            const img = images[index];
            if (img && img.complete) {
                drawImage(img);
            }
        }
    });

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                const index = Math.min(
                    FRAME_COUNT - 1,
                    Math.max(0, Math.floor(frameIndex.get()) - 1)
                );
                const img = images[index];
                if (img && img.complete) {
                    drawImage(img);
                }
            }, 100);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(timeoutId);
        };
    }, [images, frameIndex]);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block z-0" />;
}
