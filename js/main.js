document.addEventListener("DOMContentLoaded", () => {
  buildNav(); buildHero(); buildAbout(); buildSkills();
  buildProjects(); buildEducation(); buildCertifications();
  buildContact(); buildFooter();
  init3DCanvas(); initCursor(); initTiltCards();
  initScrollReveal3D(); initSkillBars(); initActiveNav();
  initMobileMenu(); initNavScroll(); initTypewriter();
  initStatCounters();
});

function set(id, html) {
  const node = document.getElementById(id);
  if (node) node.innerHTML = html;
}

// ── BUILD FUNCTIONS ───────────────────────────────────────────
function buildNav() {
  const D = PORTFOLIO_DATA;
  set("nav-logo", `${D.name.split(" ").map(w=>w[0]).join("")}<span>.</span>${D.name.split(" ")[1]}`);
  set("nav-links", ["about","skills","projects","education","contact"].map(l=>
    `<li><a href="#${l}">${l.charAt(0).toUpperCase()+l.slice(1)}</a></li>`).join(""));
}

function buildHero() {
  const D = PORTFOLIO_DATA;
  set("hero-tag",     D.available ? "Available for Opportunities" : "Portfolio");
  set("hero-name",    `${D.name.split(" ")[0]}<br/><span>${D.name.split(" ").slice(1).join(" ")}</span>`);
  set("hero-title",   "");
  set("hero-tagline", D.tagline);
  document.getElementById("hero-linkedin").href = D.linkedin;
  document.getElementById("hero-github").href   = D.github;
  set("hero-stats", D.stats ? D.stats.map(s=>`
    <div class="stat-card">
      <div class="stat-num" data-target="${s.number}">${s.number}</div>
      <div class="stat-label">${s.label}</div>
    </div>`).join("") : "");
}

function buildAbout() {
  const D = PORTFOLIO_DATA;
  set("about-text", D.about.map(p=>`<p>${p}</p>`).join(""));
  const edu = D.education[0] || {};
  set("about-info", `
    <div class="info-item"><div class="info-label">Location</div><div class="info-val">${D.location}</div></div>
    <div class="info-item"><div class="info-label">Degree</div><div class="info-val">${(edu.degree||"").split("(")[0].trim()}</div></div>
    <div class="info-item"><div class="info-label">Focus Area</div><div class="info-val">Data Science &amp; ML</div></div>
    <div class="info-item"><div class="info-label">Status</div><div class="info-val" style="color:var(--teal)">${D.available?"Open to Work ✓":"Not Available"}</div></div>
  `);
}

function buildSkills() {
  const D = PORTFOLIO_DATA;
  set("skills-grid", D.skills.map(cat => {
    const bars = (cat.items||[]).map(item=>`
      <div class="skill-item">
        <div class="skill-row"><span class="skill-name">${item.name}</span><span class="skill-pct">${item.pct}%</span></div>
        <div class="skill-bar"><div class="skill-fill" data-width="${item.pct}"></div></div>
      </div>`).join("");
    const tags = cat.tags ? `<div class="tags-wrap">${cat.tags.map(t=>`<span class="tag">${t}</span>`).join("")}</div>` : "";
    return `<div class="skill-category tilt-card"><div class="cat-title">${cat.icon} ${cat.category}</div>${bars}${tags}</div>`;
  }).join(""));
}

function buildProjects() {
  const D = PORTFOLIO_DATA;
  let cards = D.projects.map(p=>`
    <div class="project-card tilt-card">
      <div class="project-num">${p.number}</div>
      <div class="project-icon">${p.icon}</div>
      <div class="project-name">${p.name}</div>
      <div class="project-desc">${p.desc}</div>
      <div class="project-tech">${p.tech.map(t=>`<span class="tech-chip">${t}</span>`).join("")}</div>
      <div class="project-links">
        ${p.liveUrl   ? `<a class="project-link" href="${p.liveUrl}"   target="_blank">🌐 Live Demo</a>` : ""}
        ${p.githubUrl ? `<a class="project-link" href="${p.githubUrl}" target="_blank">⌥ GitHub</a>`    : ""}
      </div>
    </div>`).join("");
  cards += `
    <div class="project-card coming-soon tilt-card">
      <div class="project-num">0${D.projects.length+1}</div>
      <div class="project-icon">🚀</div>
      <div class="project-name">Coming Soon</div>
      <div class="project-desc">Next project in progress — stay tuned!</div>
      <div class="project-tech"><span class="tech-chip">Python</span><span class="tech-chip">SQL</span><span class="tech-chip">Power BI</span></div>
    </div>`;
  set("projects-grid", cards);
}

