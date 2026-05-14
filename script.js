/* ============ Theme Toggle ============ */
const themeBtn = document.getElementById('themeBtn');
const root = document.documentElement;
const saved = localStorage.getItem('theme') || 'dark';
root.setAttribute('data-theme', saved);
themeBtn.textContent = saved === 'dark' ? '☀️' : '🌙';
themeBtn.onclick = () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeBtn.textContent = next === 'dark' ? '☀️' : '🌙';
};

/* ============ Mobile menu ============ */
document.getElementById('menuToggle').onclick = () => {
  document.getElementById('navLinks').classList.toggle('show');
};
document.querySelectorAll('.nav-links a').forEach(a =>
  a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('show'))
);

/* ============ Matrix background (moving image) ============ */
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
let w, h, cols, drops;
const chars = '01ABCDEF#$%&{}[]<>/\\|+-=*アァカサタナハマヤラワ'.split('');
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  cols = Math.floor(w / 16);
  drops = Array(cols).fill(0).map(() => Math.random() * h);
}
resize();
window.addEventListener('resize', resize);
function draw() {
  ctx.fillStyle = 'rgba(5,6,10,0.08)';
  ctx.fillRect(0, 0, w, h);
  const accent = getComputedStyle(root).getPropertyValue('--neon').trim() || '#00ffaa';
  ctx.fillStyle = accent;
  ctx.font = '14px JetBrains Mono, monospace';
  drops.forEach((y, i) => {
    const ch = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(ch, i * 16, y);
    drops[i] = y > h + Math.random() * 1000 ? 0 : y + 16;
  });
  requestAnimationFrame(draw);
}
draw();

/* ============ Mouse glow ============ */
const glow = document.getElementById('mouseGlow');
window.addEventListener('mousemove', e => {
  glow.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
});

/* ============ Typing effect ============ */
const phrases = ['penetration_tester.exe', 'soc_analyst.sh', 'bug_bounty_hunter', 'ctf_player'];
const typedEl = document.getElementById('typed');
let pi = 0, ci = 0, deleting = false;
function type() {
  const word = phrases[pi];
  typedEl.textContent = word.slice(0, ci);
  if (!deleting && ci < word.length) ci++;
  else if (deleting && ci > 0) ci--;
  else { deleting = !deleting; if (!deleting) pi = (pi + 1) % phrases.length; }
  setTimeout(type, deleting ? 50 : 100);
}
type();

/* ============ Skills data ============ */
const skills = [
  { name: 'Penetration Testing', level: 88 },
  { name: 'Network Security', level: 85 },
  { name: 'Python', level: 92 },
  { name: 'Linux', level: 90 },
  { name: 'Wireshark', level: 80 },
  { name: 'Burp Suite', level: 78 },
  { name: 'SIEM / Splunk', level: 72 },
  { name: 'Cryptography', level: 68 },
];
const skillsGrid = document.getElementById('skillsGrid');
skills.forEach(s => {
  const d = document.createElement('div');
  d.className = 'skill';
  d.innerHTML = `<div class="skill-head"><span>${s.name}</span><span class="text-neon">${s.level}%</span></div><div class="bar"><i data-lvl="${s.level}"></i></div>`;
  skillsGrid.appendChild(d);
});
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.querySelectorAll('.bar i').forEach(i => i.style.width = i.dataset.lvl + '%');
  });
}, { threshold: .3 });
io.observe(skillsGrid);

