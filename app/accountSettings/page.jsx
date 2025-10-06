"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Mail, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PasswordSettings from "@/components/Settings/resetPassword";
import EmailSetting from "@/components/Settings/changeEmail";
import profile2 from "../../public/profileImage.png"

// Custom Select Component (reuse the same one)
const CustomSelect = ({ options, placeholder, value, onChange }) => {
const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div
        className="w-full px-3 py-2 rounded-lg border cursor-pointer flex justify-between items-center"
        style={{
          borderColor: "var(--border-color)",
          color: "var(--foreground)",
          backgroundColor: "var(--background)",
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value || placeholder}</span>
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      
      {isOpen && (
        <div 
          className="absolute z-10 w-full mt-1 rounded-lg border max-h-60 overflow-y-auto"
          style={{
            borderColor: "var(--border-color)",
            backgroundColor: "var(--background)",
            boxShadow: "var(--dropdown-shadow)",
          }}
        >
          {options.map((option) => (
            <div
              key={option}
              className="px-3 py-2 cursor-pointer hover:bg-[var(--hover-bg)] transition-colors"
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

export default function ProfileSettingsPage() {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [userData, setUserData] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    profile: "",
    country: "",
    state: "",
    city: "",
    pincode: ""
  });

  const [profilePhoto, setProfilePhoto] = useState(profile2);
  const [showUpdatePhotoModal, setShowUpdatePhotoModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleUpdatePhoto = () => {
    if (!selectedPhoto) return;
    const newPhotoUrl = URL.createObjectURL(selectedPhoto); // for preview (in real app, upload to server)
    setProfilePhoto(newPhotoUrl);
    setShowUpdatePhotoModal(false);
  };

  const handleDeletePhoto = () => {
    setProfilePhoto(""); // remove profile photo
  };

  useEffect(() => {
    if (userData?.photoUrl) {
      setProfilePhoto(userData.photoUrl);
    }
  }, [userData]);



  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field.toLowerCase().replace(/\s+/g, '')]: value
    }));
  };

  return (
    <div className="min-h-screen flex justify-center bg-[var(--background)] text-[var(--foreground)]">
      <div
        className="w-full p-8 m-5 mt-1"
        style={{
          background: "var(--background)",
        }}
      >
        {/* ================= Profile Header ================= */}
        <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* ================= Left Column ================= */}
          {/* Profile Photo Section */}
          <div
            className="p-6 rounded-2xl shadow-lg flex flex-col items-center bg-[var(--background)]"
            style={{ boxShadow: "0 4px 8px var(--shadow-color)" }}
          >
            <div className="relative w-32 h-32 rounded-full border-2 overflow-hidden mb-4"
              style={{ borderColor: "var(--border-color)" }}
            >
              {profilePhoto ? (
                <Image src={profilePhoto} alt="Profile Picture" fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm text-[var(--muted-foreground)] bg-[var(--hover-bg)]">
                  No Photo
                </div>
              )}
            </div>

            <h2 className="text-lg font-semibold text-[var(--foreground)]">Sophia Patel</h2>
            <p className="text-sm text-[var(--muted-foreground)] mb-4">sophia.patel@email.com</p>

            {/* Actions */}
            <div className="flex flex-col gap-3 w-full md:w-[190px]">
              <button
                onClick={() => setShowUpdatePhotoModal(true)}
                className="px-4 py-2 rounded-lg bg-[var(--color-secondary)] text-[var(--color-on-secondary)] hover:bg-[var(--color-secondary-hover)] transition font-medium"
              >
                Update Profile Photo
              </button>
              <button
                onClick={handleDeletePhoto}
                className="w-full px-4 py-2 rounded-lg text-red-700 border border-red-700 hover:bg-red-50 dark:hover:bg-red-500 transition font-medium"
              >
                Delete Profile Photo
              </button>
            </div>
          </div>


          {/* ================= Right Column ================= */}
          <div
            className="p-6 rounded-2xl shadow-lg md:col-span-2 bg-[var(--background)]"
            style={{ boxShadow: "0 4px 8px var(--shadow-color)" }}
          >
            <h2 className="text-lg font-semibold mb-6 text-[var(--foreground)]">Profile Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Phone", value: "1234567890" },
                { label: "Profile", value: "Admin" },
                { label: "Country", value: "India" },
                { label: "State", value: "New Delhi" },
                { label: "City", value: "New Delhi" },
                { label: "Postal Code", value: "110059" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-1.5 rounded-lg"
                  style={{
                    borderColor: "var(--border-all)",
                    backgroundColor: "var(--hover-bg)",
                    boxShadow: "0 1px 3px var(--shadow-color)",
                  }}
                >
                  <div className="text-xs font-medium uppercase tracking-wide mb-1 text-[var(--muted-foreground)]">
                    {item.label}
                  </div>
                  <div className="text-sm font-semibold text-[var(--foreground)]">{item.value}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-3">
                <button
                onClick={() => setIsEditingProfile(true)}
                className="px-4 py-2 rounded-lg bg-[var(--color-secondary)] text-[var(--color-on-secondary)] hover:bg-[var(--color-secondary-hover)] transition font-medium"
              >
                Edit
              </button>
              </div>
          </div> 
        </div>

        {/* ================= Settings Section ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Email Setting */}
          <EmailSetting/>

          {/* Password Setting */}
          <PasswordSettings/>
        </div>

        {/* ================= Profile photo Edit Modal ================= */}
        <AnimatePresence>
          {showUpdatePhotoModal && (
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
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                  <div className="bg-[var(--background)] p-6 rounded-2xl shadow-lg w-full max-w-md relative"
                    style={{
                      backgroundColor: "var(--background)",
                      boxShadow: "0 10px 25px var(--shadow-color)"
                    }}
                  >
                    <button
                      onClick={() => setShowUpdatePhotoModal(false)}
                      className="absolute top-3 right-3 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                    >
                      ✕
                    </button>

                    <h2 className="text-lg font-semibold mb-4 text-[var(--foreground)]">
                      Update Profile Photo
                    </h2>

                    <input
                      type="file"
                      accept="image/*"
                      className="w-full mb-4"
                      onChange={(e) => setSelectedPhoto(e.target.files?.[0] || null)}
                    />

                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                      onClick={handleUpdatePhoto}
                      className="px-4 py-2 rounded-lg text-white bg-green-600 hover:bg-green-700 transition"
                    >
                      Save Photo
                    </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* ================= Profile Information Edit Modal ================= */}
        <AnimatePresence>
          {isEditingProfile && (
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
                className="bg-background p-6 rounded-2xl shadow-lg w-full max-w-2xl mx-4 relative max-h-[90vh] overflow-y-auto"
                style={{
                  backgroundColor: "var(--background)",
                  boxShadow: "0 10px 25px var(--shadow-color)"
                }}
              >
                <button
                  onClick={() => setIsEditingProfile(false)}
                  className="absolute top-4 right-4 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
                
                <h2 className="text-lg font-semibold mb-6" style={{ color: "var(--foreground)" }}>
                  Edit Profile
                </h2>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: "First Name", placeholder: "Your First Name", key: "firstName" },
                    { label: "Last Name", placeholder: "Your Last Name", key: "lastName" },
                    { label: "Phone", placeholder: "Phone", key: "phone" },
                    {
                      label: "Profile",
                      type: "select",
                      options: ["Admin", "Donar", "Faculty"],
                      key: "profile"
                    },
                    {
                      label: "Country",
                      type: "select",
                      options: ["India", "U.S.A", "Japan"],
                      key: "country"
                    },
                    {
                      label: "State",
                      type: "select",
                      options: ["Delhi", "U.P.", "Maharashtra"],
                      key: "state"
                    },
                    {
                      label: "City",
                      type: "select",
                      options: ["New Delhi", "Mathura", "Pune"],
                      key: "city"
                    },
                    { label: "PinCode", placeholder: "PinCode", key: "pincode" },
                  ].map((field, idx) => (
                    <div key={idx}>
                      <label className="block text-sm text-[var(--muted-foreground)] mb-2 font-medium">
                        {field.label}
                      </label>
                      {field.type === "select" ? (
                        <CustomSelect
                          options={field.options}
                          placeholder={`Select ${field.label}`}
                          value={profileData[field.key]}
                          onChange={(value) => handleInputChange(field.key, value)}
                        />
                      ) : (
                        <input
                          type="text"
                          placeholder={field.placeholder}
                          value={profileData[field.key]}
                          onChange={(e) => handleInputChange(field.key, e.target.value)}
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
                </form>

                <div className="mt-6 flex justify-end space-x-3">
                  {/* <button
                    onClick={() => setIsEditingProfile(false)}
                    className="px-4 py-2 rounded-lg border transition-colors"
                    style={{
                      borderColor: "var(--border-color)",
                      color: "var(--foreground)",
                      backgroundColor: "var(--background)",
                    }}
                  >
                    Cancel
                  </button> */}
                  <button
                    onClick={() => setIsEditingProfile(false)}
                    className="px-4 py-2 rounded-lg text-white bg-green-600 hover:bg-green-700 transition"
                  >
                    Save
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
    

      </div>
    </div>
  );
}
