"use client";

import { useState, useEffect, useRef } from "react";
import {
  Shield,
  Terminal,
  Eye,
  AlertTriangle,
  Lock,
  Search,
  Activity,
  Database,
  Code,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  ChevronRight,
  Cpu,
  FileText,
  PenLine,
  Radio,
  Wifi,
  Server,
  Key,
} from "lucide-react";

const TYPING_STRINGS = [
  "SOC Analyst",
  "Threat Hunter",
  "SIEM Engineer",
  "Incident Responder",
  "Cybersecurity Graduate",
];

function TypingEffect() {
  const [text, setText] = useState("");
  const [strIndex, setStrIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = TYPING_STRINGS[strIndex];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, charIndex + 1));
        if (charIndex + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1800);
        } else {
          setCharIndex((c) => c + 1);
        }
      } else {
        setText(current.slice(0, charIndex - 1));
        if (charIndex - 1 === 0) {
          setDeleting(false);
          setStrIndex((s) => (s + 1) % TYPING_STRINGS.length);
          setCharIndex(0);
        } else {
          setCharIndex((c) => c - 1);
        }
      }
    }, deleting ? 55 : 90);
    return () => clearTimeout(timeout);
  }, [text, charIndex, deleting, strIndex]);

  return (
    <span className="text-green-400 font-mono">
      {text}
      <span className="animate-pulse text-green-300">▋</span>
    </span>
  );
}

function GlitchText({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block group">
      <span className="relative z-10">{children}</span>
      <span
        className="absolute inset-0 text-cyan-400 opacity-0 group-hover:opacity-60 transition-opacity duration-75"
        style={{ clipPath: "inset(40% 0 50% 0)", transform: "translateX(-2px)" }}
        aria-hidden
      >
        {children}
      </span>
      <span
        className="absolute inset-0 text-red-400 opacity-0 group-hover:opacity-40 transition-opacity duration-75"
        style={{ clipPath: "inset(20% 0 70% 0)", transform: "translateX(2px)" }}
        aria-hidden
      >
        {children}
      </span>
    </span>
  );
}

function ScanLine() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div
        className="absolute w-full h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent"
        style={{ animation: "scanline 8s linear infinite" }}
      />
    </div>
  );
}

function HexGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-5">
      <svg width="100%" height="100%">
        <defs>
          <pattern id="hex" x="0" y="0" width="56" height="48" patternUnits="userSpaceOnUse">
            <polygon
              points="28,2 54,16 54,40 28,54 2,40 2,16"
              fill="none"
              stroke="#00ff88"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex)" />
      </svg>
    </div>
  );
}

function ThreatMeter({
  label,
  level,
  color,
}: {
  label: string;
  level: number;
  color: string;
}) {
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(level), 600);
    return () => clearTimeout(t);
  }, [level]);

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">
          {label}
        </span>
        <span className="text-xs font-mono" style={{ color }}>
          {level}%
        </span>
      </div>
      <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${animated}%`,
            background: `linear-gradient(90deg, ${color}88, ${color})`,
          }}
        />
      </div>
    </div>
  );
}

function AlertBadge({ text, type = "info" }) {
  const colors = {
    info: "border-cyan-500/40 text-cyan-400 bg-cyan-500/5",
    warn: "border-yellow-500/40 text-yellow-400 bg-yellow-500/5",
    success: "border-green-500/40 text-green-400 bg-green-500/5",
    critical: "border-red-500/40 text-red-400 bg-red-500/5",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-sm border text-xs font-mono uppercase tracking-widest ${colors[type]}`}>
      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "currentColor" }} />
      {text}
    </span>
  );
}

