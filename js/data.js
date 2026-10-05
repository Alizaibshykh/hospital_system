// ============================================
// MediCare Pro — Mock Data
// ============================================

const MOCK_DOCTORS = [
  {
    id: 'd1', name: 'Dr. Sarah Ahmed', specialty: 'Cardiologist', hospital: 'City Heart Hospital',
    experience: 12, rating: 4.9, reviews: 248, fee: 150, available: true,
    avatar: null, initials: 'SA', color: '#2563eb',
    bio: 'Specialist in interventional cardiology with 12 years of experience at top cardiac centers.',
    education: 'MBBS, MD Cardiology — Aga Khan University',
    languages: ['English', 'Urdu'],
    schedule: { Mon: true, Tue: true, Wed: false, Thu: true, Fri: true, Sat: false, Sun: false },
    slots: ['09:00 AM','09:30 AM','10:00 AM','10:30 AM','02:00 PM','02:30 PM','03:00 PM','04:00 PM'],
    bookedSlots: ['10:00 AM','02:30 PM'],
    patients: 1240, appointments: 48
  },
  {
    id: 'd2', name: 'Dr. Omar Khan', specialty: 'Neurologist', hospital: 'Neuro Care Institute',
    experience: 9, rating: 4.7, reviews: 185, fee: 200, available: true,
    avatar: null, initials: 'OK', color: '#8b5cf6',
    bio: 'Expert in neurological disorders, epilepsy, and brain imaging diagnostics.',
    education: 'MBBS, FCPS Neurology — CPSP Pakistan',
    languages: ['English', 'Urdu', 'Pashto'],
    schedule: { Mon: true, Tue: false, Wed: true, Thu: false, Fri: true, Sat: true, Sun: false },
    slots: ['08:30 AM','09:00 AM','09:30 AM','11:00 AM','11:30 AM','03:30 PM','04:00 PM','04:30 PM'],
    bookedSlots: ['09:00 AM','11:00 AM'],
    patients: 890, appointments: 32
  },
  {
    id: 'd3', name: 'Dr. Fatima Malik', specialty: 'Pediatrician', hospital: 'Children\'s Health Center',
    experience: 7, rating: 4.8, reviews: 312, fee: 100, available: true,
    avatar: null, initials: 'FM', color: '#10b981',
    bio: 'Dedicated pediatrician focused on child development, vaccinations, and newborn care.',
    education: 'MBBS, DCH — University of Health Sciences Lahore',
    languages: ['English', 'Urdu'],
    schedule: { Mon: true, Tue: true, Wed: true, Thu: false, Fri: true, Sat: true, Sun: false },
    slots: ['09:00 AM','09:30 AM','10:00 AM','10:30 AM','11:00 AM','12:00 PM','02:00 PM','02:30 PM'],
    bookedSlots: ['09:30 AM','12:00 PM'],
    patients: 2100, appointments: 62
  },
  {
    id: 'd4', name: 'Dr. Ali Hassan', specialty: 'Orthopedic Surgeon', hospital: 'Bone & Joint Clinic',
    experience: 15, rating: 4.9, reviews: 420, fee: 250, available: false,
    avatar: null, initials: 'AH', color: '#f59e0b',
    bio: 'Renowned for complex joint replacement surgeries and sports injury rehabilitation.',
    education: 'MBBS, FRCS Orthopaedics — Royal College of Surgeons UK',
    languages: ['English', 'Urdu'],
    schedule: { Mon: false, Tue: true, Wed: true, Thu: true, Fri: false, Sat: true, Sun: false },
    slots: ['10:00 AM','10:30 AM','11:00 AM','11:30 AM','03:00 PM','03:30 PM','04:00 PM'],
    bookedSlots: ['10:30 AM','11:00 AM','03:00 PM'],
    patients: 3200, appointments: 28
  },
  {
    id: 'd5', name: 'Dr. Zara Hussain', specialty: 'Dermatologist', hospital: 'Skin Care Clinic',
    experience: 6, rating: 4.6, reviews: 198, fee: 120, available: true,
    avatar: null, initials: 'ZH', color: '#ec4899',
    bio: 'Specialist in medical and cosmetic dermatology, acne treatment, and skin cancer screening.',
    education: 'MBBS, MCPS Dermatology — Pakistan College of Physicians',
    languages: ['English', 'Urdu'],
    schedule: { Mon: true, Tue: true, Wed: false, Thu: true, Fri: true, Sat: false, Sun: false },
    slots: ['09:30 AM','10:00 AM','10:30 AM','01:00 PM','01:30 PM','02:00 PM','04:30 PM'],
    bookedSlots: ['10:00 AM'],
    patients: 780, appointments: 35
  },
  {
    id: 'd6', name: 'Dr. Usman Raza', specialty: 'General Physician', hospital: 'Metro Medical Center',
    experience: 10, rating: 4.5, reviews: 560, fee: 80, available: true,
    avatar: null, initials: 'UR', color: '#0ea5e9',
    bio: 'Primary care physician providing comprehensive health assessments and chronic disease management.',
    education: 'MBBS — King Edward Medical University',
    languages: ['English', 'Urdu', 'Punjabi'],
    schedule: { Mon: true, Tue: true, Wed: true, Thu: true, Fri: true, Sat: true, Sun: false },
    slots: ['08:00 AM','08:30 AM','09:00 AM','09:30 AM','10:00 AM','02:00 PM','02:30 PM','03:00 PM','03:30 PM','04:00 PM'],
    bookedSlots: ['08:30 AM','09:00 AM','02:00 PM'],
    patients: 4500, appointments: 86
  },
];

