// ============================================
// Landing Page — Public Hospital Homepage
// ============================================

function renderLanding() {
  return `
    <div class="landing-page">

      <!-- ===== NAVBAR ===== -->
      <nav class="landing-nav">
        <div class="landing-nav-inner">
          <div class="landing-logo">
            <div class="logo-icon"><i class="fa-solid fa-heart-pulse"></i></div>
            <div>
              <div class="logo-name">MediCare Pro</div>
              <div class="logo-sub">Hospital Management</div>
            </div>
          </div>
          <div class="landing-nav-links">
            <a href="#about" onclick="smoothScroll('about')">About</a>
            <a href="#services" onclick="smoothScroll('services')">Services</a>
            <a href="#doctors" onclick="smoothScroll('doctors')">Doctors</a>
            <a href="#contact" onclick="smoothScroll('contact')">Contact</a>
          </div>
          <div style="display:flex;gap:10px;align-items:center">
            <button class="btn btn-sm" style="background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.4);color:#ef4444;font-weight:600" onclick="State.set({currentPage:'ambulance'});renderApp()">
              <i class="fa-solid fa-truck-medical"></i> Ambulance
            </button>
            <button class="btn btn-secondary btn-sm" onclick="State.set({currentPage:'login'});renderApp()">
              <i class="fa-solid fa-arrow-right-to-bracket"></i> Login
            </button>
            <button class="btn btn-primary btn-sm" onclick="State.set({currentPage:'login'});renderApp()">
              <i class="fa-solid fa-user-plus"></i> Get Started
            </button>
          </div>
        </div>
      </nav>

      <!-- ===== HERO ===== -->
      <section class="landing-hero">
        <div class="hero-bg-glow"></div>
        <div class="hero-bg-glow2"></div>
        <canvas id="heart-canvas" class="hero-3d-bg"></canvas>
        <div class="landing-hero-inner">
          <div class="hero-content">
            <div class="hero-badge">
              <span class="pulse-dot"></span>
              <span>Trusted by 50,000+ Patients</span>
            </div>
            <h1 class="hero-title">
              Your Health Is Our<br>
              <span class="gradient-text">Top Priority</span>
            </h1>
            <p class="hero-desc">
              Pakistan's most advanced hospital management platform — connecting patients with world-class doctors, simplifying appointment booking, and delivering premium healthcare experiences.
            </p>
            <div class="hero-actions">
              <button class="btn btn-primary btn-lg" onclick="State.set({currentPage:'login'});renderApp()">
                <i class="fa-solid fa-calendar-plus"></i> Book Appointment
              </button>
              <button class="btn btn-secondary btn-lg" onclick="smoothScroll('doctors')">
                <i class="fa-solid fa-user-doctor"></i> Meet Our Doctors
              </button>
            </div>
            <div class="hero-stats">
              <div class="hero-stat"><span class="hero-stat-num">200+</span><span class="hero-stat-label">Specialists</span></div>
              <div class="hero-stat-divider"></div>
              <div class="hero-stat"><span class="hero-stat-num">50K+</span><span class="hero-stat-label">Happy Patients</span></div>
              <div class="hero-stat-divider"></div>
              <div class="hero-stat"><span class="hero-stat-num">30+</span><span class="hero-stat-label">Hospitals</span></div>
              <div class="hero-stat-divider"></div>
              <div class="hero-stat"><span class="hero-stat-num">4.9★</span><span class="hero-stat-label">Rating</span></div>
            </div>
          </div>
          <div class="hero-image-col">
            <div class="hero-card-float hero-card-1">
              <i class="fa-solid fa-circle-check" style="color:#10b981;font-size:1.1rem"></i>
              <div>
                <div style="font-size:0.8rem;font-weight:600;color:var(--text-white)">Appointment Confirmed</div>
                <div style="font-size:0.72rem;color:var(--text-muted)">Dr. Sarah Ahmed · 10:00 AM</div>
              </div>
            </div>
            <div class="hero-hospital-img">
              <img src="img/hero1.webp" alt="Hospital" style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius-xl);display:block" />
            </div>
            <div class="hero-card-float hero-card-2">
              <i class="fa-solid fa-star" style="color:#f59e0b;font-size:1rem"></i>
              <div>
                <div style="font-size:0.8rem;font-weight:600;color:var(--text-white)">4.9 / 5 Rating</div>
                <div style="font-size:0.72rem;color:var(--text-muted)">From 2,400+ reviews</div>
              </div>
            </div>
            <div class="hero-card-float hero-card-3">
              <i class="fa-solid fa-user-group" style="color:#3b82f6;font-size:1rem"></i>
              <div>
                <div style="font-size:0.8rem;font-weight:600;color:var(--text-white)">200+ Doctors</div>
                <div style="font-size:0.72rem;color:var(--text-muted)">All specialties covered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== ABOUT ===== -->
      <section class="landing-section" id="about">
        <div class="landing-container">
          <div class="section-header">
            <div class="section-tag">About Us</div>
            <h2>Pakistan's Leading<br>Healthcare Platform</h2>
            <p>MediCare Pro bridges the gap between patients and premium healthcare professionals through technology, trust, and compassion.</p>
          </div>
          <div class="about-grid">
            <div class="about-image-col">
              <div class="about-img-box">
              <img src="img/hero2.avif" alt="About MediCare Pro" 
                style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius-xl);display:block;box-shadow:var(--shadow-lg),var(--glow);border:1px solid var(--border)" />
              <div class="about-img-badge1">
                <i class="fa-solid fa-shield-halved" style="color:#10b981"></i>
                <span>ISO Certified</span>
              </div>
              <div class="about-img-badge2">
                <i class="fa-solid fa-award" style="color:#f59e0b"></i>
                <span>Award Winning</span>
              </div>
            </div>
            </div>
            <div class="about-text-col">
              <h3 style="margin-bottom:14px">We Put Patients First, Always</h3>
              <p style="margin-bottom:14px">Founded in 2018, MediCare Pro has grown into Pakistan's most trusted digital healthcare platform, serving patients across Lahore, Karachi, Islamabad, and beyond.</p>
              <p style="margin-bottom:20px">Our mission is simple: make quality healthcare accessible to everyone. From booking your first appointment to managing chronic conditions, we're with you at every step.</p>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px">
                ${[
                  { icon:'fa-clock', text:'24/7 Emergency Support' },
                  { icon:'fa-shield-halved', text:'100% Secure & Private' },
                  { icon:'fa-user-doctor', text:'Verified Specialists' },
                  { icon:'fa-calendar-check', text:'Easy Appointment Booking' },
                  { icon:'fa-video', text:'Telemedicine Available' },
                  { icon:'fa-globe', text:'Multi-City Coverage' },
                ].map(f => `
                  <div style="display:flex;align-items:center;gap:8px;font-size:0.875rem;color:var(--text-secondary)">
                    <i class="fa-solid ${f.icon}" style="color:var(--accent-light);width:16px"></i>${f.text}
                  </div>`).join('')}
              </div>
              <button class="btn btn-primary" onclick="State.set({currentPage:'login'});renderApp()">
                Learn More <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== SERVICES ===== -->
      <section class="landing-section landing-section-alt" id="services">
        <div class="landing-container">
          <div class="section-header">
            <div class="section-tag">Our Services</div>
            <h2>Comprehensive Healthcare<br>Under One Roof</h2>
            <p>From general consultations to specialized treatments — we have every healthcare need covered.</p>
          </div>
          <div class="services-grid">
            ${[
              { icon:'fa-heart-pulse', color:'#ef4444', title:'Cardiology', desc:'Advanced heart care, ECG, echocardiography, and cardiac surgery by top cardiologists.' },
              { icon:'fa-brain', color:'#8b5cf6', title:'Neurology', desc:'Expert diagnosis and treatment of brain, spine, and nervous system disorders.' },
              { icon:'fa-baby', color:'#10b981', title:'Pediatrics', desc:'Compassionate care for children from newborns to teenagers, including vaccinations.' },
              { icon:'fa-bone', color:'#f59e0b', title:'Orthopedics', desc:'Bone, joint, and sports injury treatment with minimally invasive surgical options.' },
              { icon:'fa-eye', color:'#0ea5e9', title:'Ophthalmology', desc:'Complete eye care — from glasses prescriptions to LASIK and cataract surgeries.' },
              { icon:'fa-pills', color:'#ec4899', title:'Dermatology', desc:'Medical and cosmetic skin treatments including acne, psoriasis, and anti-aging.' },
              { icon:'fa-lungs', color:'#6366f1', title:'Pulmonology', desc:'Diagnosis and treatment of respiratory conditions, asthma, and COPD.' },
              { icon:'fa-microscope', color:'#14b8a6', title:'Laboratory', desc:'State-of-the-art diagnostic labs with fast, accurate results delivered online.' },
            ].map(s => `
              <div class="service-card">
                <div class="service-icon" style="background:rgba(${hexToRgb(s.color)},0.12);color:${s.color}">
                  <i class="fa-solid ${s.icon}"></i>
                </div>
                <h4>${s.title}</h4>
                <p>${s.desc}</p>
                <a href="#" onclick="State.set({currentPage:'login'});renderApp();return false" style="font-size:0.82rem;color:var(--accent-light);display:flex;align-items:center;gap:4px;margin-top:auto">
                  Learn more <i class="fa-solid fa-arrow-right" style="font-size:0.7rem"></i>
                </a>
              </div>`).join('')}
          </div>
        </div>
      </section>

      <!-- ===== DOCTORS ===== -->
      <section class="landing-section" id="doctors">
        <div class="landing-container">
          <div class="section-header">
            <div class="section-tag">Our Team</div>
            <h2>Meet Our Expert<br>Medical Professionals</h2>
            <p>Our team of 200+ specialists are leaders in their fields, dedicated to providing you with the best care possible.</p>
          </div>
          <div class="landing-doctors-grid">
            ${MOCK_DOCTORS.slice(0,4).map(d => `
              <div class="landing-doctor-card">
                <div class="landing-doc-avatar" style="background:linear-gradient(135deg,${d.color},${d.color}aa)">
                  ${d.initials}
                </div>
                <h4>${d.name}</h4>
                <div style="font-size:0.8rem;color:var(--accent-light);margin-bottom:6px">${d.specialty}</div>
                <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:10px">
                  <i class="fa-solid fa-hospital" style="margin-right:4px"></i>${d.hospital}
                </div>
                <div style="display:flex;justify-content:center;align-items:center;gap:4px;margin-bottom:12px">
                  <span style="color:#f59e0b;font-size:0.8rem">${'★'.repeat(Math.round(d.rating))}${'☆'.repeat(5-Math.round(d.rating))}</span>
                  <span style="font-size:0.75rem;color:var(--text-muted)">${d.rating} (${d.reviews})</span>
                </div>
                <div style="display:flex;gap:8px;justify-content:center;font-size:0.75rem;color:var(--text-secondary);margin-bottom:14px">
                  <span><i class="fa-solid fa-briefcase-medical" style="color:var(--accent-light);margin-right:3px"></i>${d.experience} yrs</span>
                  <span><i class="fa-solid fa-users" style="color:var(--accent-light);margin-right:3px"></i>${d.patients.toLocaleString()}</span>
                </div>
                <button class="btn btn-primary btn-sm w-full" onclick="State.set({currentPage:'login'});renderApp()">
                  <i class="fa-solid fa-calendar-plus"></i> Book Appointment
                </button>
              </div>`).join('')}
          </div>
          <div style="text-align:center;margin-top:28px">
            <button class="btn btn-secondary btn-lg" onclick="State.set({currentPage:'login'});renderApp()">
              View All 200+ Doctors <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </section>

      <!-- ===== WHY US ===== -->
      <section class="landing-section landing-section-alt">
        <div class="landing-container">
          <div class="section-header">
            <div class="section-tag">Why Choose Us</div>
            <h2>Healthcare Made<br>Simple & Accessible</h2>
          </div>
          <div class="why-grid">
            ${[
              { icon:'fa-bolt', color:'#f59e0b', title:'Fast Booking', desc:'Book an appointment in under 60 seconds. No waiting, no phone calls.' },
              { icon:'fa-lock', color:'#10b981', title:'100% Secure', desc:'Your health data is encrypted and protected with enterprise-grade security.' },
              { icon:'fa-star', color:'#8b5cf6', title:'Top Doctors', desc:'All our doctors are verified specialists with proven track records.' },
              { icon:'fa-clock', color:'#0ea5e9', title:'24/7 Support', desc:'Round-the-clock patient support and emergency helpline always available.' },
              { icon:'fa-mobile-screen', color:'#ec4899', title:'Easy to Use', desc:'Intuitive interface designed for patients of all ages and tech levels.' },
              { icon:'fa-file-medical', color:'#6366f1', title:'Digital Records', desc:'All your medical history and reports in one secure digital place.' },
            ].map(w => `
              <div class="why-card">
                <div class="why-icon" style="background:rgba(${hexToRgb(w.color)},0.12);color:${w.color}">
                  <i class="fa-solid ${w.icon}"></i>
                </div>
                <h4>${w.title}</h4>
                <p>${w.desc}</p>
              </div>`).join('')}
          </div>
        </div>
      </section>

      <!-- ===== 3D SECTION ===== -->
      <section class="landing-section landing-section-alt" id="3d-section">
        <div class="landing-container">
          <div class="section-header">
            <div class="section-tag">Interactive 3D</div>
            <h2>Healthcare Technology<br>Visualized in 3D</h2>
            <p>Explore our cutting-edge medical platform through interactive 3D models.</p>
          </div>

          <div class="three-d-layout">

            <!-- Three.js DNA Canvas -->
            <div class="dna-canvas-wrap">
              <canvas id="dna-canvas"></canvas>
              <div class="dna-label">
                <i class="fa-solid fa-dna" style="color:var(--accent-light)"></i>
                <span>DNA Double Helix — Medical Innovation</span>
              </div>
            </div>

            <!-- CSS 3D Flip Cards -->
            <div class="flip-cards-col">
              <p style="font-size:0.82rem;color:var(--text-muted);margin-bottom:16px;display:flex;align-items:center;gap:6px">
                <i class="fa-solid fa-hand-pointer" style="color:var(--accent-light)"></i> Hover over cards to flip
              </p>
              <div class="flip-cards-grid">
                ${[
                  { icon:'fa-heart-pulse', color:'#ef4444', front:'Cardiology', frontSub:'Heart Care', back:'Advanced cardiac monitoring, ECG analysis, and minimally invasive heart procedures.', stat:'98%', statLabel:'Success Rate' },
                  { icon:'fa-brain', color:'#8b5cf6', front:'Neurology', frontSub:'Brain & Spine', back:'State-of-the-art neuroimaging and treatment for complex nervous system disorders.', stat:'200+', statLabel:'Cases/Month' },
                  { icon:'fa-dna', color:'#10b981', front:'Genetics', frontSub:'DNA Analysis', back:'Cutting-edge genomic testing and personalized medicine based on your DNA profile.', stat:'99.9%', statLabel:'Accuracy' },
                  { icon:'fa-microscope', color:'#0ea5e9', front:'Lab Tests', frontSub:'Diagnostics', back:'5000+ diagnostic tests with rapid results and AI-powered anomaly detection.', stat:'24hr', statLabel:'Results' },
                  { icon:'fa-robot', color:'#f59e0b', front:'AI Diagnosis', frontSub:'Smart Health', back:'AI-powered symptom analysis and early detection of 300+ medical conditions.', stat:'95%', statLabel:'Accuracy' },
                  { icon:'fa-shield-halved', color:'#6366f1', front:'Data Security', frontSub:'HIPAA Compliant', back:'Military-grade encryption protecting your medical records and personal data 24/7.', stat:'0', statLabel:'Breaches' },
                ].map(c => `
                  <div class="flip-card">
                    <div class="flip-card-inner">
                      <div class="flip-card-front" style="border-color:rgba(${hexToRgb(c.color)},0.3)">
                        <div class="flip-front-icon" style="background:rgba(${hexToRgb(c.color)},0.12);color:${c.color}">
                          <i class="fa-solid ${c.icon}"></i>
                        </div>
                        <div class="flip-front-title">${c.front}</div>
                        <div class="flip-front-sub">${c.frontSub}</div>
                        <div class="flip-hint"><i class="fa-solid fa-rotate"></i></div>
                      </div>
                      <div class="flip-card-back" style="background:linear-gradient(145deg,rgba(${hexToRgb(c.color)},0.15),rgba(${hexToRgb(c.color)},0.05));border-color:rgba(${hexToRgb(c.color)},0.4)">
                        <div class="flip-back-stat" style="color:${c.color}">${c.stat}</div>
                        <div class="flip-back-stat-label">${c.statLabel}</div>
                        <p class="flip-back-desc">${c.back}</p>
                        <div style="margin-top:auto">
                          <i class="fa-solid ${c.icon}" style="font-size:1.8rem;color:${c.color};opacity:0.2"></i>
                        </div>
                      </div>
                    </div>
                  </div>`).join('')}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== TESTIMONIALS ===== -->
      <section class="landing-section">
        <div class="landing-container">
          <div class="section-header">
            <div class="section-tag">Testimonials</div>
            <h2>What Our Patients Say</h2>
          </div>
          <div class="testimonials-grid">
            ${[
              { name:'Ayesha Khan', role:'Patient, Lahore', text:'MediCare Pro made it so easy to find a cardiologist and book an appointment the same day. The doctor was amazing!', rating:5, initial:'AK', color:'#8b5cf6' },
              { name:'Muhammad Bilal', role:'Patient, Karachi', text:'I love how I can track all my appointments and get reminders. The interface is clean and very easy to use.', rating:5, initial:'MB', color:'#2563eb' },
              { name:'Sana Mirza', role:'Patient, Islamabad', text:'My children\'s pediatrician appointments are so organized now. Lab reports come directly to the app. Absolutely brilliant!', rating:5, initial:'SM', color:'#10b981' },
            ].map(t => `
              <div class="testimonial-card">
                <div style="display:flex;gap:4px;color:#f59e0b;margin-bottom:12px;font-size:0.9rem">${'★'.repeat(t.rating)}</div>
                <p style="font-size:0.9rem;line-height:1.7;color:var(--text-secondary);margin-bottom:16px">"${t.text}"</p>
                <div style="display:flex;align-items:center;gap:10px">
                  <div class="avatar avatar-sm" style="background:${t.color}">${t.initial}</div>
                  <div>
                    <div style="font-size:0.875rem;font-weight:600;color:var(--text-white)">${t.name}</div>
                    <div style="font-size:0.75rem;color:var(--text-muted)">${t.role}</div>
                  </div>
                </div>
              </div>`).join('')}
          </div>
        </div>
      </section>

      <!-- ===== CTA ===== -->
      <section class="landing-cta">
        <div class="landing-container" style="text-align:center">
          <div class="cta-box">
            <div class="cta-glow"></div>
            <canvas id="molecule-canvas" class="cta-3d-bg"></canvas>
            <h2 style="font-size:2.2rem;margin-bottom:12px;position:relative;z-index:1">Ready to Take Control<br>of Your Health?</h2>
            <p style="color:rgba(255,255,255,0.75);max-width:480px;margin:0 auto 28px;position:relative;z-index:1">Join thousands of patients who trust MediCare Pro for their healthcare needs.</p>
            <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;position:relative;z-index:1">
              <button class="btn btn-lg" style="background:white;color:var(--primary);font-weight:700" onclick="State.set({currentPage:'login'});renderApp()">
                <i class="fa-solid fa-user-plus"></i> Create Free Account
              </button>
              <button class="btn btn-secondary btn-lg" style="border-color:rgba(255,255,255,0.3);color:white" onclick="smoothScroll('contact')">
                <i class="fa-solid fa-phone"></i> Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== CONTACT ===== -->
      <section class="landing-section landing-section-alt" id="contact">
        <div class="landing-container">
          <div class="section-header">
            <div class="section-tag">Contact Us</div>
            <h2>Get In Touch</h2>
            <p>Have questions? Our team is here to help you 24/7.</p>
          </div>
          <div class="contact-grid">
            <div style="display:flex;flex-direction:column;gap:14px">
              ${[
                { icon:'fa-phone', color:'#10b981', title:'Emergency Helpline', value:'+92 21 111 MEDICARE' },
                { icon:'fa-envelope', color:'#3b82f6', title:'Email Us', value:'info@medicarepro.pk' },
                { icon:'fa-location-dot', color:'#f59e0b', title:'Head Office', value:'Blue Area, Islamabad, Pakistan' },
                { icon:'fa-clock', color:'#8b5cf6', title:'Working Hours', value:'Mon-Sat: 8AM – 10PM (Emergency 24/7)' },
              ].map(c => `
                <div style="display:flex;gap:14px;align-items:flex-start;padding:16px;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg)">
                  <div style="width:42px;height:42px;border-radius:10px;background:rgba(${hexToRgb(c.color)},0.12);display:flex;align-items:center;justify-content:center;flex-shrink:0">
                    <i class="fa-solid ${c.icon}" style="color:${c.color}"></i>
                  </div>
                  <div>
                    <div style="font-size:0.78rem;color:var(--text-muted);margin-bottom:3px">${c.title}</div>
                    <div style="font-size:0.9rem;font-weight:500;color:var(--text-white)">${c.value}</div>
                  </div>
                </div>`).join('')}
            </div>
            <div class="card">
              <h4 style="margin-bottom:16px">Send Us a Message</h4>
              <div class="form-group">
                <label class="form-label">Your Name</label>
                <input type="text" class="form-control" placeholder="Full name" />
              </div>
              <div class="form-group">
                <label class="form-label">Email Address</label>
                <input type="email" class="form-control" placeholder="you@example.com" />
              </div>
              <div class="form-group">
                <label class="form-label">Message</label>
                <textarea class="form-control" rows="4" placeholder="How can we help you?" style="resize:vertical"></textarea>
              </div>
              <button class="btn btn-primary w-full" onclick="showToast('Message sent! We will get back to you soon.','success')">
                <i class="fa-solid fa-paper-plane"></i> Send Message
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== FOOTER ===== -->
      <footer class="landing-footer">
        <div class="landing-container">
          <div class="footer-grid">
            <div>
              <div class="landing-logo" style="margin-bottom:12px">
                <div class="logo-icon"><i class="fa-solid fa-heart-pulse"></i></div>
                <div>
                  <div class="logo-name">MediCare Pro</div>
                  <div class="logo-sub">Hospital Management</div>
                </div>
              </div>
              <p style="font-size:0.82rem;max-width:220px;margin-bottom:14px">Pakistan's most trusted digital healthcare platform since 2018.</p>
              <div style="display:flex;gap:8px">
                ${['fa-facebook','fa-twitter','fa-instagram','fa-linkedin'].map(icon => `
                  <div style="width:32px;height:32px;background:var(--bg-card2);border:1px solid var(--border);border-radius:8px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:0.8rem;color:var(--text-secondary)" 
                       onmouseenter="this.style.color='var(--accent-light)'" onmouseleave="this.style.color='var(--text-secondary)'">
                    <i class="fa-brands ${icon}"></i>
                  </div>`).join('')}
              </div>
            </div>
            ${[
              { title:'Services', links:['Cardiology','Neurology','Pediatrics','Orthopedics','Dermatology','Lab Tests'] },
              { title:'Company', links:['About Us','Our Doctors','Careers','Blog','Press','Partners'] },
              { title:'Support', links:['Help Center','Patient Guide','Privacy Policy','Terms of Use','Cookie Policy','Sitemap'] },
            ].map(col => `
              <div>
                <div style="font-size:0.8rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-muted);margin-bottom:12px">${col.title}</div>
                <div style="display:flex;flex-direction:column;gap:8px">
                  ${col.links.map(l => `<a href="#" style="font-size:0.83rem;color:var(--text-secondary)" onmouseenter="this.style.color='var(--accent-light)'" onmouseleave="this.style.color='var(--text-secondary)'" onclick="return false">${l}</a>`).join('')}
                </div>
              </div>`).join('')}
          </div>
          <div class="footer-bottom">
            <span style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
              <span>© 2026 MediCare Pro. All rights reserved.</span>
              <span class="badge badge-primary" style="font-size:0.68rem;padding:3px 8px;letter-spacing:0.04em">
                <i class="fa-solid fa-code" style="margin-right:4px"></i>Fully Frontend Website
              </span>
            </span>
            <span style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">
              <span>Made with <i class="fa-solid fa-heart" style="color:#ef4444"></i> by 
                <a href="https://www.linkedin.com/me?trk=p_mwlite_feed-secondary_nav" target="_blank" rel="noopener noreferrer"
                  style="color:var(--accent-light);font-weight:600;display:inline-flex;align-items:center;gap:5px"
                  onmouseenter="this.style.color='var(--teal)'" onmouseleave="this.style.color='var(--accent-light)'">
                  <i class="fa-brands fa-linkedin" style="font-size:0.9rem"></i> Alizaib Sheikh
                </a>
              </span>
              <span style="color:var(--text-muted);font-size:0.8rem">
                Powered by <span style="color:var(--accent-light);font-weight:700;letter-spacing:0.03em">⚡ Techvora</span>
              </span>
            </span>
          </div>
        </div>
      </footer>

    </div>`;
}

