import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Github, 
  ExternalLink, 
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
  User,
  Briefcase,
  MessageSquare,
  Instagram
} from "lucide-react";
import { toast } from "sonner";

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

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with React, Node.js, and Stripe integration. Features include user authentication, product management, shopping cart, and payment processing.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    category: "Full Stack",
    github: "https://github.com",
    live: "https://example.com",
    featured: true
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
    technologies: ["React", "TypeScript", "Socket.io", "PostgreSQL"],
    category: "Frontend",
    github: "https://github.com",
    live: "https://example.com",
    featured: true
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "Beautiful weather dashboard with location-based forecasts, interactive maps, and detailed weather analytics.",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop",
    technologies: ["React", "D3.js", "Weather API", "Tailwind"],
    category: "Frontend",
    github: "https://github.com",
    live: "https://example.com",
    featured: false
  },
  {
    id: 4,
    title: "Social Media API",
    description: "RESTful API for social media platform with user management, posts, comments, and real-time notifications.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
    technologies: ["Node.js", "Express", "MongoDB", "JWT"],
    category: "Backend",
    github: "https://github.com",
    live: "https://example.com",
    featured: false
  },
  {
    id: 5,
    title: "Mobile Fitness Tracker",
    description: "Cross-platform mobile app for fitness tracking with workout plans, progress monitoring, and social features.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
    technologies: ["React Native", "Firebase", "Redux", "Expo"],
    category: "Mobile",
    github: "https://github.com",
    live: "https://example.com",
    featured: true
  },
  {
    id: 6,
    title: "AI Chat Interface",
    description: "Modern chat interface with AI integration, real-time messaging, and intelligent response suggestions.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    technologies: ["React", "OpenAI API", "WebSocket", "Tailwind"],
    category: "Full Stack",
    github: "https://github.com",
    live: "https://example.com",
    featured: false
  }
];

const experiences = [
  {
    title: "Senior Full Stack Developer",
    company: "TechCorp Inc.",
    period: "2022 - Present",
    description: "Lead development of scalable web applications using React, Node.js, and cloud technologies. Mentor junior developers and architect system solutions."
  },
  {
    title: "Frontend Developer",
    company: "StartupXYZ",
    period: "2020 - 2022",
    description: "Built responsive web applications and mobile apps. Collaborated with design team to implement pixel-perfect UI/UX designs."
  },
  {
    title: "Junior Developer",
    company: "WebSolutions Ltd.",
    period: "2019 - 2020",
    description: "Developed and maintained client websites using modern web technologies. Gained experience in full-stack development."
  }
];

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(projects);
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

  const categories = ["All", "Frontend", "Backend", "Full Stack", "Mobile"];
  const skillCategories = ["All", "Frontend", "Backend", "Mobile", "DevOps"];

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === selectedCategory));
    }
  }, [selectedCategory]);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateForm = () => {
    const newErrors = { name: "", email: "", message: "" };

    if (!contactForm.name.trim() || contactForm.name.trim().length < 2) {
      newErrors.name = "Please enter your name (at least 2 characters).";
    }

    if (!contactForm.email.trim() || !validateEmail(contactForm.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!contactForm.message.trim() || contactForm.message.trim().length < 10) {
      newErrors.message = "Please enter a message (at least 10 characters).";
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.email && !newErrors.message;
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the highlighted fields.");
      return;
    }
    toast.success("Message sent successfully! I'll get back to you soon.");
    setContactForm({ name: "", email: "", message: "" });
    setErrors({ name: "", email: "", message: "" });
  };

  const filteredSkills = selectedSkillCategory === "All" 
    ? skills 
    : skills.filter(skill => skill.category === selectedSkillCategory);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Glassmorphism Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-6000"></div>
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
                {["home", "about", "projects", "skills", "contact"].map((section) => (
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
            className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-12 shadow-2xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center"
            >
              <User className="w-16 h-16 text-white" />
            </motion.div>
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
                onClick={() => scrollToSection("projects")}
                className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm"
                size="lg"
              >
                View My Work
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
              className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 shadow-xl"
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
              className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 shadow-xl"
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

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">My Projects</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mb-8"></div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`${
                    selectedCategory === category
                      ? "bg-white/20 text-white border-white/30"
                      : "border-white/30 text-white/80 hover:bg-white/10"
                  } backdrop-blur-sm`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-xl overflow-hidden h-full">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {project.featured && (
                      <Badge className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
                        Featured
                      </Badge>
                    )}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                      <Button
                        size="sm"
                        className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                        onClick={() => window.open(project.github, '_blank')}
                      >
                        <Github className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                        onClick={() => window.open(project.live, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                    <p className="text-white/80 mb-4 text-sm leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          className="bg-white/20 text-white border-white/30 text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
              {skillCategories.map((category) => (
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
              className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 shadow-xl"
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
                    <p className="text-white font-semibold">NEW delhi , INDIA</p>
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
              className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 shadow-xl"
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
                    className={`bg-white/10 border-white/20 text-white placeholder:text-white/60 backdrop-blur-sm min-h-32 ${errors.message ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                    required
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-400">{errors.message}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
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
            © 2024 Vansh Tyagi. Built with React, TypeScript, and lots of ☕
          </p>
        </div>
      </footer>
    </div>
  );
}