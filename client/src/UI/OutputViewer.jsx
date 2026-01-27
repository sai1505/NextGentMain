export default function OutputViewer({ data }) {
    if (!data) return null;

    return (
        <div className="space-y-10 text-gray-200 text-base leading-relaxed">
            {Object.entries(data).map(([key, value]) => (
                <DynamicSection key={key} title={key} value={value} />
            ))}
        </div>
    );
}

/* ---------- SECTION RENDERER ---------- */

function DynamicSection({ title, value }) {
    return (
        <div>
            {/* SECTION TITLE */}
            <h2 className="text-yellow-400 font-semibold text-lg mb-2 capitalize">
                {formatTitle(title)}
            </h2>

            {/* STRING */}
            {typeof value === "string" && <p>{value}</p>}

            {/* ARRAY */}
            {Array.isArray(value) && <BulletList items={value} />}

            {/* OBJECT */}
            {typeof value === "object" && !Array.isArray(value) && (
                <KeyValueList obj={value} />
            )}
        </div>
    );
}

/* ---------- HELPERS ---------- */

function BulletList({ items }) {
    return (
        <ul className="list-disc ml-6 space-y-2">
            {items.map((item, i) => (
                <li key={i}>{String(item)}</li>
            ))}
        </ul>
    );
}

function KeyValueList({ obj }) {
    return (
        <ul className="list-disc ml-6 space-y-2">
            {Object.entries(obj).map(([key, value]) => (
                <li key={key}>
                    <span className="font-semibold capitalize">
                        {formatTitle(key)}:
                    </span>{" "}
                    {renderValue(value)}
                </li>
            ))}
        </ul>
    );
}

function renderValue(value) {
    if (Array.isArray(value)) {
        return value.join(", ");
    }
    if (typeof value === "object") {
        return JSON.stringify(value);
    }
    return String(value);
}

function formatTitle(key) {
    return key.replace(/_/g, " ");
}