// Helpers
function smoothScroll(id) {
  event.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

// ---- Three.js DNA Helix ----
function initDNA() {
  const canvas = document.getElementById('dna-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const wrap = canvas.parentElement;
  const W = wrap.clientWidth || 420;
  const H = wrap.clientHeight || 460;
  canvas.width = W;
  canvas.height = H;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(W, H);
  renderer.setPixelRatio(window.devicePixelRatio || 1);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 1000);
  camera.position.set(0, 0, 22);

  // Ambient + directional light
  scene.add(new THREE.AmbientLight(0x4488ff, 0.6));
  const dirLight = new THREE.DirectionalLight(0x00d4ff, 1.2);
  dirLight.position.set(5, 10, 8);
  scene.add(dirLight);
  const dirLight2 = new THREE.DirectionalLight(0x6644ff, 0.8);
  dirLight2.position.set(-5, -5, 5);
  scene.add(dirLight2);

  const group = new THREE.Group();
  scene.add(group);

  // DNA parameters
  const TURNS = 4;
  const POINTS = 80;
  const RADIUS = 4;
  const HEIGHT = 18;

  const mat1 = new THREE.MeshPhongMaterial({ color: 0x2563eb, shininess: 120, emissive: 0x0a1a4a });
  const mat2 = new THREE.MeshPhongMaterial({ color: 0x0ea5e9, shininess: 120, emissive: 0x041020 });
  const matRung = new THREE.MeshPhongMaterial({ color: 0x10b981, shininess: 80, emissive: 0x021a10, transparent: true, opacity: 0.85 });
  const matRung2 = new THREE.MeshPhongMaterial({ color: 0x8b5cf6, shininess: 80, emissive: 0x0d0520, transparent: true, opacity: 0.85 });
  const sphereGeo = new THREE.SphereGeometry(0.35, 12, 12);

  // Two strands
  for (let i = 0; i < POINTS; i++) {
    const t = i / POINTS;
    const angle = t * TURNS * Math.PI * 2;
    const y = t * HEIGHT - HEIGHT / 2;

    // Strand 1
    const s1 = new THREE.Mesh(sphereGeo, mat1);
    s1.position.set(Math.cos(angle) * RADIUS, y, Math.sin(angle) * RADIUS);
    group.add(s1);

    // Strand 2 (opposite side)
    const s2 = new THREE.Mesh(sphereGeo, mat2);
    s2.position.set(Math.cos(angle + Math.PI) * RADIUS, y, Math.sin(angle + Math.PI) * RADIUS);
    group.add(s2);

    // Rungs (base pairs) every ~5 points
    if (i % 5 === 0) {
      const x1 = Math.cos(angle) * RADIUS;
      const z1 = Math.sin(angle) * RADIUS;
      const x2 = Math.cos(angle + Math.PI) * RADIUS;
      const z2 = Math.sin(angle + Math.PI) * RADIUS;

      const dir = new THREE.Vector3(x2 - x1, 0, z2 - z1);
      const len = dir.length();
      const mid = new THREE.Vector3((x1 + x2) / 2, y, (z1 + z2) / 2);

      const rungGeo = new THREE.CylinderGeometry(0.12, 0.12, len, 8);
      const rung = new THREE.Mesh(rungGeo, i % 2 === 0 ? matRung : matRung2);
      rung.position.copy(mid);
      rung.lookAt(new THREE.Vector3(x2, y, z2));
      rung.rotateX(Math.PI / 2);
      group.add(rung);

      // Small connector spheres on rungs
      const connGeo = new THREE.SphereGeometry(0.2, 8, 8);
      const conn = new THREE.Mesh(connGeo, i % 2 === 0 ? matRung : matRung2);
      conn.position.copy(mid);
      group.add(conn);
    }
  }

  // Particle field background
  const particleGeo = new THREE.BufferGeometry();
  const pCount = 120;
  const pPos = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount * 3; i++) pPos[i] = (Math.random() - 0.5) * 40;
  particleGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const particleMat = new THREE.PointsMaterial({ color: 0x2563eb, size: 0.15, transparent: true, opacity: 0.5 });
  scene.add(new THREE.Points(particleGeo, particleMat));

  let frameId;
  function animate() {
    frameId = requestAnimationFrame(animate);
    group.rotation.y += 0.008;
    group.rotation.x = Math.sin(Date.now() * 0.0003) * 0.15;
    renderer.render(scene, camera);
  }
  animate();

  // Cleanup when navigating away
  canvas._cleanup = () => {
    cancelAnimationFrame(frameId);
    renderer.dispose();
  };
}

