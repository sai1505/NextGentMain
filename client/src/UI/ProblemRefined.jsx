export default function ProblemOverview({ data }) {
    if (!data) return null;

    const Section = ({ title, items }) => {
        if (!items) return null;

        const list = Array.isArray(items)
            ? items
            : typeof items === "object"
                ? Object.entries(items).map(
                    ([k, v]) => `${k}: ${v}`
                )
                : [];

        return (
            <div className="space-y-2">
                <h3 className="text-sm font-slate-medium text-yellow-400">
                    {title}
                </h3>
                <ul className="list-disc font-slate list-inside text-sm text-gray-300 space-y-1">
                    {list.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            </div>
        );
    };


    return (
        <div className="rounded-xl p-2 space-y-6">
            {/* Summary */}
            <div className="space-y-2">
                <h2 className="text-base font-slate-medium text-yellow-400">
                    Problem Summary
                </h2>
                <p className="text-sm font-slate text-gray-300 leading-relaxed">
                    {data.problem_summary}
                </p>
            </div>

            <Section title="In Scope" items={data.in_scope} />
            <Section title="Out of Scope" items={data.out_of_scope} />
            <Section title="Assumptions" items={data.assumptions} />
            <Section title="Constraints" items={data.constraints} />
            <Section title="Open Points" items={data.open_points} />
        </div>
    );
}
