const calendar = document.querySelector('.calendar');

// ===============================
// DATE STATE
// ===============================
let currentDate = new Date();
let currentMonth = currentDate.getMonth(); // 0–11
let currentYear = currentDate.getFullYear();

// ===============================
// GOOGLE SHEET CONFIG
// ===============================
const SHEET_ID = '16nbAR20INmfNgd_RRsgbt6ag9dSe5-5YF-3kK1YsrV4';
const SHEET_NAME = 'Sheet1';
const url = `https://opensheet.elk.sh/${SHEET_ID}/${SHEET_NAME}`;

let allEvents = {};

// ===============================
// FETCH EVENTS
// ===============================
fetch(url)
  .then(res => res.json())
  .then(data => {
    data.forEach(row => {
      const day = parseInt(row.Day);
      if (isNaN(day)) return;

      if (!allEvents[day]) allEvents[day] = [];

      const normalizedTitle = (row.Event || '')
        .trim()
        .toLowerCase();

      allEvents[day].push({
        title: normalizedTitle,                 // for grouping
        displayTitle: (row.Event || '').trim(), // for UI
        language: row.Language || '',
        time: row.Time || '',
        location: row.Location || '',
        notes: row.Details || ''
      });
    });

    renderCalendar();
  })
  .catch(err => console.error('Error loading events:', err));

// ===============================
// CALENDAR RENDER
// ===============================
function renderCalendar() {
  calendar.innerHTML = '';

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Monday-based offset
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const startOffset = (firstDay + 6) % 7;

  // Empty cells
  for (let i = 0; i < startOffset; i++) {
    const empty = document.createElement('div');
    empty.classList.add('day', 'empty');
    calendar.appendChild(empty);
  }

  // Days
  for (let day = 1; day <= daysInMonth; day++) {
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('day');

    // Today highlight
    const today = new Date();
    if (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    ) {
      dayDiv.classList.add('today');
    }

    const dateDiv = document.createElement('div');
    dateDiv.classList.add('date');
    dateDiv.textContent = day;
    dayDiv.appendChild(dateDiv);

    if (allEvents[day]) {
      // Unique event headings
      const uniqueTitles = [
        ...new Map(
          allEvents[day].map(e => [e.title, e.displayTitle])
        ).values()
      ];

      uniqueTitles.forEach(title => {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.textContent = title;
        dayDiv.appendChild(eventDiv);
      });

      dayDiv.addEventListener('click', () => {
        openEventModal(day, allEvents[day]);
      });
    }

    calendar.appendChild(dayDiv);
  }

  updateMonthLabel();
}

// ===============================
// MONTH LABEL
// ===============================
function updateMonthLabel() {
  const label = document.getElementById('monthLabel');
  if (!label) return;

  const monthNames = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];

  label.textContent = `${monthNames[currentMonth]} ${currentYear}`;
}

// ===============================
// MONTH NAVIGATION
// ===============================
const prevBtn = document.getElementById('prevMonth');
const nextBtn = document.getElementById('nextMonth');

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar();
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar();
  });
}

// ===============================
// MODAL LOGIC
// ===============================
function openEventModal(day, dayEvents) {
  const modal = document.getElementById('eventModal');
  const modalDate = document.getElementById('modalDate');
  const modalEvents = document.getElementById('modalEvents');

  const monthNames = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];

  modalDate.textContent = `${monthNames[currentMonth]} ${day}`;
  modalEvents.innerHTML = '';

  // Group by normalized title
  const grouped = {};
  dayEvents.forEach(e => {
    if (!grouped[e.title]) {
      grouped[e.title] = {
        displayTitle: e.displayTitle,
        entries: []
      };
    }
    grouped[e.title].entries.push(e);
  });

  Object.values(grouped).forEach(group => {
    const block = document.createElement('div');
    block.style.marginBottom = '16px';

    let html = `<strong>${group.displayTitle}</strong><br>`;

    group.entries.forEach(entry => {
      html += `${entry.language ? entry.language + ' – ' : ''}${entry.time}<br>`;
    });

    const first = group.entries[0];
    if (first.location) html += `📍 ${first.location}<br>`;
    if (first.notes) html += `<small>${first.notes}</small>`;

    block.innerHTML = html;
    modalEvents.appendChild(block);
  });

  modal.style.display = 'flex';
}

// ===============================
// CLOSE MODAL
// ===============================
document.getElementById('eventModal').addEventListener('click', e => {
  if (e.target.id === 'eventModal') {
    e.currentTarget.style.display = 'none';
  }
});
