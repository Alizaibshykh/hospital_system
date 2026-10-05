// ============================================
// MediCare Pro — Shared Components
// ============================================

// ---- Toast Notifications ----
function showToast(message, type = 'info') {
  const icons = { success: 'fa-circle-check', error: 'fa-circle-xmark', warning: 'fa-triangle-exclamation', info: 'fa-circle-info' };
  const container = document.getElementById('notification-container');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<i class="fa-solid ${icons[type]}"></i><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ---- Modal ----
function openModal({ title, body, footer, size = '' }) {
  closeModal();
  const root = document.getElementById('modal-root');
  root.innerHTML = `
    <div class="modal-overlay" id="active-modal" onclick="handleModalClick(event)">
      <div class="modal ${size}" onclick="event.stopPropagation()">
        <div class="modal-header">
          <h3>${title}</h3>
          <button class="modal-close" onclick="closeModal()"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="modal-body">${body}</div>
        ${footer ? `<div class="modal-footer">${footer}</div>` : ''}
      </div>
    </div>`;
}

function closeModal() {
  const root = document.getElementById('modal-root');
  root.innerHTML = '';
}

function handleModalClick(e) {
  if (e.target.id === 'active-modal') closeModal();
}

// ---- Sidebar ----
function renderSidebar() {
  const user = State.get('currentUser');
  if (!user) return '';

  const unread = State.getUnreadCount();
  const isDoctor = user.role === 'doctor';
  const currentPage = State.get('currentPage');

  const patientNav = [
    { icon: 'fa-house', label: 'Home', page: 'home' },
    { icon: 'fa-user-doctor', label: 'Find Doctors', page: 'doctors' },
    { icon: 'fa-calendar-plus', label: 'Book Appointment', page: 'book-appointment' },
    { icon: 'fa-calendar-days', label: 'My Appointments', page: 'my-appointments' },
    { icon: 'fa-bell', label: 'Notifications', page: 'notifications', badge: unread > 0 ? unread : null },
    { icon: 'fa-user', label: 'My Profile', page: 'patient-profile' },
  ];

  const doctorNav = [
    { icon: 'fa-gauge-high', label: 'Dashboard', page: 'doctor-dashboard' },
    { icon: 'fa-users', label: 'My Patients', page: 'doctor-patients' },
    { icon: 'fa-calendar-days', label: 'Appointments', page: 'my-appointments' },
    { icon: 'fa-bell', label: 'Notifications', page: 'notifications', badge: unread > 0 ? unread : null },
    { icon: 'fa-user', label: 'My Profile', page: 'patient-profile' },
  ];

  const navItems = isDoctor ? doctorNav : patientNav;

  return `
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-logo">
        <div class="logo-icon"><i class="fa-solid fa-heart-pulse"></i></div>
        <div class="logo-text">
          <div class="name">MediCare Pro</div>
          <div class="tagline">Hospital Management</div>
        </div>
      </div>
      <div class="sidebar-user">
        <div class="avatar avatar-sm" style="background:${isDoctor ? '#2563eb' : '#8b5cf6'}">${user.initials || user.name.slice(0,2).toUpperCase()}</div>
        <div class="sidebar-user-info">
          <div class="name">${user.name}</div>
          <div class="role">${isDoctor ? 'Doctor' : 'Patient'}</div>
        </div>
      </div>
      <nav class="sidebar-nav">
        <div class="nav-section-label">Main Menu</div>
        ${navItems.map(item => `
          <div class="nav-item ${currentPage === item.page ? 'active' : ''}" onclick="navigate('${item.page}')">
            <i class="fa-solid ${item.icon}"></i>
            <span>${item.label}</span>
            ${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}
          </div>
        `).join('')}
      </nav>
      <div class="sidebar-footer">
        <div class="nav-item" onclick="handleLogout()" style="color:var(--danger)">
          <i class="fa-solid fa-arrow-right-from-bracket"></i>
          <span>Logout</span>
        </div>
      </div>
    </aside>`;
}

// ---- Header ----
function renderHeader(title = '') {
  const unread = State.getUnreadCount();
  const user = State.get('currentUser');
  return `
    <header class="header">
      <div style="display:flex;align-items:center;gap:12px">
        <button class="sidebar-toggle" onclick="toggleSidebar()">
          <i class="fa-solid fa-bars"></i>
        </button>
        <div class="header-search">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search doctors, appointments..." oninput="handleGlobalSearch(this.value)" />
        </div>
      </div>
      <div class="header-actions">
        <div class="header-btn" onclick="navigate('notifications')" title="Notifications">
          <i class="fa-solid fa-bell"></i>
          ${unread > 0 ? `<span class="notif-badge">${unread > 9 ? '9+' : unread}</span>` : ''}
        </div>
        <div class="header-btn dropdown" id="header-user-menu" onclick="toggleUserMenu()">
          <div class="avatar avatar-sm" style="background:${user?.role === 'doctor' ? '#2563eb' : '#8b5cf6'};border-radius:8px;font-size:0.7rem">
            ${user?.initials || 'U'}
          </div>
          <div class="dropdown-menu hidden" id="user-dropdown">
            <div class="dropdown-item" onclick="navigate('patient-profile')"><i class="fa-solid fa-user"></i> My Profile</div>
            <div class="dropdown-item" onclick="navigate('notifications')"><i class="fa-solid fa-bell"></i> Notifications</div>
            <div class="dropdown-divider"></div>
            <div class="dropdown-item danger" onclick="handleLogout()"><i class="fa-solid fa-arrow-right-from-bracket"></i> Logout</div>
          </div>
        </div>
      </div>
    </header>`;
}

// ---- Doctor Card ----
function renderDoctorCard(doctor) {
  const stars = Math.round(doctor.rating);
  const starsHtml = Array.from({length: 5}, (_, i) =>
    `<i class="fa-${i < stars ? 'solid' : 'regular'} fa-star"></i>`
  ).join('');

  return `
    <div class="doctor-card fade-in" onclick="viewDoctorDetails('${doctor.id}')">
      <div class="doctor-card-top">
        <div class="avatar avatar-md" style="background:${doctor.color}">${doctor.initials}</div>
        <div class="doctor-info" style="flex:1">
          <h4>${doctor.name}</h4>
          <div class="specialty">${doctor.specialty}</div>
          <div class="hospital"><i class="fa-solid fa-hospital" style="margin-right:4px;opacity:0.6"></i>${doctor.hospital}</div>
          <div style="margin-top:4px;display:flex;align-items:center;gap:6px">
            <span class="stars">${starsHtml}</span>
            <span style="font-size:0.75rem;color:var(--text-muted)">${doctor.rating} (${doctor.reviews})</span>
          </div>
        </div>
        <div>
          <span class="badge ${doctor.available ? 'badge-online' : 'badge-cancelled'}">
            ${doctor.available ? 'Available' : 'Unavailable'}
          </span>
        </div>
      </div>
      <div class="doctor-stats">
        <div class="doc-stat"><i class="fa-solid fa-briefcase-medical"></i>${doctor.experience} Yrs Exp</div>
        <div class="doc-stat"><i class="fa-solid fa-users"></i>${doctor.patients.toLocaleString()} Patients</div>
        <div class="doc-stat"><i class="fa-solid fa-dollar-sign"></i>Rs. ${doctor.fee} / visit</div>
        <div style="margin-left:auto">
          <button class="btn btn-primary btn-sm" onclick="event.stopPropagation();navigate('book-appointment',{selectedDoctor:State.get('doctors').find(d=>d.id==='${doctor.id}')})">
            <i class="fa-solid fa-calendar-plus"></i> Book
          </button>
        </div>
      </div>
    </div>`;
}

// ---- Appointment Card ----
function renderAppointmentCard(appt, showActions = true) {
  const dateParts = appt.date.split('-');
  const dateObj = new Date(appt.date);
  const day = dateObj.getDate();
  const month = MONTHS[dateObj.getMonth()].slice(0,3);
  const user = State.get('currentUser');
  const isDoctor = user?.role === 'doctor';
  const otherParty = isDoctor ? appt.patientName : appt.doctorName;
  const sub = isDoctor ? `Patient • Age ${appt.patientAge}` : appt.specialty;

  const actionButtons = showActions && appt.status === 'pending' ? `
    <button class="btn btn-success btn-sm btn-icon-sm" onclick="event.stopPropagation();changeApptStatus('${appt.id}','confirmed')" title="Confirm">
      <i class="fa-solid fa-check"></i>
    </button>
    <button class="btn btn-danger btn-sm btn-icon-sm" onclick="event.stopPropagation();changeApptStatus('${appt.id}','cancelled')" title="Cancel">
      <i class="fa-solid fa-xmark"></i>
    </button>` : '';

  const viewBtn = showActions ? `
    <button class="btn btn-secondary btn-sm btn-icon-sm" onclick="viewAppointmentDetails('${appt.id}')" title="Details">
      <i class="fa-solid fa-eye"></i>
    </button>` : '';

  return `
    <div class="appointment-card fade-in">
      <div class="appt-date-box">
        <div class="day">${day}</div>
        <div class="month">${month}</div>
      </div>
      <div class="appt-info">
        <h4>${otherParty}</h4>
        <div class="sub">${sub}</div>
        <div class="time"><i class="fa-regular fa-clock" style="margin-right:4px"></i>${appt.time} • ${appt.type}</div>
      </div>
      <span class="badge badge-${appt.status}">${appt.status}</span>
      <div class="appt-actions">${actionButtons}${viewBtn}</div>
    </div>`;
}

// ---- Badge ----
function renderBadge(status) {
  return `<span class="badge badge-${status}">${status}</span>`;
}

// ---- Avatar ----
function renderAvatar(initials, color, size = 'md') {
  return `<div class="avatar avatar-${size}" style="background:${color}">${initials}</div>`;
}

// ---- Calendar ----
function renderCalendar(year, month, selected, onSelect, bookedDates = []) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  let cells = '';
  // Day headers
  cells += DAYS.map(d => `<div class="cal-day-header">${d}</div>`).join('');

  // Empty cells
  for (let i = 0; i < firstDay; i++) cells += `<div class="cal-day empty"></div>`;

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === d;
    const isSelected = dateStr === selected;
    const hasEvent = bookedDates.includes(dateStr);
    const isPast = new Date(dateStr) < today;

    cells += `<div class="cal-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${hasEvent ? 'has-event' : ''} ${isPast ? 'other-month' : ''}"
      onclick="${isPast ? '' : `calSelectDate('${dateStr}')`}" style="${isPast ? 'pointer-events:none' : 'cursor:pointer'}">
      ${d}
    </div>`;
  }

  return `
    <div class="calendar">
      <div class="calendar-header">
        <button class="btn btn-ghost btn-sm btn-icon" onclick="calPrev()"><i class="fa-solid fa-chevron-left"></i></button>
        <span style="font-weight:600;color:var(--text-white)">${MONTHS[month]} ${year}</span>
        <button class="btn btn-ghost btn-sm btn-icon" onclick="calNext()"><i class="fa-solid fa-chevron-right"></i></button>
      </div>
      <div class="calendar-grid">${cells}</div>
    </div>`;
}

