import { useState, useEffect, useRef, useCallback } from "react";
import { RENZ } from "./assets/Signature";

console.clear();
console.log(RENZ);


// ─── THEME & CONFIG ───────────────────────────────────────────
const THEME = {
  bg: "#0a0a0f",
  bgAlt: "#0d0d14",
  surface: "#12121c",
  surfaceHover: "#1a1a28",
  border: "#1e1e2e",
  accent: "#dc2626",
  accentDim: "rgba(220, 38, 38, 0.15)",
  accentGlow: "rgba(220, 38, 38, 0.4)",
  text: "#e8e8ed",
  textDim: "#6b6b80",
  textMid: "#9b9bb0",
  danger: "#ff4d6a",
  purple: "#8b5cf6",
  blue: "#3b82f6",
};

const PROJECTS = [
  {
    title: "PlanUp",
    subtitle: "Party Planning App",
    description: "A collaborative party planning platform with real-time features, 3D bubble navigation, and seamless event coordination for groups.",
    tags: ["React Native", "Node.js", "Firebase", "Agile/Jira"],
    color: "#00e5a0",
    icon: "🎉",
    github: "#",
    live: "/demovids/PlanUpDemo.mp4",
    year: "2026",
  },
  {
    title: "Market Mind",
    subtitle: "AI Sales & Inventory Platform",
    description: "An AI-powered platform for sales analytics and inventory management, leveraging LLM architecture for intelligent business insights.",
    tags: ["FastAPI", "PostgreSQL", "LLM", "Python"],
    color: "#8b5cf6",
    icon: "🧠",
    github: "#",
    live: "/demovids/MarketMindDemo.mp4",
    year: "2025",
  },
  {
    title: "Poker Trainer",
    subtitle: "Visual Learning App",
    description: "A Flutter-based poker training application with authentic visual design, focusing on hand analysis and strategic decision-making.",
    tags: ["Flutter", "Dart", "UI/UX", "Game Logic"],
    color: "#3b82f6",
    icon: "🃏",
    github: "#",
    live: "#",
    year: "2026",
  },
{
  title: "Psi Synced",
  subtitle: "Event planning platform for greek life",
  description: "A platform for greek life organizations to plan and manage events, with features for event creation, registration, and management, as well as a chat and poll feature for communication and organization.",
  tags: [ "React", "Calendar API"],
  color: "#f59e0b",
  icon: "🗓️",
  github: "#",
  live: "#",
  year: "2025",
},
];

const SKILLS = {
  Languages: ["Python", "JavaScript", "TypeScript", "Dart", "SQL", "HTML/CSS"],
  Frameworks: ["React", "React Native", "FastAPI", "Flutter", "Node.js", "Next.js"],
  Tools: ["Git", "AWS", "PostgreSQL", "Firebase", "Jira", "Docker"],
  Concepts: ["Agile/Scrum", "REST APIs", "LLM Architecture", "UI/UX Design", "CI/CD"],
};

const NAV_ITEMS = [
  { key: "home", label: "Home" },
  { key: "projects", label: "Projects" },
  { key: "about", label: "About" },
  { key: "contact", label: "Contact" },
];

