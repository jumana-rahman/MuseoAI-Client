import { Link } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#F8F5F0] pt-16">
      <div className="relative bg-[#4E342E] py-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=1600&h=600&fit=crop&auto=format" alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="relative">
          <FileText className="w-10 h-10 text-[#D8B892] mx-auto mb-4" />
          <h1 className="font-display text-4xl sm:text-5xl text-[#F8F5F0] font-bold mb-4">Terms of Service</h1>
          <p className="text-[#8B857C] max-w-lg mx-auto">The rules and guidelines for using MuseoAI.</p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link to="/" className="inline-flex items-center gap-1.5 text-[#A65E2E] text-sm font-medium mb-8 hover:gap-2 transition-all">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="bg-white rounded-2xl border border-[#EDD9BC] shadow-warm p-6 sm:p-8 space-y-8">
          <div>
            <h2 className="font-display text-[#4E342E] text-xl font-semibold mb-3">Acceptance of Terms</h2>
            <p className="text-[#5D4037] text-sm leading-relaxed">
              By accessing or using MuseoAI, you agree to be bound by these Terms of Service. If you do not agree, please do not use the platform.
            </p>
          </div>

          <div>
            <h2 className="font-display text-[#4E342E] text-xl font-semibold mb-3">User Accounts</h2>
            <p className="text-[#5D4037] text-sm leading-relaxed">
              You are responsible for maintaining the confidentiality of your account credentials. You agree to provide accurate information when creating an account and to update it as necessary. One person may not maintain more than one account.
            </p>
          </div>

          <div>
            <h2 className="font-display text-[#4E342E] text-xl font-semibold mb-3">Community Guidelines</h2>
            <p className="text-[#5D4037] text-sm leading-relaxed">
              When creating guides, writing reviews, or using AI features, you agree not to publish content that is offensive, misleading, spam, or infringes on intellectual property rights. MuseoAI reserves the right to remove content that violates these guidelines.
            </p>
          </div>

          <div>
            <h2 className="font-display text-[#4E342E] text-xl font-semibold mb-3">Content Ownership</h2>
            <p className="text-[#5D4037] text-sm leading-relaxed">
              You retain ownership of guides and reviews you create. By publishing content on MuseoAI, you grant us a non-exclusive license to display, distribute, and promote your content within the platform. Museum data in our directory is curated by MuseoAI and protected by copyright.
            </p>
          </div>

          <div>
            <h2 className="font-display text-[#4E342E] text-xl font-semibold mb-3">AI Disclaimer</h2>
            <p className="text-[#5D4037] text-sm leading-relaxed">
              AI-generated content, including recommendations and guide drafts, is provided for informational purposes. While we strive for accuracy, AI responses may occasionally contain errors. Always verify critical information such as opening hours and pricing with official museum sources.
            </p>
          </div>

          <div>
            <h2 className="font-display text-[#4E342E] text-xl font-semibold mb-3">Limitation of Liability</h2>
            <p className="text-[#5D4037] text-sm leading-relaxed">
              MuseoAI is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the platform, including but not limited to decisions made based on AI recommendations or community guide content.
            </p>
          </div>

          <div>
            <h2 className="font-display text-[#4E342E] text-xl font-semibold mb-3">Changes to Terms</h2>
            <p className="text-[#5D4037] text-sm leading-relaxed">
              We may update these terms from time to time. Continued use of MuseoAI after changes constitutes acceptance of the revised terms. We will notify users of significant changes via email or platform announcement.
            </p>
          </div>

          <div>
            <h2 className="font-display text-[#4E342E] text-xl font-semibold mb-3">Contact</h2>
            <p className="text-[#5D4037] text-sm leading-relaxed">
              For questions about these terms, please contact us at hello@museoai.com.
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
