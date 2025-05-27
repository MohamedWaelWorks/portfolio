"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      setSubmitStatus("success");
      formRef.current.reset();
    } catch (error) {
      setSubmitStatus("error");
      console.error("Contact form error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ... rest of the component remains the same ...
  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-[#0a0a0a] dark:to-[#111] relative overflow-hidden"
    >
      {/* Your existing JSX */}
    </section>
  );
}