// ---- Global navigation helpers ----
function navigate(page, params = {}) {
  State.navigate(page, params);
  renderApp();
  window.scrollTo(0, 0);
}

function handleLogout() {
  openModal({
    title: 'Confirm Logout',
    body: '<p style="color:var(--text-secondary)">Are you sure you want to logout?</p>',
    footer: `
      <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
      <button class="btn btn-danger" onclick="closeModal();State.logout();renderApp()">Logout</button>
    `
  });
}

function toggleSidebar() {
  document.getElementById('sidebar')?.classList.toggle('open');
}

function toggleUserMenu() {
  const menu = document.getElementById('user-dropdown');
  if (menu) menu.classList.toggle('hidden');
}

function handleGlobalSearch(val) {
  if (val.length > 1) {
    State.set({ filters: { ...State.get('filters'), search: val } });
    navigate('doctors');
  }
}

function viewDoctorDetails(id) {
  const doc = State.get('doctors').find(d => d.id === id);
  if (!doc) return;
  State.set({ selectedDoctor: doc });
  navigate('book-appointment');
}

function viewAppointmentDetails(id) {
  const appt = State.get('appointments').find(a => a.id === id);
  if (!appt) return;

  openModal({
    title: 'Appointment Details',
    size: 'modal-lg',
    body: `
      <div style="display:grid;gap:14px">
        <div style="display:flex;gap:12px;align-items:center;padding:14px;background:var(--bg-card2);border-radius:var(--radius)">
          <div class="avatar avatar-md" style="background:#2563eb">${appt.doctorName.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
          <div>
            <div style="font-weight:600;color:var(--text-white)">${appt.doctorName}</div>
            <div style="font-size:0.8rem;color:var(--accent-light)">${appt.specialty}</div>
          </div>
          <div style="margin-left:auto">${renderBadge(appt.status)}</div>
        </div>
        <div class="grid-2" style="gap:10px">
          <div style="padding:12px;background:var(--bg-card2);border-radius:var(--radius)">
            <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:4px">Date & Time</div>
            <div style="font-size:0.9rem;color:var(--text-white)"><i class="fa-regular fa-calendar" style="color:var(--accent-light);margin-right:6px"></i>${appt.date}</div>
            <div style="font-size:0.85rem;color:var(--text-secondary);margin-top:4px"><i class="fa-regular fa-clock" style="color:var(--accent-light);margin-right:6px"></i>${appt.time}</div>
          </div>
          <div style="padding:12px;background:var(--bg-card2);border-radius:var(--radius)">
            <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:4px">Visit Type</div>
            <div style="font-size:0.9rem;color:var(--text-white)">${appt.type}</div>
            <div style="font-size:0.85rem;color:var(--text-secondary);margin-top:4px">Duration: ${appt.duration} mins</div>
          </div>
          <div style="padding:12px;background:var(--bg-card2);border-radius:var(--radius)">
            <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:4px">Patient</div>
            <div style="font-size:0.9rem;color:var(--text-white)">${appt.patientName}</div>
            <div style="font-size:0.85rem;color:var(--text-secondary);margin-top:4px">Age: ${appt.patientAge}</div>
          </div>
          <div style="padding:12px;background:var(--bg-card2);border-radius:var(--radius)">
            <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:4px">Consultation Fee</div>
            <div style="font-size:0.9rem;color:var(--text-white)">Rs. ${appt.fee}</div>
          </div>
        </div>
        ${appt.reason ? `<div style="padding:12px;background:var(--bg-card2);border-radius:var(--radius)">
          <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:6px">Reason for Visit</div>
          <div style="font-size:0.875rem;color:var(--text-primary)">${appt.reason}</div>
        </div>` : ''}
        ${appt.notes ? `<div style="padding:12px;background:var(--bg-card2);border-radius:var(--radius)">
          <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:6px">Doctor's Notes</div>
          <div style="font-size:0.875rem;color:var(--text-primary)">${appt.notes}</div>
        </div>` : ''}
      </div>`,
    footer: `
      <button class="btn btn-secondary" onclick="closeModal()">Close</button>
      ${appt.status === 'pending' ? `
        <button class="btn btn-success" onclick="closeModal();changeApptStatus('${appt.id}','confirmed')"><i class="fa-solid fa-check"></i> Confirm</button>
        <button class="btn btn-danger" onclick="closeModal();changeApptStatus('${appt.id}','cancelled')"><i class="fa-solid fa-xmark"></i> Cancel</button>
      ` : ''}
      ${appt.status === 'confirmed' ? `
        <button class="btn btn-primary" onclick="closeModal();changeApptStatus('${appt.id}','completed')"><i class="fa-solid fa-circle-check"></i> Mark Complete</button>
      ` : ''}
    `
  });
}

function changeApptStatus(id, status) {
  State.updateAppointmentStatus(id, status);
  const messages = {
    confirmed: 'Appointment confirmed successfully.',
    cancelled: 'Appointment has been cancelled.',
    completed: 'Appointment marked as completed.',
  };
  showToast(messages[status] || 'Status updated.', status === 'cancelled' ? 'error' : 'success');
  renderApp();
}

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('#header-user-menu')) {
    document.getElementById('user-dropdown')?.classList.add('hidden');
  }
  if (!e.target.closest('#sidebar') && !e.target.closest('.sidebar-toggle')) {
    document.getElementById('sidebar')?.classList.remove('open');
  }
});