// ─── STYLES ───────────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Outfit:wght@300;400;500;600;700;800&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  ::selection {
    background: ${THEME.accentDim};
    color: ${THEME.accent};
  }

  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: ${THEME.border}; border-radius: 2px; }
  ::-webkit-scrollbar-thumb:hover { background: ${THEME.textDim}; }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes glowPulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
  }

  @keyframes scanline {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  @keyframes gridScroll {
    0% { transform: translate(0, 0); }
    100% { transform: translate(30px, 30px); }
  }

  .stagger-1 { animation-delay: 0.1s !important; }
  .stagger-2 { animation-delay: 0.2s !important; }
  .stagger-3 { animation-delay: 0.3s !important; }
  .stagger-4 { animation-delay: 0.4s !important; }
  .stagger-5 { animation-delay: 0.5s !important; }

  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;

// ─── COMPONENTS ───────────────────────────────────────────────

function GridBackground() {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: "-30px",
        backgroundImage: `linear-gradient(${THEME.border}55 1px, transparent 1px), linear-gradient(90deg, ${THEME.border}55 1px, transparent 1px)`,
        backgroundSize: "30px 30px",
        animation: "gridScroll 8s linear infinite",
        opacity: 0.3,
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse 60% 50% at 50% 50%, transparent, ${THEME.bg})`,
      }} />
      <div style={{
        position: "absolute", width: "100%", height: "4px",
        background: `linear-gradient(90deg, transparent, ${THEME.accent}15, transparent)`,
        animation: "scanline 4s linear infinite",
      }} />
    </div>
  );
}

function AnimatedEntry({ children, delay = 0, style = {} }) {
  return (
    <div style={{
      animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
      animationDelay: `${delay}s`,
      opacity: 0,
      ...style,
    }}>
      {children}
    </div>
  );
}

function Navbar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const el = document.getElementById("scroll-root");
    if (!el) return;
    const handler = () => setScrolled(el.scrollTop > 20);
    el.addEventListener("scroll", handler);
    return () => el.removeEventListener("scroll", handler);
  }, [page]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const handleNavClick = (key) => {
    setPage(key);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: isMobile ? "0 20px" : "0 40px", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled || mobileMenuOpen ? `${THEME.bg}e8` : "transparent",
        backdropFilter: scrolled || mobileMenuOpen ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${THEME.border}` : "1px solid transparent",
        transition: "all 0.4s ease",
      }}>
        <div
          onClick={() => handleNavClick("home")}
          style={{
            cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
            fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: isMobile ? 16 : 18,
            letterSpacing: "-0.5px",
          }}
        >
          <span style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 32, height: 32, borderRadius: 8,
            background: THEME.accentDim, border: `1px solid ${THEME.accent}40`,
            fontSize: 14, color: THEME.accent,
          }}>L</span>
          <span style={{ color: THEME.text }}>Larenz</span>
          <span style={{ color: THEME.accent }}>.dev</span>
        </div>

        {/* Desktop Nav */}
        {!isMobile && (
          <div style={{ display: "flex", gap: 4 }}>
            {NAV_ITEMS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setPage(key)}
                style={{
                  background: page === key ? THEME.accentDim : "transparent",
                  border: page === key ? `1px solid ${THEME.accent}30` : "1px solid transparent",
                  color: page === key ? THEME.accent : THEME.textDim,
                  padding: "8px 18px", borderRadius: 8, cursor: "pointer",
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 13,
                  fontWeight: page === key ? 500 : 400,
                  transition: "all 0.3s ease",
                  letterSpacing: "0.3px",
                }}
                onMouseEnter={e => {
                  if (page !== key) {
                    e.target.style.color = THEME.text;
                    e.target.style.background = THEME.surfaceHover;
                  }
                }}
                onMouseLeave={e => {
                  if (page !== key) {
                    e.target.style.color = THEME.textDim;
                    e.target.style.background = "transparent";
                  }
                }}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {/* Mobile Hamburger Button */}
        {isMobile && (
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: "transparent", border: "none",
              cursor: "pointer", padding: 8,
              display: "flex", flexDirection: "column", gap: 5,
              justifyContent: "center", alignItems: "center",
            }}
            aria-label="Toggle menu"
          >
            <span style={{
              width: 24, height: 2, background: THEME.text,
              borderRadius: 2, transition: "all 0.3s ease",
              transform: mobileMenuOpen ? "rotate(45deg) translateY(7px)" : "none",
            }} />
            <span style={{
              width: 24, height: 2, background: THEME.text,
              borderRadius: 2, transition: "all 0.3s ease",
              opacity: mobileMenuOpen ? 0 : 1,
            }} />
            <span style={{
              width: 24, height: 2, background: THEME.text,
              borderRadius: 2, transition: "all 0.3s ease",
              transform: mobileMenuOpen ? "rotate(-45deg) translateY(-7px)" : "none",
            }} />
          </button>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobile && mobileMenuOpen && (
        <div style={{
          position: "fixed", top: 64, left: 0, right: 0, bottom: 0,
          background: `${THEME.bg}f8`, backdropFilter: "blur(24px)",
          zIndex: 99, animation: "fadeIn 0.3s ease",
          display: "flex", flexDirection: "column",
          padding: "40px 24px",
        }}>
          {NAV_ITEMS.map(({ key, label }, i) => (
            <button
              key={key}
              onClick={() => handleNavClick(key)}
              style={{
                background: "transparent",
                border: "none", borderBottom: `1px solid ${THEME.border}`,
                color: page === key ? THEME.accent : THEME.text,
                padding: "20px 0", cursor: "pointer",
                fontFamily: "'Outfit', sans-serif", fontSize: 24,
                fontWeight: page === key ? 600 : 400,
                textAlign: "left",
                transition: "all 0.3s ease",
                animation: `fadeInUp 0.4s ease forwards`,
                animationDelay: `${i * 0.08}s`,
                opacity: 0,
              }}
            >
              {label}
              {page === key && (
                <span style={{
                  marginLeft: 12, color: THEME.accent, fontSize: 14,
                  fontFamily: "'JetBrains Mono', monospace",
                }}>←</span>
              )}
            </button>
          ))}

          <div style={{
            marginTop: "auto", paddingTop: 40,
            fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
            color: THEME.textDim,
          }}>
            <p>Available for internships</p>
            <p style={{ marginTop: 8 }}>larenzquashie406@gmail.com</p>
          </div>
        </div>
      )}
    </>
  );
}

