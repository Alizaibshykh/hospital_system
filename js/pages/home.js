// ============================================
// Home Page (Patient)
// ============================================

function renderHome() {
  const user = State.get('currentUser');
  const appointments = State.getUserAppointments();
  const upcoming = appointments.filter(a => a.status === 'confirmed' || a.status === 'pending')
    .sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 3);
  const today = new Date();
  const hour = today.getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  const quickStats = [
    { icon: 'fa-calendar-check', label: 'Total Appointments', value: appointments.length, color: 'blue' },
    { icon: 'fa-calendar-plus', label: 'Upcoming', value: upcoming.length, color: 'teal' },
    { icon: 'fa-circle-check', label: 'Completed', value: appointments.filter(a=>a.status==='completed').length, color: 'green' },
    { icon: 'fa-bell', label: 'Notifications', value: State.getUnreadCount(), color: 'amber' },
  ];

  return `
    <div class="page-body fade-in">
      <!-- Hero -->
      <div class="hero-section">
        <div style="position:relative;z-index:1">
          <div style="font-size:0.85rem;color:var(--accent-light);margin-bottom:6px;display:flex;align-items:center;gap:6px">
            <div class="pulse-dot"></div> Online
          </div>
          <h2 style="font-size:1.8rem;margin-bottom:8px">${greeting}, ${user.name.split(' ')[0]} <span style="font-size:1.4rem">👋</span></h2>
          <p style="max-width:480px">Your health dashboard is ready. Manage appointments, find doctors, and stay on top of your healthcare.</p>
          <div style="display:flex;gap:10px;margin-top:20px;flex-wrap:wrap">
            <button class="btn btn-primary" onclick="navigate('book-appointment')">
              <i class="fa-solid fa-calendar-plus"></i> Book Appointment
            </button>
            <button class="btn btn-secondary" onclick="navigate('doctors')">
              <i class="fa-solid fa-user-doctor"></i> Find Doctors
            </button>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid-4" style="margin-bottom:24px">
        ${quickStats.map(s => `
          <div class="stat-card">
            <div class="stat-icon ${s.color}"><i class="fa-solid ${s.icon}"></i></div>
            <div>
              <div class="stat-label">${s.label}</div>
              <div class="stat-value">${s.value}</div>
            </div>
          </div>`).join('')}
      </div>

      <div style="display:grid;grid-template-columns:1fr 340px;gap:20px">
        <!-- Upcoming Appointments -->
        <div>
          <div class="card">
            <div class="card-header">
              <div class="section-title" style="margin:0"><i class="fa-solid fa-calendar-days"></i> Upcoming Appointments</div>
              <button class="btn btn-ghost btn-sm" onclick="navigate('my-appointments')">View All</button>
            </div>
            ${upcoming.length === 0
              ? `<div class="empty-state"><i class="fa-solid fa-calendar-xmark"></i><h4>No Upcoming Appointments</h4><p>Book an appointment to get started</p>
                 <button class="btn btn-primary" style="margin-top:12px" onclick="navigate('book-appointment')"><i class="fa-solid fa-plus"></i> Book Now</button></div>`
              : upcoming.map(a => renderAppointmentCard(a)).join('')
            }
          </div>

          <!-- Quick Book -->
          <div class="card" style="margin-top:16px">
            <div class="card-header">
              <div class="section-title" style="margin:0"><i class="fa-solid fa-star"></i> Top Rated Doctors</div>
              <button class="btn btn-ghost btn-sm" onclick="navigate('doctors')">See All</button>
            </div>
            <div style="display:grid;gap:10px">
              ${MOCK_DOCTORS.filter(d => d.available).slice(0,3).map(d => `
                <div style="display:flex;align-items:center;gap:12px;padding:10px;border:1px solid var(--border);border-radius:var(--radius);cursor:pointer;transition:var(--transition)" 
                     onmouseenter="this.style.borderColor='var(--border-hover)'" onmouseleave="this.style.borderColor='var(--border)'"
                     onclick="viewDoctorDetails('${d.id}')">
                  <div class="avatar avatar-md" style="background:${d.color}">${d.initials}</div>
                  <div style="flex:1">
                    <div style="font-size:0.9rem;font-weight:600;color:var(--text-white)">${d.name}</div>
                    <div style="font-size:0.78rem;color:var(--accent-light)">${d.specialty}</div>
                    <div class="stars" style="font-size:0.7rem;margin-top:2px">${'★'.repeat(Math.round(d.rating))}${'☆'.repeat(5-Math.round(d.rating))} <span style="color:var(--text-muted)">${d.rating}</span></div>
                  </div>
                  <div>
                    <div style="font-size:0.8rem;color:var(--text-secondary)">Rs. ${d.fee}</div>
                    <button class="btn btn-primary btn-sm" style="margin-top:6px" onclick="event.stopPropagation();State.set({selectedDoctor:State.get('doctors').find(x=>x.id==='${d.id}')});navigate('book-appointment')">Book</button>
                  </div>
                </div>`).join('')}
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div style="display:flex;flex-direction:column;gap:16px">
          <!-- Health Tips -->
          <div class="card">
            <div class="card-header">
              <div class="section-title" style="margin:0"><i class="fa-solid fa-lightbulb"></i> Health Tips</div>
            </div>
            ${[
              { icon: 'fa-droplet', color: '#0ea5e9', tip: 'Drink 8 glasses of water daily to stay hydrated.' },
              { icon: 'fa-dumbbell', color: '#8b5cf6', tip: '30 minutes of exercise a day keeps the doctor away.' },
              { icon: 'fa-moon', color: '#f59e0b', tip: 'Aim for 7-8 hours of quality sleep each night.' },
              { icon: 'fa-apple-whole', color: '#10b981', tip: 'Eat a balanced diet rich in fruits and vegetables.' },
            ].map(t => `
              <div style="display:flex;gap:10px;padding:10px 0;border-bottom:1px solid var(--border)">
                <div style="width:32px;height:32px;border-radius:8px;background:rgba(${t.color==='#0ea5e9'?'14,165,233':t.color==='#8b5cf6'?'139,92,246':t.color==='#f59e0b'?'245,158,11':'16,185,129'},0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0">
                  <i class="fa-solid ${t.icon}" style="font-size:0.8rem;color:${t.color}"></i>
                </div>
                <p style="font-size:0.8rem;margin:0;color:var(--text-secondary)">${t.tip}</p>
              </div>`).join('')}
          </div>

          <!-- Quick Links -->
          <div class="card">
            <div class="section-title"><i class="fa-solid fa-bolt"></i> Quick Actions</div>
            <div style="display:grid;gap:8px">
              ${[
                { icon: 'fa-calendar-plus', label: 'Book Appointment', page: 'book-appointment', color: '#2563eb' },
                { icon: 'fa-calendar-days', label: 'My Appointments', page: 'my-appointments', color: '#8b5cf6' },
                { icon: 'fa-user', label: 'Edit Profile', page: 'patient-profile', color: '#10b981' },
                { icon: 'fa-bell', label: 'Notifications', page: 'notifications', color: '#f59e0b' },
              ].map(q => `
                <div style="display:flex;align-items:center;gap:10px;padding:10px;border:1px solid var(--border);border-radius:var(--radius);cursor:pointer;transition:var(--transition)"
                     onmouseenter="this.style.background='rgba(37,99,235,0.05)'" onmouseleave="this.style.background=''"
                     onclick="navigate('${q.page}')">
                  <div style="width:34px;height:34px;border-radius:8px;background:rgba(0,0,0,0.2);display:flex;align-items:center;justify-content:center">
                    <i class="fa-solid ${q.icon}" style="color:${q.color};font-size:0.85rem"></i>
                  </div>
                  <span style="font-size:0.875rem;color:var(--text-primary)">${q.label}</span>
                  <i class="fa-solid fa-chevron-right" style="margin-left:auto;font-size:0.7rem;color:var(--text-muted)"></i>
                </div>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>`;
}
