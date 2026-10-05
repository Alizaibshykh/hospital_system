// ============================================
// Ambulance Booking Page
// ============================================

function renderAmbulance() {
  return `
    <div class="ambulance-page">

      <!-- ===== NAVBAR ===== -->
      <nav class="landing-nav">
        <div class="landing-nav-inner">
          <div class="landing-logo" style="cursor:pointer" onclick="State.set({currentPage:'landing'});renderApp()">
            <div class="logo-icon"><i class="fa-solid fa-heart-pulse"></i></div>
            <div>
              <div class="logo-name">MediCare Pro</div>
              <div class="logo-sub">Hospital Management</div>
            </div>
          </div>
          <div class="landing-nav-links">
            <a href="#" onclick="State.set({currentPage:'landing'});renderApp();return false">Home</a>
            <a href="#amb-how" onclick="smoothScrollAmb('amb-how')">How It Works</a>
            <a href="#amb-fleet" onclick="smoothScrollAmb('amb-fleet')">Our Fleet</a>
            <a href="#amb-book" onclick="smoothScrollAmb('amb-book')">Book Now</a>
          </div>
          <div style="display:flex;gap:10px;align-items:center">
            <button class="btn btn-secondary btn-sm" onclick="State.set({currentPage:'login'});renderApp()">
              <i class="fa-solid fa-arrow-right-to-bracket"></i> Login
            </button>
            <button class="btn btn-primary btn-sm" style="background:linear-gradient(135deg,#ef4444,#f97316)" onclick="smoothScrollAmb('amb-book')">
              <i class="fa-solid fa-truck-medical"></i> Emergency Booking
            </button>
          </div>
        </div>
      </nav>

      <!-- ===== HERO ===== -->
      <section class="amb-hero">
        <canvas id="amb-canvas" class="amb-hero-canvas"></canvas>
        <div class="amb-hero-overlay"></div>
        <div class="amb-hero-content">
          <div class="amb-sos-badge">
            <span class="amb-pulse-ring"></span>
            <i class="fa-solid fa-siren-on" style="color:#ef4444"></i>
            <span>24/7 Emergency Response</span>
          </div>
          <h1 class="amb-hero-title">
            Fast Ambulance<br>
            <span style="background:linear-gradient(135deg,#ef4444,#f97316);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">Booking Service</span>
          </h1>
          <p class="amb-hero-desc">
            Book a fully equipped ambulance in under 60 seconds. Our fleet of advanced life support vehicles is available across all major cities — 24 hours a day, 7 days a week.
          </p>
          <div class="amb-response-cards">
            ${[
              { icon:'fa-bolt', label:'Avg. Response', value:'8 min', color:'#f59e0b' },
              { icon:'fa-truck-medical', label:'Fleet Size', value:'150+', color:'#ef4444' },
              { icon:'fa-city', label:'Cities Covered', value:'12', color:'#3b82f6' },
              { icon:'fa-star', label:'Rating', value:'4.9★', color:'#10b981' },
            ].map(s => `
              <div class="amb-response-card">
                <i class="fa-solid ${s.icon}" style="color:${s.color};font-size:1.2rem"></i>
                <div class="amb-response-val">${s.value}</div>
                <div class="amb-response-label">${s.label}</div>
              </div>`).join('')}
          </div>
          <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:28px">
            <button class="btn btn-lg" style="background:linear-gradient(135deg,#ef4444,#f97316);color:white;box-shadow:0 4px 20px rgba(239,68,68,0.5)" onclick="smoothScrollAmb('amb-book')">
              <i class="fa-solid fa-truck-medical"></i> Book Ambulance Now
            </button>
            <a href="tel:+921111111111" class="btn btn-secondary btn-lg">
              <i class="fa-solid fa-phone"></i> Call Emergency: 1122
            </a>
          </div>
        </div>
      </section>

      <!-- ===== HOW IT WORKS ===== -->
      <section class="landing-section" id="amb-how">
        <div class="landing-container">
          <div class="section-header">
            <div class="section-tag" style="background:rgba(239,68,68,0.1);border-color:rgba(239,68,68,0.3);color:#ef4444">How It Works</div>
            <h2>Get Help in 3 Simple Steps</h2>
            <p>From booking to arrival — the fastest emergency response in Pakistan.</p>
          </div>
          <div class="amb-steps">
            ${[
              { step:'01', icon:'fa-location-crosshairs', title:'Share Location', desc:'Enter your address or allow GPS to auto-detect your location for fastest dispatch.', color:'#ef4444' },
              { step:'02', icon:'fa-truck-medical', title:'Ambulance Dispatched', desc:'Nearest available ambulance is immediately dispatched to your location.', color:'#f97316' },
              { step:'03', icon:'fa-user-nurse', title:'Medical Help Arrives', desc:'Trained paramedics arrive with full ALS equipment ready to provide care.', color:'#10b981' },
            ].map((s, i) => `
              <div class="amb-step-card">
                <div class="amb-step-num" style="color:${s.color}">${s.step}</div>
                <div class="amb-step-icon" style="background:rgba(${s.color==='#ef4444'?'239,68,68':s.color==='#f97316'?'249,115,22':'16,185,129'},0.12);color:${s.color}">
                  <i class="fa-solid ${s.icon}"></i>
                </div>
                <h4>${s.title}</h4>
                <p>${s.desc}</p>
                ${i < 2 ? `<div class="amb-step-arrow"><i class="fa-solid fa-arrow-right" style="color:${s.color};opacity:0.4"></i></div>` : ''}
              </div>`).join('')}
          </div>
        </div>
      </section>

      <!-- ===== 3D AMBULANCE SHOWCASE ===== -->
      <section class="landing-section" id="amb-3d-section">
        <div class="landing-container">
          <div class="section-header">
            <div class="section-tag" style="background:rgba(239,68,68,0.1);border-color:rgba(239,68,68,0.3);color:#ef4444">Our Fleet</div>
            <h2>Interactive Ambulance Showcase</h2>
            <p>Our Advanced Life Support ambulance — fully equipped, always ready.</p>
          </div>
          <div class="amb-showcase-layout">
            <!-- Showcase left panel -->
            <div class="amb-showcase-canvas-box">
              <div class="amb-showcase-img-wrap">

                <!-- Siren lights bar -->
                <div class="amb-showcase-siren">
                  <span class="amb-siren-r"></span>
                  <span class="amb-siren-b"></span>
                  <span class="amb-siren-r"></span>
                  <span class="amb-siren-b"></span>
                </div>

                <!-- Main ambulance image -->
                <img src="../img/Advanced Life Support.webp" alt="ALS Ambulance"
                  class="amb-showcase-photo"
                  onerror="this.style.display='none';document.getElementById('amb-main-fallback').style.display='flex'" />
                <div id="amb-main-fallback" style="display:none;width:100%;height:100%;align-items:center;justify-content:center;font-size:5rem;color:#ef4444">
                  <i class="fa-solid fa-truck-medical"></i>
                </div>

                <!-- CSS 3D rotating cube model overlay -->
                <div class="amb-css3d-scene">
                  <div class="amb-css3d-cube">
                    <div class="amb-cube-face amb-cube-front">
                      <i class="fa-solid fa-truck-medical"></i>
                    </div>
                    <div class="amb-cube-face amb-cube-back">
                      <i class="fa-solid fa-heart-pulse"></i>
                    </div>
                    <div class="amb-cube-face amb-cube-right">
                      <i class="fa-solid fa-syringe"></i>
                    </div>
                    <div class="amb-cube-face amb-cube-left">
                      <i class="fa-solid fa-lungs"></i>
                    </div>
                    <div class="amb-cube-face amb-cube-top">
                      <i class="fa-solid fa-bolt"></i>
                    </div>
                    <div class="amb-cube-face amb-cube-bottom">
                      <i class="fa-solid fa-plus"></i>
                    </div>
                  </div>
                </div>

                <!-- Orbiting ring -->
                <div class="amb-orbit-ring"></div>
                <div class="amb-orbit-ring amb-orbit-ring-2"></div>

                <!-- Animated scan overlay -->
                <div class="amb-scan-overlay"></div>

                <!-- HUD corners -->
                <div class="amb-hud amb-hud-tl">
                  <span class="amb-hud-dot"></span><span>UNIT-07</span>
                </div>
                <div class="amb-hud amb-hud-tr">
                  <span>ALS</span><span class="amb-hud-dot" style="background:#ef4444"></span>
                </div>
                <div class="amb-hud amb-hud-bl">
                  <i class="fa-solid fa-location-dot" style="color:#10b981;font-size:0.7rem"></i>
                  <span>GPS ACTIVE</span>
                </div>
                <div class="amb-hud amb-hud-br">
                  <span>ETA 8 MIN</span>
                  <i class="fa-solid fa-bolt" style="color:#f59e0b;font-size:0.7rem"></i>
                </div>

                <!-- Live vitals strip -->
                <div class="amb-vitals-strip">
                  <div class="amb-vital-item">
                    <span class="amb-vital-icon" style="color:#ef4444"><i class="fa-solid fa-heart-pulse"></i></span>
                    <span class="amb-vital-val" id="vital-hr">72</span>
                    <span class="amb-vital-label">BPM</span>
                  </div>
                  <div class="amb-vital-sep"></div>
                  <div class="amb-vital-item">
                    <span class="amb-vital-icon" style="color:#3b82f6"><i class="fa-solid fa-lungs"></i></span>
                    <span class="amb-vital-val" id="vital-spo2">98</span>
                    <span class="amb-vital-label">SpO₂%</span>
                  </div>
                  <div class="amb-vital-sep"></div>
                  <div class="amb-vital-item">
                    <span class="amb-vital-icon" style="color:#10b981"><i class="fa-solid fa-temperature-half"></i></span>
                    <span class="amb-vital-val" id="vital-temp">36.8</span>
                    <span class="amb-vital-label">°C</span>
                  </div>
                  <div class="amb-vital-sep"></div>
                  <div class="amb-vital-item">
                    <span class="amb-vital-icon" style="color:#f59e0b"><i class="fa-solid fa-gauge-high"></i></span>
                    <span class="amb-vital-val" id="vital-bp">120/80</span>
                    <span class="amb-vital-label">mmHg</span>
                  </div>
                </div>

              </div>
              <div class="amb-3d-label" style="position:absolute;bottom:0;left:0;right:0;z-index:2">
                <span class="amb-pulse-dot"></span>
                <span>ALS Ambulance — Live Preview &nbsp;|&nbsp; Siren Lights Active</span>
              </div>
            </div>
            <!-- Info Panel -->
            <div class="amb-showcase-info">

              <!-- Header -->
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:6px">
                <div style="width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,#ef4444,#f97316);display:flex;align-items:center;justify-content:center;font-size:1.2rem;color:white;box-shadow:0 4px 16px rgba(239,68,68,0.5);flex-shrink:0">
                  <i class="fa-solid fa-van-shuttle"></i>
                </div>
                <div>
                  <h3 style="margin:0;font-size:1.15rem">Advanced Life Support (ALS)</h3>
                  <div style="display:flex;align-items:center;gap:6px;margin-top:3px">
                    <span style="width:7px;height:7px;border-radius:50%;background:#10b981;display:inline-block;animation:pulse 1.2s ease infinite"></span>
                    <span style="font-size:0.72rem;color:#10b981;font-weight:600">UNIT AVAILABLE — 3 NEARBY</span>
                  </div>
                </div>
              </div>
              <p style="margin-bottom:16px;font-size:0.85rem">The most advanced emergency vehicle in our fleet, equipped with full ICU-level equipment and a doctor onboard.</p>

              <!-- ECG Canvas -->
              <div class="amb-ecg-wrap">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
                  <span style="font-size:0.7rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em"><i class="fa-solid fa-heart-pulse" style="color:#ef4444;margin-right:4px"></i>Live ECG Monitor</span>
                  <span style="font-size:0.7rem;color:#10b981;font-weight:600">● RECORDING</span>
                </div>
                <canvas id="ecg-canvas" class="amb-ecg-canvas"></canvas>
              </div>

              <!-- Equipment with progress bars -->
              <div style="margin-bottom:16px">
                <div style="font-size:0.72rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px"><i class="fa-solid fa-box-open" style="margin-right:4px"></i>Equipment Status</div>
                ${[
                  { icon:'fa-heart-pulse', color:'#ef4444', label:'Cardiac Monitor', pct:100 },
                  { icon:'fa-lungs',       color:'#3b82f6', label:'Ventilator',       pct:100 },
                  { icon:'fa-syringe',     color:'#10b981', label:'IV Medications',   pct:87  },
                  { icon:'fa-bolt',        color:'#f59e0b', label:'Defibrillator',    pct:100 },
                  { icon:'fa-user-nurse',  color:'#8b5cf6', label:'Doctor Onboard',   pct:100 },
                  { icon:'fa-location-arrow', color:'#0ea5e9', label:'GPS Tracked',   pct:100 },
                ].map(f => `
                  <div style="display:flex;align-items:center;gap:10px;padding:7px 10px;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);margin-bottom:5px;transition:var(--transition)"
                    onmouseenter="this.style.borderColor='rgba(239,68,68,0.3)'" onmouseleave="this.style.borderColor='var(--border)'">
                    <div style="width:30px;height:30px;border-radius:7px;background:rgba(${f.color==='#ef4444'?'239,68,68':f.color==='#3b82f6'?'59,130,246':f.color==='#10b981'?'16,185,129':f.color==='#f59e0b'?'245,158,11':f.color==='#8b5cf6'?'139,92,246':'14,165,233'},0.12);display:flex;align-items:center;justify-content:center;flex-shrink:0">
                      <i class="fa-solid ${f.icon}" style="color:${f.color};font-size:0.78rem"></i>
                    </div>
                    <div style="flex:1;min-width:0">
                      <div style="display:flex;justify-content:space-between;margin-bottom:3px">
                        <span style="font-size:0.8rem;font-weight:600;color:var(--text-white)">${f.label}</span>
                        <span style="font-size:0.7rem;color:${f.pct===100?'#10b981':'#f59e0b'};font-weight:600">${f.pct}%</span>
                      </div>
                      <div style="height:3px;background:rgba(255,255,255,0.06);border-radius:2px;overflow:hidden">
                        <div class="amb-eq-bar" style="height:100%;width:${f.pct}%;background:${f.pct===100?'linear-gradient(90deg,'+f.color+',#10b981)':'linear-gradient(90deg,#f59e0b,#ef4444)'};border-radius:2px"></div>
                      </div>
                    </div>
                  </div>`).join('')}
              </div>

              <!-- Dispatch stats row -->
              <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:16px">
                ${[
                  { val:'~8', unit:'min', label:'Avg Response', color:'#ef4444', icon:'fa-bolt' },
                  { val:'24/7', unit:'', label:'Availability', color:'#10b981', icon:'fa-clock' },
                  { val:'4.9', unit:'★', label:'Rating', color:'#f59e0b', icon:'fa-star' },
                ].map(s => `
                  <div style="background:var(--bg-card2);border:1px solid var(--border);border-radius:var(--radius);padding:10px;text-align:center">
                    <i class="fa-solid ${s.icon}" style="color:${s.color};font-size:0.8rem;margin-bottom:4px;display:block"></i>
                    <div style="font-size:1.1rem;font-weight:800;color:#fff">${s.val}<span style="font-size:0.7rem;color:${s.color}">${s.unit}</span></div>
                    <div style="font-size:0.65rem;color:var(--text-muted)">${s.label}</div>
                  </div>`).join('')}
              </div>

              <button class="btn btn-lg w-full" style="background:linear-gradient(135deg,#ef4444,#f97316);color:white;box-shadow:0 4px 20px rgba(239,68,68,0.4)" onclick="smoothScrollAmb('amb-book')">
                <i class="fa-solid fa-truck-medical"></i> Book This Ambulance
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== FLEET ===== -->
      <section class="landing-section landing-section-alt" id="amb-fleet">
        <div class="landing-container">
          <div class="section-header">
            <div class="section-tag" style="background:rgba(239,68,68,0.1);border-color:rgba(239,68,68,0.3);color:#ef4444">Our Fleet</div>
            <h2>State-of-the-Art<br>Medical Vehicles</h2>
            <p>Every ambulance is fully equipped with the latest life-saving equipment and staffed by certified paramedics.</p>
          </div>

          <div class="amb-fleet-4col">

            <!-- BLS Ambulance -->
            <div class="amb-fleet-item">
              <div class="amb-card-3d" onclick="this.classList.toggle('flipped')">
                <div class="amb-card-front" style="--accent:#3b82f6;--glow:rgba(59,130,246,0.5)">
                  <div class="amb-card-img-wrap">
                    <img src="../img/Basic Life Support.avif" alt="BLS Ambulance" class="amb-card-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/>
                    <div class="amb-card-img-fallback" style="display:none"><i class="fa-solid fa-truck-medical" style="font-size:4rem;color:#3b82f6"></i></div>
                    <div class="amb-card-overlay"></div>
                  </div>
                  <div class="amb-card-siren">
                    <span class="amb-siren-r"></span>
                    <span class="amb-siren-b" style="background:#3b82f6"></span>
                  </div>
                  <div class="amb-card-badge" style="background:rgba(59,130,246,0.15);border-color:rgba(59,130,246,0.4);color:#3b82f6">BLS</div>
                  <div class="amb-card-front-info">
                    <div class="amb-card-title">Basic Life Support</div>
                    <div class="amb-card-hint"><i class="fa-solid fa-rotate"></i> Tap to flip</div>
                  </div>
                </div>
                <div class="amb-card-back" style="--accent:#3b82f6;--glow:rgba(59,130,246,0.4)">
                  <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
                    <div style="width:40px;height:40px;border-radius:10px;background:rgba(59,130,246,0.15);display:flex;align-items:center;justify-content:center;color:#3b82f6;font-size:1.2rem"><i class="fa-solid fa-truck-medical"></i></div>
                    <div>
                      <div style="font-weight:700;color:#fff;font-size:0.95rem">Basic Life Support</div>
                      <div style="font-size:0.72rem;color:#3b82f6"><i class="fa-solid fa-clock"></i> ETA: 10-12 min</div>
                    </div>
                  </div>
                  <p style="font-size:0.8rem;color:var(--text-secondary);margin-bottom:12px">Oxygen, first aid, stretcher, and trained EMT for stable patient transport.</p>
                  <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:14px">
                    ${['Oxygen','Stretcher','AED','First Aid'].map(f=>`<span style="font-size:0.65rem;padding:3px 9px;background:rgba(59,130,246,0.12);border:1px solid rgba(59,130,246,0.3);border-radius:20px;color:#3b82f6">${f}</span>`).join('')}
                  </div>
                  <button class="btn btn-sm w-full" style="background:rgba(59,130,246,0.2);border:1px solid rgba(59,130,246,0.5);color:#3b82f6" onclick="event.stopPropagation();smoothScrollAmb('amb-book')">Book BLS</button>
                </div>
              </div>
            </div>

            <!-- ALS Ambulance -->
            <div class="amb-fleet-item">
              <div class="amb-card-3d" onclick="this.classList.toggle('flipped')">
                <div class="amb-card-front" style="--accent:#ef4444;--glow:rgba(239,68,68,0.6)">
                  <div class="amb-card-img-wrap">
                    <img src="../img/Advanced Life Support.webp" alt="ALS Ambulance" class="amb-card-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/>
                    <div class="amb-card-img-fallback" style="display:none"><i class="fa-solid fa-van-shuttle" style="font-size:4rem;color:#ef4444"></i></div>
                    <div class="amb-card-overlay"></div>
                  </div>
                  <div class="amb-card-siren">
                    <span class="amb-siren-r"></span>
                    <span class="amb-siren-b"></span>
                  </div>
                  <div class="amb-card-badge" style="background:rgba(239,68,68,0.15);border-color:rgba(239,68,68,0.5);color:#ef4444">ALS</div>
                  <div class="amb-card-front-info">
                    <div class="amb-card-title">Advanced Life Support</div>
                    <div class="amb-card-hint"><i class="fa-solid fa-rotate"></i> Tap to flip</div>
                  </div>
                </div>
                <div class="amb-card-back" style="--accent:#ef4444;--glow:rgba(239,68,68,0.4)">
                  <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
                    <div style="width:40px;height:40px;border-radius:10px;background:rgba(239,68,68,0.15);display:flex;align-items:center;justify-content:center;color:#ef4444;font-size:1.2rem"><i class="fa-solid fa-van-shuttle"></i></div>
                    <div>
                      <div style="font-weight:700;color:#fff;font-size:0.95rem">Advanced Life Support</div>
                      <div style="font-size:0.72rem;color:#ef4444"><i class="fa-solid fa-clock"></i> ETA: 8-10 min</div>
                    </div>
                  </div>
                  <p style="font-size:0.8rem;color:var(--text-secondary);margin-bottom:12px">Full ICU-level care on wheels with doctor onboard for critical patients.</p>
                  <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:14px">
                    ${['Ventilator','IV Meds','Monitor','Doctor'].map(f=>`<span style="font-size:0.65rem;padding:3px 9px;background:rgba(239,68,68,0.12);border:1px solid rgba(239,68,68,0.3);border-radius:20px;color:#ef4444">${f}</span>`).join('')}
                  </div>
                  <button class="btn btn-sm w-full" style="background:linear-gradient(135deg,#ef4444,#f97316);color:white;box-shadow:0 3px 12px rgba(239,68,68,0.4)" onclick="event.stopPropagation();smoothScrollAmb('amb-book')">Book ALS</button>
                </div>
              </div>
            </div>

            <!-- Neonatal Ambulance -->
            <div class="amb-fleet-item">
              <div class="amb-card-3d" onclick="this.classList.toggle('flipped')">
                <div class="amb-card-front" style="--accent:#10b981;--glow:rgba(16,185,129,0.5)">
                  <div class="amb-card-img-wrap">
                    <img src="../img/Neonatal Ambulance.avif" alt="Neonatal Ambulance" class="amb-card-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/>
                    <div class="amb-card-img-fallback" style="display:none"><i class="fa-solid fa-baby" style="font-size:4rem;color:#10b981"></i></div>
                    <div class="amb-card-overlay"></div>
                  </div>
                  <div class="amb-card-siren">
                    <span class="amb-siren-r"></span>
                    <span class="amb-siren-b" style="background:#10b981"></span>
                  </div>
                  <div class="amb-card-badge" style="background:rgba(16,185,129,0.15);border-color:rgba(16,185,129,0.4);color:#10b981">NEO</div>
                  <div class="amb-card-front-info">
                    <div class="amb-card-title">Neonatal Ambulance</div>
                    <div class="amb-card-hint"><i class="fa-solid fa-rotate"></i> Tap to flip</div>
                  </div>
                </div>
                <div class="amb-card-back" style="--accent:#10b981;--glow:rgba(16,185,129,0.4)">
                  <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
                    <div style="width:40px;height:40px;border-radius:10px;background:rgba(16,185,129,0.15);display:flex;align-items:center;justify-content:center;color:#10b981;font-size:1.2rem"><i class="fa-solid fa-baby"></i></div>
                    <div>
                      <div style="font-weight:700;color:#fff;font-size:0.95rem">Neonatal Ambulance</div>
                      <div style="font-size:0.72rem;color:#10b981"><i class="fa-solid fa-clock"></i> ETA: 12-15 min</div>
                    </div>
                  </div>
                  <p style="font-size:0.8rem;color:var(--text-secondary);margin-bottom:12px">Specialized incubator ambulance for newborn and premature baby transfers.</p>
                  <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:14px">
                    ${['Incubator','CPAP','Neo Nurse','Temp Control'].map(f=>`<span style="font-size:0.65rem;padding:3px 9px;background:rgba(16,185,129,0.12);border:1px solid rgba(16,185,129,0.3);border-radius:20px;color:#10b981">${f}</span>`).join('')}
                  </div>
                  <button class="btn btn-sm w-full" style="background:rgba(16,185,129,0.2);border:1px solid rgba(16,185,129,0.5);color:#10b981" onclick="event.stopPropagation();smoothScrollAmb('amb-book')">Book Neonatal</button>
                </div>
              </div>
            </div>

            <!-- ICU Mobile Unit -->
            <div class="amb-fleet-item">
              <div class="amb-card-3d" onclick="this.classList.toggle('flipped')">
                <div class="amb-card-front" style="--accent:#8b5cf6;--glow:rgba(139,92,246,0.5)">
                  <div class="amb-card-img-wrap">
                    <img src="../img/ICU Mobile Unit.avif" alt="ICU Mobile Unit" class="amb-card-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/>
                    <div class="amb-card-img-fallback" style="display:none"><i class="fa-solid fa-hospital-user" style="font-size:4rem;color:#8b5cf6"></i></div>
                    <div class="amb-card-overlay"></div>
                  </div>
                  <div class="amb-card-siren">
                    <span class="amb-siren-r"></span>
                    <span class="amb-siren-b" style="background:#8b5cf6"></span>
                  </div>
                  <div class="amb-card-badge" style="background:rgba(139,92,246,0.15);border-color:rgba(139,92,246,0.4);color:#8b5cf6">ICU</div>
                  <div class="amb-card-front-info">
                    <div class="amb-card-title">ICU Mobile Unit</div>
                    <div class="amb-card-hint"><i class="fa-solid fa-rotate"></i> Tap to flip</div>
                  </div>
                </div>
                <div class="amb-card-back" style="--accent:#8b5cf6;--glow:rgba(139,92,246,0.4)">
                  <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
                    <div style="width:40px;height:40px;border-radius:10px;background:rgba(139,92,246,0.15);display:flex;align-items:center;justify-content:center;color:#8b5cf6;font-size:1.2rem"><i class="fa-solid fa-hospital-user"></i></div>
                    <div>
                      <div style="font-weight:700;color:#fff;font-size:0.95rem">ICU Mobile Unit</div>
                      <div style="font-size:0.72rem;color:#8b5cf6"><i class="fa-solid fa-clock"></i> ETA: 15-20 min</div>
                    </div>
                  </div>
                  <p style="font-size:0.8rem;color:var(--text-secondary);margin-bottom:12px">Full mobile ICU for critical inter-hospital transfers with specialist team onboard.</p>
                  <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:14px">
                    ${['ICU Specialist','Life Support','Multi-Monitor','Blood Bank'].map(f=>`<span style="font-size:0.65rem;padding:3px 9px;background:rgba(139,92,246,0.12);border:1px solid rgba(139,92,246,0.3);border-radius:20px;color:#8b5cf6">${f}</span>`).join('')}
                  </div>
                  <button class="btn btn-sm w-full" style="background:rgba(139,92,246,0.2);border:1px solid rgba(139,92,246,0.5);color:#8b5cf6" onclick="event.stopPropagation();smoothScrollAmb('amb-book')">Book ICU Unit</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- ===== BOOKING FORM ===== -->
      <section class="landing-section" id="amb-book">
        <div class="landing-container">
          <div class="section-header">
            <div class="section-tag" style="background:rgba(239,68,68,0.1);border-color:rgba(239,68,68,0.3);color:#ef4444">Book Now</div>
            <h2>Book Your Ambulance</h2>
            <p>Fill in the details below and we'll dispatch the nearest unit immediately.</p>
          </div>

          <div class="amb-booking-layout">
            <div class="amb-booking-form card">
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px;padding:14px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2);border-radius:var(--radius)">
                <i class="fa-solid fa-triangle-exclamation" style="color:#f59e0b;font-size:1.2rem"></i>
                <div>
                  <div style="font-size:0.85rem;font-weight:600;color:var(--text-white)">For Life-Threatening Emergencies</div>
                  <div style="font-size:0.78rem;color:var(--text-secondary)">Please call <strong style="color:#ef4444">1122</strong> immediately for fastest response</div>
                </div>
              </div>

              <div class="grid-2" style="gap:14px">
                <div class="form-group" style="margin:0">
                  <label class="form-label">Patient Name</label>
                  <div class="input-group">
                    <i class="input-icon fa-solid fa-user"></i>
                    <input type="text" class="form-control" id="amb-patient-name" placeholder="Full name" />
                  </div>
                </div>
                <div class="form-group" style="margin:0">
                  <label class="form-label">Contact Number</label>
                  <div class="input-group">
                    <i class="input-icon fa-solid fa-phone"></i>
                    <input type="tel" class="form-control" id="amb-phone" placeholder="+92 300 0000000" />
                  </div>
                </div>
                <div class="form-group" style="margin:0;grid-column:1/-1">
                  <label class="form-label">Pickup Address</label>
                  <div class="input-group">
                    <i class="input-icon fa-solid fa-location-dot"></i>
                    <input type="text" class="form-control" id="amb-address" placeholder="Street address, area, city" />
                  </div>
                </div>
                <div class="form-group" style="margin:0">
                  <label class="form-label">Ambulance Type</label>
                  <select class="form-control" id="amb-type">
                    <option value="bls">Basic Life Support (BLS)</option>
                    <option value="als">Advanced Life Support (ALS)</option>
                    <option value="neo">Neonatal Ambulance</option>
                    <option value="icu">ICU Mobile Unit</option>
                  </select>
                </div>
                <div class="form-group" style="margin:0">
                  <label class="form-label">Emergency Type</label>
                  <select class="form-control" id="amb-emergency">
                    <option>Cardiac Emergency</option>
                    <option>Accident / Trauma</option>
                    <option>Stroke</option>
                    <option>Respiratory Distress</option>
                    <option>Maternity / Childbirth</option>
                    <option>Newborn Transfer</option>
                    <option>Patient Transfer</option>
                    <option>Other</option>
                  </select>
                </div>
                <div class="form-group" style="margin:0;grid-column:1/-1">
                  <label class="form-label">Additional Notes (optional)</label>
                  <textarea class="form-control" id="amb-notes" rows="3" placeholder="Any important medical information, allergies, or special requirements..." style="resize:vertical"></textarea>
                </div>
              </div>

              <div style="display:flex;gap:10px;margin-top:16px;flex-wrap:wrap">
                <button class="btn btn-lg" style="flex:1;background:linear-gradient(135deg,#ef4444,#f97316);color:white;box-shadow:0 4px 20px rgba(239,68,68,0.4)" onclick="submitAmbulanceBooking()">
                  <i class="fa-solid fa-truck-medical"></i> Dispatch Ambulance
                </button>
                <a href="tel:+921122" class="btn btn-secondary btn-lg">
                  <i class="fa-solid fa-phone-volume"></i> Call 1122
                </a>
              </div>
            </div>

            <!-- Right side info -->
            <div style="display:flex;flex-direction:column;gap:14px">
              <!-- Live tracking card -->
              <div class="card" style="border-color:rgba(239,68,68,0.2)">
                <div class="section-title" style="color:#ef4444"><i class="fa-solid fa-location-arrow"></i> Live GPS Tracking</div>
                <div class="amb-map-placeholder">
                  <canvas id="amb-map-canvas"></canvas>
                  <div class="amb-map-overlay">
                    <i class="fa-solid fa-map-location-dot" style="font-size:2.5rem;color:var(--accent-light);opacity:0.4;display:block;margin-bottom:8px"></i>
                    <p style="font-size:0.8rem;color:var(--text-muted)">Book an ambulance to track in real-time</p>
                  </div>
                </div>
              </div>

              <!-- Coverage cities -->
              <div class="card">
                <div class="section-title"><i class="fa-solid fa-city"></i> Coverage Cities</div>
                <div style="display:flex;flex-wrap:wrap;gap:6px">
                  ${['Karachi','Lahore','Islamabad','Rawalpindi','Peshawar','Quetta','Multan','Faisalabad','Sialkot','Gujranwala','Hyderabad','Abbottabad'].map(city =>
                    `<span class="badge badge-primary" style="font-size:0.72rem;padding:4px 10px">${city}</span>`
                  ).join('')}
                </div>
              </div>

              <!-- Emergency numbers -->
              <div class="card" style="border-color:rgba(239,68,68,0.2);background:rgba(239,68,68,0.04)">
                <div class="section-title" style="color:#ef4444"><i class="fa-solid fa-phone-volume"></i> Emergency Numbers</div>
                ${[
                  { label:'Rescue / Ambulance', num:'1122', color:'#ef4444' },
                  { label:'Edhi Foundation', num:'115', color:'#f97316' },
                  { label:'Chippa Welfare', num:'1020', color:'#f59e0b' },
                  { label:'MediCare Emergency', num:'+92 21 111 MEDI', color:'#3b82f6' },
                ].map(e => `
                  <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border)">
                    <span style="font-size:0.85rem;color:var(--text-secondary)">${e.label}</span>
                    <a href="tel:${e.num}" style="font-size:0.95rem;font-weight:700;color:${e.color}">${e.num}</a>
                  </div>`).join('')}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== FOOTER ===== -->
      <footer class="landing-footer">
        <div class="landing-container">
          <div style="text-align:center;padding:20px 0">
            <div class="landing-logo" style="justify-content:center;margin-bottom:10px">
              <div class="logo-icon"><i class="fa-solid fa-heart-pulse"></i></div>
              <div><div class="logo-name">MediCare Pro</div><div class="logo-sub">Hospital Management</div></div>
            </div>
            <p style="font-size:0.82rem;color:var(--text-muted)">© 2026 MediCare Pro. All rights reserved. &nbsp;|&nbsp;
              Made with <i class="fa-solid fa-heart" style="color:#ef4444"></i> by
              <a href="https://www.linkedin.com/me?trk=p_mwlite_feed-secondary_nav" target="_blank" rel="noopener noreferrer"
                style="color:var(--accent-light);font-weight:600">
                <i class="fa-brands fa-linkedin"></i> Alizaib Sheikh
              </a>
            </p>
            <p style="font-size:0.78rem;color:var(--text-muted);margin-top:6px">
              Powered by <span style="color:var(--accent-light);font-weight:700;letter-spacing:0.03em">⚡ Techvora</span>
            </p>
          </div>
        </div>
      </footer>
    </div>`;
}

