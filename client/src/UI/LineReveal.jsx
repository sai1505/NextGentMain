import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LineReveal({ text, delay = 120 }) {
    const lines = text.split("\n");
    const [visibleCount, setVisibleCount] = useState(0);

    useEffect(() => {
        setVisibleCount(0);

        const interval = setInterval(() => {
            setVisibleCount((v) => {
                if (v >= lines.length) {
                    clearInterval(interval);
                    return v;
                }
                return v + 1;
            });
        }, delay);

        return () => clearInterval(interval);
    }, [text]);

    return (
        <div className="space-y-1">
            {lines.slice(0, visibleCount).map((line, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                >
                    {line}
                </motion.div>
            ))}
        </div>
    );
}
