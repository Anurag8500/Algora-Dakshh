"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ProfileField } from "./ProfileField";
import { useAccount } from "wagmi";
import { Loader2 } from "lucide-react";

interface ProfileFormProps {
  role: "user" | "developer";
}

export function ProfileForm({ role }: ProfileFormProps) {
  const router = useRouter();
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    accountType: "individual",
    github: "",
    website: "",
    bio: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const isDeveloper = role === "developer";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !address) return;
    
    setLoading(true);
    
    try {
      const response = await fetch("/api/user/complete-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress: address,
          username: formData.name,
          email: formData.email,
          bio: formData.bio,
        }),
      });

      const data = await response.json();

      if (data.success) {
        if (data.role === "developer") {
          router.push("/developer-dashboard");
        } else {
          router.push("/user-dashboard");
        }
      }
    } catch (error) {
      console.error("Profile update error:", error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#0A0A0A] border border-gray-800 rounded-2xl p-6 md:p-10 w-full max-w-lg mx-auto shadow-[0_0_40px_rgba(0,0,0,0.5)]"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Complete your profile
        </h2>
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20">
          {isDeveloper ? "Developer Account" : "User Account"}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-5">
          
          <motion.div variants={itemVariants}>
            <ProfileField
              label="Full Name"
              name="name"
              placeholder="Satoshi Nakamoto"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <ProfileField
              label="Email Address"
              name="email"
              type="email"
              placeholder="satoshi@example.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              optional={!isDeveloper}
            />
          </motion.div>

          {!isDeveloper && (
            <motion.div variants={itemVariants}>
              <ProfileField
                label="Country"
                name="country"
                placeholder="Japan"
                value={formData.country}
                onChange={handleChange}
                optional
              />
            </motion.div>
          )}

          {isDeveloper && (
            <>
              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-sm font-medium text-foreground">Account Type</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                    <input
                      type="radio"
                      name="accountType"
                      value="individual"
                      checked={formData.accountType === "individual"}
                      onChange={handleChange}
                      className="accent-[#00FF88]"
                    />
                    Individual
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                    <input
                      type="radio"
                      name="accountType"
                      value="organization"
                      checked={formData.accountType === "organization"}
                      onChange={handleChange}
                      className="accent-[#00FF88]"
                    />
                    Organization
                  </label>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <ProfileField
                  label="GitHub Profile"
                  name="github"
                  placeholder="https://github.com/satoshi"
                  value={formData.github}
                  onChange={handleChange}
                  optional
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <ProfileField
                  label="Website URL"
                  name="website"
                  placeholder="https://example.com"
                  value={formData.website}
                  onChange={handleChange}
                  optional
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="flex flex-col gap-1.5 w-full">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground">Short Bio</label>
                    <span className="text-xs text-muted-foreground">Optional</span>
                  </div>
                  <textarea
                    name="bio"
                    rows={3}
                    placeholder="Tell us about the agents you build..."
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full bg-[#050505] border border-gray-800 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors focus:outline-none focus:ring-1 focus:border-[#00FF88] focus:ring-[#00FF88] resize-none"
                  />
                </div>
              </motion.div>
            </>
          )}

          {/* Wallet Read-Only Display */}
          <motion.div variants={itemVariants} className="pt-2">
            <label className="text-sm font-medium text-foreground block mb-1.5">Connected Wallet</label>
            <div className="bg-[#050505] border border-gray-800 rounded-lg px-4 py-3 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#00FF88] shadow-[0_0_8px_rgba(0,255,136,0.6)]" />
              <span className="text-sm font-mono text-muted-foreground">{address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "No wallet connected"}</span>
            </div>
          </motion.div>

        </motion.div>

        <motion.button
          disabled={loading}
          type="submit"
          whileHover={{ scale: loading ? 1 : 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center justify-center w-full px-8 py-3.5 text-base font-semibold text-background bg-primary rounded-xl transition-all duration-300 hover:bg-[#00eb7b] hover:shadow-[0_0_25px_rgba(0,208,112,0.4)] disabled:opacity-70 disabled:cursor-not-allowed mt-8"
        >
          {loading ? "Saving..." : "Complete Profile"}
        </motion.button>
      </form>
    </motion.div>
  );
}