/* ============ Projects ============ */
const projects = [
  {
    title: 'Active Directory Lab',
    desc: 'Self-hosted AD environment for attack/defense practice with Kerberoasting, AS-REP roasting and BloodHound mapping.',
    tags: ['AD', 'Kerberos', 'BloodHound'],
    img: { gradient: 'linear-gradient(135deg,#0f2027,#1a3a4a,#00d4ff)', icon: 'fa-solid fa-network-wired', color: '#00d4ff' }
  },
  {
    title: 'SOC Monitoring Dashboard',
    desc: 'Real-time alerts dashboard built on ELK with custom Sigma rules and threat intel feeds.',
    tags: ['ELK', 'Sigma', 'Python'],
    img: { gradient: 'linear-gradient(135deg,#0d0d1a,#1a0a2e,#a855f7)', icon: 'fa-solid fa-chart-line', color: '#a855f7' }
  },
  {
    title: 'Vulnerability Scanner',
    desc: 'Lightweight Python scanner that fingerprints services and matches CVEs from NVD.',
    tags: ['Python', 'Nmap', 'CVE'],
    img: { gradient: 'linear-gradient(135deg,#001a10,#003320,#00ffaa)', icon: 'fa-solid fa-bug', color: '#00ffaa' }
  },
  {
    title: 'Phishing Detector',
    desc: 'ML-based email scanner using NLP + URL heuristics with 96% accuracy on test set.',
    tags: ['ML', 'NLP', 'Python'],
    img: { gradient: 'linear-gradient(135deg,#1a0a00,#2e1500,#ff6a00)', icon: 'fa-solid fa-fish', color: '#ff6a00' }
  },
  {
    title: 'CTF Write-ups',
    desc: 'Documented solutions for HackTheBox & TryHackMe boxes — privilege escalation, web exploitation.',
    tags: ['CTF', 'Web', 'PrivEsc'],
    img: { gradient: 'linear-gradient(135deg,#0a001a,#15003a,#e040fb)', icon: 'fa-solid fa-flag', color: '#e040fb' }
  },
  {
    title: 'Network Sniffer',
    desc: 'Custom packet inspector with anomaly detection over raw sockets in C and Python.',
    tags: ['Sockets', 'C', 'Python'],
    img: { gradient: 'linear-gradient(135deg,#001219,#003049,#0077b6)', icon: 'fa-solid fa-satellite-dish', color: '#00b4d8' }
  },
];
const projectsGrid = document.getElementById('projectsGrid');
projects.forEach(p => {
  const d = document.createElement('div');
  d.className = 'project';
  d.innerHTML = `
    <div class="project-img" style="background:${p.img.gradient}">
      <i class="${p.img.icon}" style="font-size:2.8rem;color:${p.img.color};filter:drop-shadow(0 0 12px ${p.img.color});"></i>
      <div class="project-img-shine"></div>
    </div>
    <h3>${p.title}</h3>
    <p>${p.desc}</p>
    <div class="tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
  `;
  projectsGrid.appendChild(d);
});

/* ============ Blog ============ */
const blogs = [
  { date: '2026-04-12', title: 'Hardening Active Directory', desc: 'Practical steps to reduce attack surface in Windows domains.' },
  { date: '2026-03-02', title: 'Intro to SOC Workflows', desc: 'Triage, escalation, IR — how a Tier-1 analyst spends their day.' },
  { date: '2026-02-08', title: 'Bypassing WAFs Ethically', desc: 'Common WAF bypass techniques and how to defend against them.' },
];
const blogGrid = document.getElementById('blogGrid');
blogs.forEach(b => {
  const d = document.createElement('div');
  d.className = 'blog';
  d.innerHTML = `<span class="date">${b.date}</span><h3>${b.title}</h3><p class="muted">${b.desc}</p>`;
  blogGrid.appendChild(d);
});

/* ============ Search ============ */
const searchModal = document.getElementById('searchModal');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const searchIndex = [
  ...projects.map(p => ({ title: p.title, type: 'Project', anchor: '#projects' })),
  ...skills.map(s => ({ title: s.name, type: 'Skill', anchor: '#skills' })),
  ...blogs.map(b => ({ title: b.title, type: 'Blog', anchor: '#blog' })),
  { title: 'Contact', type: 'Page', anchor: '#contact' },
  { title: 'About', type: 'Page', anchor: '#about' },
];
function renderResults(q = '') {
  const list = q ? searchIndex.filter(r => r.title.toLowerCase().includes(q.toLowerCase())) : searchIndex.slice(0, 8);
  searchResults.innerHTML = list.length
    ? list.map(r => `<li data-anchor="${r.anchor}"><span>${r.title}</span><span class="type">[${r.type}]</span></li>`).join('')
    : '<li>no matches found</li>';
  searchResults.querySelectorAll('li[data-anchor]').forEach(li => {
    li.onclick = () => { document.querySelector(li.dataset.anchor).scrollIntoView({ behavior: 'smooth' }); closeModals(); };
  });
}
document.getElementById('searchBtn').onclick = () => { searchModal.classList.add('show'); searchInput.focus(); renderResults(); };
searchInput.addEventListener('input', e => renderResults(e.target.value));