const MOCK_APPOINTMENTS = [
  {
    id: 'a1', doctorId: 'd1', doctorName: 'Dr. Sarah Ahmed', specialty: 'Cardiologist',
    patientId: 'p1', patientName: 'Ahmed Ali', patientAge: 45,
    date: '2026-10-05', time: '09:00 AM', status: 'confirmed',
    type: 'Consultation', reason: 'Chest pain and shortness of breath',
    notes: 'Patient has history of hypertension', fee: 150, duration: 30
  },
  {
    id: 'a2', doctorId: 'd2', doctorName: 'Dr. Omar Khan', specialty: 'Neurologist',
    patientId: 'p1', patientName: 'Ahmed Ali', patientAge: 45,
    date: '2026-09-28', time: '11:30 AM', status: 'completed',
    type: 'Follow-up', reason: 'Recurring migraines',
    notes: 'MRI results reviewed, prescribed Topiramate', fee: 200, duration: 30
  },
  {
    id: 'a3', doctorId: 'd3', doctorName: 'Dr. Fatima Malik', specialty: 'Pediatrician',
    patientId: 'p2', patientName: 'Sara Ali', patientAge: 8,
    date: '2026-10-08', time: '10:00 AM', status: 'pending',
    type: 'Vaccination', reason: 'Annual vaccination schedule',
    notes: '', fee: 100, duration: 20
  },
  {
    id: 'a4', doctorId: 'd5', doctorName: 'Dr. Zara Hussain', specialty: 'Dermatologist',
    patientId: 'p1', patientName: 'Ahmed Ali', patientAge: 45,
    date: '2026-09-20', time: '10:30 AM', status: 'cancelled',
    type: 'Consultation', reason: 'Skin rash on forearm',
    notes: 'Patient cancelled — rescheduled', fee: 120, duration: 30
  },
  {
    id: 'a5', doctorId: 'd6', doctorName: 'Dr. Usman Raza', specialty: 'General Physician',
    patientId: 'p1', patientName: 'Ahmed Ali', patientAge: 45,
    date: '2026-10-12', time: '09:00 AM', status: 'confirmed',
    type: 'Check-up', reason: 'Routine annual health check',
    notes: '', fee: 80, duration: 30
  },
  {
    id: 'a6', doctorId: 'd4', doctorName: 'Dr. Ali Hassan', specialty: 'Orthopedic Surgeon',
    patientId: 'p3', patientName: 'Bilal Khan', patientAge: 32,
    date: '2026-10-06', time: '11:00 AM', status: 'pending',
    type: 'Consultation', reason: 'Knee pain after sports injury',
    notes: '', fee: 250, duration: 45
  },
  {
    id: 'a7', doctorId: 'd1', doctorName: 'Dr. Sarah Ahmed', specialty: 'Cardiologist',
    patientId: 'p4', patientName: 'Zainab Mirza', patientAge: 58,
    date: '2026-10-05', time: '10:30 AM', status: 'confirmed',
    type: 'Follow-up', reason: 'Post-surgery cardiac monitoring',
    notes: 'BP medications adjusted', fee: 150, duration: 30
  },
];

