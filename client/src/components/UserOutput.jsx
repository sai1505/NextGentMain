import { useEffect, useState } from "react";
import OutputViewer from "../UI/OutputViewer";


const API = "http://localhost:8000/output";

export default function UserOutput() {
    const sessionId = sessionStorage.getItem("sessionId");

    const [activeView, setActiveView] = useState(null); // "developer" | "stakeholder"
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchOutput = async (type) => {
        if (!sessionId) return;

        setActiveView(type);
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${API}/${type}/${sessionId}`);
            if (!res.ok) throw new Error("Output not available");

            const json = await res.json();
            setData(json);
        } catch (err) {
            setError(err.message);
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex justify-center px-4">
            <div className="w-full max-w-4xl pt-20 space-y-6">

                {/* HEADER */}
                <h1 className="text-xl font-slate-medium text-white">
                    Final Outputs
                </h1>

                {/* BUTTONS */}
                <div className="flex gap-4">
                    <button
                        onClick={() => fetchOutput("developer")}
                        className={`px-4 py-2 rounded-lg text-sm font-slate-medium
                            ${activeView === "developer"
                                ? "bg-yellow-400 text-black"
                                : "bg-zinc-800 text-white hover:bg-zinc-700"}`}
                    >
                        Developer Output
                    </button>

                    <button
                        onClick={() => fetchOutput("stakeholder")}
                        className={`px-4 py-2 rounded-lg text-sm font-slate-medium
                            ${activeView === "stakeholder"
                                ? "bg-yellow-400 text-black"
                                : "bg-zinc-800 text-white hover:bg-zinc-700"}`}
                    >
                        Stakeholder Output
                    </button>
                </div>

                {/* CONTENT */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 min-h-[300px]">

                    {loading && (
                        <p className="text-sm text-gray-400">
                            Loading output…
                        </p>
                    )}

                    {error && (
                        <p className="text-sm text-red-400">
                            {error}
                        </p>
                    )}

                    {!loading && data && <OutputViewer data={data} />}

                    {!loading && !data && !error && (
                        <p className="text-sm text-gray-500 italic">
                            Select an output to view.
                        </p>
                    )}

                </div>

            </div>
        </div>
    );
}
