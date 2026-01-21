import { motion } from "framer-motion";

export default function ChatMessage({ role, children }) {
    const isAssistant = role === "assistant";

    return (
        <div
            className={`flex ${isAssistant ? "justify-start" : "justify-end"
                }`}
        >
            <div
                className={`max-w-[80%] px-4 py-3 rounded-xl text-sm font-slate leading-relaxed
          ${isAssistant
                        ? "bg-zinc-900 text-white"
                        : "bg-yellow-400 text-black"}
        `}
            >
                {children}
            </div>
        </div>
    );
}

