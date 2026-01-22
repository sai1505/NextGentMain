import { useEffect, useState } from "react";
import ChatMessage from "../UI/ChatMessage";
import LineReveal from "../UI/LineReveal";


const API = "http://localhost:8000/stakeholder";

export default function UserDashboard() {
    const [sessionId, setSessionId] = useState(null);
    const [chat, setChat] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [typingId, setTypingId] = useState(null);

    // 1️⃣ START SESSION
    useEffect(() => {
        const startSession = async () => {
            const res = await fetch(`${API}/start`, { method: "POST" });
            const data = await res.json();

            sessionStorage.setItem("sessionId", data.session_id);

            setSessionId(data.session_id);
            setChat([{ role: "assistant", text: data.question }]);
        };

        startSession();
    }, []);

    // 2️⃣ SEND ANSWER USING SESSION ID
    const sendAnswer = async () => {
        if (!input.trim() || !sessionId) return;

        const userText = input;
        setChat((c) => [...c, { id: Date.now(), role: "user", text: userText }]);
        setInput("");
        setLoading(true);

        const res = await fetch(
            `${API}/answer?session_id=${sessionId}&answer=${encodeURIComponent(
                userText
            )}`,
            { method: "POST" }
        );

        const data = await res.json();

        const assistantText = data.question ?? data.message ?? "";

        if (assistantText) {
            const id = Date.now();              // 👈 CREATE ID HERE

            setChat((c) => [
                ...c,
                { id, role: "assistant", text: assistantText },
            ]);

            setTypingId(id);                    // 👈 MARK THIS MESSAGE AS TYPING
        }

        setLoading(false);
    };


    return (
        <div className="min-h-screen bg-black text-white flex justify-center px-4">
            <div className="w-full max-w-3xl flex flex-col pt-24 h-screen">

                {/* CHAT (SCROLLABLE) */}
                <div className="flex-1 overflow-y-auto space-y-8 pr-2">
                    {chat.map((m) => (
                        <ChatMessage key={m.id} role={m.role}>
                            {m.role === "assistant" && m.id === typingId ? (
                                <LineReveal text={m.text} />
                            ) : (
                                m.text
                            )}
                        </ChatMessage>
                    ))}

                    {loading && (
                        <div className="text-sm text-gray-400 px-4">Thinking…</div>
                    )}
                </div>

                {/* INPUT (FIXED INSIDE CONTAINER) */}
                <div className="sticky bottom-0 bg-black pt-4 pb-6">
                    <div className="flex items-center gap-3 border border-zinc-800 rounded-xl px-4 py-3">
                        <input
                            className="flex-1 bg-transparent outline-none font-slate text-sm text-white placeholder-gray-500"
                            placeholder="Type your response…"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendAnswer()}
                        />
                        <button
                            onClick={sendAnswer}
                            className="bg-yellow-400 text-black px-4 py-2 rounded-lg text-sm font-slate-medium"
                        >
                            Send
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );

}
