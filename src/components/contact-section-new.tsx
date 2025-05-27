"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sendEmail } from "@/utils/emailjs-utils";
import { Send, Mail, Phone, Copy, ExternalLink, Check, Twitter, AlertCircle } from "lucide-react";
import { validateContactForm, ContactFormData } from "./contact-form-validation";

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [copiedField, setCopiedField] = useState<"email" | "phone" | null>(null);
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef(null);

  const contactInfo = {
    email: "Modywaelabdo@gmail.com",
    phone: "+201062137061",
    social: {
      twitter: "https://x.com/MohamedTweetys",
    },
  };

  const handleCopy = async (type: "email" | "phone") => {
    const text = type === "email" ? contactInfo.email : contactInfo.phone;
    await navigator.clipboard.writeText(text);
    setCopiedField(type);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setFormErrors({});
    const formData = new FormData(formRef.current);
    const data: ContactFormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    const validation = validateContactForm(data);
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      const emailData = {
        from_name: data.name,
        from_email: data.email,
        message: data.message,
        [data.email]: data.email, // This adds the index signature requirement
      };
      await sendEmail(emailData);
      setSubmitStatus("success");
      formRef.current.reset();
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-[#0a0a0a] dark:to-[#111] relative overflow-hidden"
    >
      {/* Background pattern/decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] blur-3xl opacity-20 bg-gradient-to-r from-blue-500 to-purple-500 -top-40 -right-40 rounded-full"></div>
        <div className="absolute w-[500px] h-[500px] blur-3xl opacity-20 bg-gradient-to-r from-purple-500 to-pink-500 -bottom-40 -left-40 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Contact Info Card */}
            <div className="bg-white dark:bg-neutral-900/50 backdrop-blur-md p-8 rounded-2xl border border-gray-200 dark:border-neutral-800 hover:border-blue-500/50 transition-all duration-500 shadow-lg hover:shadow-xl">
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  Contact Information
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Feel free to reach out through any of these channels
                </p>
              </div>

              {/* Email */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-2">
                  <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span>Email:</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-neutral-800/50 rounded-lg">
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center gap-2"
                  >
                    {contactInfo.email}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => handleCopy("email")}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-md transition-colors"
                    title="Copy email"
                  >
                    {copiedField === "email" ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Phone */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-2">
                  <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span>Phone:</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-neutral-800/50 rounded-lg">
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center gap-2"
                  >
                    {contactInfo.phone}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => handleCopy("phone")}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-md transition-colors"
                    title="Copy phone"
                  >
                    {copiedField === "phone" ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-gray-600 dark:text-gray-400 mb-3">Social Media:</h4>
                <div className="flex gap-4">
                  <a
                    href={contactInfo.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-50 dark:bg-neutral-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors"
                  >
                    <Twitter className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-white dark:bg-neutral-900/50 backdrop-blur-md p-8 rounded-2xl border border-gray-200 dark:border-neutral-800 hover:border-blue-500/50 transition-all duration-500 shadow-lg hover:shadow-xl space-y-6"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-neutral-800/50 border ${
                    formErrors.name
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-200 dark:border-neutral-700"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50 transition-colors`}
                  placeholder="Your name"
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {formErrors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-neutral-800/50 border ${
                    formErrors.email
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-200 dark:border-neutral-700"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50 transition-colors`}
                  placeholder="your.email@example.com"
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-neutral-800/50 border ${
                    formErrors.message
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-200 dark:border-neutral-700"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50 transition-colors resize-none`}
                  placeholder="Your message..."
                ></textarea>
                {formErrors.message && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {formErrors.message}
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium 
                  ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:from-blue-700 hover:to-purple-700"} 
                  focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50 
                  transition-all duration-300 flex items-center justify-center gap-2`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {" "}
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin w-5 h-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span className="ml-2">Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>

              <AnimatePresence>
                {submitStatus !== "idle" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`p-4 rounded-lg ${
                      submitStatus === "success"
                        ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200"
                        : "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200"
                    }`}
                  >
                    {submitStatus === "success" ? (
                      <p className="flex items-center gap-2">
                        <Check className="w-5 h-5" />
                        Message sent successfully!
                      </p>
                    ) : (
                      <p className="flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        Failed to send message. Please try again.
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