/* ============ Modals (login / signup / search) ============ */
function closeModals() { document.querySelectorAll('.modal').forEach(m => m.classList.remove('show')); }
document.querySelectorAll('[data-close]').forEach(b => b.onclick = closeModals);
document.querySelectorAll('.modal').forEach(m => m.addEventListener('click', e => { if (e.target === m) closeModals(); }));
document.getElementById('loginBtn').onclick = () => document.getElementById('loginModal').classList.add('show');
document.getElementById('signupBtn').onclick = () => document.getElementById('signupModal').classList.add('show');
document.getElementById('toSignup').onclick = e => { e.preventDefault(); closeModals(); document.getElementById('signupModal').classList.add('show'); };
document.getElementById('toLogin').onclick = e => { e.preventDefault(); closeModals(); document.getElementById('loginModal').classList.add('show'); };
document.querySelectorAll('.auth-form').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  const type = f.dataset.auth;
  closeModals();
  toast(type === 'login' ? 'Welcome back, operator.' : 'Account provisioned successfully.');
  f.reset();
}));

/* ============ Contact form ============ */
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const status = document.getElementById('formStatus');
  status.textContent = '> transmitting message...';
  setTimeout(() => { status.textContent = '✓ message delivered. response in <24h.'; e.target.reset(); }, 900);
});

/* ============ Toast ============ */
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

/* ============ Chatbot ============ */
const presets = [
  { q: 'about', a: "I'm a cybersecurity student focused on offensive security, SOC operations, and blue-team automation." },
  { q: 'skills', a: 'Top skills: Penetration Testing, Python, Linux, Wireshark, Burp Suite, SIEM tools.' },
  { q: 'projects', a: 'Highlights: Active Directory Lab, SOC Dashboard, Vulnerability Scanner, Phishing Detector.' },
  { q: 'contact', a: 'Email alex@cypher.dev or use the contact form. Response in under 24h.' },
  { q: 'certs', a: 'Earned/working on: CompTIA Security+, CEH, Cisco CyberOps, TryHackMe & HTB ranks.' },
];
const chatbot = document.getElementById('chatbot');
const chatMsgs = document.getElementById('chatMsgs');
const chatPresets = document.getElementById('chatPresets');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
function addMsg(text, who = 'bot') {
  const d = document.createElement('div');
  d.className = 'm ' + who;
  d.textContent = text;
  chatMsgs.appendChild(d);
  chatMsgs.scrollTop = chatMsgs.scrollHeight;
}
function reply(input) {
  const q = input.toLowerCase();
  const hit = presets.find(p => q.includes(p.q));
  if (hit) return hit.a;
  if (/hi|hello|hey/.test(q)) return 'Hey there. Try: about, skills, projects, certs, contact.';
  return 'I can help with: about, skills, projects, certs, contact. Try one of those.';
}
addMsg('root@cypher:~$ initiating chat protocol… how can I help?');
presets.forEach(p => {
  const b = document.createElement('button');
  b.textContent = p.q;
  b.onclick = () => { addMsg(p.q, 'user'); setTimeout(() => addMsg(p.a), 300); };
  chatPresets.appendChild(b);
});
document.getElementById('chatbotBtn').onclick = () => chatbot.classList.toggle('show');
document.getElementById('chatbotClose').onclick = () => chatbot.classList.remove('show');
chatForm.addEventListener('submit', e => {
  e.preventDefault();
  const v = chatInput.value.trim();
  if (!v) return;
  addMsg(v, 'user');
  setTimeout(() => addMsg(reply(v)), 350);
  chatInput.value = '';
});

/* Esc closes everything */
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeModals(); chatbot.classList.remove('show'); } });
