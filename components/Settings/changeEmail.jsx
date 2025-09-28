"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const changeEmail = () => {
// const [isEditingEmail, setIsEditingEmail] = useState(false);
const [isEditingEmail, setIsEditingEmail] = useState(false);
const [emailStep, setEmailStep] = useState(1);

  return (
    <>
        <div
            className="p-6 rounded-2xl shadow-lg bg-[var(--background)]"
            style={{ boxShadow: "0 4px 8px var(--shadow-color)" }}
        >
            <h2 className="text-lg font-semibold mb-4 text-[var(--foreground)]">Email Address</h2>
            <div className="flex items-center justify-between">
            <div>
                <p className="font-medium text-[var(--foreground)]">sophia.patel@email.com</p>
                <p className="text-sm text-[var(--muted-foreground)]">Updated 1 month ago</p>
            </div>
            <button
                onClick={() => setIsEditingEmail(true)}
                className="px-4 py-2 rounded-lg bg-[var(--color-primary)] text-[var(--color-on-primary)] hover:bg-[var(--color-primary-hover)] transition"
            >
                Edit
            </button>
            </div>
        </div>

        {/* ================= Email Edit Modal ================= */}
        <AnimatePresence>
            {isEditingEmail && (
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
                >
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.9 }}
                        className="bg-background p-6 rounded-2xl shadow-lg w-full max-w-md relative mx-4"
                    >
                        {/* Close button */}
                        <button
                        onClick={() => setIsEditingEmail(false)}
                        className="absolute top-3 right-3 text-[var(--muted-foreground)] hover:text-foreground"
                        >
                        <X className="h-5 w-5" />
                        </button>

                        {/* Step 1: Confirm current email + password */}
                        {emailStep === 1 && (
                        <>
                            {/* Title */}
                            <h2 className="text-lg font-semibold mb-4">Verify Identity</h2>
                            <p className="text-sm text-[var(--muted-foreground)] mb-4">Enter your current email and password</p>
                            <input
                            type="email"
                            placeholder="Current Email"
                            className="w-full px-3 py-2 rounded-lg border mb-3"
                            style={{ borderColor: "var(--border-color)", color: "var(--foreground)" }}
                            />
                            <input
                            type="password"
                            placeholder="Current Password"
                            className="w-full px-3 py-2 rounded-lg border mb-4"
                            style={{ borderColor: "var(--border-color)", color: "var(--foreground)" }}
                            />

                            <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setIsEditingEmail(false)}
                                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-black transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setEmailStep(2)}
                                className="px-4 py-2 rounded-lg bg-[var(--color-primary)] text-[var(--color-on-primary)] hover:bg-[var(--color-primary-hover)] transition"
                            >
                                Continue
                            </button>
                            </div>
                        </>
                        )}

                        {/* Step 2: Enter new email */}
                        {emailStep === 2 && (
                        <>
                            {/* Title */}
                            <h2 className="text-lg font-semibold mb-4">Update Email</h2>
                            <input
                            type="email"
                            placeholder="New Email"
                            className="w-full px-3 py-2 rounded-lg border mb-3"
                            style={{ borderColor: "var(--border-color)", color: "var(--foreground)" }}
                            />
                            <input
                            type="email"
                            placeholder="Confirm New Email"
                            className="w-full px-3 py-2 rounded-lg border mb-4"
                            style={{ borderColor: "var(--border-color)", color: "var(--foreground)" }}
                            />

                            <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setEmailStep(1)}
                                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-black transition"
                            >
                                Back
                            </button>
                            <button
                                onClick={() => setEmailStep(3)}
                                className="px-4 py-2 rounded-lg bg-[var(--color-primary)] text-[var(--color-on-primary)] hover:bg-[var(--color-primary-hover)] transition"
                            >
                                Send Verification Code
                            </button>
                            </div>
                        </>
                        )}

                        {/* Step 3: Verify code */}
                        {emailStep === 3 && (
                        <>
                            {/* Title */}
                            <h2 className="text-lg font-semibold mb-4">Verify New Email</h2>
                            <input
                            type="text"
                            placeholder="Enter Verification Code"
                            className="w-full px-3 py-2 rounded-lg border mb-4"
                            style={{ borderColor: "var(--border-color)", color: "var(--foreground)" }}
                            />

                            <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setEmailStep(2)}
                                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-black transition"
                            >
                                Back
                            </button>
                            <button
                                onClick={() => {
                                // ✅ Verify & Update Email API call
                                setIsEditingEmail(false);
                                setEmailStep(1);
                                }}
                                className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition"
                            >
                                Verify & Update
                            </button>
                            </div>
                        </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

    </>
  )
}

export default changeEmail