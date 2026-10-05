// ============================================
// Router — Maps pages to render functions
// ============================================

const ROUTES = {
  'landing': renderLanding,
  'ambulance': renderAmbulance,
  'login': renderLogin,
  'home': renderHome,
  'doctors': renderDoctors,
  'book-appointment': renderBookAppointment,
  'my-appointments': renderMyAppointments,
  'patient-profile': renderPatientProfile,
  'doctor-dashboard': renderDoctorDashboard,
  'doctor-patients': renderDoctorDashboard,
  'notifications': renderNotifications,
  '404': renderNotFound,
};

function renderPage(page) {
  const renderFn = ROUTES[page];
  if (!renderFn) return renderNotFound();
  return renderFn();
}
