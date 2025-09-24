"use client";
import { useState } from "react";

const CustomSelect = ({ options, placeholder, value, onChange }) => {
const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <div
                className="w-full px-3 py-2 rounded-lg border cursor-pointer"
                style={{
                    borderColor: "var(--border-color)",
                    color: "var(--foreground)",
                    backgroundColor: "var(--background)",
                }}
                onClick={() => setIsOpen(!isOpen)}
                >
                {value || placeholder}
            </div>
            
            {isOpen && (
                <div 
                    className="absolute z-10 w-full mt-1 rounded-lg border"
                    style={{
                    borderColor: "var(--border-color)",
                    backgroundColor: "var(--background)",
                    boxShadow: "var(--dropdown-shadow)",
                    }}
                >
                    {options.map((option) => (
                    <div
                        key={option}
                        className="px-3 py-2 cursor-pointer hover:bg-[var(--hover-bg)]"
                        style={{ color: "var(--foreground)" }}
                        onClick={() => {
                        onChange(option);
                        setIsOpen(false);
                        }}
                    >
                        {option}
                    </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const Page = () => {
  const [formData, setFormData] = useState({
    profile: ""
  });

  return (
    <div className="min-h-screen flex justify-center bg-[var(--background)] text-[var(--foreground)]">
        <div
            className="w-full rounded-2xl p-8 m-5 shadow-lg"
            style={{
            boxShadow: "0 4px 6px var(--shadow-color)",
            background: "var(--background)",
            }}
        >
            <h2 className="text-lg font-semibold mb-4">Fill the form</h2>
            <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                    { label: "Full Name", placeholder: "Your Full Name" },
                    { label: "Email Id", placeholder: "Your Email" },
                    { label: "Phone", placeholder: "Phone" },
                    {
                        label: "Profile",
                        type: "select",
                        options: ["Admin", "Donar", "Faculty"],
                    },
                    { label: "Subject", placeholder: "mention subject" },
                    ].map((field, idx) => (
                    <div key={idx}>
                        <label className="block text-sm text-[var(--muted-foreground)] mb-1">
                        {field.label}
                        </label>
                        {field.type === "select" ? (
                        <CustomSelect
                            options={field.options}
                            placeholder={`Your ${field.label}`}
                            value={formData.profile}
                            onChange={(value) => setFormData({...formData, profile: value})}
                        />
                        ) : (
                        <input
                            type="text"
                            placeholder={field.placeholder}
                            className="w-full px-3 py-2 rounded-lg border"
                            style={{
                            borderColor: "var(--border-color)",
                            color: "var(--foreground)",
                            backgroundColor: "var(--background)",
                            }}
                        />
                        )}
                    </div>
                    ))}
                </div>
                <div>
                    <label htmlFor="descript" className="block text-sm text-[var(--muted-foreground)] mb-1 mt-5">Description</label>
                    <textarea name="dsecription" id="descript"
                        className="w-full px-3 py-2 rounded-lg border"
                        style={{
                        borderColor: "var(--border-color)",
                        color: "var(--foreground)",
                        backgroundColor: "var(--background)",
                        }}>

                    </textarea>
                </div>
                {/* ... rest of your form */}
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setFormData({...formData})}
                    className="px-4 py-2 rounded-lg text-white bg-green-600 hover:bg-green-700 transition"
                  >
                    Submit
                  </button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default Page;