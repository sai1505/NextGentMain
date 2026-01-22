import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ChatMessage from "../UI/ChatMessage";
import ProblemOverview from "../UI/ProblemRefined";

const API = "http://localhost:8000/validator";

export default function UserValidation() {
    const { state } = useLocation();
    const sessionId = sessionStorage.getItem("sessionId");

    const [chat, setChat] = useState([]);
    const [info, setInfo] = useState(null);
    const [input, setInput] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [finalResult, setFinalResult] = useState(null);

    // 1️⃣ START VALIDATION (auto)
    useEffect(() => {
        if (!sessionId) return;

        fetch(`${API}/start?session_id=${sessionId}`, { method: "POST" })
            .then(res => res.json())
            .then(data => {
                setInfo(data.refined_problem);
                setChat([{ role: "assistant", text: data.message }]);
            });
    }, [sessionId]);

    // 2️⃣ CHAT
    const sendMessage = async () => {
        if (!input.trim()) return;

        const msg = input;
        setInput("");
        setChat(c => [...c, { role: "user", text: msg }]);

        const res = await fetch(
            `${API}/chat?session_id=${sessionId}&message=${encodeURIComponent(msg)}`,
            { method: "POST" }
        );
        const data = await res.json();

        setChat(c => [...c, { role: "assistant", text: data.reply }]);
    };

    // 3️⃣ FINALIZE
    const finalize = async () => {
        const res = await fetch(
            `${API}/finalize?session_id=${sessionId}`,
            { method: "POST" }
        );
        const data = await res.json();

        setFinalResult(data);
        setShowResult(true);
    };

    return (
        <div className="h-screen bg-black text-white flex justify-center px-4">
            <div className="w-full max-w-3xl flex flex-col pt-20 h-full">

                {/* SCROLLABLE CONTENT (INFO + CHAT TOGETHER) */}
                <div className="flex-1 overflow-y-auto space-y-10 pb-32">

                    {/* INFO PANEL */}
                    {info && <ProblemOverview data={info} />}

                    {/* CHAT */}
                    <div className="space-y-6">
                        {chat.map((m, i) => (
                            <ChatMessage key={i} role={m.role}>
                                {m.text}
                            </ChatMessage>
                        ))}
                    </div>

                </div>

                {/* INPUT (STICKY, NOT SCROLLING) */}
                {/* INPUT (STICKY – SAME STYLE AS USER CHAT) */}
                <div className="sticky bottom-0 bg-black pt-4 pb-6">
                    <div className="flex items-center gap-3 border border-zinc-800 rounded-xl px-4 py-3">

                        <input
                            className="flex-1 bg-transparent font-slate outline-none text-sm text-white placeholder-gray-500"
                            placeholder="Suggest correction or ask…"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        />

                        <button
                            onClick={sendMessage}
                            className="bg-yellow-400 text-black px-4 py-2 rounded-lg text-sm font-slate-medium"
                        >
                            Send
                        </button>

                        <button
                            onClick={finalize}
                            className="bg-green-500 text-black px-4 py-2 rounded-lg text-sm font-slate-medium"
                        >
                            Finalize
                        </button>

                    </div>
                </div>

                {/* FINAL RESULT MODAL */}
                {showResult && finalResult && (
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                        <div className="bg-zinc-900 p-6 rounded-2xl w-full max-w-lg shadow-xl space-y-6">

                            <h2 className="text-lg font-slate-medium text-white">
                                Validation Result
                            </h2>

                            <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-400">Project Status:</span>
                                <span
                                    className={`px-3 py-1 rounded-full text-sm ${finalResult.validation_result.feasible
                                        ? "bg-green-500/20 text-green-400"
                                        : "bg-red-500/20 text-red-400"
                                        }`}
                                >
                                    {finalResult.validation_result.feasible
                                        ? "Approved"
                                        : "Not Approved"}
                                </span>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-sm font-slate-medium text-yellow-400">
                                    Key Risks
                                </h3>
                                {finalResult.validation_result.key_risks?.length ? (
                                    <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                                        {finalResult.validation_result.key_risks.map((risk, i) => (
                                            <li key={i}>{risk}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-500 italic">
                                        No major risks identified.
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-sm font-slate-medium text-yellow-400">
                                    Final Notes
                                </h3>
                                <p className="text-sm text-gray-300 leading-relaxed">
                                    {finalResult.validation_result.final_notes}
                                </p>
                            </div>

                            <div className="pt-2 flex justify-end">
                                <button
                                    onClick={() => setShowResult(false)}
                                    className="bg-yellow-400 text-black px-5 py-2 rounded-lg text-sm"
                                >
                                    Close
                                </button>
                            </div>

                        </div>
                    </div>
                )}

            </div>
        </div>
    );

}