// ---- Submit Ambulance Booking ----
function submitAmbulanceBooking() {
  const name = document.getElementById('amb-patient-name')?.value?.trim();
  const phone = document.getElementById('amb-phone')?.value?.trim();
  const address = document.getElementById('amb-address')?.value?.trim();

  if (!name || !phone || !address) {
    showToast('Please fill in name, phone, and address.', 'error');
    return;
  }

  const type = document.getElementById('amb-type')?.value;
  const emergency = document.getElementById('amb-emergency')?.value;
  const typeLabel = { bls: 'Basic Life Support', als: 'Advanced Life Support', neo: 'Neonatal', icu: 'ICU Mobile Unit' }[type];

  // Simulate dispatch
  const btn = event.currentTarget;
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Dispatching...';

  setTimeout(() => {
    openModal({
      title: '🚑 Ambulance Dispatched!',
      size: 'modal-sm',
      body: `
        <div style="text-align:center;padding:10px 0">
          <div style="width:72px;height:72px;background:rgba(239,68,68,0.12);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:2rem;color:#ef4444;animation:pulse 1s ease infinite">
            <i class="fa-solid fa-truck-medical"></i>
          </div>
          <h3 style="margin-bottom:6px;color:#ef4444">Help is on the way!</h3>
          <p style="margin-bottom:14px"><strong style="color:var(--text-white)">${typeLabel} Ambulance</strong> has been dispatched to<br><strong style="color:var(--accent-light)">${address}</strong></p>
          <div style="padding:12px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2);border-radius:var(--radius);margin-bottom:12px">
            <div style="font-size:1.8rem;font-weight:900;color:#ef4444">~8 min</div>
            <div style="font-size:0.78rem;color:var(--text-muted)">Estimated Arrival Time</div>
          </div>
          <p style="font-size:0.8rem;color:var(--text-muted)">Booking ID: <strong style="color:var(--text-white)">#AMB-${Date.now().toString().slice(-6)}</strong><br>Driver will call: <strong style="color:var(--accent-light)">${phone}</strong></p>
        </div>`,
      footer: `<button class="btn btn-primary w-full" onclick="closeModal()"><i class="fa-solid fa-check"></i> OK, Got It</button>`
    });
    showToast('Ambulance dispatched! ETA ~8 minutes.', 'success');
  }, 2000);
}

