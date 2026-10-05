// ============================================
// 404 Not Found Page
// ============================================

function renderNotFound() {
  return `
    <div class="page-body fade-in" style="display:flex;align-items:center;justify-content:center;min-height:70vh">
      <div style="text-align:center;max-width:440px">
        <div style="font-size:7rem;font-weight:900;background:linear-gradient(135deg,var(--accent),var(--teal));-webkit-background-clip:text;-webkit-text-fill-color:transparent;line-height:1;margin-bottom:16px">404</div>
        <h2 style="margin-bottom:12px">Page Not Found</h2>
        <p style="margin-bottom:28px">The page you're looking for doesn't exist or has been moved. Let's get you back on track.</p>
        <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
          <button class="btn btn-primary btn-lg" onclick="navigate('home')">
            <i class="fa-solid fa-house"></i> Go Home
          </button>
          <button class="btn btn-secondary btn-lg" onclick="history.back()">
            <i class="fa-solid fa-arrow-left"></i> Go Back
          </button>
        </div>
      </div>
    </div>`;
}
