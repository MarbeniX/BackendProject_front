import { Fragment, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface SaveChangesDialogProps {
    /** Whether the dialog is visible */
    isOpen: boolean;
    /** Main headline */
    title?: string;
    /** Supporting paragraph */
    message?: string;
    /** Executes once the user confirms */
    onConfirm: () => void;
    /** Executes once the user cancels / goes back */
    onCancel: () => void;
    /** Label for the primary (confirm) button */
    confirmLabel?: string;
    /** Label for the secondary (back) button */
    backLabel?: string;
    /** Optional icon / avatar element */
    leading?: ReactNode;
}

/**
 * SaveChangesDialog – confirmation modal matching the provided mockup.
 *
 * Usage:
 * ```tsx
 * <SaveChangesDialog
 *   isOpen={open}
 *   onConfirm={handleSave}
 *   onCancel={() => setOpen(false)}
 * />
 * ```
 */
export default function SaveChangesDialog({
                                              isOpen,
                                              title = 'Are you sure you want to save the changes?',
                                              message = 'Once saved, the changes will be applied permanently.',
                                              onConfirm,
                                              onCancel,
                                              confirmLabel = 'Confirm',
                                              backLabel = 'Back',
                                              leading,
                                          }: SaveChangesDialogProps) {
    if (!isOpen) return null;

    const container = typeof window !== 'undefined' ? document.body : null;
    if (!container) return null;

    return createPortal(
        <Fragment>
            {/* Backdrop */}
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                {/* Card */}
                <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-lg animate-fade-in">
                    {/* Header */}
                    <div className="flex items-start gap-4">
                        {leading ?? (
                            <div className="w-12 h-12 rounded-full bg-gray-500 flex-shrink-0" />
                        )}

                        <div>
                            <h2 className="text-xl font-bold leading-tight">{title}</h2>
                            <p className="text-sm text-gray-500 mt-1">{message}</p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 flex justify-end gap-4">
                        <button
                            onClick={onCancel}
                            className="px-4 py-2 font-medium text-black hover:underline transition-all"
                        >
                            {backLabel}
                        </button>
                        <button
                            onClick={onConfirm}
                            className="px-6 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-black transition-all"
                        >
                            {confirmLabel}
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>,
        container,
    );
}
