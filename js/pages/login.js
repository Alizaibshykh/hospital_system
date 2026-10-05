// ============================================
// Login Page
// ============================================

let selectedRole = 'patient';

function renderLogin() {
  return `
    <div class="login-page">
      <div class="login-left">
        <div style="position:relative;z-index:1">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:40px">
            <div class="logo-icon" style="width:50px;height:50px;font-size:1.4rem"><i class="fa-solid fa-heart-pulse"></i></div>
            <div>
              <div style="font-size:1.3rem;font-weight:800;color:white">MediCare Pro</div>
              <div style="font-size:0.75rem;color:rgba(255,255,255,0.6);letter-spacing:0.1em;text-transform:uppercase">Hospital Management System</div>
            </div>
          </div>

          <h1 style="font-size:2.8rem;font-weight:800;color:white;line-height:1.2;margin-bottom:16px">
            Your Health,<br>Our Priority
          </h1>
          <p style="color:rgba(255,255,255,0.7);font-size:1rem;margin-bottom:40px;max-width:400px;line-height:1.7">
            A comprehensive hospital management platform connecting patients with world-class healthcare professionals.
          </p>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
            ${[
              { icon: 'fa-calendar-check', label: '50K+', sub: 'Appointments' },
              { icon: 'fa-user-doctor', label: '200+', sub: 'Doctors' },
              { icon: 'fa-hospital', label: '30+', sub: 'Hospitals' },
              { icon: 'fa-star', label: '4.9', sub: 'Rating' },
            ].map(s => `
              <div style="padding:16px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);border-radius:12px;backdrop-filter:blur(6px)">
                <i class="fa-solid ${s.icon}" style="color:rgba(255,255,255,0.7);margin-bottom:8px;font-size:1.1rem;display:block"></i>
                <div style="font-size:1.3rem;font-weight:800;color:white">${s.label}</div>
                <div style="font-size:0.75rem;color:rgba(255,255,255,0.6)">${s.sub}</div>
              </div>`).join('')}
          </div>
        </div>
      </div>

      <div class="login-right">
        <div style="margin-bottom:32px">
          <h2 style="font-size:1.8rem;margin-bottom:6px">Welcome Back</h2>
          <p>Sign in to your account to continue</p>
        </div>

        <div class="section-title" style="margin-bottom:8px"><i class="fa-solid fa-user-tag"></i> Login as</div>
        <div class="role-selector" id="role-selector">
          <div class="role-card active" id="role-patient" onclick="selectRole('patient')">
            <i class="fa-solid fa-user-injured"></i>
            <span>Patient</span>
          </div>
          <div class="role-card" id="role-doctor" onclick="selectRole('doctor')">
            <i class="fa-solid fa-stethoscope"></i>
            <span>Doctor</span>
          </div>
        </div>

        <form onsubmit="handleLogin(event)">
          <div class="form-group">
            <label class="form-label">Email Address</label>
            <div class="input-group">
              <i class="input-icon fa-solid fa-envelope"></i>
              <input type="email" class="form-control" id="login-email" placeholder="you@example.com" value="demo@medicare.com" required />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Password</label>
            <div class="input-group">
              <i class="input-icon fa-solid fa-lock"></i>
              <input type="password" class="form-control" id="login-password" placeholder="Enter your password" value="demo1234" required />
            </div>
          </div>

          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px">
            <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:0.85rem;color:var(--text-secondary)">
              <input type="checkbox" checked style="accent-color:var(--accent)" /> Remember me
            </label>
            <a href="#" style="font-size:0.85rem" onclick="showToast('Password reset link sent to your email.','info');return false">Forgot password?</a>
          </div>

          <button type="submit" class="btn btn-primary w-full btn-lg" id="login-btn">
            <i class="fa-solid fa-arrow-right-to-bracket"></i>
            Sign In
          </button>
        </form>

        <div class="divider" style="margin:20px 0"></div>

        <p style="text-align:center;font-size:0.85rem;color:var(--text-muted)">
          Demo: click Sign In to enter as <strong style="color:var(--accent-light)" id="role-demo-text">Patient</strong>
        </p>

        <div style="margin-top:24px;text-align:center">
          <p style="font-size:0.85rem;color:var(--text-secondary)">
            New patient? <a href="#" onclick="showToast('Registration feature coming soon!','info');return false">Create account</a>
          </p>
        </div>
      </div>
    </div>`;
}

function selectRole(role) {
  selectedRole = role;
  document.querySelectorAll('.role-card').forEach(c => c.classList.remove('active'));
  document.getElementById(`role-${role}`).classList.add('active');
  document.getElementById('role-demo-text').textContent = role === 'doctor' ? 'Doctor' : 'Patient';
}

function handleLogin(e) {
  e.preventDefault();
  const btn = document.getElementById('login-btn');
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Signing In...';

  setTimeout(() => {
    State.login(selectedRole);
    showToast(`Welcome back, ${State.get('currentUser').name}!`, 'success');
    renderApp();
  }, 800);
}
