// ============================================
// Book Appointment Page
// ============================================

let _calYear, _calMonth, _selectedDate, _selectedTime, _selectedDoctorId;

function renderBookAppointment() {
  const today = new Date();
  _calYear = _calYear || today.getFullYear();
  _calMonth = _calMonth !== undefined ? _calMonth : today.getMonth();
  _selectedDate = _selectedDate || null;
  _selectedTime = _selectedTime || null;

  const doctors = State.get('doctors');
  const preSelected = State.get('selectedDoctor');
  if (preSelected && !_selectedDoctorId) _selectedDoctorId = preSelected.id;
  const selectedDoc = doctors.find(d => d.id === _selectedDoctorId) || null;

  const bookedDates = State.get('appointments')
    .filter(a => a.doctorId === _selectedDoctorId && a.status !== 'cancelled')
    .map(a => a.date);

  return `
    <div class="page-body fade-in">
      <div class="page-header">
        <div class="page-title">Book Appointment</div>
        <div class="page-subtitle">Schedule a visit with a doctor</div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 380px;gap:20px;align-items:start">
        <!-- Left: Steps -->
        <div style="display:flex;flex-direction:column;gap:16px">

          <!-- Step 1: Select Doctor -->
          <div class="card">
            <div class="card-header">
              <div class="section-title" style="margin:0"><span style="background:var(--accent);color:white;width:22px;height:22px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:0.75rem;margin-right:8px">1</span> Select Doctor</div>
            </div>
            <select class="form-control" onchange="selectBookDoctor(this.value)" id="book-doctor-select">
              <option value="">-- Choose a Doctor --</option>
              ${doctors.map(d => `<option value="${d.id}" ${_selectedDoctorId === d.id ? 'selected' : ''}>${d.name} — ${d.specialty} (Rs. ${d.fee})</option>`).join('')}
            </select>
            ${selectedDoc ? `
              <div style="margin-top:12px;padding:14px;background:var(--bg-card2);border:1px solid var(--border);border-radius:var(--radius);display:flex;gap:12px;align-items:center">
                <div class="avatar avatar-md" style="background:${selectedDoc.color}">${selectedDoc.initials}</div>
                <div style="flex:1">
                  <div style="font-weight:600;color:var(--text-white)">${selectedDoc.name}</div>
                  <div style="font-size:0.8rem;color:var(--accent-light)">${selectedDoc.specialty} • ${selectedDoc.hospital}</div>
                  <div style="font-size:0.78rem;color:var(--text-muted);margin-top:2px">${selectedDoc.experience} yrs exp • Rs. ${selectedDoc.fee}/visit</div>
                </div>
                <span class="badge ${selectedDoc.available ? 'badge-online' : 'badge-cancelled'}">${selectedDoc.available ? 'Available' : 'Unavailable'}</span>
              </div>` : ''}
          </div>

          <!-- Step 2: Select Date -->
          <div class="card" id="step-date-card" ${!_selectedDoctorId ? 'style="opacity:0.5;pointer-events:none"' : ''}>
            <div class="card-header">
              <div class="section-title" style="margin:0"><span style="background:var(--accent);color:white;width:22px;height:22px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:0.75rem;margin-right:8px">2</span> Select Date</div>
              ${_selectedDate ? `<span style="font-size:0.85rem;color:var(--accent-light)">${_selectedDate}</span>` : ''}
            </div>
            <div id="calendar-container">
              ${renderCalendar(_calYear, _calMonth, _selectedDate, null, bookedDates)}
            </div>
          </div>

          <!-- Step 3: Select Time -->
          <div class="card" id="step-time-card" ${!_selectedDate ? 'style="opacity:0.5;pointer-events:none"' : ''}>
            <div class="card-header">
              <div class="section-title" style="margin:0"><span style="background:var(--accent);color:white;width:22px;height:22px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:0.75rem;margin-right:8px">3</span> Select Time Slot</div>
              ${_selectedTime ? `<span style="font-size:0.85rem;color:var(--accent-light)">${_selectedTime}</span>` : ''}
            </div>
            <div class="time-slots" id="time-slots">
              ${selectedDoc ? selectedDoc.slots.map(slot => {
                const booked = selectedDoc.bookedSlots.includes(slot);
                return `<div class="time-slot ${booked ? 'booked' : ''} ${_selectedTime === slot ? 'selected' : ''}"
                  onclick="${booked ? '' : `selectTimeSlot('${slot}')`}">${slot}</div>`;
              }).join('') : `<p style="color:var(--text-muted);font-size:0.875rem">Please select a doctor first</p>`}
            </div>
          </div>

          <!-- Step 4: Visit Details -->
          <div class="card" id="step-details-card" ${!_selectedTime ? 'style="opacity:0.5;pointer-events:none"' : ''}>
            <div class="card-header">
              <div class="section-title" style="margin:0"><span style="background:var(--accent);color:white;width:22px;height:22px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:0.75rem;margin-right:8px">4</span> Visit Details</div>
            </div>
            <div class="grid-2" style="gap:12px">
              <div class="form-group" style="margin:0">
                <label class="form-label">Visit Type</label>
                <select class="form-control" id="book-type">
                  <option>Consultation</option>
                  <option>Follow-up</option>
                  <option>Check-up</option>
                  <option>Vaccination</option>
                  <option>Emergency</option>
                </select>
              </div>
              <div class="form-group" style="margin:0">
                <label class="form-label">Patient Name</label>
                <input type="text" class="form-control" id="book-patient-name" value="${State.get('currentUser')?.name || ''}" />
              </div>
            </div>
            <div class="form-group" style="margin-top:12px">
              <label class="form-label">Reason for Visit</label>
              <textarea class="form-control" id="book-reason" rows="3" placeholder="Describe your symptoms or reason for visit..." style="resize:vertical"></textarea>
            </div>
          </div>
        </div>

        <!-- Right: Summary -->
        <div style="position:sticky;top:calc(var(--header-height) + 20px)">
          <div class="card">
            <div class="section-title"><i class="fa-solid fa-clipboard-list"></i> Booking Summary</div>

            ${[
              { label: 'Doctor', value: selectedDoc?.name || '—', icon: 'fa-user-doctor' },
              { label: 'Specialty', value: selectedDoc?.specialty || '—', icon: 'fa-stethoscope' },
              { label: 'Date', value: _selectedDate || '—', icon: 'fa-calendar' },
              { label: 'Time', value: _selectedTime || '—', icon: 'fa-clock' },
              { label: 'Hospital', value: selectedDoc?.hospital || '—', icon: 'fa-hospital' },
            ].map(s => `
              <div style="display:flex;gap:10px;padding:8px 0;border-bottom:1px solid var(--border)">
                <i class="fa-solid ${s.icon}" style="color:var(--accent-light);width:16px;margin-top:2px;font-size:0.8rem"></i>
                <div>
                  <div style="font-size:0.72rem;color:var(--text-muted)">${s.label}</div>
                  <div style="font-size:0.875rem;color:var(--text-primary)">${s.value}</div>
                </div>
              </div>`).join('')}

            <div style="padding:14px 0;border-bottom:1px solid var(--border)">
              <div style="display:flex;justify-content:space-between;font-size:0.85rem;color:var(--text-secondary);margin-bottom:6px">
                <span>Consultation Fee</span>
                <span>Rs. ${selectedDoc?.fee || '0'}</span>
              </div>
              <div style="display:flex;justify-content:space-between;font-size:0.85rem;color:var(--text-secondary);margin-bottom:6px">
                <span>Platform Fee</span>
                <span>Rs. 50</span>
              </div>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:1rem;font-weight:700;color:var(--text-white);padding-top:12px">
              <span>Total</span>
              <span style="color:var(--accent-light)">Rs. ${selectedDoc ? selectedDoc.fee + 50 : '—'}</span>
            </div>

            <button class="btn btn-primary w-full" style="margin-top:16px"
              ${!_selectedDate || !_selectedTime || !_selectedDoctorId ? 'disabled' : ''}
              onclick="confirmBooking()">
              <i class="fa-solid fa-calendar-check"></i> Confirm Booking
            </button>
            <p style="font-size:0.72rem;color:var(--text-muted);text-align:center;margin-top:8px">
              Free cancellation up to 24 hours before appointment
            </p>
          </div>
        </div>
      </div>
    </div>`;
}

