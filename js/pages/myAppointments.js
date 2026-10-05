// ============================================
// My Appointments Page
// ============================================

let _apptTab = 'all';
let _apptSearch = '';
let _apptStatusFilter = 'all';

function renderMyAppointments() {
  const all = State.getUserAppointments().sort((a, b) => new Date(b.date) - new Date(a.date));

  const counts = {
    all: all.length,
    upcoming: all.filter(a => ['pending','confirmed'].includes(a.status)).length,
    completed: all.filter(a => a.status === 'completed').length,
    cancelled: all.filter(a => a.status === 'cancelled').length,
  };

  let filtered = all;
  if (_apptTab === 'upcoming') filtered = all.filter(a => ['pending','confirmed'].includes(a.status));
  else if (_apptTab === 'completed') filtered = all.filter(a => a.status === 'completed');
  else if (_apptTab === 'cancelled') filtered = all.filter(a => a.status === 'cancelled');
  if (_apptSearch) {
    const q = _apptSearch.toLowerCase();
    filtered = filtered.filter(a => a.doctorName.toLowerCase().includes(q) || a.patientName.toLowerCase().includes(q) || a.specialty.toLowerCase().includes(q));
  }
  if (_apptStatusFilter !== 'all') filtered = filtered.filter(a => a.status === _apptStatusFilter);

  const user = State.get('currentUser');
  const isDoctor = user?.role === 'doctor';

  return `
    <div class="page-body fade-in">
      <div class="page-header" style="display:flex;align-items:center;justify-content:space-between">
        <div>
          <div class="page-title">${isDoctor ? 'Patient Appointments' : 'My Appointments'}</div>
          <div class="page-subtitle">${isDoctor ? 'Manage your patient appointments' : 'Track and manage your medical visits'}</div>
        </div>
        ${!isDoctor ? `<button class="btn btn-primary" onclick="navigate('book-appointment')">
          <i class="fa-solid fa-calendar-plus"></i> Book New
        </button>` : ''}
      </div>

      <!-- Stats Row -->
      <div class="grid-4" style="margin-bottom:20px">
        ${[
          { label: 'Total', value: counts.all, color: 'blue', icon: 'fa-calendar-days' },
          { label: 'Upcoming', value: counts.upcoming, color: 'teal', icon: 'fa-calendar-check' },
          { label: 'Completed', value: counts.completed, color: 'green', icon: 'fa-circle-check' },
          { label: 'Cancelled', value: counts.cancelled, color: 'red', icon: 'fa-calendar-xmark' },
        ].map(s => `
          <div class="stat-card">
            <div class="stat-icon ${s.color}"><i class="fa-solid ${s.icon}"></i></div>
            <div><div class="stat-label">${s.label}</div><div class="stat-value">${s.value}</div></div>
          </div>`).join('')}
      </div>

      <!-- Tabs -->
      <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-bottom:16px">
        <div class="tabs">
          ${[
            { key: 'all', label: `All (${counts.all})` },
            { key: 'upcoming', label: `Upcoming (${counts.upcoming})` },
            { key: 'completed', label: `Completed (${counts.completed})` },
            { key: 'cancelled', label: `Cancelled (${counts.cancelled})` },
          ].map(t => `<div class="tab ${_apptTab === t.key ? 'active' : ''}" onclick="setApptTab('${t.key}')">${t.label}</div>`).join('')}
        </div>
        <div class="input-group" style="width:240px">
          <i class="input-icon fa-solid fa-magnifying-glass"></i>
          <input type="text" class="form-control" placeholder="Search..." value="${_apptSearch}" oninput="filterAppts(this.value)" />
        </div>
      </div>

      <!-- Appointments List -->
      <div id="appointments-list" style="display:flex;flex-direction:column;gap:10px">
        ${filtered.length === 0
          ? `<div class="empty-state card">
              <i class="fa-solid fa-calendar-xmark"></i>
              <h4>No appointments found</h4>
              <p>Try a different filter or book a new appointment</p>
              ${!isDoctor ? `<button class="btn btn-primary" style="margin-top:12px" onclick="navigate('book-appointment')"><i class="fa-solid fa-plus"></i> Book Appointment</button>` : ''}
            </div>`
          : filtered.map(a => renderAppointmentCard(a, true)).join('')
        }
      </div>

      <!-- Table View -->
      <div style="margin-top:24px">
        <div class="card-header" style="margin-bottom:12px">
          <div class="section-title" style="margin:0"><i class="fa-solid fa-table"></i> Table View</div>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>${isDoctor ? 'Patient' : 'Doctor'}</th>
                <th>Specialty</th>
                <th>Date</th>
                <th>Time</th>
                <th>Type</th>
                <th>Status</th>
                <th>Fee</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${filtered.map((a, i) => `
                <tr>
                  <td style="color:var(--text-muted);font-size:0.8rem">${i+1}</td>
                  <td>
                    <div style="display:flex;align-items:center;gap:8px">
                      <div class="avatar avatar-sm" style="background:#2563eb">${(isDoctor ? a.patientName : a.doctorName).slice(0,2).toUpperCase()}</div>
                      <span>${isDoctor ? a.patientName : a.doctorName}</span>
                    </div>
                  </td>
                  <td style="color:var(--accent-light);font-size:0.82rem">${a.specialty}</td>
                  <td>${a.date}</td>
                  <td><i class="fa-regular fa-clock" style="color:var(--accent-light);margin-right:4px;font-size:0.8rem"></i>${a.time}</td>
                  <td><span class="badge badge-primary">${a.type}</span></td>
                  <td>${renderBadge(a.status)}</td>
                  <td>Rs. ${a.fee}</td>
                  <td>
                    <div style="display:flex;gap:4px">
                      <button class="btn btn-ghost btn-sm btn-icon-sm" onclick="viewAppointmentDetails('${a.id}')" title="View"><i class="fa-solid fa-eye"></i></button>
                      ${a.status === 'pending' ? `
                        <button class="btn btn-success btn-sm btn-icon-sm" onclick="changeApptStatus('${a.id}','confirmed')" title="Confirm"><i class="fa-solid fa-check"></i></button>
                        <button class="btn btn-danger btn-sm btn-icon-sm" onclick="changeApptStatus('${a.id}','cancelled')" title="Cancel"><i class="fa-solid fa-xmark"></i></button>
                      ` : ''}
                      ${a.status === 'confirmed' && isDoctor ? `
                        <button class="btn btn-primary btn-sm btn-icon-sm" onclick="changeApptStatus('${a.id}','completed')" title="Complete"><i class="fa-solid fa-circle-check"></i></button>
                      ` : ''}
                    </div>
                  </td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>`;
}

function setApptTab(tab) {
  _apptTab = tab;
  renderApp();
}

function filterAppts(val) {
  _apptSearch = val;
  const list = document.getElementById('appointments-list');
  if (!list) return;
  const all = State.getUserAppointments().sort((a, b) => new Date(b.date) - new Date(a.date));
  let filtered = all;
  if (_apptTab !== 'all') filtered = all.filter(a => {
    if (_apptTab === 'upcoming') return ['pending','confirmed'].includes(a.status);
    return a.status === _apptTab;
  });
  if (val) {
    const q = val.toLowerCase();
    filtered = filtered.filter(a => a.doctorName.toLowerCase().includes(q) || a.patientName.toLowerCase().includes(q));
  }
  list.innerHTML = filtered.length === 0
    ? `<div class="empty-state card"><i class="fa-solid fa-calendar-xmark"></i><h4>No results</h4></div>`
    : filtered.map(a => renderAppointmentCard(a)).join('');
}