function buildEducation() {
  const D = PORTFOLIO_DATA;
  set("education-list", D.education.map(e=>`
    <div class="edu-card tilt-card">
      <div class="edu-degree">${e.degree}</div>
      <div class="edu-uni">${e.university}</div>
      <div class="edu-meta">
        <div class="edu-meta-item">📅 Year: <span>${e.year}</span></div>
        <div class="edu-meta-item">🎓 CGPA: <span style="color:var(--gold)">${e.cgpa}</span></div>
        <div class="edu-meta-item">📍 <span>${e.location}</span></div>
      </div>
      ${e.resultFile ? `
      <div style="margin-top:1.5rem;">
        <a href="${e.resultFile}" download="Suraj_Patel_Result.pdf" class="download-btn">
          📥 Download Result
        </a>
      </div>` : ""}
    </div>`).join(""));
}

function buildCertifications() {
  const D = PORTFOLIO_DATA;
  set("cert-grid", D.certifications.map(c=>`
    <div class="cert-card tilt-card">
      <div class="cert-icon">${c.icon}</div>
      <div style="flex:1">
        <div class="cert-name">${c.name}</div>
        <div class="cert-platform">${c.platform} · ${c.year}</div>
        ${c.certFile ? `
        <div style="margin-top:0.8rem;">
          <a href="${c.certFile}" download="Suraj_${c.name.replace(/ /g,'_')}_Certificate.pdf" class="download-btn">
            📥 Download Certificate
          </a>
        </div>` : ""}
      </div>
    </div>`).join(""));
}
function buildContact() {
  const D = PORTFOLIO_DATA;
  set("contact-cards", `
    <a class="contact-card" href="mailto:${D.email}">
      <div class="contact-icon">✉️</div>
      <div><div class="contact-label">Email</div><div class="contact-val">${D.email}</div></div>
    </a>
    <a class="contact-card" href="https://wa.me/919005624668?text=Hi%20Suraj!%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect." target="_blank" style="border-color:rgba(37,211,102,0.3);">
      <div class="contact-icon">📱</div>
      <div><div class="contact-label" style="color:#25d366;">WhatsApp</div><div class="contact-val">${D.phone}</div></div>
    </a>
    <a class="contact-card" href="${D.linkedin}" target="_blank">
      <div class="contact-icon">💼</div>
      <div><div class="contact-label">LinkedIn</div><div class="contact-val">suraj-patel-b6b5a0288</div></div>
    </a>
    <a class="contact-card" href="${D.github}" target="_blank">
      <div class="contact-icon">🐙</div>
      <div><div class="contact-label">GitHub</div><div class="contact-val">github.com/Surajaap</div></div>
    </a>
    <div class="contact-card">
      <div class="contact-icon">📍</div>
      <div><div class="contact-label">Location</div><div class="contact-val">${D.location}</div></div>
    </div>
  `);
}

function buildFooter() {
  const D = PORTFOLIO_DATA;
  set("footer-logo", "S. P.");
  set("footer-copy", `© ${new Date().getFullYear()} ${D.name} · ${D.location}`);
  set("footer-role", D.role);
}