export default function MadhumithaPortfolio() {
  const [activeNav, setActiveNav] = useState("home");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [consoleLines, setConsoleLines] = useState<string[]>([]);
  const consoleRef = useRef<HTMLDivElement | null>(null);

  const bootLines = [
    "> Initializing security protocol...",
    "> Loading SIEM modules... [OK]",
    "> Connecting to threat intelligence feeds... [OK]",
    "> Identity verified: MADHUMITHA.C",
    "> Access granted. Welcome, Analyst.",
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < bootLines.length) {
        setConsoleLines((prev) => [...prev, bootLines[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouse = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "experience", "skills", "projects", "certifications", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom > 120) {
            setActiveNav(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["home", "about", "experience", "skills", "projects", "certifications", "contact"];

  const skills = [
    { label: "Splunk SIEM", level: 88, color: "#00ff88" },
    { label: "Log Analysis", level: 85, color: "#00ff88" },
    { label: "Incident Response", level: 80, color: "#22d3ee" },
    { label: "SQL & MySQL", level: 82, color: "#22d3ee" },
    { label: "Threat Detection", level: 78, color: "#a78bfa" },
    { label: "Python / Bash", level: 70, color: "#a78bfa" },
    { label: "Network Security", level: 74, color: "#f59e0b" },
    { label: "Vulnerability Analysis", level: 72, color: "#f59e0b" },
  ];

  const certifications = [
    { name: "Cybersecurity Essentials", issuer: "Cisco", icon: <Shield className="w-5 h-5" />, color: "#22d3ee" },
    { name: "SOC Fundamentals", issuer: "Let's Defend", icon: <Eye className="w-5 h-5" />, color: "#00ff88" },
    { name: "Practical Security Fundamentals", issuer: "TCM Security", icon: <Lock className="w-5 h-5" />, color: "#a78bfa" },
    { name: "Junior Cybersecurity Analyst Career Path", issuer: "Cisco", icon: <Activity className="w-5 h-5" />, color: "#f59e0b" },
    { name: "Databases & SQL for Data Science", issuer: "Coursera", icon: <Database className="w-5 h-5" />, color: "#22d3ee" },
    { name: "SQL (Basic)", issuer: "HackerRank", icon: <Code className="w-5 h-5" />, color: "#00ff88" },
    { name: "Identity & Access Management", issuer: "Forage", icon: <Key className="w-5 h-5" />, color: "#a78bfa" },
  ];

  const projects = [
    {
      name: "SIEM Lab – Splunk Log Analysis",
      tag: "SOC / SIEM",
      tagType: "critical",
      description:
        "Configured a personal SOC lab using Splunk free trial to ingest Windows and Linux logs. Built custom dashboards and correlation alerts to detect suspicious events — failed logins, brute-force patterns, and port scans. Gained deep, hands-on experience in log parsing, threat hunting, and alert tuning.",
      stack: ["Splunk", "Windows Logs", "Linux Syslog", "SPL Queries", "Dashboard Design"],
      icon: <Terminal className="w-6 h-6" />,
      color: "#00ff88",
    },
    {
      name: "Flora Emo-Sense – IoT Plant Monitor",
      tag: "IoT / Python",
      tagType: "info",
      description:
        "Developed an IoT-based smart plant monitoring system that analyzes environmental sensor data to detect plant health conditions. Implemented pattern recognition logic to interpret 'emotional' signals from plant data, enabling timely automated care decisions.",
      stack: ["Python", "IoT Sensors", "Data Analysis", "Automation"],
      icon: <Wifi className="w-6 h-6" />,
      color: "#22d3ee",
    },
    {
      name: "Student Database Management System",
      tag: "SQL / MySQL",
      tagType: "success",
      description:
        "Designed and implemented a full relational database for structured academic data management. Developed complex SQL queries using JOINs, subqueries, and aggregations for data retrieval and reporting. Performed data validation and query optimization to ensure accuracy and performance.",
      stack: ["MySQL", "SQL", "JOINs", "Query Optimization", "Schema Design"],
      icon: <Database className="w-6 h-6" />,
      color: "#a78bfa",
    },
  ];

  return (
    <div className="min-h-screen bg-[#030a06] text-gray-100 relative font-mono overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Syne:wght@400;600;700;800&display=swap');
        * { font-family: 'JetBrains Mono', monospace; }
        h1, h2, h3 { font-family: 'Syne', sans-serif; }
        @keyframes scanline {
          0% { top: -2px; }
          100% { top: 100%; }
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          92% { opacity: 1; }
          93% { opacity: 0.8; }
          94% { opacity: 1; }
          96% { opacity: 0.9; }
          97% { opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 4px #00ff8844; }
          50% { box-shadow: 0 0 16px #00ff8866, 0 0 32px #00ff8822; }
        }
        .section-fade { animation: fadeUp 0.7s ease forwards; }
        .glow-card { animation: glow-pulse 3s ease-in-out infinite; }
        .terminal-text { animation: flicker 8s infinite; }
        .nav-dot::before {
          content: '';
          display: inline-block;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #00ff88;
          margin-right: 8px;
          animation: pulse 2s infinite;
        }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #030a06; }
        ::-webkit-scrollbar-thumb { background: #00ff8844; border-radius: 2px; }
        .matrix-char { color: #00ff8822; font-size: 10px; line-height: 1; }
      `}</style>

      {/* Cursor follower */}
      <div
        className="fixed w-5 h-5 rounded-full pointer-events-none z-50 mix-blend-screen"
        style={{
          left: mousePos.x - 10,
          top: mousePos.y - 10,
          background: "radial-gradient(circle, #00ff8866 0%, transparent 70%)",
          transition: "transform 0.1s ease",
        }}
      />

      {/* Background */}
      <HexGrid />
      <div className="fixed inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 60% at 10% 20%, #00ff0808 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 90% 80%, #0066ff08 0%, transparent 60%)"
      }} />

      {/* Noise overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundSize: "150px"
      }} />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-green-900/30 bg-[#030a06]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded border border-green-500/40 flex items-center justify-center">
              <Shield className="w-3.5 h-3.5 text-green-400" />
            </div>
            <span className="text-green-400 text-sm font-bold tracking-widest uppercase">MADHUMITHA.C</span>
            <AlertBadge text="Available" type="success" />
          </div>
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className={`px-3 py-1.5 text-xs uppercase tracking-widest transition-all duration-200 rounded-sm ${activeNav === item
                  ? "text-green-400 bg-green-500/10 border border-green-500/30"
                  : "text-gray-500 hover:text-green-400 hover:bg-green-500/5"
                  }`}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center px-6 pt-16">
        <ScanLine />
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center py-20">
          <div className="section-fade">
            {/* Boot console */}
            <div className="mb-8 border border-green-900/50 rounded-sm bg-black/40 p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-3 border-b border-green-900/30 pb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                <span className="text-gray-600 text-xs ml-2">terminal — bash</span>
              </div>
              {consoleLines.map((line, i) => (
                <p key={i} className="text-xs text-green-400/80 leading-relaxed terminal-text">{line}</p>
              ))}
            </div>

            <div className="mb-2">
              <AlertBadge text="2025 Graduate · B.Tech CSE · Cybersecurity" type="success" />
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold mt-4 mb-3 leading-none tracking-tight whitespace-nowrap">
              <GlitchText>MADHUMITHA.C</GlitchText>
            </h1>

            <div className="text-xl md:text-2xl mb-6 h-8">
              <TypingEffect />
            </div>

            <p className="text-gray-400 leading-relaxed mb-8 max-w-lg text-sm">
              Dedicated cybersecurity graduate with hands-on expertise in{" "}
              <span className="text-green-400">Splunk SIEM</span>, log analysis,{" "}
              <span className="text-cyan-400">incident response</span>, and{" "}
              <span className="text-purple-400">threat detection</span>. Built a personal SOC lab and trained as a Splunk Technical Trainee. Ready to protect digital infrastructure and respond to real-time threats.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#contact">
                <button className="group flex items-center gap-2 bg-green-500 text-black px-6 py-2.5 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-green-400 transition-colors duration-200">
                  <Radio className="w-4 h-4" />
                  Hire Me
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </a>
              <a
                href="/resume.pdf"
                download
                className="flex items-center gap-2 border border-green-500/40 text-green-400 px-6 py-2.5 rounded-sm text-sm uppercase tracking-widest hover:bg-green-500/10 transition-all duration-200"
              >
                <FileText className="w-4 h-4" />
                Resume
              </a>
            </div>

            <div className="flex gap-4 mt-8">
              {[
                { icon: Github, url: "https://github.com/madhumithac588", label: "GitHub" },
                { icon: Linkedin, url: "https://in.linkedin.com/in/madhumitha-c-69468428b", label: "LinkedIn" },
                { icon: Mail, url: "mailto:madhumithac588@gmail.com", label: "Email" },
                { icon: PenLine, url: "https://medium.com/@madhumithac588", label: "Medium" },
              ].map(({ icon: Icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  className="w-9 h-9 border border-gray-700/60 rounded-sm flex items-center justify-center text-gray-500 hover:text-green-400 hover:border-green-500/40 hover:bg-green-500/5 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Stats panel */}
          <div className="section-fade grid grid-cols-2 gap-4">
            {[
              { label: "CGPA", value: "8.9", sub: "B.Tech CSE", icon: <Cpu className="w-5 h-5" />, color: "#00ff88" },
              { label: "Internship", value: "3mo", sub: "Splunk Trainee @ POSITKA", icon: <Server className="w-5 h-5" />, color: "#22d3ee" },
              { label: "Certifications", value: "7+", sub: "Cisco · Coursera · More", icon: <Shield className="w-5 h-5" />, color: "#a78bfa" },
              { label: "Paper Award", value: "1st", sub: "Rajiv Gandhi Eng. College", icon: <AlertTriangle className="w-5 h-5" />, color: "#f59e0b" },
            ].map((stat, i) => (
              <div
                key={i}
                className="glow-card border border-gray-800/60 rounded-sm bg-black/30 p-6 hover:border-green-900/60 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="mb-3" style={{ color: stat.color }}>{stat.icon}</div>
                <div className="text-3xl font-extrabold mb-1" style={{ color: stat.color, fontFamily: "Syne, sans-serif" }}>
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-widest text-gray-500 mb-0.5">{stat.label}</div>
                <div className="text-xs text-gray-600">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-green-400 text-xs font-mono uppercase tracking-widest">01 /</span>
            <h2 className="text-3xl font-extrabold text-white" style={{ fontFamily: "Syne" }}>About Me</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-green-900/60 to-transparent" />
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3 space-y-5 text-sm text-gray-400 leading-relaxed">
              <p>
                I'm a <span className="text-green-400 font-semibold">2025 B.Tech CSE graduate</span> from Mankula Vinayagar Institution of Technology, specializing in IoT, Cyber Security, and Blockchain — graduating with a CGPA of <span className="text-green-400 font-semibold">8.9</span>.
              </p>
              <p>
                My cybersecurity journey is defined by <span className="text-cyan-400">hands-on practice</span>, not just theory. I built a personal SOC lab from scratch using Splunk to detect real threats, trained as a Splunk Technical Trainee at POSITKA (PFSI Solutions), and consistently earned industry-recognized certifications from Cisco, TCM Security, and Let's Defend.
              </p>
              <p>
                I thrive at the intersection of <span className="text-purple-400">technical rigor and analytical thinking</span> — whether I'm parsing logs for anomalies, writing SQL for data forensics, or piecing together an incident timeline. I believe the best security professionals are those who think like attackers and act like defenders.
              </p>
              <p className="text-white text-base font-semibold border-l-2 border-green-500 pl-4">
                "Every log tells a story. My job is to find the threat hiding in the noise."
              </p>
            </div>

            <div className="lg:col-span-2 space-y-3">
              {[
                { label: "Location", value: "India", icon: "📍" },
                { label: "Degree", value: "B.Tech CSE — 2025", icon: "🎓" },
                { label: "Focus", value: "SOC Analyst / Threat Detection", icon: "🎯" },
                { label: "Tools", value: "Splunk, Burp Suite, Nessus", icon: "🛠" },
                { label: "Languages", value: "SQL · Python · Bash", icon: "💻" },
                { label: "Phone", value: "+91-6283684787", icon: "📞" },
                { label: "Email", value: "madhumithac588@gmail.com", icon: "✉️" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 p-3 border border-gray-800/50 rounded-sm bg-black/20 hover:border-green-900/50 transition-colors duration-200">
                  <span className="text-base">{item.icon}</span>
                  <div>
                    <span className="text-xs text-gray-600 uppercase tracking-widest block">{item.label}</span>
                    <span className="text-sm text-gray-200">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="py-28 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-green-400 text-xs font-mono uppercase tracking-widest">02 /</span>
            <h2 className="text-3xl font-extrabold text-white" style={{ fontFamily: "Syne" }}>Experience</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-green-900/60 to-transparent" />
          </div>

          <div className="relative border-l border-green-900/40 pl-8 ml-4">
            {/* Timeline node */}
            <div className="absolute -left-2 top-0 w-4 h-4 rounded-full border-2 border-green-500 bg-[#030a06]" />
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <AlertBadge text="Oct 2025 – Jan 2026" type="success" />
              <AlertBadge text="Internship" type="info" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "Syne" }}>
              Splunk Technical Trainee
            </h3>
            <p className="text-green-400 text-sm mb-4">PFSI Solutions (POSITKA) — Hybrid</p>
            <ul className="space-y-2 text-sm text-gray-400">
              {[
                "Monitored live security alerts and performed log analysis using Splunk SIEM to identify potential threats and anomalous behavior",
                "Conducted alert triaging and incident analysis using structured investigation approaches and escalation protocols",
                "Applied SQL queries for data retrieval and validation during security investigations, enhancing evidence gathering",
                "Supported incident response workflows including documentation, investigation support, and ticket-based security operations",
                "Handled customer-facing security ticket resolution, ensuring timely response and accurate documentation",
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 mt-5">
              {["Splunk SIEM", "Log Analysis", "Incident Response", "SQL", "Alert Triaging", "Threat Detection"].map((tag) => (
                <span key={tag} className="px-2 py-0.5 text-xs border border-green-900/50 text-green-500/70 rounded-sm">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-28 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-green-400 text-xs font-mono uppercase tracking-widest">03 /</span>
            <h2 className="text-3xl font-extrabold text-white" style={{ fontFamily: "Syne" }}>Skills & Arsenal</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-green-900/60 to-transparent" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-widest mb-6">— Proficiency Matrix</p>
              {skills.map((s) => (
                <ThreatMeter key={s.label} label={s.label} level={s.level} color={s.color} />
              ))}
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-xs text-gray-600 uppercase tracking-widest mb-4">— Security Tools</p>
                <div className="flex flex-wrap gap-2">
                  {["Splunk SIEM", "Burp Suite", "Nessus", "VirusTotal", "Wireshark"].map((t) => (
                    <span key={t} className="px-3 py-1.5 border border-cyan-900/50 text-cyan-400/80 text-xs rounded-sm hover:bg-cyan-500/5 transition-colors">{t}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-600 uppercase tracking-widest mb-4">— Core Concepts</p>
                <div className="flex flex-wrap gap-2">
                  {["SIEM & Log Monitoring", "Incident Response Lifecycle", "Threat Hunting", "Intrusion Detection", "Malware Analysis", "Cloud Security", "Network Defense", "Vulnerability Assessment"].map((t) => (
                    <span key={t} className="px-3 py-1.5 border border-purple-900/50 text-purple-400/80 text-xs rounded-sm hover:bg-purple-500/5 transition-colors">{t}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-600 uppercase tracking-widest mb-4">— Languages & DB</p>
                <div className="flex flex-wrap gap-2">
                  {["SQL", "Python", "Bash", "MySQL", "Query Optimization"].map((t) => (
                    <span key={t} className="px-3 py-1.5 border border-green-900/50 text-green-400/80 text-xs rounded-sm hover:bg-green-500/5 transition-colors">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-28 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-green-400 text-xs font-mono uppercase tracking-widest">04 /</span>
            <h2 className="text-3xl font-extrabold text-white" style={{ fontFamily: "Syne" }}>Projects</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-green-900/60 to-transparent" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <div
                key={i}
                className="group border border-gray-800/60 rounded-sm bg-black/30 p-6 hover:border-green-900/60 transition-all duration-300 backdrop-blur-sm hover:translate-y-[-2px]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-sm border border-gray-700/60 flex items-center justify-center" style={{ color: p.color }}>
                    {p.icon}
                  </div>
                  <AlertBadge text={p.tag} type={p.tagType} />
                </div>
                <h3 className="text-base font-bold text-white mb-3 group-hover:text-green-400 transition-colors" style={{ fontFamily: "Syne" }}>
                  {p.name}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">{p.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-gray-800/40">
                  {p.stack.map((s) => (
                    <span key={s} className="text-xs text-gray-600 px-2 py-0.5 bg-gray-900/60 rounded-sm">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" className="py-28 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-green-400 text-xs font-mono uppercase tracking-widest">05 /</span>
            <h2 className="text-3xl font-extrabold text-white" style={{ fontFamily: "Syne" }}>Certifications</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-green-900/60 to-transparent" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 border border-gray-800/60 rounded-sm bg-black/20 hover:border-green-900/50 transition-all duration-200 hover:bg-black/40"
              >
                <div className="w-9 h-9 rounded-sm border flex items-center justify-center shrink-0" style={{ borderColor: cert.color + "40", color: cert.color }}>
                  {cert.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-200 font-medium leading-snug">{cert.name}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{cert.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-28 px-6 relative">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-green-400 text-xs font-mono uppercase tracking-widest">06 /</span>
            <h2 className="text-3xl font-extrabold text-white" style={{ fontFamily: "Syne" }}>Contact</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-green-900/60 to-transparent" />
          </div>

          <div className="border border-gray-800/60 rounded-sm bg-black/30 p-8 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-gray-500 uppercase tracking-widest font-mono">Secure Channel Open</span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "Syne" }}>
              Ready to Defend Your Infrastructure?
            </h3>
            <p className="text-sm text-gray-400 mb-8">
              I'm actively seeking <span className="text-green-400">SOC Analyst</span>, <span className="text-cyan-400">Security Operations</span>, or <span className="text-purple-400">Threat Detection</span> roles. Let's connect.
            </p>

            <form
              action="https://formspree.io/f/xkgbbzbz"
              method="POST"
              className="space-y-5"
            >
              <div>
                <label className="text-xs text-gray-600 uppercase tracking-widest block mb-1.5">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-black/40 border border-gray-800/60 rounded-sm px-4 py-3 text-sm text-gray-200 placeholder-gray-700 focus:outline-none focus:border-green-500/50 focus:bg-black/60 transition-all duration-200"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600 uppercase tracking-widest block mb-1.5">Message</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="w-full bg-black/40 border border-gray-800/60 rounded-sm px-4 py-3 text-sm text-gray-200 placeholder-gray-700 focus:outline-none focus:border-green-500/50 focus:bg-black/60 transition-all duration-200 resize-none"
                  placeholder="Tell me about the opportunity..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-3 rounded-sm text-sm uppercase tracking-widest transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Send Encrypted Message
              </button>
            </form>

            <div className="flex flex-wrap gap-4 mt-8 pt-8 border-t border-gray-800/40">
              {[
                { icon: Mail, label: "madhumithac588@gmail.com", url: "mailto:madhumithac588@gmail.com" },
                { icon: Linkedin, label: "linkedin.com/in/madhumitha-c", url: "https://in.linkedin.com/in/madhumitha-c-69468428b" },
                { icon: Github, label: "github.com/madhumithac588", url: "https://github.com/madhumithac588" },
              ].map(({ icon: Icon, label, url }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-gray-500 hover:text-green-400 transition-colors duration-200"
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                  <ExternalLink className="w-3 h-3 opacity-50" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-green-900/20 py-8 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Shield className="w-4 h-4 text-green-400" />
            <span className="text-xs text-gray-600 font-mono">© 2025 Madhumitha.C — All systems secure.</span>
          </div>
          <span className="text-xs text-gray-700 font-mono">SIEM · SOC · THREAT DETECTION · INCIDENT RESPONSE</span>
        </div>
      </footer>
    </div>
  );
}