function selectBookDoctor(id) {
  _selectedDoctorId = id;
  _selectedDate = null;
  _selectedTime = null;
  State.set({ selectedDoctor: State.get('doctors').find(d => d.id === id) || null });
  renderApp();
}

function calSelectDate(date) {
  _selectedDate = date;
  _selectedTime = null;
  renderApp();
}

function calPrev() {
  if (_calMonth === 0) { _calMonth = 11; _calYear--; }
  else _calMonth--;
  const container = document.getElementById('calendar-container');
  if (container) {
    const bookedDates = State.get('appointments').filter(a => a.doctorId === _selectedDoctorId && a.status !== 'cancelled').map(a => a.date);
    container.innerHTML = renderCalendar(_calYear, _calMonth, _selectedDate, null, bookedDates);
  }
}

function calNext() {
  if (_calMonth === 11) { _calMonth = 0; _calYear++; }
  else _calMonth++;
  const container = document.getElementById('calendar-container');
  if (container) {
    const bookedDates = State.get('appointments').filter(a => a.doctorId === _selectedDoctorId && a.status !== 'cancelled').map(a => a.date);
    container.innerHTML = renderCalendar(_calYear, _calMonth, _selectedDate, null, bookedDates);
  }
}

function selectTimeSlot(slot) {
  _selectedTime = slot;
  document.querySelectorAll('.time-slot').forEach(el => {
    el.classList.toggle('selected', el.textContent.trim() === slot);
  });
  // Also update confirm button
  const btn = document.querySelector('.card button.btn-primary[onclick="confirmBooking()"]');
  if (btn) btn.disabled = false;
  renderApp();
}