// ── THREE.JS 3D NEURAL NETWORK HERO ───────────────────────────
function init3DCanvas() {
  if (typeof THREE === "undefined") return;
  const canvas   = document.getElementById("hero-canvas");
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  // Particles
  const particleCount = 120;
  const positions     = new Float32Array(particleCount * 3);
  const particles     = [];

  for (let i = 0; i < particleCount; i++) {
    const x = (Math.random() - 0.5) * 14;
    const y = (Math.random() - 0.5) * 8;
    const z = (Math.random() - 0.5) * 6;
    positions[i*3]   = x;
    positions[i*3+1] = y;
    positions[i*3+2] = z;
    particles.push({ x, y, z, vx: (Math.random()-0.5)*0.005, vy: (Math.random()-0.5)*0.005, vz: (Math.random()-0.5)*0.003 });
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({ color: 0xc9a84c, size: 0.06, transparent: true, opacity: 0.8 });
  const points = new THREE.Points(geo, mat);
  scene.add(points);

  // Connection lines
  const lineMat = new THREE.LineBasicMaterial({ color: 0x3dd6c8, transparent: true, opacity: 0.12 });
  const lineGroup = new THREE.Group();
  scene.add(lineGroup);

  let mouseX = 0, mouseY = 0;
  document.addEventListener("mousemove", e => {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  let frame = 0;
  function animate() {
    requestAnimationFrame(animate);
    frame++;

    // Update particles
    for (let i = 0; i < particleCount; i++) {
      particles[i].x += particles[i].vx;
      particles[i].y += particles[i].vy;
      particles[i].z += particles[i].vz;
      if (Math.abs(particles[i].x) > 7) particles[i].vx *= -1;
      if (Math.abs(particles[i].y) > 4) particles[i].vy *= -1;
      if (Math.abs(particles[i].z) > 3) particles[i].vz *= -1;
      positions[i*3]   = particles[i].x;
      positions[i*3+1] = particles[i].y;
      positions[i*3+2] = particles[i].z;
    }
    geo.attributes.position.needsUpdate = true;

    // Update lines every 3 frames for perf
    if (frame % 3 === 0) {
      while (lineGroup.children.length) lineGroup.remove(lineGroup.children[0]);
      for (let i = 0; i < particleCount; i++) {
        for (let j = i+1; j < particleCount; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dz = particles[i].z - particles[j].z;
          const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
          if (dist < 2.5) {
            const lGeo = new THREE.BufferGeometry().setFromPoints([
              new THREE.Vector3(particles[i].x, particles[i].y, particles[i].z),
              new THREE.Vector3(particles[j].x, particles[j].y, particles[j].z),
            ]);
            const lMat = new THREE.LineBasicMaterial({ color: 0x3dd6c8, transparent: true, opacity: (1 - dist/2.5) * 0.2 });
            lineGroup.add(new THREE.Line(lGeo, lMat));
          }
        }
      }
    }

    // Camera follows mouse
    camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.03;
    camera.position.y += (-mouseY * 0.3 - camera.position.y) * 0.03;
    camera.lookAt(scene.position);

    points.rotation.y += 0.0008;
    renderer.render(scene, camera);
  }
  animate();
}

// ── CUSTOM CURSOR ─────────────────────────────────────────────
function initCursor() {
  const cursor = document.getElementById("cursor");
  const trail  = document.getElementById("cursor-trail");
  let tx = 0, ty = 0;

  document.addEventListener("mousemove", e => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top  = e.clientY + "px";
    tx = e.clientX; ty = e.clientY;
  });

  function updateTrail() {
    const cx = parseFloat(trail.style.left) || 0;
    const cy = parseFloat(trail.style.top)  || 0;
    trail.style.left = (cx + (tx - cx) * 0.15) + "px";
    trail.style.top  = (cy + (ty - cy) * 0.15) + "px";
    requestAnimationFrame(updateTrail);
  }
  updateTrail();
}

// ── 3D TILT CARDS ─────────────────────────────────────────────
function initTiltCards() {
  function applyTilt() {
    document.querySelectorAll(".tilt-card").forEach(card => {
      card.addEventListener("mousemove", e => {
        const rect   = card.getBoundingClientRect();
        const x      = e.clientX - rect.left;
        const y      = e.clientY - rect.top;
        const cx     = rect.width  / 2;
        const cy     = rect.height / 2;
        const rotateX = ((y - cy) / cy) * -12;
        const rotateY = ((x - cx) / cx) *  12;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        card.style.boxShadow = `${-rotateY}px ${rotateX}px 40px rgba(0,0,0,0.4), 0 0 20px rgba(201,168,76,0.1)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform  = "perspective(800px) rotateX(0) rotateY(0) translateZ(0)";
        card.style.boxShadow  = "";
        card.style.transition = "transform 0.5s ease, box-shadow 0.5s ease";
      });
      card.addEventListener("mouseenter", () => {
        card.style.transition = "none";
      });
    });
  }
  setTimeout(applyTilt, 500);
}

// ── 3D SCROLL REVEAL ──────────────────────────────────────────
function initScrollReveal3D() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add("visible"), i * 80);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll(".reveal-3d").forEach(r => obs.observe(r));
}

// ── SKILL BARS ────────────────────────────────────────────────
function initSkillBars() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.width + "%";
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll(".skill-fill").forEach(b => obs.observe(b));
}

// ── TYPEWRITER EFFECT ─────────────────────────────────────────
function initTypewriter() {
  const el    = document.getElementById("hero-title");
  const D     = PORTFOLIO_DATA;
  const roles = [
    `> ${D.role}`,
    "> Data Scientist & ML Engineer",
    "> Python | SQL | Power BI Expert",
    "> Turning Data into Insights",
  ];
  let ri = 0, ci = 0, deleting = false;

  function type() {
    const current = roles[ri];
    if (!deleting) {
      el.textContent = current.slice(0, ci++);
      if (ci > current.length) { deleting = true; setTimeout(type, 1800); return; }
    } else {
      el.textContent = current.slice(0, ci--);
      if (ci < 0) { deleting = false; ri = (ri + 1) % roles.length; ci = 0; }
    }
    setTimeout(type, deleting ? 40 : 75);
  }
  setTimeout(type, 1000);
}

// ── STAT COUNTERS ─────────────────────────────────────────────
function initStatCounters() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el  = e.target;
      const raw = el.dataset.target || "";
      const num = parseFloat(raw.replace(/[^0-9.]/g, ""));
      const sfx = raw.replace(/[0-9.]/g, "");
      if (isNaN(num)) return;
      let start = 0;
      const step = num / 60;
      const timer = setInterval(() => {
        start += step;
        if (start >= num) { el.textContent = raw; clearInterval(timer); return; }
        el.textContent = (Number.isInteger(num) ? Math.floor(start) : start.toFixed(1)) + sfx;
      }, 25);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll(".stat-num[data-target]").forEach(el => obs.observe(el));
}

// ── ACTIVE NAV ────────────────────────────────────────────────
function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav a");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) current = s.id; });
    navLinks.forEach(a => { a.style.color = a.getAttribute("href") === "#"+current ? "var(--gold)" : ""; });
  });
}

// ── NAV SCROLL EFFECT ─────────────────────────────────────────
function initNavScroll() {
  const nav = document.querySelector("nav");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 50);
  });
}

// ── MOBILE MENU ───────────────────────────────────────────────
function initMobileMenu() {
  const btn = document.getElementById("menu-btn");
  const ul  = document.getElementById("nav-links");
  if (!btn || !ul) return;
  btn.addEventListener("click", () => {
    ul.classList.toggle("open");
    btn.textContent = ul.classList.contains("open") ? "✕" : "☰";
  });
  ul.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    ul.classList.remove("open"); btn.textContent = "☰";
  }));
}

// ── CHATBOT ───────────────────────────────────────────────────
const chatHistory = [];

function toggleChat() {
  const box = document.getElementById("chat-box");
  const btn = document.getElementById("chat-toggle");
  const lbl = document.getElementById("chat-label");
  const isOpen = box.classList.toggle("open");
  btn.textContent = isOpen ? "✕" : "💬";
  if (lbl) lbl.style.display = isOpen ? "none" : "block";
  if (isOpen && chatHistory.length === 0) {
    appendMessage("bot", "Hi! 👋 I'm Suraj's AI assistant. Ask me anything about his skills, projects, or experience!");
  }
}

function appendMessage(role, text) {
  const msgs = document.getElementById("chat-messages");
  const div  = document.createElement("div");
  div.className   = `chat-msg ${role}`;
  div.textContent = text;
  msgs.appendChild(div);
  msgs.scrollTop  = msgs.scrollHeight;
}

async function sendChat() {
  const input = document.getElementById("chat-input");
  const msg   = input.value.trim();
  if (!msg) return;
  input.value = "";
  appendMessage("user", msg);
  chatHistory.push({ role: "user", content: msg });
  const typing = document.createElement("div");
  typing.className = "chat-msg bot typing";
  typing.textContent = "Typing...";
  document.getElementById("chat-messages").appendChild(typing);
  try {
    const res  = await fetch("/api/chat", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ messages: chatHistory }) });
    const json = await res.json();
    typing.remove();
    const reply = json.reply || "Sorry, I couldn't answer that.";
    appendMessage("bot", reply);
    chatHistory.push({ role: "assistant", content: reply });
  } catch {
    typing.remove();
    appendMessage("bot", "❌ Connection error. Please try again.");
  }
}

document.addEventListener("keydown", e => {
  if (e.key === "Enter" && document.activeElement === document.getElementById("chat-input")) sendChat();
});