function smoothScrollAmb(id) {
  event.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

// Live vitals animation
function startVitalsAnimation() {
  var hrEl   = document.getElementById('vital-hr');
  var spo2El = document.getElementById('vital-spo2');
  var tempEl = document.getElementById('vital-temp');
  if (!hrEl) return;

  setInterval(function() {
    var hr   = 68 + Math.floor(Math.random() * 18);
    var spo2 = 96 + Math.floor(Math.random() * 4);
    var temp = (36.4 + Math.random() * 0.8).toFixed(1);
    if (hrEl)   hrEl.textContent   = hr;
    if (spo2El) spo2El.textContent = spo2;
    if (tempEl) tempEl.textContent = temp;
  }, 2000);
}

// Animated ECG line on canvas
function startECGAnimation() {
  var canvas = document.getElementById('ecg-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W = canvas.offsetWidth || 340;
  var H = 56;
  canvas.width  = W;
  canvas.height = H;

  var points = [];
  var x = 0;

  // ECG waveform shape pattern
  var ecgPattern = [0,0,0,0,2,12,-4,0,0,6,22,-8,2,0,0,0,0,0,-1,0,0];
  var pi = 0;

  function draw() {
    ctx.fillStyle = 'rgba(13,31,60,0.18)';
    ctx.fillRect(0, 0, W, H);

    // Shift points left
    points.push({ x: x, y: H/2 - ecgPattern[pi % ecgPattern.length] * 1.4 });
    pi++;
    x += 2;
    if (x > W) {
      x = 0;
      points = [];
    }

    // Draw line
    ctx.beginPath();
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth   = 1.5;
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur  = 6;
    for (var i = 1; i < points.length; i++) {
      if (i === 1) ctx.moveTo(points[i-1].x, points[i-1].y);
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Scrolling dot at tip
    if (points.length > 0) {
      var last = points[points.length - 1];
      ctx.beginPath();
      ctx.arc(last.x, last.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#ff4444';
      ctx.shadowColor = '#ff4444';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    requestAnimationFrame(draw);
  }
  draw();
}
// ---- Three.js Ambulance Road Scene (Hero BG) ----
function initAmbulance3D() {
  const canvas = document.getElementById('amb-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  if (canvas._cleanup) { canvas._cleanup(); canvas._cleanup = null; }
  const W = window.innerWidth;
  const H = window.innerHeight;
  canvas.width = W; canvas.height = H;
  canvas.style.width = W + 'px';
  canvas.style.height = H + 'px';

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(W, H);
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

  const scene = new THREE.Scene();
  // Camera positioned on right side so ambulance shows on right, text stays left
  const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 300);
  camera.position.set(12, 4, 14);
  camera.lookAt(6, 1.5, 0);

  // Strong lighting so ambulance is clearly visible
  scene.add(new THREE.AmbientLight(0xffffff, 1.4));
  const key = new THREE.DirectionalLight(0xffffff, 2.0);
  key.position.set(10, 14, 12);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0x8899ff, 1.0);
  fill.position.set(-8, 6, 8);
  scene.add(fill);
  const bottom = new THREE.DirectionalLight(0x224466, 0.5);
  bottom.position.set(0, -5, 0);
  scene.add(bottom);

  const sirenRLight = new THREE.PointLight(0xff0000, 0, 12);
  sirenRLight.position.set(4, 5, 2);
  scene.add(sirenRLight);
  const sirenBLight = new THREE.PointLight(0x0044ff, 4, 12);
  sirenBLight.position.set(8, 5, 2);
  scene.add(sirenBLight);

  // ======= AMBULANCE (bigger, centered right side) =======
  const G = new THREE.Group();
  G.position.set(6, 0, 0); // push to right side of screen
  scene.add(G);

  const white = new THREE.MeshPhongMaterial({ color: 0xf5f5f5, shininess: 90 });
  const lightGrey = new THREE.MeshPhongMaterial({ color: 0xe0e0e0, shininess: 70 });

  // Main rear box (medical compartment)
  const rearBox = new THREE.Mesh(new THREE.BoxGeometry(5.5, 2.6, 3.0), white);
  rearBox.position.set(-0.5, 1.5, 0);
  G.add(rearBox);

  // Cab (front driver box)
  const cabBox = new THREE.Mesh(new THREE.BoxGeometry(2.0, 2.0, 3.0), lightGrey);
  cabBox.position.set(3.1, 1.1, 0);
  G.add(cabBox);

  // Cab roof taper
  const cabRoof = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.6, 3.0), lightGrey);
  cabRoof.position.set(2.6, 2.4, 0);
  cabRoof.rotation.z = -0.22;
  G.add(cabRoof);

  // Windshield
  const wsMat = new THREE.MeshPhongMaterial({ color: 0x6699cc, transparent: true, opacity: 0.5, shininess: 200 });
  const windshield = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.2, 2.4), wsMat);
  windshield.position.set(4.05, 1.3, 0);
  G.add(windshield);

  // Side windows (body)
  [-1.52, 1.52].forEach(z => {
    const win = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.65, 0.06), wsMat);
    win.position.set(0.0, 2.1, z);
    G.add(win);
  });

  // Red stripes on both sides
  const redStripe = new THREE.MeshPhongMaterial({ color: 0xdd0000, shininess: 50 });
  [-1.52, 1.52].forEach(z => {
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(7.8, 0.38, 0.06), redStripe);
    stripe.position.set(0.2, 1.42, z);
    G.add(stripe);
  });

  // Red medical cross (right side)
  const crossMat = new THREE.MeshPhongMaterial({ color: 0xff0000, emissive: 0x660000 });
  const cV = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.85, 0.07), crossMat);
  const cH = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.18, 0.07), crossMat);
  cV.position.set(-1.5, 1.9, 1.54);
  cH.position.set(-1.5, 1.9, 1.54);
  G.add(cV); G.add(cH);

  // AMBULANCE text stripe (front, mirrored)
  const blueMat = new THREE.MeshPhongMaterial({ color: 0x0033aa });
  const textBar = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.3, 2.0), blueMat);
  textBar.position.set(4.08, 0.9, 0);
  G.add(textBar);

  // Roof top
  const roofTop = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.22, 2.8), new THREE.MeshPhongMaterial({ color: 0xdddddd }));
  roofTop.position.set(-0.2, 2.82, 0);
  G.add(roofTop);

  // Siren light bar
  const sirenBar = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.26, 0.55), new THREE.MeshPhongMaterial({ color: 0x111111 }));
  sirenBar.position.set(-0.2, 3.08, 0);
  G.add(sirenBar);

  // Red lens
  const lensR = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.22, 0.52), new THREE.MeshPhongMaterial({ color: 0xff0000, emissive: 0xbb0000, transparent: true, opacity: 0.95 }));
  lensR.position.set(-0.85, 3.09, 0);
  G.add(lensR);

  // Blue lens
  const lensB = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.22, 0.52), new THREE.MeshPhongMaterial({ color: 0x0000ff, emissive: 0x0000bb, transparent: true, opacity: 0.95 }));
  lensB.position.set(0.65, 3.09, 0);
  G.add(lensB);

  // Front bumper
  const bumperMat = new THREE.MeshPhongMaterial({ color: 0x222222 });
  G.add(Object.assign(new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.38, 3.0), bumperMat), { position: new THREE.Vector3(4.12, 0.28, 0) }));
  G.add(Object.assign(new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.38, 3.0), bumperMat), { position: new THREE.Vector3(-3.3, 0.28, 0) }));

  // Headlights
  const hlMat = new THREE.MeshPhongMaterial({ color: 0xffffaa, emissive: 0x886600 });
  [-0.85, 0.85].forEach(z => {
    const hl = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.36, 0.5), hlMat);
    hl.position.set(4.1, 0.9, z); G.add(hl);
  });

  // Rear door handles
  const doorLine = new THREE.Mesh(new THREE.BoxGeometry(0.06, 2.0, 0.06), new THREE.MeshBasicMaterial({ color: 0x999999 }));
  doorLine.position.set(-3.32, 1.4, 0); G.add(doorLine);

  // Wheels - larger, prominent
  const wGeo = new THREE.CylinderGeometry(0.64, 0.64, 0.42, 24);
  const wMat = new THREE.MeshPhongMaterial({ color: 0x111111, shininess: 15 });
  const hGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.44, 16);
  const hMat = new THREE.MeshPhongMaterial({ color: 0xaaaaaa, shininess: 140 });
  // Spoke geometry
  const spGeo = new THREE.BoxGeometry(0.08, 0.5, 0.45);
  const spMat = new THREE.MeshPhongMaterial({ color: 0x888888 });

  const wheelPos = [[-1.8, 0, 1.6],[-1.8, 0,-1.6],[2.2, 0, 1.6],[2.2, 0,-1.6]];
  const wheels = [];
  wheelPos.forEach(([x, y, z]) => {
    const w = new THREE.Mesh(wGeo, wMat); w.rotation.z = Math.PI/2; w.position.set(x, y+0.64, z); G.add(w);
    const h = new THREE.Mesh(hGeo, hMat); h.rotation.z = Math.PI/2; h.position.set(x, y+0.64, z); G.add(h);
    // 4 spokes
    for (let s = 0; s < 4; s++) {
      const sp = new THREE.Mesh(spGeo, spMat);
      sp.rotation.z = Math.PI/2; sp.rotation.x = (s/4)*Math.PI;
      sp.position.set(x, y+0.64, z); G.add(sp);
    }
    wheels.push(w);
  });

  // ======= ROAD =======
  const road = new THREE.Mesh(new THREE.PlaneGeometry(80, 10), new THREE.MeshPhongMaterial({ color: 0x111828 }));
  road.rotation.x = -Math.PI/2;
  scene.add(road);

  // Road center dashes
  for (let i = -8; i <= 8; i++) {
    const dash = new THREE.Mesh(new THREE.PlaneGeometry(3, 0.14), new THREE.MeshBasicMaterial({ color: 0xeecc00 }));
    dash.rotation.x = -Math.PI/2;
    dash.position.set(i * 6 + 6, 0.01, 0);
    scene.add(dash);
  }
  // Road edges
  [-4.6, 4.6].forEach(z => {
    const edge = new THREE.Mesh(new THREE.PlaneGeometry(80, 0.18), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    edge.rotation.x = -Math.PI/2;
    edge.position.set(0, 0.01, z);
    scene.add(edge);
  });

  // ======= BUILDINGS (right side bg) =======
  [[2,-16],[8,-18],[16,-15],[22,-16],[28,-17]].forEach(([x, z], i) => {
    const h = [10, 14, 8, 12, 9][i];
    const bld = new THREE.Mesh(new THREE.BoxGeometry(3.5, h, 3.5), new THREE.MeshPhongMaterial({ color: 0x0a1520, emissive: 0x040810 }));
    bld.position.set(x, h/2, z);
    scene.add(bld);
    for (let wy = 1.2; wy < h - 1; wy += 1.8) {
      for (let wx = -1.2; wx <= 1.2; wx += 1.2) {
        const on = Math.random() > 0.3;
        const win = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.7), new THREE.MeshBasicMaterial({ color: on ? 0xffdd77 : 0x0d1f33 }));
        win.position.set(x + wx, wy, z + 1.77);
        scene.add(win);
      }
    }
  });

  // Stars
  const sGeo = new THREE.BufferGeometry();
  const sArr = new Float32Array(400*3);
  for (let i = 0; i < 400*3; i+=3) { sArr[i]=(Math.random()-0.5)*100; sArr[i+1]=Math.random()*25+4; sArr[i+2]=(Math.random()-0.5)*60-10; }
  sGeo.setAttribute('position', new THREE.BufferAttribute(sArr, 3));
  scene.add(new THREE.Points(sGeo, new THREE.PointsMaterial({ color: 0xbbccff, size: 0.14, transparent: true, opacity: 0.7 })));

  // ======= ANIMATE =======
  let frame;
  function animate() {
    frame = requestAnimationFrame(animate);
    const t = Date.now() * 0.001;

    // Gentle float
    G.position.y = Math.sin(t * 2.2) * 0.06;

    // Siren flash
    const fl = Math.sin(t * 8) > 0;
    lensR.material.emissive.setHex(fl ? 0xff0000 : 0x220000);
    lensB.material.emissive.setHex(fl ? 0x0022ff : 0x000022);
    sirenRLight.intensity = fl ? 5 : 0.1;
    sirenBLight.intensity = fl ? 0.1 : 5;

    // Wheels spin
    wheels.forEach(w => { w.rotation.x += 0.1; });

    // Camera slowly sweeps around ambulance
    const cx = 6 + Math.sin(t * 0.15) * 4;
    const cz = 12 + Math.cos(t * 0.12) * 3;
    camera.position.set(cx, 4 + Math.sin(t*0.1)*0.5, cz);
    camera.lookAt(6, 1.8, 0);

    renderer.render(scene, camera);
  }
  animate();
  canvas._cleanup = () => { cancelAnimationFrame(frame); renderer.dispose(); };
}

