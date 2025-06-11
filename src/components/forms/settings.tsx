import { Fragment } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Link } from "react-router-dom"; // Importamos Link para los enlaces

export interface SettingsPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect?: (category: string, label: string) => void;
}

const CATEGORIES: {
    title: string;
    options: { label: string; link: string }[];
}[] = [
    //en la parte del link "" va la ruta a donde de dirigira cuando presione cierta opcion
    {
        title: "Account Settings",
        options: [
            { label: "Notification Preferences", link: "" },
            { label: "Language", link: "" },
        ],
    },
    {
        title: "Security",
        options: [
            { label: "Two‑Step Verification", link: "" },
            { label: "Log out from All Devices", link: "" },
        ],
    },
    {
        title: "Privacy",
        options: [
            { label: "Delete Account", link: "" },
            { label: "Manage Permissions", link: "" },
        ],
    },
    {
        title: "Support",
        options: [
            { label: "Help & FAQs", link: "" },
            { label: "Contact Support", link: "" },
            { label: "Send Feedback", link: "" },
        ],
    },
];

export default function SettingsPopup({
                                          isOpen,
                                          onClose,
                                          onSelect,
                                      }: SettingsPopupProps) {
    if (!isOpen) return null;

    // createPortal target (safe for SSR)
    const container = typeof window !== "undefined" ? document.body : null;
    if (!container) return null;

    // ------------------------------------------------------------------
    // Render
    // ------------------------------------------------------------------
    return createPortal(
        <Fragment>
            {/* ─────────────────── Overlay ─────────────────── */}
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                // No se cierra al hacer clic fuera del popup
            >
                {/* ────────────────── Modal card ────────────────── */}
                <div
                    className="relative mx-4 flex w-full max-w-3xl flex-col gap-8 rounded-2xl bg-white p-10 shadow-lg animate-fade-in"
                    onClick={(e) => e.stopPropagation()} // No cierra el popup si se hace clic dentro del contenido
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 rounded-full p-1.5 transition hover:bg-gray-100"
                        aria-label="Cerrar"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    {/* Title */}
                    <h2 className="text-center text-3xl font-semibold tracking-wide">Settings</h2>

                    {/* Layout */}
                    <div className="flex flex-col items-stretch gap-10 md:flex-row md:gap-16">
                        {/* Left image / placeholder */}
                        <div className="mx-auto h-60 w-60 flex-shrink-0 rounded-md bg-gray-300/70" />

                        {/* Settings grid */}
                        <div className="grid flex-1 grid-cols-1 gap-y-8 md:grid-cols-2 md:gap-x-12">
                            {CATEGORIES.map(({ title, options }) => (
                                <div key={title} className="flex flex-col gap-4">
                                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

                                    {/* Options */}
                                    <ul className="flex flex-col gap-3">
                                        {options.map(({ label, link }) => (
                                            <li key={label}>
                                                <Link
                                                    to={link} // Usamos Link para redirigir
                                                    className="text-left text-sm font-medium text-gray-600 transition hover:text-gray-900"
                                                    onClick={() => onSelect?.(title, label)} // Trigger onSelect if provided
                                                >
                                                    {label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>,
        container,
    );
}