function TypewriterText({ text, delay = 0 }) {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    setDisplayed("");
    setShowCursor(true);
    let i = 0;
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          setTimeout(() => setShowCursor(false), 2000);
        }
      }, 50);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [text, delay]);

  return (
    <span>
      {displayed}
      {showCursor && (
        <span style={{
          display: "inline-block", width: 3, height: "0.9em",
          background: THEME.accent, marginLeft: 2, verticalAlign: "middle",
          animation: "blink 1s step-end infinite",
          boxShadow: `0 0 8px ${THEME.accentGlow}`,
        }} />
      )}
    </span>
  );
}

function GlowOrb({ color, size, top, left, delay = 0 }) {
  return (
    <div style={{
      position: "absolute", top, left, width: size, height: size,
      borderRadius: "50%",
      background: `radial-gradient(circle, ${color}30, transparent 70%)`,
      filter: "blur(40px)",
      animation: `float 6s ease-in-out infinite`,
      animationDelay: `${delay}s`,
      pointerEvents: "none",
    }} />
  );
}

function ProjectCard3D({ project, index, onClick }) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState("");
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (y - 0.5) * -20;
    const rotateY = (x - 0.5) * 20;
    setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`);
    setGlare({ x: x * 100, y: y * 100, opacity: 0.12 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform("perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setGlare({ x: 50, y: 50, opacity: 0 });
    setHovered(false);
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative", cursor: "pointer",
        background: THEME.surface,
        border: `1px solid ${hovered ? `${project.color}40` : THEME.border}`,
        borderRadius: 16, padding: 28,
        transform, transition: "transform 0.12s ease-out, border-color 0.3s ease",
        overflow: "hidden",
        animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
        animationDelay: `${index * 0.12}s`,
        opacity: 0,
      }}
    >
      {/* Glare overlay */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: 16, pointerEvents: "none",
        background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, white, transparent 60%)`,
        opacity: glare.opacity, transition: "opacity 0.3s ease",
      }} />

      {/* Top accent line */}
      <div style={{
        position: "absolute", top: 0, left: 24, right: 24, height: 2,
        background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
        opacity: hovered ? 0.8 : 0.3,
        transition: "opacity 0.3s ease",
      }} />

      {/* Year badge */}
      <div style={{
        position: "absolute", top: 16, right: 16,
        fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
        color: THEME.textDim, background: `${THEME.bg}80`,
        padding: "4px 10px", borderRadius: 6,
        border: `1px solid ${THEME.border}`,
      }}>{project.year}</div>

      {/* Icon */}
      <div style={{
        fontSize: 36, marginBottom: 16,
        filter: `drop-shadow(0 0 ${hovered ? "16px" : "8px"} ${project.color}50)`,
        transition: "filter 0.3s ease",
        animation: hovered ? "float 3s ease-in-out infinite" : "none",
      }}>{project.icon}</div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 700,
        color: THEME.text, marginBottom: 4,
      }}>{project.title}</h3>

      <p style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
        color: project.color, marginBottom: 14, fontWeight: 500,
      }}>{project.subtitle}</p>

      <p style={{
        fontSize: 14, color: THEME.textMid, lineHeight: 1.6,
        marginBottom: 20,
      }}>{project.description}</p>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {project.tags.map(tag => (
          <span key={tag} style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
            color: THEME.textDim, padding: "4px 10px", borderRadius: 6,
            background: `${project.color}10`,
            border: `1px solid ${project.color}20`,
          }}>{tag}</span>
        ))}
      </div>

      {/* Bottom glow */}
      <div style={{
        position: "absolute", bottom: -20, left: "50%", transform: "translateX(-50%)",
        width: "60%", height: 40,
        background: project.color, filter: "blur(30px)",
        opacity: hovered ? 0.15 : 0.05,
        transition: "opacity 0.3s ease",
      }} />

      {/* Hover CTA */}
      <div style={{
        position: "absolute", bottom: 16, right: 16,
        fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
        color: project.color,
        opacity: hovered ? 1 : 0,
        transform: hovered ? "translateY(0)" : "translateY(8px)",
        transition: "all 0.3s ease",
      }}>click to explore →</div>
    </div>
  );
}

// ─── PAGES ────────────────────────────────────────────────────

