 "use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import Link from "next/link";

export default function SignUpForm({ onSubmit, loading = false }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(form);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md rounded-2xl shadow-lg p-8"
      style={{
                    borderColor: "var(--border-all)",
                    backgroundColor: "var(--hover-bg)",
                    boxShadow: "0 1px 3px var(--shadow-color)",
                  }}
    >
      {/* Header */}
      <div className="flex flex-col items-center mb-6">
        <UserPlus className="w-10 h-10 text-[var(--color-secondary)] mb-2" />
        <h1 className="text-2xl font-semibold">Create Account</h1>
        <p className="text-sm text-[var(--muted-foreground)] mt-1">
          Join us!!
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-lg border text-[var(--foreground)] bg-[var(--background)] focus:outline-none focus:border-[var(--color-secondary)] focus:ring-2 focus:ring-[var(--color-secondary)] focus:ring-opacity-30 hover:border-[var(--color-secondary)] transition-all duration-200"
              style={{ borderColor: "var(--border-color)" }}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-lg border text-[var(--foreground)] bg-[var(--background)] focus:outline-none focus:border-[var(--color-secondary)] focus:ring-2 focus:ring-[var(--color-secondary)] focus:ring-opacity-30 hover:border-[var(--color-secondary)] transition-all duration-200"
              style={{ borderColor: "var(--border-color)" }}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg border text-[var(--foreground)] bg-[var(--background)] focus:outline-none focus:border-[var(--color-secondary)] focus:ring-2 focus:ring-[var(--color-secondary)] focus:ring-opacity-30 hover:border-[var(--color-secondary)] transition-all duration-200"
            style={{ borderColor: "var(--border-color)" }}
          />
        </div>

        <div className="relative">
          <label className="block text-sm mb-1">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg border text-[var(--foreground)] bg-[var(--background)] focus:outline-none focus:border-[var(--color-secondary)] focus:ring-2 focus:ring-[var(--color-secondary)] focus:ring-opacity-30 hover:border-[var(--color-secondary)] transition-all duration-200"
             style={{ borderColor: "var(--border-color)" }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[35px] text-[var(--muted-foreground)]"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-lg font-medium text-[var(--color-on-secondary)] bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-hover)] transition"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>
      </form>

      {/* Footer */}
      <div className="text-center mt-6 text-sm text-[var(--muted-foreground)]">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-[var(--color-secondary)] hover:underline"
        >
          Log in
        </Link>
      </div>
    </motion.div>
  );
}