const MOCK_PATIENTS = [
  { id: 'p1', name: 'Ahmed Ali', age: 45, gender: 'Male', phone: '+92 300 1234567', email: 'ahmed@example.com', bloodGroup: 'A+', address: 'House 12, Gulberg III, Lahore', lastVisit: '2026-09-28', totalVisits: 8, conditions: ['Hypertension', 'Migraine'] },
  { id: 'p2', name: 'Sara Ali', age: 8, gender: 'Female', phone: '+92 300 1234567', email: 'sara.parent@example.com', bloodGroup: 'B+', address: 'House 12, Gulberg III, Lahore', lastVisit: '2026-08-15', totalVisits: 3, conditions: [] },
  { id: 'p3', name: 'Bilal Khan', age: 32, gender: 'Male', phone: '+92 321 9876543', email: 'bilal@example.com', bloodGroup: 'O-', address: 'Flat 5, DHA Phase 5, Karachi', lastVisit: '2026-09-10', totalVisits: 2, conditions: ['Sports Injury'] },
  { id: 'p4', name: 'Zainab Mirza', age: 58, gender: 'Female', phone: '+92 333 5551234', email: 'zainab@example.com', bloodGroup: 'AB+', address: 'Sector F-7, Islamabad', lastVisit: '2026-09-30', totalVisits: 12, conditions: ['Heart Disease', 'Diabetes'] },
];

const MOCK_NOTIFICATIONS = [
  { id: 'n1', type: 'appointment', title: 'Appointment Confirmed', desc: 'Your appointment with Dr. Sarah Ahmed on Oct 5 at 9:00 AM is confirmed.', time: '2 hours ago', read: false, icon: 'fa-calendar-check', color: 'green' },
  { id: 'n2', type: 'reminder', title: 'Appointment Reminder', desc: 'You have an appointment with Dr. Usman Raza tomorrow at 9:00 AM.', time: '5 hours ago', read: false, icon: 'fa-bell', color: 'blue' },
  { id: 'n3', type: 'result', title: 'Lab Results Available', desc: 'Your blood test results from Sept 28 are now available.', time: '1 day ago', read: true, icon: 'fa-flask', color: 'purple' },
  { id: 'n4', type: 'payment', title: 'Payment Successful', desc: 'Payment of Rs. 200 for Dr. Omar Khan has been processed.', time: '2 days ago', read: true, icon: 'fa-receipt', color: 'teal' },
  { id: 'n5', type: 'cancelled', title: 'Appointment Cancelled', desc: 'Your appointment with Dr. Zara Hussain on Sept 20 was cancelled.', time: '3 days ago', read: true, icon: 'fa-calendar-xmark', color: 'red' },
  { id: 'n6', type: 'system', title: 'Profile Updated', desc: 'Your profile information has been updated successfully.', time: '1 week ago', read: true, icon: 'fa-user-check', color: 'amber' },
];

const SPECIALTIES = [
  'All Specialties', 'Cardiologist', 'Neurologist', 'Pediatrician',
  'Orthopedic Surgeon', 'Dermatologist', 'General Physician',
  'Gynecologist', 'Ophthalmologist', 'ENT Specialist', 'Psychiatrist'
];

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
