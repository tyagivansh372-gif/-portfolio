import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  MapPin, 
  Linkedin,
  Code,
  Palette,
  Database,
  Globe,
  Smartphone,
  Server,
  ChevronDown,
  Send,
  Instagram
} from "lucide-react";
import { toast } from "sonner";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";

const skills = [
  { name: "React", category: "Frontend", icon: Code, level: 95 },
  { name: "TypeScript", category: "Frontend", icon: Code, level: 90 },
  { name: "Next.js", category: "Frontend", icon: Globe, level: 88 },
  { name: "Tailwind CSS", category: "Frontend", icon: Palette, level: 92 },
  { name: "Node.js", category: "Backend", icon: Server, level: 85 },
  { name: "PostgreSQL", category: "Backend", icon: Database, level: 80 },
  { name: "MongoDB", category: "Backend", icon: Database, level: 82 },
  { name: "React Native", category: "Mobile", icon: Smartphone, level: 75 },
  { name: "Flutter", category: "Mobile", icon: Smartphone, level: 70 },
  { name: "AWS", category: "DevOps", icon: Server, level: 78 },
  { name: "Docker", category: "DevOps", icon: Server, level: 80 },
  { name: "GraphQL", category: "Backend", icon: Database, level: 85 }
];

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedSkillCategory, setSelectedSkillCategory] = useState("All");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState<{ name: string; email: string; message: string }>({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const validateEmail = (email: string) => {
    // Slightly stricter but still permissive email regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateForm = () => {
    const newErrors = { name: "", email: "", message: "" };
    const name = contactForm.name.trim();
    const email = contactForm.email.trim();
    const message = contactForm.message.trim();

    if (name.length < 2 || name.length > 100) {
      newErrors.name = "Name must be between 2 and 100 characters.";
    }

    if (!validateEmail(email) || email.length > 254) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (message.length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.email && !newErrors.message;
  };

  const sendContact = useAction(api.contact.sendContactEmail);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the highlighted fields.");
      return;
    }
    try {
      setIsSubmitting(true);
      await sendContact({
        name: contactForm.name.trim(),
        email: contactForm.email.trim(),
        message: contactForm.message.trim(),
      });
      toast.success("Message sent successfully! I'll get back to you soon.");
      setContactForm({ name: "", email: "", message: "" });
      setErrors({ name: "", email: "", message: "" });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to send message. Please try again later.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredSkills = selectedSkillCategory === "All" 
    ? skills 
    : skills.filter(skill => skill.category === selectedSkillCategory);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Glassmorphism Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500"></div>
        <div className="absolute top-0 left-0 w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-6 w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-0 right-0 w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-6000"></div>
      </div>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 p-4"
      >
        <div className="max-w-6xl mx-auto">
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl px-6 py-4 shadow-lg">
            <div className="flex items-center justify-between">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold text-white cursor-pointer"
                onClick={() => scrollToSection("home")}
              >
                Portfolio
              </motion.div>
              <div className="hidden md:flex space-x-8">
                {["home", "about", "skills", "contact"].map((section) => (
                  <motion.button
                    key={section}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection(section)}
                    className={`capitalize text-white/90 hover:text-white transition-colors ${
                      activeSection === section ? "text-white font-semibold" : ""
                    }`}
                  >
                    {section}
                  </motion.button>
                ))}
              </div>
            </div>
            {/* Mobile nav: horizontal scroll buttons */}
            <div className="mt-3 md:hidden -mx-2 overflow-x-auto">
              <div className="flex gap-2 px-2">
                {["home", "about", "skills", "contact"].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                      activeSection === section
                        ? "bg-white/20 text-white border-white/30"
                        : "text-white/80 border-white/20 hover:bg-white/10"
                    }`}
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-6 md:p-12 shadow-2xl"
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              Vansh Tyagi
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl text-white/90 mb-8"
            >
              Full Stack Developer & UI/UX Enthusiast
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-lg text-white/80 mb-12 max-w-2xl mx-auto"
            >
              Passionate about creating beautiful, functional, and user-friendly applications 
              that solve real-world problems and deliver exceptional user experiences.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                onClick={() => scrollToSection("skills")}
                className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm"
                size="lg"
              >
                View Skills
              </Button>
              <Button
                onClick={() => scrollToSection("contact")}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                size="lg"
              >
                Get In Touch
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12"
          >
            <ChevronDown 
              className="w-8 h-8 text-white/60 mx-auto animate-bounce cursor-pointer"
              onClick={() => scrollToSection("about")}
            />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8 shadow-xl"
            >
              <h3 className="text-2xl font-bold text-white mb-6">My Journey</h3>
              <p className="text-white/90 mb-6 leading-relaxed">
                I'm a passionate full-stack developer with over 4 years of experience creating 
                digital solutions that bridge the gap between design and functionality. My journey 
                began with a curiosity about how websites work, which evolved into a deep love 
                for crafting exceptional user experiences.
              </p>
              <p className="text-white/90 mb-6 leading-relaxed">
                I specialize in modern web technologies including React, Node.js, and cloud 
                platforms. I believe in writing clean, maintainable code and staying up-to-date 
                with the latest industry trends and best practices.
              </p>
              <div className="flex flex-wrap gap-4">
                <Badge className="bg-white/20 text-white border-white/30">Problem Solver</Badge>
                <Badge className="bg-white/20 text-white border-white/30">Team Player</Badge>
                <Badge className="bg-white/20 text-white border-white/30">Continuous Learner</Badge>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8 shadow-xl"
            >
              <h3 className="text-2xl font-bold text-white mb-6">What I Do</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg flex items-center justify-center">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Frontend Development</h4>
                    <p className="text-white/80">Creating responsive, interactive user interfaces with modern frameworks and libraries.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg flex items-center justify-center">
                    <Server className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Backend Development</h4>
                    <p className="text-white/80">Building scalable server-side applications and APIs with robust architecture.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Mobile Development</h4>
                    <p className="text-white/80">Developing cross-platform mobile applications with native performance.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Skills & Technologies</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mb-8"></div>
            
            {/* Skill Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {["All", "Frontend", "Backend", "Mobile", "DevOps"].map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedSkillCategory(category)}
                  variant={selectedSkillCategory === category ? "default" : "outline"}
                  className={`${
                    selectedSkillCategory === category
                      ? "bg-white/20 text-white border-white/30"
                      : "border-white/30 text-white/80 hover:bg-white/10"
                  } backdrop-blur-sm`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                    <skill.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                    <p className="text-white/60 text-sm">{skill.category}</p>
                  </div>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                    className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full"
                  />
                </div>
                <p className="text-white/80 text-sm text-right">{skill.level}%</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Get In Touch</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mb-8"></div>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8 shadow-xl"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Email</p>
                    <p className="text-white font-semibold">tyagivansh372@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Location</p>
                    <p className="text-white font-semibold">New Delhi, INDIA</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-white mb-4">Follow Me</h4>
                <div className="flex space-x-4">
                  <Button
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                    onClick={() => window.open('https://www.linkedin.com/in/vansh-tyagi-069365328?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', '_blank')}
                  >
                    <Linkedin className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                    onClick={() => window.open('https://www.instagram.com/tyagiofficialy?utm_source=qr&igsh=djdxYjBxZzdveG16', '_blank')}
                  >
                    <Instagram className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8 shadow-xl"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Send Message</h3>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <Input
                    placeholder="Your Name"
                    value={contactForm.name}
                    onChange={(e) => {
                      const value = e.target.value;
                      setContactForm({ ...contactForm, name: value });
                      if (errors.name) setErrors({ ...errors, name: "" });
                    }}
                    aria-invalid={!!errors.name}
                    maxLength={100}
                    className={`bg-white/10 border-white/20 text-white placeholder:text-white/60 backdrop-blur-sm ${errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                    required
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-400">{errors.name}</p>
                  )}
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={contactForm.email}
                    onChange={(e) => {
                      const value = e.target.value;
                      setContactForm({ ...contactForm, email: value });
                      if (errors.email) setErrors({ ...errors, email: "" });
                    }}
                    aria-invalid={!!errors.email}
                    maxLength={254}
                    className={`bg-white/10 border-white/20 text-white placeholder:text-white/60 backdrop-blur-sm ${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                    required
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>
                <div>
                  <Textarea
                    placeholder="Your Message"
                    value={contactForm.message}
                    onChange={(e) => {
                      const value = e.target.value;
                      setContactForm({ ...contactForm, message: value });
                      if (errors.message) setErrors({ ...errors, message: "" });
                    }}
                    aria-invalid={!!errors.message}
                    maxLength={5000}
                    className={`bg-white/10 border-white/20 text-white placeholder:text-white/60 backdrop-blur-sm min-h-32 ${errors.message ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                    required
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-400">{errors.message}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-white/60">
            © 2025 Vansh Tyagi. Built with React, TypeScript, and lots of ☕
          </p>
        </div>
      </footer>
    </div>
  );
}