// ---- Three.js Fleet 3D Model ----
function initAmbulance3DFleet() {
  const canvas = document.getElementById('amb3d-canvas');
  if (!canvas || typeof THREE === 'undefined') return;
  const wrap = canvas.parentElement;
  const rect = wrap.getBoundingClientRect();
  const W = rect.width > 50 ? rect.width : 420;
  const H = 380;
  canvas.width = W; canvas.height = H;
  canvas.style.width = '100%';
  canvas.style.height = H + 'px';

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 200);
  camera.position.set(0, 4, 14);
  camera.lookAt(0, 0.5, 0);

  scene.add(new THREE.AmbientLight(0x334488, 1.5));
  const dl = new THREE.DirectionalLight(0xffffff, 2);
  dl.position.set(6, 10, 8); scene.add(dl);
  const rl = new THREE.PointLight(0xff2200, 3, 15);
  rl.position.set(-2, 4, 2); scene.add(rl);
  const bl = new THREE.PointLight(0x2200ff, 3, 15);
  bl.position.set(2, 4, 2); scene.add(bl);

  const grp = new THREE.Group();
  scene.add(grp);

  // Body
  const body = new THREE.Mesh(new THREE.BoxGeometry(4, 1.8, 2.2), new THREE.MeshPhongMaterial({ color: 0xfafafa, shininess: 90 }));
  body.position.y = 1.1; grp.add(body);

  // Cab
  const cab = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.3, 2.2), new THREE.MeshPhongMaterial({ color: 0xeeeeee, shininess: 60 }));
  cab.position.set(2.45, 0.85, 0); grp.add(cab);

  // Windshield
  const ws = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.85, 1.7), new THREE.MeshPhongMaterial({ color: 0x99bbdd, transparent: true, opacity: 0.65, shininess: 180 }));
  ws.position.set(3.17, 1.0, 0); grp.add(ws);

  // Red stripes both sides
  [-1.11, 1.11].forEach(z => {
    const s = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.3, 0.04), new THREE.MeshPhongMaterial({ color: 0xcc0000 }));
    s.position.set(0.2, 1.15, z); grp.add(s);
  });

  // Cross
  const cMat = new THREE.MeshPhongMaterial({ color: 0xff0000, emissive: 0x440000 });
  const cv = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.65, 0.05), cMat);
  const ch = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.14, 0.05), cMat);
  cv.position.set(-1.2, 1.35, 1.12); ch.position.set(-1.2, 1.35, 1.12); grp.add(cv); grp.add(ch);

  // Wheels
  const wg = new THREE.CylinderGeometry(0.48, 0.48, 0.32, 16);
  const wm = new THREE.MeshPhongMaterial({ color: 0x1a1a1a, shininess: 20 });
  const hg = new THREE.CylinderGeometry(0.2, 0.2, 0.33, 12);
  const hm = new THREE.MeshPhongMaterial({ color: 0x999999, shininess: 120 });
  const wPos = [[-1.2, 0, 1.2],[-1.2, 0,-1.2],[1.55, 0, 1.2],[1.55, 0,-1.2]];
  const wMeshes = [];
  wPos.forEach(p => {
    const w = new THREE.Mesh(wg, wm); w.rotation.z = Math.PI/2; w.position.set(...p); grp.add(w);
    const h = new THREE.Mesh(hg, hm); h.rotation.z = Math.PI/2; h.position.set(...p); grp.add(h);
    wMeshes.push(w);
  });

  // Siren
  const sR = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.24, 0.3), new THREE.MeshPhongMaterial({ color: 0xff0000, emissive: 0xaa0000 }));
  const sB = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.24, 0.3), new THREE.MeshPhongMaterial({ color: 0x0000ff, emissive: 0x0000aa }));
  sR.position.set(-0.5, 2.1, 0); sB.position.set(0.5, 2.1, 0); grp.add(sR); grp.add(sB);

  // Ground
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(30, 10), new THREE.MeshPhongMaterial({ color: 0x0d1520 }));
  ground.rotation.x = -Math.PI / 2; scene.add(ground);

  // Reflection lines
  for (let i = -3; i <= 3; i++) {
    const ln = new THREE.Mesh(new THREE.PlaneGeometry(2, 0.1), new THREE.MeshBasicMaterial({ color: 0x334466 }));
    ln.rotation.x = -Math.PI / 2; ln.position.set(i * 4, 0.01, 0); scene.add(ln);
  }

  let fr;
  function animate() {
    fr = requestAnimationFrame(animate);
    const t = Date.now() * 0.001;
    grp.rotation.y = t * 0.4;
    grp.position.y = Math.sin(t * 3) * 0.05;
    wMeshes.forEach(w => w.rotation.x += 0.05);
    const fl = Math.sin(t * 5) > 0;
    sR.material.emissive.setHex(fl ? 0xff0000 : 0x220000);
    sB.material.emissive.setHex(fl ? 0x0000ff : 0x000022);
    rl.intensity = fl ? 4 : 0.3;
    bl.intensity = fl ? 0.3 : 4;
    renderer.render(scene, camera);
  }
  animate();
  canvas._cleanup = () => { cancelAnimationFrame(fr); renderer.dispose(); };
}

