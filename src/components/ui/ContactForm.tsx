"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";
import { useState } from "react";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  company: z.string().optional(),
  projectType: z.string().min(1, "Please select a project type"),
  message: z.string().min(10, "Please provide more details about your project"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const projectTypes = [
  "Hospitality",
  "Residential",
  "Facade Lighting",
  "Landscape Lighting",
  "Public Realm",
  "Mixed-Use / Commercial",
  "Other",
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitted(true);
        reset();
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  if (submitted) {
    return (
      <motion.div
        className="text-center py-16"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-16 h-16 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center mx-auto mb-6">
          <Send size={24} className="text-[var(--color-accent)]" />
        </div>
        <h3 className="text-heading font-display mb-3">Thank You</h3>
        <p className="text-[var(--color-grey)] font-body max-w-md mx-auto">
          Your enquiry has been received. Our team will be in touch within 24 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm font-body text-[var(--color-accent)] underline underline-offset-4 hover:no-underline"
        >
          Send another enquiry
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-body text-[var(--color-grey)] mb-2"
          >
            Full Name *
          </label>
          <input
            id="contact-name"
            type="text"
            {...register("name")}
            className="w-full px-4 py-3 bg-transparent border border-[var(--color-grey)]/20 rounded-[var(--radius-button)] font-body text-[var(--color-navy)] placeholder:text-[var(--color-grey)]/40 focus:border-[var(--color-accent)] focus:outline-none transition-colors"
            placeholder="John Smith"
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-xs text-red-500 font-body">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="contact-email"
            className="block text-sm font-body text-[var(--color-grey)] mb-2"
          >
            Email Address *
          </label>
          <input
            id="contact-email"
            type="email"
            {...register("email")}
            className="w-full px-4 py-3 bg-transparent border border-[var(--color-grey)]/20 rounded-[var(--radius-button)] font-body text-[var(--color-navy)] placeholder:text-[var(--color-grey)]/40 focus:border-[var(--color-accent)] focus:outline-none transition-colors"
            placeholder="john@example.com"
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-xs text-red-500 font-body">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="contact-phone"
            className="block text-sm font-body text-[var(--color-grey)] mb-2"
          >
            Phone Number
          </label>
          <input
            id="contact-phone"
            type="tel"
            {...register("phone")}
            className="w-full px-4 py-3 bg-transparent border border-[var(--color-grey)]/20 rounded-[var(--radius-button)] font-body text-[var(--color-navy)] placeholder:text-[var(--color-grey)]/40 focus:border-[var(--color-accent)] focus:outline-none transition-colors"
            placeholder="+971 4 000 0000"
          />
        </div>

        {/* Company */}
        <div>
          <label
            htmlFor="contact-company"
            className="block text-sm font-body text-[var(--color-grey)] mb-2"
          >
            Company
          </label>
          <input
            id="contact-company"
            type="text"
            {...register("company")}
            className="w-full px-4 py-3 bg-transparent border border-[var(--color-grey)]/20 rounded-[var(--radius-button)] font-body text-[var(--color-navy)] placeholder:text-[var(--color-grey)]/40 focus:border-[var(--color-accent)] focus:outline-none transition-colors"
            placeholder="Your company"
          />
        </div>
      </div>

      {/* Project Type */}
      <div>
        <label
          htmlFor="contact-project-type"
          className="block text-sm font-body text-[var(--color-grey)] mb-2"
        >
          Project Type *
        </label>
        <select
          id="contact-project-type"
          {...register("projectType")}
          className="w-full px-4 py-3 bg-transparent border border-[var(--color-grey)]/20 rounded-[var(--radius-button)] font-body text-[var(--color-navy)] focus:border-[var(--color-accent)] focus:outline-none transition-colors appearance-none"
          aria-describedby={errors.projectType ? "project-type-error" : undefined}
        >
          <option value="">Select project type...</option>
          {projectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.projectType && (
          <p id="project-type-error" className="mt-1 text-xs text-red-500 font-body">
            {errors.projectType.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-body text-[var(--color-grey)] mb-2"
        >
          Project Details *
        </label>
        <textarea
          id="contact-message"
          {...register("message")}
          rows={5}
          className="w-full px-4 py-3 bg-transparent border border-[var(--color-grey)]/20 rounded-[var(--radius-button)] font-body text-[var(--color-navy)] placeholder:text-[var(--color-grey)]/40 focus:border-[var(--color-accent)] focus:outline-none transition-colors resize-none"
          placeholder="Tell us about your project, timeline, and any specific lighting design requirements..."
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-xs text-red-500 font-body">
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        id="contact-submit"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send size={16} />
            Send Enquiry
          </>
        )}
      </button>
    </motion.form>
  );
}