function HomePage({ setPage }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center",
      padding: isMobile ? "100px 20px 60px" : "120px 40px 80px",
      position: "relative",
    }}>
      <GlowOrb color={THEME.accent} size={isMobile ? "250px" : "400px"} top="-100px" left="-100px" />
      <GlowOrb color={THEME.purple} size={isMobile ? "200px" : "300px"} top="200px" left="70%" delay={2} />
      <GlowOrb color={THEME.blue} size={isMobile ? "150px" : "250px"} top="60%" left="20%" delay={4} />

      <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 800, width: "100%" }}>
        {/* Status badge */}
        <AnimatedEntry delay={0.1}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontFamily: "'JetBrains Mono', monospace", fontSize: isMobile ? 12 : 14,
            color: THEME.accent, marginBottom: isMobile ? 24 : 32,
            background: THEME.accentDim, padding: isMobile ? "6px 14px" : "8px 20px", borderRadius: 100,
            border: `1px solid ${THEME.accent}25`,
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: "50%",
              background: "#00e5a0",
              animation: "glowPulse 2s ease-in-out infinite",
              boxShadow: "0 0 8px #00e5a0",
            }} />
            available for internships
          </div>
        </AnimatedEntry>

        <AnimatedEntry delay={0.2}>
          <h1 style={{
            fontFamily: "'Outfit', sans-serif", fontSize: "clamp(48px, 7vw, 80px)",
            fontWeight: 800, lineHeight: 1.05, marginBottom: 24,
            letterSpacing: "-2px",
          }}>
            <span style={{ color: THEME.textDim }}>Hi, I'm </span>
            <span style={{
              color: THEME.accent,
              textShadow: `0 0 60px ${THEME.accentGlow}`,
            }}>Larenz Quashie </span>
            <br />
            
          </h1>
        </AnimatedEntry>

        <AnimatedEntry delay={0.35}>
          <p style={{
            fontSize: isMobile ? 15 : 18, color: THEME.textMid, maxWidth: 520,
            margin: isMobile ? "0 auto 32px" : "0 auto 44px", lineHeight: 1.7, fontWeight: 300,
            padding: isMobile ? "0 10px" : 0,
          }}>
            Full-stack developer & CS student at Syracuse University.
            Passionate about crafting intuitive, beautiful digital experiences.
          </p>
        </AnimatedEntry>

        <AnimatedEntry delay={0.5}>
          <div style={{
            display: "flex", gap: isMobile ? 12 : 16, justifyContent: "center",
            flexWrap: "wrap", flexDirection: isMobile ? "column" : "row",
            alignItems: "center", padding: isMobile ? "0 20px" : 0,
          }}>
            <button
              onClick={() => setPage("projects")}
              style={{
                background: THEME.accent, color: THEME.bg,
                border: "none", padding: isMobile ? "14px 0" : "14px 32px",
                borderRadius: 10, width: isMobile ? "100%" : "auto",
                fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 600,
                cursor: "pointer", transition: "all 0.3s ease",
                boxShadow: `0 0 30px ${THEME.accent}30`,
              }}
              onMouseEnter={e => {
                e.target.style.boxShadow = `0 0 50px ${THEME.accent}50`;
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                e.target.style.boxShadow = `0 0 30px ${THEME.accent}30`;
                e.target.style.transform = "translateY(0)";
              }}
            >
              View Projects →
            </button>
            <button
              onClick={() => setPage("contact")}
              style={{
                background: "transparent", color: THEME.text,
                border: `1px solid ${THEME.border}`,
                padding: isMobile ? "14px 0" : "14px 32px",
                borderRadius: 10, width: isMobile ? "100%" : "auto",
                fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 500,
                cursor: "pointer", transition: "all 0.3s ease",
              }}
              onMouseEnter={e => {
                e.target.style.borderColor = THEME.accent;
                e.target.style.color = THEME.accent;
              }}
              onMouseLeave={e => {
                e.target.style.borderColor = THEME.border;
                e.target.style.color = THEME.text;
              }}
            >
              Get in Touch
            </button>
          </div>
        </AnimatedEntry>

        {/* Tech stack */}
        <AnimatedEntry delay={0.65}>
          <div style={{
            marginTop: isMobile ? 48 : 80, display: "flex", gap: isMobile ? 8 : 12,
            justifyContent: "center", flexWrap: "wrap",
            padding: isMobile ? "0 10px" : 0,
          }}>
            {["React", "Python", "FastAPI", "Flutter", "PostgreSQL", "AWS"].map((tech) => (
              <span key={tech} style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: isMobile ? 11 : 12,
                color: THEME.textDim, padding: isMobile ? "5px 10px" : "6px 14px",
                border: `1px solid ${THEME.border}`, borderRadius: 6,
                transition: "all 0.3s ease",
                cursor: "default",
              }}
              onMouseEnter={e => {
                e.target.style.borderColor = `${THEME.accent}40`;
                e.target.style.color = THEME.accent;
              }}
              onMouseLeave={e => {
                e.target.style.borderColor = THEME.border;
                e.target.style.color = THEME.textDim;
              }}
              >{tech}</span>
            ))}
          </div>
        </AnimatedEntry>
      </div>
    </div>
  );
}