// Called after landing page renders
function initLanding3D() {
  // Small delay to let DOM render
  setTimeout(() => {
    initDNA();
    initHeart();
    initMolecule();
  }, 100);
}

// ---- Three.js 3D Heart (Hero Background) ----
function initHeart() {
  const canvas = document.getElementById('heart-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const W = canvas.parentElement.clientWidth || window.innerWidth;
  const H = canvas.parentElement.clientHeight || window.innerHeight;
  canvas.width = W; canvas.height = H;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000);
  camera.position.set(0, 0, 35);

  scene.add(new THREE.AmbientLight(0x112266, 0.8));
  const l1 = new THREE.DirectionalLight(0x2244ff, 0.6);
  l1.position.set(10, 10, 10); scene.add(l1);
  const l2 = new THREE.DirectionalLight(0x0088ff, 0.4);
  l2.position.set(-10, -5, 5); scene.add(l2);

  // Heart shape using parametric heart curve
  const heartShape = new THREE.Shape();
  const scale = 4;
  heartShape.moveTo(0, scale);
  for (let i = 0; i <= 360; i += 3) {
    const a = (i * Math.PI) / 180;
    const x = scale * 16 * Math.pow(Math.sin(a), 3) / 16;
    const y = scale * (13 * Math.cos(a) - 5 * Math.cos(2*a) - 2 * Math.cos(3*a) - Math.cos(4*a)) / 16;
    heartShape.lineTo(x, y);
  }

  const extrudeSettings = { depth: 1.5, bevelEnabled: true, bevelSegments: 6, steps: 2, bevelSize: 0.4, bevelThickness: 0.4 };
  const heartGeo = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
  heartGeo.center();

  const heartMat = new THREE.MeshPhongMaterial({
    color: 0xef4444, emissive: 0x550000, shininess: 100,
    transparent: true, opacity: 0.12, wireframe: false
  });
  const heartWire = new THREE.MeshPhongMaterial({
    color: 0x3b82f6, wireframe: true, transparent: true, opacity: 0.08
  });

  const heart1 = new THREE.Mesh(heartGeo, heartMat);
  const heart2 = new THREE.Mesh(heartGeo, heartWire);
  heart1.scale.set(0.9, 0.9, 0.9);
  heart2.scale.set(0.91, 0.91, 0.91);
  scene.add(heart1); scene.add(heart2);

  // Floating particle ring around heart
  const ringGeo = new THREE.TorusGeometry(10, 0.06, 8, 80);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x2563eb, transparent: true, opacity: 0.2 });
  const ring1 = new THREE.Mesh(ringGeo, ringMat);
  const ring2 = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: 0x0ea5e9, transparent: true, opacity: 0.15 }));
  ring1.rotation.x = 0.5; ring2.rotation.x = 1.2; ring2.rotation.z = 0.8;
  scene.add(ring1); scene.add(ring2);

  // Scattered dots
  const dotGeo = new THREE.BufferGeometry();
  const dotPos = new Float32Array(200 * 3);
  for (let i = 0; i < 200 * 3; i++) dotPos[i] = (Math.random() - 0.5) * 60;
  dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPos, 3));
  scene.add(new THREE.Points(dotGeo, new THREE.PointsMaterial({ color: 0x1e40af, size: 0.12, transparent: true, opacity: 0.35 })));

  let fr;
  function animate() {
    fr = requestAnimationFrame(animate);
    const t = Date.now() * 0.001;
    heart1.rotation.y = t * 0.3;
    heart2.rotation.y = t * 0.3;
    heart1.rotation.x = Math.sin(t * 0.4) * 0.2;
    heart2.rotation.x = Math.sin(t * 0.4) * 0.2;
    // Pulse scale
    const pulse = 1 + Math.sin(t * 1.5) * 0.04;
    heart1.scale.set(0.9 * pulse, 0.9 * pulse, 0.9 * pulse);
    heart2.scale.set(0.91 * pulse, 0.91 * pulse, 0.91 * pulse);
    ring1.rotation.z += 0.004;
    ring2.rotation.y += 0.006;
    renderer.render(scene, camera);
  }
  animate();
  canvas._cleanup = () => { cancelAnimationFrame(fr); renderer.dispose(); };
}

