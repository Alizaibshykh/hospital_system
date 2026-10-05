// ============================================
// Notifications Page
// ============================================

let _notifTab = 'all';

function renderNotifications() {
  const all = State.get('notifications');
  const unread = all.filter(n => !n.read);

  let filtered = all;
  if (_notifTab === 'unread') filtered = unread;
  else if (_notifTab !== 'all') filtered = all.filter(n => n.type === _notifTab);

  const colorMap = { green: '#10b981', blue: '#3b82f6', purple: '#8b5cf6', teal: '#0ea5e9', red: '#ef4444', amber: '#f59e0b' };

  return `
    <div class="page-body fade-in">
      <div class="page-header" style="display:flex;align-items:center;justify-content:space-between">
        <div>
          <div class="page-title">Notifications</div>
          <div class="page-subtitle">${unread.length} unread notifications</div>
        </div>
        ${unread.length > 0 ? `
          <button class="btn btn-secondary" onclick="markAllRead()">
            <i class="fa-solid fa-check-double"></i> Mark All Read
          </button>` : ''}
      </div>

      <!-- Tabs -->
      <div class="tabs" style="margin-bottom:20px">
        ${[
          { key: 'all', label: `All (${all.length})` },
          { key: 'unread', label: `Unread (${unread.length})` },
          { key: 'appointment', label: 'Appointments' },
          { key: 'reminder', label: 'Reminders' },
          { key: 'system', label: 'System' },
        ].map(t => `<div class="tab ${_notifTab === t.key ? 'active' : ''}" onclick="setNotifTab('${t.key}')">${t.label}</div>`).join('')}
      </div>

      <!-- Notifications List -->
      <div class="card">
        ${filtered.length === 0
          ? `<div class="empty-state"><i class="fa-solid fa-bell-slash"></i><h4>No notifications</h4><p>You're all caught up!</p></div>`
          : filtered.map(n => `
              <div class="notif-item ${!n.read ? 'unread' : ''}" onclick="markRead('${n.id}')">
                <div class="notif-icon" style="background:rgba(${n.color === 'green' ? '16,185,129' : n.color === 'blue' ? '59,130,246' : n.color === 'purple' ? '139,92,246' : n.color === 'teal' ? '14,165,233' : n.color === 'red' ? '239,68,68' : '245,158,11'},0.15)">
                  <i class="fa-solid ${n.icon}" style="color:${colorMap[n.color] || '#60a5fa'}"></i>
                </div>
                <div class="notif-text" style="flex:1">
                  <div class="title">${n.title}</div>
                  <div class="desc">${n.desc}</div>
                  <div class="time"><i class="fa-regular fa-clock" style="margin-right:4px"></i>${n.time}</div>
                </div>
                ${!n.read ? `<div style="width:8px;height:8px;background:var(--accent);border-radius:50%;flex-shrink:0;margin-top:4px"></div>` : ''}
              </div>
              <div class="divider" style="margin:0"></div>
            `).join('')}
      </div>
    </div>`;
}

function setNotifTab(tab) {
  _notifTab = tab;
  renderApp();
}

function markRead(id) {
  State.markNotificationRead(id);
  renderApp();
}

function markAllRead() {
  State.markAllNotificationsRead();
  showToast('All notifications marked as read', 'success');
  renderApp();
}