function ProjectsPage() {
  const [selected, setSelected] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div style={{
      minHeight: "100vh", padding: isMobile ? "100px 16px 60px" : "120px 40px 80px",
      maxWidth: 1100, margin: "0 auto", position: "relative",
    }}>
      <GlowOrb color={THEME.purple} size={isMobile ? "200px" : "350px"} top="0" left="70%" />
      <GlowOrb color={THEME.accent} size={isMobile ? "180px" : "300px"} top="50%" left="-5%" delay={3} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <AnimatedEntry delay={0.1}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: isMobile ? 12 : 13,
            color: THEME.accent, marginBottom: 12,
          }}>{"// featured work"}</p>
        </AnimatedEntry>
        <AnimatedEntry delay={0.15}>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif", fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 800, marginBottom: 12, letterSpacing: "-1.5px",
          }}>Projects</h2>
        </AnimatedEntry>
        <AnimatedEntry delay={0.2}>
          <p style={{
            fontSize: isMobile ? 14 : 16, color: THEME.textMid, marginBottom: isMobile ? 36 : 56,
            maxWidth: 500, lineHeight: 1.6,
          }}>
            {isMobile ? "Tap to explore my work." : "A selection of things I've built. Hover to interact, click to explore."}
          </p>
        </AnimatedEntry>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(300px, 1fr))",
          gap: isMobile ? 16 : 24,
        }}>
          {PROJECTS.map((project, i) => (
            <ProjectCard3D
              key={project.title}
              project={project}
              index={i}
              onClick={() => setSelected(project)}
            />
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 200,
            background: `${THEME.bg}e0`, backdropFilter: "blur(20px)",
            display: "flex", alignItems: isMobile ? "flex-end" : "center", justifyContent: "center",
            animation: "fadeIn 0.3s ease",
            padding: isMobile ? 0 : 24,
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: THEME.surface, border: `1px solid ${THEME.border}`,
              borderRadius: isMobile ? "20px 20px 0 0" : 20,
              padding: isMobile ? "32px 24px 40px" : 40,
              maxWidth: 560, width: "100%",
              maxHeight: isMobile ? "85vh" : "auto",
              overflowY: isMobile ? "auto" : "visible",
              position: "relative",
              animation: isMobile ? "fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)" : "fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div style={{
              position: "absolute", top: 0, left: isMobile ? 24 : 32, right: isMobile ? 24 : 32, height: 3,
              background: `linear-gradient(90deg, transparent, ${selected.color}, transparent)`,
              borderRadius: "0 0 4px 4px",
            }} />

            <button
              onClick={() => setSelected(null)}
              style={{
                position: "absolute", top: 16, right: 16,
                background: `${THEME.bg}80`, border: `1px solid ${THEME.border}`,
                color: THEME.textDim, width: 36, height: 36, borderRadius: 8,
                cursor: "pointer", fontSize: 18, display: "flex",
                alignItems: "center", justifyContent: "center",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => e.target.style.color = THEME.text}
              onMouseLeave={e => e.target.style.color = THEME.textDim}
            >×</button>

            <span style={{
              fontSize: isMobile ? 40 : 48,
              filter: `drop-shadow(0 0 16px ${selected.color}50)`,
            }}>{selected.icon}</span>
            <h3 style={{
              fontFamily: "'Outfit', sans-serif", fontSize: isMobile ? 24 : 28, fontWeight: 700,
              marginTop: 16, marginBottom: 4,
            }}>{selected.title}</h3>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: isMobile ? 12 : 13,
              color: selected.color, marginBottom: 16, fontWeight: 500,
            }}>{selected.subtitle}</p>
            <p style={{
              fontSize: isMobile ? 14 : 15, color: THEME.textMid, lineHeight: 1.7, marginBottom: 24,
            }}>{selected.description}</p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
              {selected.tags.map(tag => (
                <span key={tag} style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: isMobile ? 11 : 12,
                  color: selected.color, padding: isMobile ? "4px 10px" : "5px 12px", borderRadius: 6,
                  background: `${selected.color}12`, border: `1px solid ${selected.color}25`,
                }}>{tag}</span>
              ))}
            </div>

            <div style={{ display: "flex", gap: 12, flexDirection: isMobile ? "column" : "row" }}>
              <a href={selected.github} style={{
                flex: 1, textAlign: "center", padding: "12px 20px",
                background: THEME.bg, border: `1px solid ${THEME.border}`,
                borderRadius: 10, color: THEME.text, textDecoration: "none",
                fontFamily: "'JetBrains Mono', monospace", fontSize: 13,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={e => e.target.style.borderColor = THEME.accent}
              onMouseLeave={e => e.target.style.borderColor = THEME.border}
              >GitHub ↗</a>
{selected.live && selected.live !== "#" && selected.live.endsWith(".mp4") ? (
                <button
                  onClick={() => setShowVideo(true)}
                  style={{
                    flex: 1, textAlign: "center", padding: "12px 20px",
                    background: selected.color, border: "none",
                    borderRadius: 10, color: THEME.bg,
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 600,
                    transition: "all 0.2s ease", cursor: "pointer",
                  }}
                  onMouseEnter={e => e.target.style.transform = "translateY(-1px)"}
                  onMouseLeave={e => e.target.style.transform = "translateY(0)"}
                >Watch Demo ▶</button>
              ) : (
                <a href={selected.live} style={{
                  flex: 1, textAlign: "center", padding: "12px 20px",
                  background: selected.color, border: "none",
                  borderRadius: 10, color: THEME.bg, textDecoration: "none",
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 600,
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={e => e.target.style.transform = "translateY(-1px)"}
                onMouseLeave={e => e.target.style.transform = "translateY(0)"}
                >Watch Demo ↗</a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Video Player Modal */}
      {showVideo && selected && (
        <div
          onClick={() => setShowVideo(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 300,
            background: `${THEME.bg}f5`, backdropFilter: "blur(24px)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            animation: "fadeIn 0.3s ease",
            padding: isMobile ? 16 : 24,
          }}
        >
          <button
            onClick={() => setShowVideo(false)}
            style={{
              position: "absolute", top: isMobile ? 16 : 24, left: isMobile ? 16 : 24,
              background: `${THEME.surface}`, border: `1px solid ${THEME.border}`,
              color: THEME.text, padding: isMobile ? "8px 14px" : "10px 20px", borderRadius: 10,
              cursor: "pointer", fontSize: isMobile ? 13 : 14, fontWeight: 500,
              fontFamily: "'JetBrains Mono', monospace",
              display: "flex", alignItems: "center", gap: 8,
              transition: "all 0.2s ease",
              zIndex: 10,
            }}
            onMouseEnter={e => {
              e.target.style.borderColor = THEME.accent;
              e.target.style.color = THEME.accent;
            }}
            onMouseLeave={e => {
              e.target.style.borderColor = THEME.border;
              e.target.style.color = THEME.text;
            }}
          >← Back</button>

          <div
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: isMobile ? "100%" : "90vw", maxHeight: isMobile ? "85vh" : "80vh", width: "100%",
              display: "flex", flexDirection: "column", alignItems: "center",
              paddingTop: isMobile ? 60 : 0,
            }}
          >
            <h3 style={{
              fontFamily: "'Outfit', sans-serif", fontSize: isMobile ? 18 : 24, fontWeight: 700,
              marginBottom: isMobile ? 12 : 20, color: THEME.text,
              textAlign: "center", padding: isMobile ? "0 16px" : 0,
            }}>{selected.title} Demo</h3>
            <video
              controls
              autoPlay
              playsInline
              style={{
                maxWidth: "100%", maxHeight: isMobile ? "70vh" : "70vh", borderRadius: isMobile ? 8 : 12,
                border: `1px solid ${THEME.border}`,
                boxShadow: `0 0 ${isMobile ? "30px" : "60px"} ${selected.color}30`,
              }}
            >
              <source src={selected.live} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
}

function AboutPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div style={{
      minHeight: "100vh", padding: isMobile ? "100px 16px 60px" : "120px 40px 80px",
      maxWidth: 900, margin: "0 auto", position: "relative",
    }}>
      <GlowOrb color={THEME.blue} size={isMobile ? "180px" : "300px"} top="100px" left="75%" />
      <GlowOrb color={THEME.accent} size={isMobile ? "150px" : "250px"} top="60%" left="-5%" delay={2} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <AnimatedEntry delay={0.1}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: isMobile ? 12 : 13,
            color: THEME.accent, marginBottom: 12,
          }}>{"// about me"}</p>
        </AnimatedEntry>
        <AnimatedEntry delay={0.15}>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif", fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 800, marginBottom: isMobile ? 28 : 40, letterSpacing: "-1.5px",
          }}>About</h2>
        </AnimatedEntry>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 16 : 24 }}>
          {/* Bio terminal */}
          <AnimatedEntry delay={0.25} style={{ gridColumn: "1 / -1" }}>
            <div style={{
              background: THEME.surface, border: `1px solid ${THEME.border}`,
              borderRadius: isMobile ? 12 : 16, padding: isMobile ? 20 : 32,
            }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: isMobile ? 11 : 12,
                color: THEME.textDim, marginBottom: isMobile ? 16 : 20,
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <span style={{ width: isMobile ? 8 : 10, height: isMobile ? 8 : 10, borderRadius: "50%", background: THEME.accent }} />
                <span style={{ width: isMobile ? 8 : 10, height: isMobile ? 8 : 10, borderRadius: "50%", background: "#f59e0b" }} />
                <span style={{ width: isMobile ? 8 : 10, height: isMobile ? 8 : 10, borderRadius: "50%", background: THEME.danger }} />
                <span style={{ marginLeft: 12 }}>about.md</span>
              </div>
              <p style={{
                fontSize: isMobile ? 14 : 16, color: THEME.textMid, lineHeight: 1.8,
              }}>
                I'm a Computer Science student at <span style={{ color: THEME.text, fontWeight: 500 }}>Syracuse University</span> with
                a passion for building products that solve real problems. I thrive in fast-paced,
                collaborative environments and love turning complex ideas into clean, intuitive interfaces.
              </p>
              <br />
              <p style={{
                fontSize: isMobile ? 14 : 16, color: THEME.textMid, lineHeight: 1.8,
              }}>
                My experience spans <span style={{ color: THEME.accent }}>full-stack development</span>, from
                designing AI-powered backends to crafting pixel-perfect UIs. I'm especially drawn to
                projects at the intersection of <span style={{ color: THEME.purple }}>AI/ML</span> and
                user-facing products.
              </p>
            </div>
          </AnimatedEntry>

          {/* Skills */}
          {Object.entries(SKILLS).map(([category, skills], i) => (
            <AnimatedEntry key={category} delay={0.4 + i * 0.1}>
              <div style={{
                background: THEME.surface, border: `1px solid ${THEME.border}`,
                borderRadius: isMobile ? 12 : 16, padding: isMobile ? 18 : 24, height: "100%",
              }}>
                <h4 style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: isMobile ? 11 : 12,
                  color: THEME.accent, marginBottom: isMobile ? 12 : 16, textTransform: "uppercase",
                  letterSpacing: "1.5px",
                }}>{category}</h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: isMobile ? 6 : 8 }}>
                  {skills.map(skill => (
                    <span key={skill} style={{
                      fontFamily: "'JetBrains Mono', monospace", fontSize: isMobile ? 12 : 13,
                      color: THEME.textMid, padding: isMobile ? "5px 10px" : "6px 12px",
                      background: THEME.bg, border: `1px solid ${THEME.border}`,
                      borderRadius: 8, transition: "all 0.2s ease",
                      cursor: "default",
                    }}
                    onMouseEnter={e => {
                      e.target.style.borderColor = `${THEME.accent}40`;
                      e.target.style.color = THEME.text;
                    }}
                    onMouseLeave={e => {
                      e.target.style.borderColor = THEME.border;
                      e.target.style.color = THEME.textMid;
                    }}
                    >{skill}</span>
                  ))}
                </div>
              </div>
            </AnimatedEntry>
          ))}

          {/* Education */}
          <AnimatedEntry delay={0.8} style={{ gridColumn: "1 / -1" }}>
            <div style={{
              background: THEME.surface, border: `1px solid ${THEME.border}`,
              borderRadius: isMobile ? 12 : 16, padding: isMobile ? 20 : 28,
              display: "flex", alignItems: "center", gap: isMobile ? 16 : 24,
            }}>
              <div style={{
                width: isMobile ? 48 : 56, height: isMobile ? 48 : 56, borderRadius: isMobile ? 12 : 14,
                background: `linear-gradient(135deg, ${THEME.accent}20, ${THEME.purple}20)`,
                border: `1px solid ${THEME.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: isMobile ? 20 : 24, flexShrink: 0,
              }}>🎓</div>
              <div>
                <h4 style={{
                  fontFamily: "'Outfit', sans-serif", fontSize: isMobile ? 16 : 18, fontWeight: 600,
                  marginBottom: 4,
                }}>Syracuse University</h4>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: isMobile ? 11 : 13,
                  color: THEME.textDim,
                }}>B.S. Computer Science • Expected 2027</p>
              </div>
            </div>
          </AnimatedEntry>
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div style={{
      minHeight: "100vh", padding: isMobile ? "100px 16px 60px" : "120px 40px 80px",
      width: "100%", position: "relative",
    }}>
      <GlowOrb color={THEME.accent} size={isMobile ? "200px" : "350px"} top="150px" left="80%" />

      <div style={{ position: "relative", zIndex: 1 }}>
        <AnimatedEntry delay={0.1}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: isMobile ? 12 : 13,
            color: THEME.accent, marginBottom: 12,
          }}>{"// let's connect"}</p>
        </AnimatedEntry>
        <AnimatedEntry delay={0.15}>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif", fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 800, marginBottom: 12, letterSpacing: "-1.5px",
          }}>Get in Touch</h2>
        </AnimatedEntry>
        <AnimatedEntry delay={0.2}>
          <p style={{
            fontSize: isMobile ? 14 : 16, color: THEME.textMid, marginBottom: isMobile ? 32 : 48,
            maxWidth: 460, lineHeight: 1.6,
          }}>
            Have an opportunity, project idea, or just want to chat? I'd love to hear from you.
          </p>
        </AnimatedEntry>

        {/* Contact links */}
        <AnimatedEntry delay={0.3}>
          <div style={{
            display: "flex", flexDirection: "column", gap: isMobile ? 12 : 14, marginBottom: isMobile ? 32 : 48,
            maxWidth: 500,
          }}>
            {[
              { label: "Email", value: isMobile ? "larenzquashie406@..." : "larenzquashie406@gmail.com", href: "mailto:larenzquashie406@gmail.com", icon: "✉", color: THEME.accent },
              { label: "GitHub", value: "github.com/lq23", href: "https://github.com/lq23", icon: "◆", color: THEME.text },
              { label: "LinkedIn", value: isMobile ? "linkedin.com/in/larenz..." : "linkedin.com/in/larenzquashie/", href: "https://linkedin.com/in/larenzquashie/", icon: "▣", color: THEME.blue },
            ].map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                target={link.label === "Email" ? "_self" : "_blank"}
                rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: isMobile ? 12 : 16,
                  background: THEME.surface, border: `1px solid ${THEME.border}`,
                  borderRadius: isMobile ? 12 : 14, padding: isMobile ? "14px 16px" : "18px 24px",
                  textDecoration: "none", transition: "all 0.3s ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${link.color}40`;
                  if (!isMobile) e.currentTarget.style.transform = "translateX(8px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = THEME.border;
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                <span style={{
                  width: isMobile ? 36 : 40, height: isMobile ? 36 : 40, borderRadius: isMobile ? 8 : 10,
                  background: `${link.color}15`, border: `1px solid ${link.color}25`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: isMobile ? 16 : 18, flexShrink: 0,
                }}>{link.icon}</span>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <p style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: isMobile ? 10 : 11,
                    color: THEME.textDim, marginBottom: 2,
                  }}>{link.label}</p>
                  <p style={{
                    fontSize: isMobile ? 13 : 15, color: THEME.text, fontWeight: 500,
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>{link.value}</p>
                </div>
                <span style={{
                  marginLeft: "auto", color: THEME.textDim, fontSize: isMobile ? 16 : 18, flexShrink: 0,
                }}>↗</span>
              </a>
            ))}
          </div>
        </AnimatedEntry>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────
