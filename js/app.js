// ============================================
// MediCare Pro — Main App Entry Point
// ============================================

// Pages that show WITHOUT sidebar/header
const PUBLIC_PAGES = ['landing', 'login', 'ambulance'];

function renderApp() {
  const app = document.getElementById('app');
  const page = State.get('currentPage');
  const user = State.get('currentUser');

  // If no user and trying to access private page, redirect to landing
  if (!user && !PUBLIC_PAGES.includes(page)) {
    State.set({ currentPage: 'landing' });
    app.innerHTML = renderPage('landing');
    return;
  }

  // Public pages — no sidebar/header
  if (PUBLIC_PAGES.includes(page)) {
    app.innerHTML = renderPage(page);
    if (page === 'landing') initLanding3D();
    if (page === 'ambulance') initAmbulancePage3D();
    return;
  }

  // Authenticated layout
  app.innerHTML = `
    ${renderSidebar()}
    <div class="main-content">
      ${renderHeader()}
      ${renderPage(page)}
    </div>`;
}

// Boot — always start on landing page
document.addEventListener('DOMContentLoaded', () => {
  // Always start fresh on landing (ignore saved page)
  State.set({ currentPage: 'landing' });
  renderApp();
});
