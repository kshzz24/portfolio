import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personal } from "../data/resume";
import { Mail, Phone, Linkedin, Github, Code2 } from "lucide-react";
import ContactForm from "./ContactForm";

gsap.registerPlugin(ScrollTrigger);

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function Contact() {
  const cRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // "Gravity-reset" effect: items float upwards as user reaches the end
      gsap.fromTo(
        ".contact-right > a, .social-chip",
        { y: 100, opacity: 0, rotation: 5 },
        {
          y: 0,
          opacity: 1,
          rotation: 0,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".contact-inner",
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1,
          },
        },
      );
    }, cRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section contact-section" id="contact" ref={cRef}>
      <div className="section-inner">
        <motion.div {...reveal(0)}>
          <p className="s-label">
            <span className="s-num">06</span> Contact
          </p>
        </motion.div>

        <div className="contact-inner glass-panel">
          {/* Left: heading */}
          <motion.div {...reveal(0.08)}>
            <h2 className="contact-heading">
              Let&apos;s build
              <br />
              something
              <br />
              <em>remarkable.</em>
            </h2>
            <p className="contact-sub">
              Open to SDE 1, Full Stack, and Backend roles, AI/ML
              collaborations, and interesting problems.
            </p>
          </motion.div>

          {/* Right: contact details */}
          <motion.div className="contact-right" {...reveal(0.18)}>
            <a href={`mailto:${personal.email}`} className="contact-row">
              <div className="contact-row-left">
                <Mail size={18} className="contact-icon" />
                <div className="contact-row-text">
                  <span className="contact-row-label">Email</span>
                  <span className="contact-row-val">{personal.email}</span>
                </div>
              </div>
              <span className="contact-arrow">↗</span>
            </a>

            <a
              href={`tel:${personal.phone.replace(/[^+\d]/g, "")}`}
              className="contact-row"
            >
              <div className="contact-row-left">
                <Phone size={18} className="contact-icon" />
                <div className="contact-row-text">
                  <span className="contact-row-label">Phone</span>
                  <span className="contact-row-val">{personal.phone}</span>
                </div>
              </div>
              <span className="contact-arrow">↗</span>
            </a>

            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-row"
            >
              <div className="contact-row-left">
                <Linkedin size={18} className="contact-icon" />
                <div className="contact-row-text">
                  <span className="contact-row-label">LinkedIn</span>
                  <span className="contact-row-val">kshitiz-bartaria</span>
                </div>
              </div>
              <span className="contact-arrow">↗</span>
            </a>

            <div className="contact-socials">
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-chip"
              >
                <Github size={14} /> GitHub
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-chip"
              >
                <Linkedin size={14} /> LinkedIn
              </a>
              <a
                href={personal.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="social-chip"
              >
                <Code2 size={14} /> LeetCode
              </a>
            </div>
          </motion.div>
        </div>

        <ContactForm />
      </div>

      <div className="footer">
        <span className="footer-name">Kshitiz Bartaria</span>
        <span>{new Date().getFullYear()} · Noida, India</span>
      </div>
    </section>
  );
}