export default function Portfolio() {
  const [page, setPage] = useState("home");
  const [transitionKey, setTransitionKey] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const navigate = (newPage) => {
    setTransitionKey(k => k + 1);
    setPage(newPage);
  };

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage setPage={navigate} />;
      case "projects": return <ProjectsPage />;
      case "about": return <AboutPage />;
      case "contact": return <ContactPage />;
      default: return <HomePage setPage={navigate} />;
    }
  };

  return (
    <div style={{ background: THEME.bg, minHeight: "100vh", color: THEME.text }}>
      <style>{globalStyles}</style>
      <GridBackground />
      <Navbar page={page} setPage={navigate} />
      <div id="scroll-root" key={transitionKey} style={{
        height: "100vh", overflowY: "auto",
        scrollBehavior: "smooth",
      }}>
        {renderPage()}

        {/* Footer */}
        <footer style={{
          padding: isMobile ? "24px 16px" : "32px 40px", borderTop: `1px solid ${THEME.border}`,
          display: "flex", justifyContent: "center", alignItems: "center",
          position: "relative", zIndex: 1,
        }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: isMobile ? 11 : 12,
            color: THEME.textDim, textAlign: "center",
          }}>© 2025 Larenz Quashie. Built with React.</span>
        
        </footer>
      </div>
    </div>
  );
}
