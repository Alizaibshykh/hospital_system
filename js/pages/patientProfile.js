// ============================================
// Patient / Doctor Profile Page
// ============================================

let _profileTab = 'personal';
let _editMode = false;

function renderPatientProfile() {
  const user = State.get('currentUser');
  const isDoctor = user?.role === 'doctor';
  const docData = isDoctor ? State.get('doctors').find(d => d.id === user.id) : null;
  const patientData = !isDoctor ? MOCK_PATIENTS.find(p => p.id === user.id) : null;
  const appointments = State.getUserAppointments();

  return `
    <div class="page-body fade-in">
      <!-- Profile Hero -->
      <div class="profile-hero">
        <div class="avatar avatar-xl" style="background:${isDoctor ? '#2563eb' : '#8b5cf6'}">${user.initials || user.name.slice(0,2).toUpperCase()}</div>
        <div style="flex:1;position:relative;z-index:1">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:4px">
            <h2>${user.name}</h2>
            <span class="badge badge-online"><i class="fa-solid fa-circle" style="font-size:0.5rem"></i> Active</span>
          </div>
          <p>${isDoctor ? (docData?.specialty || 'Doctor') + ' • ' + (docData?.hospital || '') : 'Patient • Member since 2024'}</p>
          <div style="display:flex;gap:16px;margin-top:12px;flex-wrap:wrap">
            ${isDoctor ? `
              <div style="font-size:0.85rem;color:var(--text-secondary)"><i class="fa-solid fa-user-group" style="color:var(--accent-light);margin-right:6px"></i>${docData?.patients?.toLocaleString() || 0} Patients</div>
              <div style="font-size:0.85rem;color:var(--text-secondary)"><i class="fa-solid fa-star" style="color:#f59e0b;margin-right:6px"></i>${docData?.rating || 0} Rating</div>
              <div style="font-size:0.85rem;color:var(--text-secondary)"><i class="fa-solid fa-briefcase-medical" style="color:var(--accent-light);margin-right:6px"></i>${docData?.experience || 0} Years Experience</div>
            ` : `
              <div style="font-size:0.85rem;color:var(--text-secondary)"><i class="fa-solid fa-calendar-days" style="color:var(--accent-light);margin-right:6px"></i>${appointments.length} Appointments</div>
              <div style="font-size:0.85rem;color:var(--text-secondary)"><i class="fa-solid fa-tint" style="color:#ef4444;margin-right:6px"></i>${patientData?.bloodGroup || 'N/A'} Blood Group</div>
              <div style="font-size:0.85rem;color:var(--text-secondary)"><i class="fa-solid fa-calendar" style="color:var(--accent-light);margin-right:6px"></i>Age ${patientData?.age || '—'}</div>
            `}
          </div>
        </div>
        <button class="btn btn-secondary" onclick="toggleEditMode()">
          <i class="fa-solid ${_editMode ? 'fa-xmark' : 'fa-pen'}"></i> ${_editMode ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <!-- Tabs -->
      <div class="tabs" style="margin-bottom:20px">
        ${[
          { key: 'personal', label: 'Personal Info', icon: 'fa-user' },
          { key: 'health', label: isDoctor ? 'Professional' : 'Health Records', icon: isDoctor ? 'fa-stethoscope' : 'fa-heart-pulse' },
          { key: 'appointments', label: 'Appointments', icon: 'fa-calendar' },
          { key: 'security', label: 'Security', icon: 'fa-shield' },
        ].map(t => `<div class="tab ${_profileTab === t.key ? 'active' : ''}" onclick="setProfileTab('${t.key}')"><i class="fa-solid ${t.icon}" style="margin-right:6px"></i>${t.label}</div>`).join('')}
      </div>

      <!-- Tab Content -->
      <div id="profile-tab-content">
        ${renderProfileTab(user, isDoctor, docData, patientData, appointments)}
      </div>
    </div>`;
}