function confirmBooking() {
  const doc = State.get('doctors').find(d => d.id === _selectedDoctorId);
  if (!doc || !_selectedDate || !_selectedTime) return;

  const type = document.getElementById('book-type')?.value || 'Consultation';
  const reason = document.getElementById('book-reason')?.value || '';

  const appt = State.bookAppointment({
    doctorId: doc.id, doctorName: doc.name, specialty: doc.specialty,
    date: _selectedDate, time: _selectedTime,
    type, reason, fee: doc.fee, duration: 30,
    patientAge: 45
  });

  // Reset state
  _selectedDoctorId = null;
  _selectedDate = null;
  _selectedTime = null;
  _calYear = null;
  _calMonth = undefined;
  State.set({ selectedDoctor: null });

  showToast('Appointment booked successfully! Pending confirmation.', 'success');

  openModal({
    title: 'Booking Confirmed!',
    size: 'modal-sm',
    body: `
      <div style="text-align:center;padding:10px 0">
        <div style="width:64px;height:64px;background:rgba(16,185,129,0.15);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:1.8rem;color:var(--success)">
          <i class="fa-solid fa-circle-check"></i>
        </div>
        <h3 style="margin-bottom:8px">Appointment Booked!</h3>
        <p>With <strong>${doc.name}</strong><br>on <strong>${_selectedDate || appt.date}</strong> at <strong>${appt.time}</strong></p>
        <p style="font-size:0.8rem;margin-top:10px;color:var(--text-muted)">Booking ID: #${appt.id}</p>
      </div>`,
    footer: `
      <button class="btn btn-secondary" onclick="closeModal()">Close</button>
      <button class="btn btn-primary" onclick="closeModal();navigate('my-appointments')">View Appointments</button>
    `
  });
}
