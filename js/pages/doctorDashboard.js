// ============================================
// Doctor Dashboard Page
// ============================================

let _docFilterPatient = '';
let _docApptStatus = 'all';

function renderDoctorDashboard() {
  const user = State.get('currentUser');
  const doc = State.get('doctors').find(d => d.id === user?.id) || MOCK_DOCTORS[0];
  const allAppts = State.get('appointments').filter(a => a.doctorId === doc.id);
  const today = new Date().toISOString().split('T')[0];
  const todayAppts = allAppts.filter(a => a.date === today);
  const pending = allAppts.filter(a => a.status === 'pending');
  const confirmed = allAppts.filter(a => a.status === 'confirmed');
  const completed = allAppts.filter(a => a.status === 'completed');

  // Filter patients
  let filteredAppts = allAppts;
  if (_docFilterPatient) {
    const q = _docFilterPatient.toLowerCase();
    filteredAppts = allAppts.filter(a => a.patientName.toLowerCase().includes(q) || a.type.toLowerCase().includes(q));
  }
  if (_docApptStatus !== 'all') filteredAppts = filteredAppts.filter(a => a.status === _docApptStatus);

  const earnings = completed.reduce((sum, a) => sum + a.fee, 0);
  const chartHeights = [60, 80, 45, 90, 70, 85, 55]; // mock weekly data %

  return `
    <div class="page-body fade-in">
      <!-- Welcome -->
      <div class="hero-section" style="margin-bottom:24px">
        <div style="position:relative;z-index:1">
          <div style="font-size:0.8rem;color:var(--accent-light);margin-bottom:4px">
            <span class="badge badge-online"><i class="fa-solid fa-circle" style="font-size:0.4rem"></i> On Duty</span>
          </div>
          <h2>Good Day, ${user.name.split(' ').slice(0,2).join(' ')} 👨‍⚕️</h2>
          <p>You have <strong style="color:var(--accent-light)">${todayAppts.length}</strong> appointments today and <strong style="color:#f59e0b">${pending.length}</strong> pending confirmations.</p>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid-4" style="margin-bottom:24px">
        ${[
          { icon: 'fa-calendar-day', label: "Today's Appointments", value: todayAppts.length, color: 'blue', change: '+2 from yesterday', dir: 'up' },
          { icon: 'fa-hourglass-half', label: 'Pending', value: pending.length, color: 'amber', change: 'Needs confirmation', dir: '' },
          { icon: 'fa-users', label: 'Total Patients', value: doc.patients.toLocaleString(), color: 'teal', change: '+12 this week', dir: 'up' },
          { icon: 'fa-circle-dollar-to-slot', label: 'Earnings (Completed)', value: 'Rs. ' + earnings.toLocaleString(), color: 'green', change: 'This month', dir: 'up' },
        ].map(s => `
          <div class="stat-card">
            <div class="stat-icon ${s.color}"><i class="fa-solid ${s.icon}"></i></div>
            <div>
              <div class="stat-label">${s.label}</div>
              <div class="stat-value" style="font-size:1.3rem">${s.value}</div>
              ${s.change ? `<div class="stat-change ${s.dir}">${s.dir === 'up' ? '↑' : ''} ${s.change}</div>` : ''}
            </div>
          </div>`).join('')}
      </div>

      <div style="display:grid;grid-template-columns:1fr 320px;gap:20px">
        <!-- Appointments Management -->
        <div style="display:flex;flex-direction:column;gap:16px">

          <!-- Filter & Search -->
          <div class="card">
            <div class="card-header">
              <div class="section-title" style="margin:0"><i class="fa-solid fa-calendar-days"></i> Appointment Management</div>
              <div style="display:flex;gap:8px">
                <div class="input-group">
                  <i class="input-icon fa-solid fa-magnifying-glass"></i>
                  <input type="text" class="form-control" style="width:180px" placeholder="Filter patients..." value="${_docFilterPatient}" oninput="filterDocPatients(this.value)" />
                </div>
                <select class="form-control" style="width:140px" onchange="filterDocStatus(this.value)">
                  <option value="all">All Status</option>
                  <option value="pending" ${_docApptStatus==='pending'?'selected':''}>Pending</option>
                  <option value="confirmed" ${_docApptStatus==='confirmed'?'selected':''}>Confirmed</option>
                  <option value="completed" ${_docApptStatus==='completed'?'selected':''}>Completed</option>
                  <option value="cancelled" ${_docApptStatus==='cancelled'?'selected':''}>Cancelled</option>
                </select>
              </div>
            </div>
            <div id="doc-appt-list" style="display:flex;flex-direction:column;gap:8px">
              ${filteredAppts.length === 0
                ? `<div class="empty-state"><i class="fa-solid fa-calendar-xmark"></i><h4>No appointments found</h4></div>`
                : filteredAppts.sort((a,b) => new Date(a.date)-new Date(b.date)).map(a => renderAppointmentCard(a, true)).join('')}
            </div>
          </div>

          <!-- Patient List -->
          <div class="card">
            <div class="card-header">
              <div class="section-title" style="margin:0"><i class="fa-solid fa-users"></i> Patient List</div>
              <span class="badge badge-primary">${MOCK_PATIENTS.length} Total</span>
            </div>
            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Patient</th><th>Age</th><th>Blood</th><th>Last Visit</th><th>Visits</th><th>Conditions</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${MOCK_PATIENTS.map(p => `
                    <tr>
                      <td>
                        <div style="display:flex;align-items:center;gap:8px">
                          <div class="avatar avatar-sm" style="background:#8b5cf6">${p.name.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
                          <div>
                            <div style="font-weight:500">${p.name}</div>
                            <div style="font-size:0.75rem;color:var(--text-muted)">${p.gender}</div>
                          </div>
                        </div>
                      </td>
                      <td>${p.age}</td>
                      <td><span class="badge badge-primary" style="font-size:0.7rem">${p.bloodGroup}</span></td>
                      <td style="font-size:0.82rem;color:var(--text-secondary)">${p.lastVisit}</td>
                      <td style="text-align:center">${p.totalVisits}</td>
                      <td>
                        ${p.conditions.map(c => `<span class="badge badge-primary" style="font-size:0.68rem;margin-right:2px">${c}</span>`).join('') || '<span style="color:var(--text-muted);font-size:0.78rem">None</span>'}
                      </td>
                      <td>
                        <button class="btn btn-ghost btn-sm" onclick="viewPatientModal('${p.id}')"><i class="fa-solid fa-eye"></i></button>
                      </td>
                    </tr>`).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div style="display:flex;flex-direction:column;gap:16px">
          <!-- Weekly Chart -->
          <div class="card">
            <div class="section-title"><i class="fa-solid fa-chart-bar"></i> Weekly Appointments</div>
            <div class="chart-placeholder" style="height:160px">
              ${chartHeights.map((h, i) => `<div class="chart-bar" style="height:${h}%"></div>`).join('')}
            </div>
            <div style="display:flex;justify-content:space-around;margin-top:6px">
              ${DAYS.map(d => `<div style="font-size:0.68rem;color:var(--text-muted);text-align:center">${d}</div>`).join('')}
            </div>
          </div>

          <!-- Today's Schedule -->
          <div class="card">
            <div class="section-title"><i class="fa-solid fa-clock"></i> Today's Schedule</div>
            ${todayAppts.length === 0
              ? `<div class="empty-state" style="padding:20px"><i class="fa-solid fa-moon"></i><h4 style="font-size:0.9rem">No appointments today</h4></div>`
              : todayAppts.map(a => `
                  <div style="display:flex;gap:10px;padding:10px 0;border-bottom:1px solid var(--border)">
                    <div style="min-width:60px;font-size:0.78rem;font-weight:600;color:var(--accent-light)">${a.time}</div>
                    <div>
                      <div style="font-size:0.85rem;font-weight:500;color:var(--text-white)">${a.patientName}</div>
                      <div style="font-size:0.75rem;color:var(--text-secondary)">${a.type}</div>
                    </div>
                    ${renderBadge(a.status)}
                  </div>`).join('')}
          </div>

          <!-- Quick Stats -->
          <div class="card">
            <div class="section-title"><i class="fa-solid fa-chart-pie"></i> Appointment Breakdown</div>
            ${[
              { label: 'Pending', count: pending.length, total: allAppts.length, color: '#f59e0b' },
              { label: 'Confirmed', count: confirmed.length, total: allAppts.length, color: '#10b981' },
              { label: 'Completed', count: completed.length, total: allAppts.length, color: '#8b5cf6' },
            ].map(s => `
              <div style="margin-bottom:12px">
                <div style="display:flex;justify-content:space-between;font-size:0.8rem;margin-bottom:5px">
                  <span style="color:var(--text-secondary)">${s.label}</span>
                  <span style="color:var(--text-white)">${s.count} / ${s.total}</span>
                </div>
                <div class="progress">
                  <div class="progress-bar" style="width:${s.total ? Math.round((s.count/s.total)*100) : 0}%;background:${s.color}"></div>
                </div>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </div>`;
}

function filterDocPatients(val) {
  _docFilterPatient = val;
  const list = document.getElementById('doc-appt-list');
  if (!list) return;
  const user = State.get('currentUser');
  let appts = State.get('appointments').filter(a => a.doctorId === user?.id);
  if (val) { const q = val.toLowerCase(); appts = appts.filter(a => a.patientName.toLowerCase().includes(q)); }
  if (_docApptStatus !== 'all') appts = appts.filter(a => a.status === _docApptStatus);
  list.innerHTML = appts.map(a => renderAppointmentCard(a)).join('') || `<div class="empty-state"><i class="fa-solid fa-search"></i><h4>No results</h4></div>`;
}

function filterDocStatus(val) {
  _docApptStatus = val;
  renderApp();
}

function viewPatientModal(id) {
  const p = MOCK_PATIENTS.find(x => x.id === id);
  if (!p) return;
  openModal({
    title: 'Patient Details',
    body: `
      <div style="display:flex;gap:14px;align-items:center;margin-bottom:16px;padding:14px;background:var(--bg-card2);border-radius:var(--radius)">
        <div class="avatar avatar-lg" style="background:#8b5cf6">${p.name.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
        <div>
          <h3>${p.name}</h3>
          <div style="font-size:0.85rem;color:var(--text-secondary)">${p.gender} • Age ${p.age}</div>
          <div style="font-size:0.8rem;color:var(--accent-light);margin-top:2px">Blood: ${p.bloodGroup}</div>
        </div>
      </div>
      <div class="grid-2" style="gap:10px">
        ${[
          { label: 'Phone', value: p.phone },
          { label: 'Email', value: p.email },
          { label: 'Last Visit', value: p.lastVisit },
          { label: 'Total Visits', value: p.totalVisits },
        ].map(f => `
          <div style="padding:10px;background:var(--bg-card2);border-radius:var(--radius)">
            <div style="font-size:0.72rem;color:var(--text-muted)">${f.label}</div>
            <div style="font-size:0.875rem;color:var(--text-primary)">${f.value}</div>
          </div>`).join('')}
      </div>
      ${p.conditions.length ? `
        <div style="margin-top:12px">
          <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:6px">Medical Conditions</div>
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            ${p.conditions.map(c => `<span class="badge badge-primary">${c}</span>`).join('')}
          </div>
        </div>` : ''}
      <div style="margin-top:12px">
        <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:6px">Address</div>
        <div style="font-size:0.875rem;color:var(--text-secondary)">${p.address}</div>
      </div>`,
    footer: `<button class="btn btn-secondary" onclick="closeModal()">Close</button>`
  });
}