function renderProfileTab(user, isDoctor, docData, patientData, appointments) {
  if (_profileTab === 'personal') {
    return `
      <div class="card fade-in">
        <div class="card-header">
          <div class="section-title" style="margin:0"><i class="fa-solid fa-user"></i> Personal Information</div>
          ${_editMode ? `<button class="btn btn-primary btn-sm" onclick="saveProfile()"><i class="fa-solid fa-floppy-disk"></i> Save</button>` : ''}
        </div>
        <div class="grid-2" style="gap:16px">
          ${[
            { label: 'Full Name', value: user.name, id: 'p-name', icon: 'fa-user' },
            { label: 'Email Address', value: `${user.id}@medicare.com`, id: 'p-email', icon: 'fa-envelope' },
            { label: 'Phone Number', value: patientData?.phone || docData?.phone || '+92 300 0000000', id: 'p-phone', icon: 'fa-phone' },
            { label: 'Gender', value: patientData?.gender || 'Male', id: 'p-gender', icon: 'fa-venus-mars' },
            { label: 'Date of Birth', value: '1980-05-15', id: 'p-dob', icon: 'fa-calendar-days' },
            { label: 'Address', value: patientData?.address || docData?.address || 'Lahore, Pakistan', id: 'p-address', icon: 'fa-location-dot' },
          ].map(f => `
            <div class="form-group" style="margin:0">
              <label class="form-label"><i class="fa-solid ${f.icon}" style="margin-right:4px;color:var(--accent-light)"></i>${f.label}</label>
              ${_editMode
                ? `<input type="text" class="form-control" id="${f.id}" value="${f.value}" />`
                : `<div style="padding:10px 14px;background:var(--bg-card2);border:1px solid var(--border);border-radius:var(--radius);font-size:0.875rem;color:var(--text-primary)">${f.value}</div>`
              }
            </div>`).join('')}
        </div>
      </div>`;
  }

  if (_profileTab === 'health') {
    if (isDoctor && docData) {
      return `
        <div style="display:grid;gap:16px">
          <div class="card fade-in">
            <div class="section-title"><i class="fa-solid fa-stethoscope"></i> Professional Info</div>
            <div class="grid-2" style="gap:12px">
              ${[
                { label: 'Specialty', value: docData.specialty },
                { label: 'Experience', value: docData.experience + ' years' },
                { label: 'Hospital', value: docData.hospital },
                { label: 'Consultation Fee', value: 'Rs. ' + docData.fee },
                { label: 'Education', value: docData.education },
                { label: 'Languages', value: docData.languages.join(', ') },
              ].map(f => `
                <div style="padding:12px;background:var(--bg-card2);border-radius:var(--radius);border:1px solid var(--border)">
                  <div style="font-size:0.72rem;color:var(--text-muted);margin-bottom:4px">${f.label}</div>
                  <div style="font-size:0.875rem;color:var(--text-primary)">${f.value}</div>
                </div>`).join('')}
            </div>
          </div>
          <div class="card fade-in">
            <div class="section-title"><i class="fa-solid fa-calendar-week"></i> Weekly Schedule</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap">
              ${Object.entries(docData.schedule).map(([day, available]) => `
                <div style="padding:10px 16px;border-radius:var(--radius);border:1px solid ${available ? 'rgba(16,185,129,0.3)' : 'var(--border)'};
                     background:${available ? 'rgba(16,185,129,0.08)' : 'var(--bg-card2)'};text-align:center;min-width:70px">
                  <div style="font-size:0.75rem;font-weight:600;color:${available ? '#10b981' : 'var(--text-muted)'}">${day}</div>
                  <i class="fa-solid ${available ? 'fa-check' : 'fa-xmark'}" style="color:${available ? '#10b981' : 'var(--text-muted)'};font-size:0.8rem;margin-top:4px"></i>
                </div>`).join('')}
            </div>
          </div>
          <div class="card fade-in">
            <div class="section-title"><i class="fa-solid fa-info-circle"></i> Bio</div>
            <p>${docData.bio}</p>
          </div>
        </div>`;
    }

    return `
      <div style="display:grid;gap:16px">
        <div class="card fade-in">
          <div class="section-title"><i class="fa-solid fa-heart-pulse"></i> Health Information</div>
          <div class="grid-2" style="gap:12px">
            ${[
              { label: 'Blood Group', value: patientData?.bloodGroup || 'A+', icon: 'fa-tint', color: '#ef4444' },
              { label: 'Allergies', value: 'None reported', icon: 'fa-triangle-exclamation', color: '#f59e0b' },
              { label: 'Height', value: '175 cm', icon: 'fa-ruler-vertical', color: '#8b5cf6' },
              { label: 'Weight', value: '72 kg', icon: 'fa-weight-scale', color: '#0ea5e9' },
            ].map(f => `
              <div style="padding:14px;background:var(--bg-card2);border:1px solid var(--border);border-radius:var(--radius);display:flex;align-items:center;gap:10px">
                <div style="width:38px;height:38px;background:rgba(0,0,0,0.3);border-radius:8px;display:flex;align-items:center;justify-content:center">
                  <i class="fa-solid ${f.icon}" style="color:${f.color}"></i>
                </div>
                <div>
                  <div style="font-size:0.72rem;color:var(--text-muted)">${f.label}</div>
                  <div style="font-size:0.9rem;font-weight:600;color:var(--text-white)">${f.value}</div>
                </div>
              </div>`).join('')}
          </div>
        </div>

        ${patientData?.conditions?.length ? `
          <div class="card fade-in">
            <div class="section-title"><i class="fa-solid fa-notes-medical"></i> Medical Conditions</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap">
              ${patientData.conditions.map(c => `<span class="badge badge-primary" style="font-size:0.8rem;padding:6px 12px">${c}</span>`).join('')}
            </div>
          </div>` : ''}
      </div>`;
  }

  if (_profileTab === 'appointments') {
    const recent = appointments.slice(0, 5);
    return `
      <div class="card fade-in">
        <div class="card-header">
          <div class="section-title" style="margin:0"><i class="fa-solid fa-calendar"></i> Recent Appointments</div>
          <button class="btn btn-ghost btn-sm" onclick="navigate('my-appointments')">View All</button>
        </div>
        ${recent.length === 0
          ? `<div class="empty-state"><i class="fa-solid fa-calendar-xmark"></i><h4>No appointments yet</h4></div>`
          : recent.map(a => renderAppointmentCard(a)).join('')}
      </div>`;
  }

  if (_profileTab === 'security') {
    return `
      <div class="card fade-in">
        <div class="section-title"><i class="fa-solid fa-lock"></i> Change Password</div>
        <div style="max-width:400px;display:grid;gap:12px">
          ${['Current Password','New Password','Confirm New Password'].map(label => `
            <div class="form-group" style="margin:0">
              <label class="form-label">${label}</label>
              <div class="input-group">
                <i class="input-icon fa-solid fa-lock"></i>
                <input type="password" class="form-control" placeholder="••••••••" />
              </div>
            </div>`).join('')}
          <button class="btn btn-primary" style="width:fit-content" onclick="showToast('Password updated successfully!','success')">
            <i class="fa-solid fa-key"></i> Update Password
          </button>
        </div>
        <div class="divider" style="margin:20px 0"></div>
        <div class="section-title"><i class="fa-solid fa-shield-halved"></i> Two-Factor Authentication</div>
        <div style="display:flex;align-items:center;justify-content:space-between;padding:14px;background:var(--bg-card2);border:1px solid var(--border);border-radius:var(--radius)">
          <div>
            <div style="font-weight:500;color:var(--text-white)">SMS Authentication</div>
            <div style="font-size:0.8rem;color:var(--text-secondary)">Protect your account with OTP verification</div>
          </div>
          <label class="toggle" style="cursor:pointer;position:relative;width:44px;height:24px">
            <input type="checkbox" style="opacity:0;width:0;height:0" />
            <span onclick="this.style.background=this.style.background==''||this.style.background==='var(--border)'?'var(--accent)':'var(--border)';showToast('2FA settings updated','success')"
              style="position:absolute;inset:0;background:var(--border);border-radius:12px;transition:0.3s;cursor:pointer;display:flex;align-items:center;padding:2px">
              <span style="width:20px;height:20px;border-radius:50%;background:white;transition:0.3s"></span>
            </span>
          </label>
        </div>
      </div>`;
  }

  return '';
}

function setProfileTab(tab) {
  _profileTab = tab;
  const content = document.getElementById('profile-tab-content');
  const user = State.get('currentUser');
  const isDoctor = user?.role === 'doctor';
  const docData = isDoctor ? State.get('doctors').find(d => d.id === user.id) : null;
  const patientData = !isDoctor ? MOCK_PATIENTS.find(p => p.id === user.id) : null;
  const appointments = State.getUserAppointments();
  if (content) content.innerHTML = renderProfileTab(user, isDoctor, docData, patientData, appointments);
  // Update tabs
  document.querySelectorAll('.tabs .tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tabs .tab').forEach(t => {
    if (t.getAttribute('onclick')?.includes(tab)) t.classList.add('active');
  });
}

function toggleEditMode() {
  _editMode = !_editMode;
  renderApp();
}

function saveProfile() {
  _editMode = false;
  showToast('Profile updated successfully!', 'success');
  renderApp();
}
