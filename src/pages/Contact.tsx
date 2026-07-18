import { useState } from "react";
import { Mail, MapPin, Clock, MessageSquare, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../lib/api";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = useMutation({
    mutationFn: () =>
      apiRequest("/contact", {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" },
      }),
    onSuccess: () => setSent(true),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit.mutate();
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0] pt-16">
      <div className="relative bg-[#4E342E] py-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=1600&h=600&fit=crop&auto=format" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative">
          <p className="text-[#D8B892] text-sm font-semibold uppercase tracking-widest mb-3">Get in Touch</p>
          <h1 className="font-display text-4xl sm:text-5xl text-[#F8F5F0] font-bold mb-4">Contact Us</h1>
          <p className="text-[#8B857C] max-w-lg mx-auto">
            Have a question, suggestion, or partnership inquiry? We'd love to hear from you.
          </p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="space-y-5">
            <h2 className="font-display text-[#4E342E] text-xl font-semibold mb-2">Reach Out</h2>
            {[
              { icon: <Mail className="w-5 h-5" />, label: "Email", value: "hello@museoai.com" },
              { icon: <MapPin className="w-5 h-5" />, label: "Headquarters", value: "New York, USA" },
              { icon: <Clock className="w-5 h-5" />, label: "Response Time", value: "Within 24 hours" },
              { icon: <MessageSquare className="w-5 h-5" />, label: "Community", value: "Join our Discord" },
            ].map((item) => (
              <div key={item.label} className="flex gap-3">
                <div className="w-10 h-10 bg-[#EDD9BC] rounded-xl flex items-center justify-center text-[#A65E2E] flex-shrink-0">{item.icon}</div>
                <div>
                  <p className="text-[#8B857C] text-xs font-medium uppercase tracking-wide">{item.label}</p>
                  <p className="text-[#4E342E] text-sm font-medium mt-0.5">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2">
            {sent ? (
              <div className="bg-white rounded-2xl border border-[#EDD9BC] shadow-warm p-10 text-center">
                <div className="text-5xl mb-4">&#x1F4EC;</div>
                <h3 className="font-display text-[#4E342E] text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-[#5D4037] mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  className="bg-[#4E342E] text-[#F8F5F0] px-6 py-2.5 rounded-2xl text-sm font-medium hover:bg-[#A65E2E] transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#EDD9BC] shadow-warm p-7 space-y-4">
                {submit.isError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-2 text-sm">
                    Failed to send message. Please try again.
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#8B857C] uppercase tracking-wide mb-1.5">Name *</label>
                    <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required placeholder="Your name" className="w-full bg-[#F8F5F0] border border-[#EDD9BC] rounded-xl px-4 py-2.5 text-sm text-[#4E342E] placeholder-[#8B857C] focus:outline-none focus:border-[#D8B892]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#8B857C] uppercase tracking-wide mb-1.5">Email *</label>
                    <input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} required placeholder="you@example.com" className="w-full bg-[#F8F5F0] border border-[#EDD9BC] rounded-xl px-4 py-2.5 text-sm text-[#4E342E] placeholder-[#8B857C] focus:outline-none focus:border-[#D8B892]" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#8B857C] uppercase tracking-wide mb-1.5">Subject *</label>
                  <input value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))} required placeholder="What is this about?" className="w-full bg-[#F8F5F0] border border-[#EDD9BC] rounded-xl px-4 py-2.5 text-sm text-[#4E342E] placeholder-[#8B857C] focus:outline-none focus:border-[#D8B892]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#8B857C] uppercase tracking-wide mb-1.5">Message *</label>
                  <textarea value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} required rows={5} placeholder="Tell us more..." className="w-full bg-[#F8F5F0] border border-[#EDD9BC] rounded-xl px-4 py-2.5 text-sm text-[#4E342E] placeholder-[#8B857C] focus:outline-none focus:border-[#D8B892] resize-none" />
                </div>
                <button type="submit" disabled={submit.isPending} className="flex items-center gap-2 bg-[#4E342E] text-[#F8F5F0] px-6 py-3 rounded-2xl font-semibold hover:bg-[#A65E2E] transition-colors disabled:opacity-60 text-sm">
                  <Send className="w-4 h-4" />
                  {submit.isPending ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
