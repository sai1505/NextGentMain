export default function Footer() {
    return (
        <footer className="bg-black text-gray-300 border-t border-zinc-900">
            {/* Bottom bar */}
            <div className="text-center py-4 font-slate text-sm text-gray-400">
                © {new Date().getFullYear()} NextGent. All rights reserved.
            </div>
        </footer>
    );
}
