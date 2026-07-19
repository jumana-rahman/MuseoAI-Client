import { Link } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#F8F5F0] pt-16">
      <div className="relative bg-[#4E342E] py-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=1600&h=600&fit=crop&auto=format" alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="relative">
          <Shield className="w-10 h-10 text-[#D8B892] mx-auto mb-4" />
          <h1 className="font-display text-4xl sm:text-5xl text-[#F8F5F0] font-bold mb-4">Privacy Policy</h1>
          <p className="text-[#8B857C] max-w-lg mx-auto">How we collect, use, and protect your information.</p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link to="/" className="inline-flex items-center gap-1.5 text-[#A65E2E] text-sm font-medium mb-8 hover:gap-2 transition-all">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="bg-white rounded-2xl border border-[#EDD9BC] shadow-warm p-6 sm:p-8 space-y-8">
          <div>
            <h2 className="font-display text-[#4E342E] text-xl font-semibold mb-3">Information We Collect</h2>
            <p className="text-[#5D4037] text-sm leading-relaxed">
              When you create an account, we collect your name, email address, and optional profile information such as your photo, bio, and country. We also collect usage data including museums you view, favorites you save, guides you create, and interactions with our AI features.
            </p>
          </div>

          <div>
            <h2 className="font-display text-[#4E342E] text-xl font-semibold mb-3">How We Use Your Information</h2>
            <p className="text-[#5D4037] text-sm leading-relaxed">
              We use your information to provide and improve our services, personalize your museum recommendations, display your community guides to other users, and communicate important updates about the platform. Your data helps us tailor AI-powered features to your interests and preferences.
            </p>
          </div>

          <div>
            <h2 className="font-display text-[#4E342E] text-xl font-semibold mb-3">Data Sharing</h2>
            <p className="text-[#5D4037] text-sm leading-relaxed">
              We do not sell your personal information to third parties. Your profile name and avatar may be displayed alongside reviews and guides you publish. We may share anonymized, aggregate data for research or analytical purposes.
            </p>
          </div>

          <div>
            <h2 className="font-display text-[#4E342E] text-xl font-semibold mb-3">AI Services</h2>
            <p className="text-[#5D4037] text-sm leading-relaxed">
              Our AI features process your queries using curated museum data. Conversations with the AI Museum Guide may be stored to provide continuity across sessions. We do not use your personal data to train external AI models.
            </p>
          </div>

          <div>
            <h2 className="font-display text-[#4E342E] text-xl font-semibold mb-3">Data Security</h2>
            <p className="text-[#5D4037] text-sm leading-relaxed">
              We implement industry-standard security measures to protect your data, including encrypted transmissions, secure session management, and access controls. However, no method of transmission over the Internet is 100% secure.
            </p>
          </div>

          <div>
            <h2 className="font-display text-[#4E342E] text-xl font-semibold mb-3">Your Rights</h2>
            <p className="text-[#5D4037] text-sm leading-relaxed">
              You can update your profile information at any time from your dashboard. You may request deletion of your account and associated data by contacting us at hello@museoai.com.
            </p>
          </div>

          <div>
            <h2 className="font-display text-[#4E342E] text-xl font-semibold mb-3">Contact</h2>
            <p className="text-[#5D4037] text-sm leading-relaxed">
              For questions about this privacy policy, please contact us at hello@museoai.com.
            </p>
          </div>

          <p className="text-[#8B857C] text-xs border-t border-[#EDD9BC] pt-6">
            Last updated: January 2025
          </p>
        </div>
      </motion.div>
    </div>
  );
}
