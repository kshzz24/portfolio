import { useState, useRef } from "react";
import emailjs from "emailjs-com";

// User must replace these with their own EmailJS credentials
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

export default function ContactForm() {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    setStatus("sending");

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY,
      );
      setStatus("sent");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <div className="contact-form-wrapper">
      <p className="contact-form-label">// SEND A MESSAGE</p>
      <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-form-row">
          <div className="contact-form-field">
            <label htmlFor="cf-name">name</label>
            <input
              id="cf-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              autoComplete="name"
            />
          </div>
          <div className="contact-form-field">
            <label htmlFor="cf-email">email</label>
            <input
              id="cf-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
              autoComplete="email"
            />
          </div>
        </div>

        <div className="contact-form-field">
          <label htmlFor="cf-message">message</label>
          <textarea
            id="cf-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Let's build something awesome..."
            rows={4}
            required
          />
        </div>

        <button
          type="submit"
          className="contact-form-btn"
          disabled={status === "sending"}
        >
          {status === "idle" && "$ send_message"}
          {status === "sending" && "Sending..."}
          {status === "sent" && "Message sent! ✓"}
          {status === "error" && "Failed — try again"}
        </button>
      </form>
    </div>
  );
}
