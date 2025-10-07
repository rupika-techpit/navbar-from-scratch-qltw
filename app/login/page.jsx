"use client";

import { useState } from "react";
import AuthForm from "@/components/auth/SignUp";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (formData) => {
    setLoading(true); // start loading
    console.log("User Submitted:", formData);
    try {
      // Call your API or Catalyst function here
      // await api.signUp(formData);
    } catch (error) {
      console.error("Sign-up error:", error);
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)] text-[var(--foreground)] px-4">
      <AuthForm mode="login" onSubmit={handleSignUp} loading={loading} />
    </div>
  );
}
