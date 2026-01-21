import { useEffect, useRef, useState } from "react";

export default function UseTypewriter({ text, speed = 20, onDone }) {
    const [output, setOutput] = useState("");
    const indexRef = useRef(0);
    const aliveRef = useRef(true);

    useEffect(() => {
        aliveRef.current = true;
        setOutput("");
        indexRef.current = 0;

        function type() {
            if (!aliveRef.current) return;

            setOutput((prev) => prev + text.charAt(indexRef.current));
            indexRef.current++;

            if (indexRef.current < text.length) {
                setTimeout(type, speed);
            } else {
                onDone?.();
            }
        }

        type();

        return () => {
            aliveRef.current = false;
        };
    }, [text, speed, onDone]);

    return <span>{output}</span>;
}