function initAmbulancePage3D() {
  var attempts = 0;
  function tryInit() {
    attempts++;
    var hero = document.getElementById('amb-canvas');
    var main = document.getElementById('amb-main-fallback');
    if (!hero) {
      if (attempts < 20) setTimeout(tryInit, 100);
      return;
    }
    requestAnimationFrame(function() {
      initAmbulance3D();
      startVitalsAnimation();
      startECGAnimation();
    });
  }
  setTimeout(tryInit, 150);
}

// ---- Three.js 3D Ambulance Showcase ----
function initAmb3DMain() {
  const canvas = document.getElementById('amb3d-main');
  if (!canvas || typeof THREE === 'undefined') return;

  if (canvas._cleanupMain) { canvas._cleanupMain(); canvas._cleanupMain = null; }

  const W = 560, H = 420;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(W, H);
  renderer.setClearColor(0x060e1e, 1);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x060e1e, 35, 80);

  const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 200);
  camera.position.set(8, 5, 14);
  camera.lookAt(0, 1, 0);

  // Lights
  scene.add(new THREE.AmbientLight(0x334488, 1.8));
  const key = new THREE.DirectionalLight(0xffffff, 2.5);
  key.position.set(8, 12, 10);
  key.castShadow = true;
  scene.add(key);
  scene.add(Object.assign(new THREE.DirectionalLight(0x6699ff, 0.8), { position: new THREE.Vector3(-8, 4, -4) }));

  const sirenR = new THREE.PointLight(0xff2200, 0, 18);
  sirenR.position.set(-1.5, 4, 0);
  scene.add(sirenR);
  const sirenB = new THREE.PointLight(0x0044ff, 4, 18);
  sirenB.position.set(1.5, 4, 0);
  scene.add(sirenB);

  // === AMBULANCE ===
  const amb = new THREE.Group();
  scene.add(amb);

  const wMat = new THREE.MeshPhongMaterial({ color: 0xf2f2f2, shininess: 100 });
  const body = new THREE.Mesh(new THREE.BoxGeometry(4.2, 2.0, 2.3), wMat);
  body.position.set(-0.1, 1.15, 0); body.castShadow = true; amb.add(body);

  const cab = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.5, 2.3), new THREE.MeshPhongMaterial({ color: 0xe6e6e6, shininess: 80 }));
  cab.position.set(2.5, 0.85, 0); cab.castShadow = true; amb.add(cab);

  const rSlope = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.5, 2.3), new THREE.MeshPhongMaterial({ color: 0xe0e0e0 }));
  rSlope.position.set(2.0, 1.85, 0); rSlope.rotation.z = -0.25; amb.add(rSlope);

  const wsMat = new THREE.MeshPhongMaterial({ color: 0x88aadd, transparent: true, opacity: 0.55, shininess: 200 });
  amb.add(Object.assign(new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.0, 1.85), wsMat), { position: new THREE.Vector3(3.28, 1.05, 0) }));

  [-1.165, 1.165].forEach(z => {
    const w = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.55, 0.04), wsMat);
    w.position.set(0.3, 1.7, z); amb.add(w);
  });

  const redM = new THREE.MeshPhongMaterial({ color: 0xcc0000, shininess: 60 });
  [-1.17, 1.17].forEach(z => {
    const s = new THREE.Mesh(new THREE.BoxGeometry(5.9, 0.28, 0.04), redM);
    s.position.set(0.1, 1.15, z); amb.add(s);
  });

  const crossM = new THREE.MeshPhongMaterial({ color: 0xff0000, emissive: 0x550000 });
  const cV = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.62, 0.05), crossM);
  const cH = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.13, 0.05), crossM);
  cV.position.set(-1.3, 1.55, 1.175); cH.position.set(-1.3, 1.55, 1.175);
  amb.add(cV); amb.add(cH);

  const roofTop = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.18, 2.0), new THREE.MeshPhongMaterial({ color: 0xe0e0e0 }));
  roofTop.position.set(-0.1, 2.18, 0); amb.add(roofTop);

  const sirenBar = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.2, 0.45), new THREE.MeshPhongMaterial({ color: 0x111111 }));
  sirenBar.position.set(-0.1, 2.37, 0); amb.add(sirenBar);

  const lensRed = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.18, 0.42), new THREE.MeshPhongMaterial({ color: 0xff0000, emissive: 0xaa0000, transparent: true, opacity: 0.9 }));
  lensRed.position.set(-0.55, 2.38, 0); amb.add(lensRed);

  const lensBlue = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.18, 0.42), new THREE.MeshPhongMaterial({ color: 0x0000ff, emissive: 0x0000aa, transparent: true, opacity: 0.9 }));
  lensBlue.position.set(0.55, 2.38, 0); amb.add(lensBlue);

  const bumperM = new THREE.MeshPhongMaterial({ color: 0x333333, shininess: 40 });
  const fBump = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.3, 2.3), bumperM);
  fBump.position.set(3.37, 0.28, 0); amb.add(fBump);
  const bBump = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.3, 2.3), bumperM);
  bBump.position.set(-2.27, 0.28, 0); amb.add(bBump);

  const hlM = new THREE.MeshPhongMaterial({ color: 0xffffcc, emissive: 0xaaaa44 });
  [-0.65, 0.65].forEach(z => {
    const hl = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.28, 0.38), hlM);
    hl.position.set(3.33, 0.72, z); amb.add(hl);
  });

  // Door line
  const dLine = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.6, 0.04), new THREE.MeshBasicMaterial({ color: 0x888888 }));
  dLine.position.set(-2.2, 1.15, 0); amb.add(dLine);

  // Wheels
  const wGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.34, 20);
  const wMatD = new THREE.MeshPhongMaterial({ color: 0x111111, shininess: 20 });
  const hGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.35, 12);
  const hMatD = new THREE.MeshPhongMaterial({ color: 0x999999, shininess: 120 });
  const wPos = [[-1.4,0,1.3],[-1.4,0,-1.3],[1.7,0,1.3],[1.7,0,-1.3]];
  const wheels = [];
  wPos.forEach(([x,y,z]) => {
    const w = new THREE.Mesh(wGeo, wMatD); w.rotation.z = Math.PI/2; w.position.set(x,y+0.5,z); w.castShadow=true; amb.add(w);
    const h = new THREE.Mesh(hGeo, hMatD); h.rotation.z = Math.PI/2; h.position.set(x,y+0.5,z); amb.add(h);
    wheels.push(w);
  });

  // Ground
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(40, 16), new THREE.MeshPhongMaterial({ color: 0x080f1a }));
  ground.rotation.x = -Math.PI/2; ground.receiveShadow = true; scene.add(ground);
  for (let i = -4; i <= 4; i++) {
    const ln = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 0.1), new THREE.MeshBasicMaterial({ color: 0x223355 }));
    ln.rotation.x = -Math.PI/2; ln.position.set(i*5, 0.01, 0); scene.add(ln);
  }

  // Stars
  const pGeo = new THREE.BufferGeometry();
  const pArr = new Float32Array(200*3);
  for (let i = 0; i < 200*3; i+=3) { pArr[i]=(Math.random()-0.5)*60; pArr[i+1]=Math.random()*18+1; pArr[i+2]=(Math.random()-0.5)*30-3; }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pArr, 3));
  scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0x2244aa, size: 0.1, transparent: true, opacity: 0.5 })));

  let frMain;
  function animate() {
    frMain = requestAnimationFrame(animate);
    const t = Date.now() * 0.001;
    amb.rotation.y = t * 0.35;
    amb.position.y = Math.sin(t * 2.5) * 0.04;
    wheels.forEach(w => { w.rotation.x += 0.04; });
    const fl = Math.sin(t * 7) > 0;
    lensRed.material.emissive.setHex(fl ? 0xff1100 : 0x220000);
    lensBlue.material.emissive.setHex(fl ? 0x0011ff : 0x000022);
    sirenR.intensity = fl ? 5 : 0.2;
    sirenB.intensity = fl ? 0.2 : 5;
    camera.position.x = Math.sin(t * 0.18) * 3 + 6;
    camera.position.z = Math.cos(t * 0.18) * 3 + 12;
    camera.lookAt(0, 1.2, 0);
    renderer.render(scene, camera);
  }
  animate();
  canvas._cleanupMain = () => { cancelAnimationFrame(frMain); renderer.dispose(); };
}