// ---- Three.js Molecule (CTA Background) ----
function initMolecule() {
  const canvas = document.getElementById('molecule-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const wrap = canvas.parentElement;
  const W = wrap.clientWidth || 800;
  const H = wrap.clientHeight || 340;
  canvas.width = W; canvas.height = H;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 1000);
  camera.position.set(0, 0, 28);

  scene.add(new THREE.AmbientLight(0x334499, 1.0));
  const dl = new THREE.DirectionalLight(0x4499ff, 1.5);
  dl.position.set(5, 8, 10); scene.add(dl);

  const group = new THREE.Group();
  scene.add(group);

  // Atom colors and positions — caffeine-like molecule
  const atoms = [
    { pos: [0, 0, 0],       color: 0x3b82f6, r: 0.9, label: 'C' },
    { pos: [2.2, 0.8, 0],   color: 0xef4444, r: 0.75, label: 'O' },
    { pos: [-2.2, 0.8, 0],  color: 0x10b981, r: 0.75, label: 'N' },
    { pos: [0, -2.2, 0],    color: 0xf59e0b, r: 0.7,  label: 'H' },
    { pos: [2.2, -1.5, 1],  color: 0x8b5cf6, r: 0.75, label: 'C' },
    { pos: [-2.2, -1.5, 1], color: 0x0ea5e9, r: 0.7,  label: 'N' },
    { pos: [0, 2.5, 1],     color: 0xef4444, r: 0.75, label: 'O' },
    { pos: [3.5, 2, -0.5],  color: 0x3b82f6, r: 0.65, label: 'C' },
    { pos: [-3.5, 2, -0.5], color: 0x10b981, r: 0.65, label: 'N' },
    { pos: [0, -3.8, -0.5], color: 0xf59e0b, r: 0.6,  label: 'H' },
    { pos: [1.2, 1.5, 2],   color: 0x8b5cf6, r: 0.55, label: 'C' },
    { pos: [-1.2, 1.5, 2],  color: 0xef4444, r: 0.55, label: 'O' },
  ];

  const sphereGeo = new THREE.SphereGeometry(1, 20, 20);
  const atomMeshes = atoms.map(a => {
    const mat = new THREE.MeshPhongMaterial({ color: a.color, shininess: 140, emissive: new THREE.Color(a.color).multiplyScalar(0.2) });
    const mesh = new THREE.Mesh(sphereGeo, mat);
    mesh.scale.setScalar(a.r);
    mesh.position.set(...a.pos);
    group.add(mesh);
    return mesh;
  });

  // Bonds between atoms
  const bonds = [[0,1],[0,2],[0,3],[0,4],[0,5],[1,7],[2,8],[3,9],[4,5],[4,10],[5,11],[6,10],[6,2],[7,8]];
  bonds.forEach(([i, j]) => {
    if (i >= atoms.length || j >= atoms.length) return;
    const a = new THREE.Vector3(...atoms[i].pos);
    const b = new THREE.Vector3(...atoms[j].pos);
    const dir = new THREE.Vector3().subVectors(b, a);
    const len = dir.length();
    const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);

    const bondGeo = new THREE.CylinderGeometry(0.1, 0.1, len, 8);
    const bondMat = new THREE.MeshPhongMaterial({ color: 0x334466, transparent: true, opacity: 0.7, shininess: 60 });
    const bond = new THREE.Mesh(bondGeo, bondMat);
    bond.position.copy(mid);
    bond.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
    group.add(bond);
  });

  // Orbit rings around molecule
  [8, 12, 16].forEach((r, i) => {
    const torusGeo = new THREE.TorusGeometry(r, 0.05, 6, 60);
    const torusMat = new THREE.MeshBasicMaterial({ color: [0x1e3a8a, 0x0e4a6e, 0x1a2a5e][i], transparent: true, opacity: 0.18 });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.rotation.x = [0.5, 1.0, 1.5][i];
    torus.rotation.z = [0.3, 0.8, 0.2][i];
    group.add(torus);
  });

  // Particle cloud
  const pGeo = new THREE.BufferGeometry();
  const pArr = new Float32Array(150 * 3);
  for (let i = 0; i < 150 * 3; i++) pArr[i] = (Math.random() - 0.5) * 35;
  pGeo.setAttribute('position', new THREE.BufferAttribute(pArr, 3));
  scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0x2255aa, size: 0.1, transparent: true, opacity: 0.4 })));

  let fr2;
  function animate() {
    fr2 = requestAnimationFrame(animate);
    const t = Date.now() * 0.001;
    group.rotation.y = t * 0.25;
    group.rotation.x = Math.sin(t * 0.3) * 0.2;
    group.rotation.z = Math.cos(t * 0.2) * 0.1;
    // Pulse atoms
    atomMeshes.forEach((m, i) => {
      const pulse = 1 + Math.sin(t * 2 + i * 0.7) * 0.06;
      m.scale.setScalar(atoms[i].r * pulse);
    });
    renderer.render(scene, camera);
  }
  animate();
  canvas._cleanup = () => { cancelAnimationFrame(fr2); renderer.dispose(); };
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `${r},${g},${b}`;
}
