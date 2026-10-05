// ============================================
// Find Doctors Page
// ============================================

function renderDoctors() {
  const filters = State.get('filters');
  const doctors = State.getFilteredDoctors();

  return `
    <div class="page-body fade-in">
      <div class="page-header">
        <div class="page-title">Find Doctors</div>
        <div class="page-subtitle">Browse our expert medical professionals</div>
      </div>

      <!-- Filter Bar -->
      <div class="card" style="margin-bottom:20px">
        <div class="filter-bar" style="margin-bottom:0">
          <div class="input-group" style="flex:2">
            <i class="input-icon fa-solid fa-magnifying-glass"></i>
            <input type="text" class="form-control" placeholder="Search by name, specialty, hospital..." 
              value="${filters.search || ''}" oninput="filterDoctors('search',this.value)" />
          </div>
          <select class="form-control" style="width:200px" onchange="filterDoctors('specialty',this.value)">
            ${SPECIALTIES.map(s => `<option value="${s}" ${filters.specialty === s ? 'selected' : ''}>${s}</option>`).join('')}
          </select>
          <select class="form-control" style="width:180px" onchange="filterDoctors('sort',this.value)">
            <option value="rating" ${filters.sort==='rating'?'selected':''}>Sort: Top Rated</option>
            <option value="experience" ${filters.sort==='experience'?'selected':''}>Sort: Experience</option>
            <option value="fee-low" ${filters.sort==='fee-low'?'selected':''}>Sort: Fee Low-High</option>
            <option value="fee-high" ${filters.sort==='fee-high'?'selected':''}>Sort: Fee High-Low</option>
          </select>
          <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:0.85rem;color:var(--text-secondary);white-space:nowrap">
            <input type="checkbox" ${filters.available ? 'checked' : ''} onchange="filterDoctors('available',this.checked)" style="accent-color:var(--accent)" />
            Available Only
          </label>
        </div>
      </div>

      <!-- Results Count -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
        <p style="font-size:0.875rem"><span style="color:var(--text-white);font-weight:600">${doctors.length}</span> doctors found</p>
        <div class="tabs" style="padding:3px">
          <div class="tab active" id="view-grid" onclick="setDoctorView('grid')"><i class="fa-solid fa-grip"></i></div>
          <div class="tab" id="view-list" onclick="setDoctorView('list')"><i class="fa-solid fa-list"></i></div>
        </div>
      </div>

      <!-- Doctor Grid -->
      <div id="doctors-container">
        ${doctors.length === 0
          ? `<div class="empty-state card"><i class="fa-solid fa-user-doctor"></i><h4>No doctors found</h4><p>Try adjusting your search or filters</p></div>`
          : `<div class="grid-3" id="doctor-grid">
              ${doctors.map(d => renderDoctorCard(d)).join('')}
            </div>`
        }
      </div>
    </div>`;
}

function filterDoctors(key, value) {
  const current = State.get('filters');
  State.set({ filters: { ...current, [key]: value } });
  // Re-render just the grid
  const container = document.getElementById('doctors-container');
  if (container) {
    const doctors = State.getFilteredDoctors();
    container.innerHTML = doctors.length === 0
      ? `<div class="empty-state card"><i class="fa-solid fa-user-doctor"></i><h4>No doctors found</h4><p>Try adjusting your search or filters</p></div>`
      : `<div class="grid-3 fade-in" id="doctor-grid">${doctors.map(d => renderDoctorCard(d)).join('')}</div>`;
  }
}

function setDoctorView(view) {
  document.getElementById('view-grid')?.classList.toggle('active', view === 'grid');
  document.getElementById('view-list')?.classList.toggle('active', view === 'list');
  const grid = document.getElementById('doctor-grid');
  if (grid) {
    if (view === 'list') {
      grid.style.gridTemplateColumns = '1fr';
    } else {
      grid.style.gridTemplateColumns = '';
      grid.className = 'grid-3 fade-in';
    }
  }
}
