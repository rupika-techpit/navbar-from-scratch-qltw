"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";


export default function PasswordSettings() {
  // const [showOtpModal, setShowOtpModal] = useState(false);
  // const [otp, setOtp] = useState("");
  // const [isOtpVerified, setIsOtpVerified] = useState(false);
  // const [newPassword, setNewPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [passwordStep, setPasswordStep] = useState(1);
  const [forgotFlow, setForgotFlow] = useState(false);


  // const handleOtpSubmit = () => {
  //   if (otp === "123456") {
  //     setIsOtpVerified(true);
  //     setShowOtpModal(false);
  //   } else {
  //     alert("Invalid OTP");
  //   }
  // };

  // const handlePasswordReset = () => {
  //   if (newPassword !== confirmPassword) {
  //     alert("Passwords do not match!");
  //     return;
  //   }
  //   alert("Password successfully reset!");
  //   setNewPassword("");
  //   setConfirmPassword("");
  //   setIsOtpVerified(false);
  // };

  return (
  <>
    {/* Password Setting */}
    <div
      className="p-6 rounded-2xl shadow-lg bg-[var(--background)]"
      style={{ boxShadow: "0 4px 8px var(--shadow-color)" }}
    >
      <h2 className="text-lg font-semibold mb-4 text-[var(--foreground)]">Password</h2>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-[var(--foreground)]">********</p>
          <p className="text-sm text-[var(--muted-foreground)]">Last changed 2 months ago</p>
        </div>
        <button
          onClick={() => setIsEditingPassword(true)}
          className="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition"
        >
          Edit
        </button>
      </div>
    </div>

    {/* OTP Modal */}
    {/* <AnimatePresence>
      {showOtpModal && (
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
            className="bg-background p-6 rounded-2xl shadow-lg w-full max-w-md relative"
          >
            <button
              onClick={() => setShowOtpModal(false)}
              className="absolute top-3 right-3 text-[var(--muted-foreground)] hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-lg font-semibold mb-4">Enter OTP</h2>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full px-4 py-2 rounded-lg border border-[var(--border-all)] bg-background mb-4"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              onClick={handleOtpSubmit}
              className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Verify OTP
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence> */}

    {/* Show password fields modal ONLY if OTP is verified */}
    {/* <AnimatePresence>
      {isOtpVerified && (
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
            className="bg-background p-6 rounded-2xl shadow-lg w-full max-w-md relative"
          >
          <button
            onClick={() => setShowUpdatePhotoModal(false)}
            className="absolute top-3 right-3 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            ✕
          </button>
          <div className="flex flex-col gap-3 ml-20 mr-20">
            <input
              type="password"
              placeholder="New Password"
              className="px-4 py-2 rounded-lg border border-[var(--border-all)] bg-background"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="px-4 py-2 rounded-lg border border-[var(--border-all)] bg-background"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              onClick={handlePasswordReset}
              className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
            >
              Save Password
            </button>
          </div>
            
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence> */}

    {/* Change Password Modal */}
    <AnimatePresence>
      {isEditingPassword && (
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
              onClick={() => {
                setIsEditingPassword(false);
                setPasswordStep(1);
                setForgotFlow(false);
              }}
              className="absolute top-3 right-3 text-[var(--muted-foreground)] hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            {/* <h2 className="text-lg font-semibold mb-4">
              {forgotFlow ? "Reset Password" : ""}
            </h2> */}

            {/* === Path A: Normal Flow === */}
            {!forgotFlow && (
              <>
                {/* Step 1: Verify Identity */}
                {passwordStep === 1 && (
                  <>
                    <h2 className="text-lg font-semibold mb-4">Verify Identity</h2>
                    <p className="text-sm text-[var(--muted-foreground)] mb-4">Enter your email and password to continue</p>
                    <input
                      type="email"
                      placeholder="Current Email"
                      className="w-full px-3 py-2 rounded-lg border mb-3"
                      style={{ borderColor: "var(--border-color)" }}
                    />
                    <input
                      type="password"
                      placeholder="Current Password"
                      className="w-full px-3 py-2 rounded-lg border mb-2"
                      style={{ borderColor: "var(--border-color)" }}
                    />
                    <button
                      className="text-blue-600 text-sm mb-4 hover:underline"
                      onClick={() => setForgotFlow(true)}
                    >
                      Forgot Password?
                    </button>

                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setIsEditingPassword(false)}
                        className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => setPasswordStep(2)}
                        className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Continue
                      </button>
                    </div>
                  </>
                )}

                {/* Step 2: Verify OTP */}
                {passwordStep === 2 && (
                  <>
                    <h2 className="text-lg font-semibold mb-4">Verify OTP</h2>
                    <p className="text-sm text-[var(--muted-foreground)] mb-4">Enter the verification code sent  to your email</p>
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      className="w-full px-3 py-2 rounded-lg border mb-4"
                      style={{ borderColor: "var(--border-color)" }}
                    />

                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setPasswordStep(1)}
                        className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => setPasswordStep(3)}
                        className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Verify
                      </button>
                    </div>
                  </>
                )}

                {/* Step 3: Set New Password */}
                {passwordStep === 3 && (
                  <>
                    <h2 className="text-lg font-semibold mb-4">Set New Password</h2>
                    <p className="text-sm text-[var(--muted-foreground)] mb-4">Create new password for your account</p>
                    <input
                      type="password"
                      placeholder="New Password"
                      className="w-full px-3 py-2 rounded-lg border mb-3"
                      style={{ borderColor: "var(--border-color)" }}
                    />
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      className="w-full px-3 py-2 rounded-lg border mb-4"
                      style={{ borderColor: "var(--border-color)" }}
                    />

                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setPasswordStep(2)}
                        className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => {
                          // ✅ Call update password API
                          setIsEditingPassword(false);
                          setPasswordStep(1);
                        }}
                        className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white"
                      >
                        Update Password
                      </button>
                    </div>
                  </>
                )}
              </>
            )}

            {/* === Path B: Forgot Password Flow === */}
            {forgotFlow && (
              <>
                {/* Step 1: Request Reset Code */}
                {passwordStep === 1 && (
                  <>
                    <h2 className="text-lg font-semibold mb-4">Reset Password</h2>
                    <p className="text-sm text-[var(--muted-foreground)] mb-4"> Enter your email to receive the verification code</p>
                    <input
                      type="email"
                      placeholder="Enter your Email"
                      className="w-full px-3 py-2 rounded-lg border mb-4"
                      style={{ borderColor: "var(--border-color)" }}
                    />

                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => {
                          setForgotFlow(false);
                          setIsEditingPassword(false);
                        }}
                        className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => setPasswordStep(2)}
                        className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Send Code
                      </button>
                    </div>
                  </>
                )}

                {/* Step 2: Verify OTP */}
                {passwordStep === 2 && (
                  <>
                    <h2 className="text-lg font-semibold mb-4">Verify OTP</h2>
                    <p className="text-sm text-[var(--muted-foreground)] mb-4">Enter the verification code sent  to your email</p>
                    <input
                      type="text"
                      placeholder="Enter Verification Code"
                      className="w-full px-3 py-2 rounded-lg border mb-4"
                      style={{ borderColor: "var(--border-color)" }}
                    />

                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setPasswordStep(1)}
                        className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => setPasswordStep(3)}
                        className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Verify
                      </button>
                    </div>
                  </>
                )}

                {/* Step 3: Set New Password */}
                {passwordStep === 3 && (
                  <>
                    <h2 className="text-lg font-semibold mb-4">Set New Password</h2>
                    <p className="text-sm text-[var(--muted-foreground)] mb-4">Create new password for your account</p>
                    <input
                      type="password"
                      placeholder="New Password"
                      className="w-full px-3 py-2 rounded-lg border mb-3"
                      style={{ borderColor: "var(--border-color)" }}
                    />
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      className="w-full px-3 py-2 rounded-lg border mb-4"
                      style={{ borderColor: "var(--border-color)" }}
                    />

                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setPasswordStep(2)}
                        className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => {
                          // ✅ Call reset password API
                          setIsEditingPassword(false);
                          setPasswordStep(1);
                          setForgotFlow(false);
                        }}
                        className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white"
                      >
                        Update Password
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

  </>
);

}


