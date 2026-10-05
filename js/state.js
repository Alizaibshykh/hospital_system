// ============================================
// MediCare Pro — State Management
// ============================================

const State = (() => {
  const LS_KEY = 'medicare_pro_state';

  const defaults = {
    currentUser: null,   // { id, name, role: 'patient'|'doctor', ... }
    doctors: MOCK_DOCTORS,
    appointments: MOCK_APPOINTMENTS,
    patients: MOCK_PATIENTS,
    notifications: MOCK_NOTIFICATIONS,
    currentPage: 'landing',
    selectedDoctor: null,
    filters: { specialty: 'All Specialties', search: '', available: false, sort: 'rating' }
  };

  let _state = { ...defaults };

  function load() {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge, but always reset page to login if not logged in
        _state = { ...defaults, ...parsed };
        if (!_state.currentUser) _state.currentPage = 'landing';
      }
    } catch (e) { /* ignore */ }
  }

  function save() {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify({
        currentUser: _state.currentUser,
        appointments: _state.appointments,
        notifications: _state.notifications,
      }));
    } catch (e) { /* ignore */ }
  }

  function get(key) { return key ? _state[key] : _state; }

  function set(updates) {
    _state = { ..._state, ...updates };
    save();
  }

  function login(role, name) {
    const user = role === 'doctor'
      ? { id: 'd1', name: 'Dr. Sarah Ahmed', role: 'doctor', specialty: 'Cardiologist', avatar: null, initials: 'SA' }
      : { id: 'p1', name: name || 'Ahmed Ali', role: 'patient', avatar: null, initials: 'AA' };
    set({ currentUser: user, currentPage: role === 'doctor' ? 'doctor-dashboard' : 'home' });
  }

  function logout() {
    set({ currentUser: null, currentPage: 'login' });
    localStorage.removeItem(LS_KEY);
  }

  function navigate(page, params = {}) {
    set({ currentPage: page, ...params });
  }

  function bookAppointment(appointment) {
    const newAppt = {
      id: 'a' + Date.now(),
      ...appointment,
      status: 'pending',
      patientId: _state.currentUser.id,
      patientName: _state.currentUser.name,
    };
    const updated = [..._state.appointments, newAppt];

    // Add notification
    const notif = {
      id: 'n' + Date.now(),
      type: 'appointment',
      title: 'Appointment Booked',
      desc: `Your appointment with ${appointment.doctorName} on ${appointment.date} at ${appointment.time} is pending confirmation.`,
      time: 'Just now',
      read: false,
      icon: 'fa-calendar-plus',
      color: 'green'
    };

    set({ appointments: updated, notifications: [notif, ..._state.notifications] });
    return newAppt;
  }

  function updateAppointmentStatus(id, status) {
    const updated = _state.appointments.map(a => a.id === id ? { ...a, status } : a);
    set({ appointments: updated });
  }

  function markNotificationRead(id) {
    const updated = _state.notifications.map(n => n.id === id ? { ...n, read: true } : n);
    set({ notifications: updated });
  }

  function markAllNotificationsRead() {
    const updated = _state.notifications.map(n => ({ ...n, read: true }));
    set({ notifications: updated });
  }

  function getUnreadCount() {
    return _state.notifications.filter(n => !n.read).length;
  }

  function getUserAppointments() {
    if (!_state.currentUser) return [];
    if (_state.currentUser.role === 'patient') {
      return _state.appointments.filter(a => a.patientId === _state.currentUser.id);
    } else {
      return _state.appointments.filter(a => a.doctorId === _state.currentUser.id);
    }
  }

  function getFilteredDoctors() {
    let docs = [..._state.doctors];
    const f = _state.filters;
    if (f.search) {
      const q = f.search.toLowerCase();
      docs = docs.filter(d => d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q) || d.hospital.toLowerCase().includes(q));
    }
    if (f.specialty && f.specialty !== 'All Specialties') {
      docs = docs.filter(d => d.specialty === f.specialty);
    }
    if (f.available) docs = docs.filter(d => d.available);
    if (f.sort === 'rating') docs.sort((a, b) => b.rating - a.rating);
    else if (f.sort === 'experience') docs.sort((a, b) => b.experience - a.experience);
    else if (f.sort === 'fee-low') docs.sort((a, b) => a.fee - b.fee);
    else if (f.sort === 'fee-high') docs.sort((a, b) => b.fee - a.fee);
    return docs;
  }

  load();
  return { get, set, login, logout, navigate, bookAppointment, updateAppointmentStatus, markNotificationRead, markAllNotificationsRead, getUnreadCount, getUserAppointments, getFilteredDoctors };
})();
