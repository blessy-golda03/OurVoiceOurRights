// ---------- Data (realistic sample) ----------
const districtsData = {
  Salem: {
    summary2025: { jobs: 35000, wagesCr: 20.5, persondays: 420000, completed: 1250, ongoing: 320 },
    yearly: {
      years: [2020,2021,2022,2023,2024,2025],
      jobs:  [12000,18000,25000,29000,31000,35000],
      expCr:  [8.5,10.2,13.4,16.0,18.1,20.5]
    }
  },
  Coimbatore: {
    summary2025: { jobs: 27000, wagesCr: 17.0, persondays: 320000, completed: 980, ongoing: 210 },
    yearly: {
      years: [2020,2021,2022,2023,2024,2025],
      jobs:  [11000,15000,20000,23000,25000,27000],
      expCr:  [7.2,9.0,11.5,13.2,15.0,17.0]
    }
  },
  Madurai: {
    summary2025: { jobs: 31000, wagesCr: 18.2, persondays: 380000, completed: 1120, ongoing: 260 },
    yearly: {
      years: [2020,2021,2022,2023,2024,2025],
      jobs:  [10000,14000,20000,24000,27000,31000],
      expCr:  [6.8,8.9,12.1,14.7,16.8,18.2]
    }
  },
  Tirunelveli: {
    summary2025: { jobs: 23000, wagesCr: 12.0, persondays: 260000, completed: 820, ongoing: 160 },
    yearly: {
      years: [2020,2021,2022,2023,2024,2025],
      jobs:  [8000,11000,15000,18000,21000,23000],
      expCr:  [5.1,6.2,8.0,9.5,10.8,12.0]
    }
  },
  Trichy: {
    summary2025: { jobs: 29000, wagesCr: 16.5, persondays: 350000, completed: 1040, ongoing: 230 },
    yearly: {
      years: [2020,2021,2022,2023,2024,2025],
      jobs:  [9500,13000,18000,22000,26000,29000],
      expCr:  [6.5,8.3,10.9,13.4,15.6,16.5]
    }
  }
};

// ---------- Translations ----------
const UI = {
  en: {
    appTitle: "Our Voice, Our Rights",
    subtitle: "MGNREGA district performance — Tamil Nadu",
    currentTitle: "2025 — Current Year Performance",
    cards: {
      jobs: "Workers Engaged",
      wages: "Total Wages Disbursed",
      persondays: "Persondays Generated",
      completed: "Completed Works",
      ongoing: "Ongoing Works"
    },
    viewPast: "📊 View Past Performance",
    back: "⬅ Back to Current Year",
    pastTitle: "Past Performance (2020–2025)",
    chartJobs: "Jobs Provided",
    chartExp: "Total Expenditure (₹ Crores)",
    footer: "Data shown is sample/representative. Real data can be fetched from data.gov.in MGNREGA API.",
    detecting: "Detecting location...",
    detectFail: "Unable to detect location or permission denied."
  },
  ta: {
    appTitle: "எங்கள் குரல், எங்கள் உரிமைகள்",
    subtitle: "எம்ஜிஎன்ஆர்இஜி மாவட்ட செயல்திறன் — தமிழ்நாடு",
    currentTitle: "2025 — தற்போதைய ஆண்டின் செயல்திறன்",
    cards: {
      jobs: "வேலைக்காரர்கள் ஈடுபட்டவர்கள்",
      wages: "மொத்த கூலி வழங்கப்பட்டது",
      persondays: "மனிதநாள் உருவாக்கப்பட்டது",
      completed: "முடிக்கப்பட்ட பணிகள்",
      ongoing: "நடப்பு பணிகள்"
    },
    viewPast: "📊 கடந்த ஆண்டு செயல்திறன் காண்க",
    back: "⬅ தற்போதைய ஆண்டுக்கு மறு செல்",
    pastTitle: "கடந்த ஆண்டுகளின் செயல்திறன் (2020–2025)",
    chartJobs: "வழங்கப்பட்ட வேலைகள்",
    chartExp: "மொத்த செலவினம் (₹ கோடியில்)",
    footer: "காண்பிக்கப்படும் தரவு மாதிரி/தகுந்த வகையில் உள்ளது. உண்மையான தரவு data.gov.in MGNREGA API-இல் கிடைக்கிறது.",
    detecting: "இடத்தைக் கண்டறிகிறது...",
    detectFail: "இடம் கண்டறிய முடியவில்லை அல்லது அனுமதி மறுக்கப்பட்டது."
  }
};

// ---------- Elements ----------
const languageEl = document.getElementById("language");
const districtEl = document.getElementById("districtSelect");
const currentYearDiv = document.getElementById("currentYearData");
const viewPastBtn = document.getElementById("viewPastBtn");
const pastView = document.getElementById("pastView");
const currentView = document.getElementById("currentView");
const pastTitleEl = document.getElementById("pastTitle");
const backBtn = document.getElementById("backBtn");
const appTitleEl = document.getElementById("appTitle");
const subtitleEl = document.getElementById("subtitle");
const detectBtn = document.getElementById("detectBtn");
const footerTextEl = document.getElementById("footerText");

let currentLang = "en";
let chart; // Chart.js instance

// ---------- Helpers ----------
function formatNumber(n){
  if (n >= 100000) return (n/100000).toFixed(2) + " Lakh";
  if (n >= 1000) return n.toLocaleString();
  return n.toString();
}
function formatCrores(c){ return "₹" + c + " Cr"; }

// ---------- Render current-year summary ----------
function renderCurrentSummary(){
  const district = districtEl.value;
  const d = districtsData[district];
  const t = UI[currentLang];

  appTitleEl.textContent = t.appTitle;
  subtitleEl.textContent = t.subtitle;
  footerTextEl.textContent = t.footer;

  currentYearDiv.innerHTML = `
    <h2>${t.currentTitle} — ${district}</h2>
    <div class="card-grid">
      <div class="card"><h3>${t.cards.jobs}</h3><p>${formatNumber(d.summary2025.jobs)}</p></div>
      <div class="card"><h3>${t.cards.wages}</h3><p>${formatCrores(d.summary2025.wagesCr)}</p></div>
      <div class="card"><h3>${t.cards.persondays}</h3><p>${formatNumber(d.summary2025.persondays)}</p></div>
      <div class="card"><h3>${t.cards.completed}</h3><p>${d.summary2025.completed}</p></div>
      <div class="card"><h3>${t.cards.ongoing}</h3><p>${d.summary2025.ongoing}</p></div>
    </div>
  `;

  // Update viewPast button text (language)
  viewPastBtn.textContent = t.viewPast;
}

// ---------- Build past performance chart (line chart with two lines) ----------
function renderPastChart(){
  const district = districtEl.value;
  const d = districtsData[district];
  const t = UI[currentLang];

  pastTitleEl.textContent = t.pastTitle;

  const ctx = document.getElementById("trendChart").getContext("2d");
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: d.yearly.years.map(y => y.toString()), // 2020..2025
      datasets: [
        {
          label: t.chartJobs,
          data: d.yearly.jobs,
          borderColor: "#28a745",
          backgroundColor: "rgba(40,167,69,0.08)",
          tension: 0.3,
          pointRadius: 3,
          yAxisID: 'y'
        },
        {
          label: t.chartExp,
          data: d.yearly.expCr,
          borderColor: "#ff7f50",
          backgroundColor: "rgba(255,127,80,0.08)",
          tension: 0.3,
          pointRadius: 3,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      interaction: { mode: 'index', intersect: false },
      stacked: false,
      plugins: {
        title: { display: true, text: t.pastTitle },
        tooltip: {
          callbacks: {
            label: function(context){
              const label = context.dataset.label || '';
              const value = context.formattedValue;
              // show appropriate unit
              if (context.dataset.label === t.chartJobs) return `${label}: ${formatNumber(Number(value))}`;
              return `${label}: ${formatCrores(value)}`;
            }
          }
        }
      },
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          title: { display: true, text: currentLang === 'en' ? 'Jobs Provided' : 'வழங்கப்பட்ட வேலைகள்' },
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          grid: { drawOnChartArea: false },
          title: { display: true, text: currentLang === 'en' ? 'Expenditure (₹ Crores)' : 'செலவினம் (₹ கோடிகள்)' }
        }
      }
    }
  });
}

// ---------- Language change handler ----------
function changeLanguage(){
  currentLang = languageEl.value;
  renderCurrentSummary();
  // if past view is visible, update chart labels/titles
  if (!pastView.classList.contains('hidden')){
    renderPastChart();
  }
}

// ---------- View toggles ----------
viewPastBtn.addEventListener('click', ()=>{
  currentView.classList.add('hidden');
  pastView.classList.remove('hidden');
  renderPastChart();
});

backBtn.addEventListener('click', ()=>{
  pastView.classList.add('hidden');
  currentView.classList.remove('hidden');
  renderCurrentSummary();
});

// ---------- District change ----------
districtEl.addEventListener('change', ()=>{
  renderCurrentSummary();
  if (!pastView.classList.contains('hidden')){
    renderPastChart();
  }
});

// ---------- Location detection (reverse geocode) ----------
detectBtn.addEventListener('click', async ()=>{
  const t = UI[currentLang];
  const locEl = document.getElementById("locationResult");
  try {
    if (!navigator.geolocation) { alert(t.detectFail); return; }
    detectBtn.textContent = t.detecting;
    navigator.geolocation.getCurrentPosition(async (pos)=>{
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      // reverse geocode using free service
      try {
        const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
        const json = await res.json();
        // try match district by name contained in response fields
        const candidates = [json.city, json.locality, json.principalSubdivision, json.countryName].filter(Boolean).map(s=>s.toString());
        // simple mapping: check if district name appears in any candidate (English)
        const districtNames = Object.keys(districtsData);
        let found = null;
        for (const cand of candidates){
          for (const dname of districtNames){
            if (cand.toLowerCase().includes(dname.toLowerCase().replace('tiruchirappalli','trichy'))){
              found = dname; break;
            }
            // some city vs district mapping
            if (dname.toLowerCase()==='trichy' && cand.toLowerCase().includes('tiruchirappalli')) found = dname;
          }
          if (found) break;
        }
        // fallback: small bounding boxes (very rough) for common districts (optional)
        if(!found){
          // rough lat-long checks (approx)
          if (lat>12 && lon>77 && lon<78.5) found = "Coimbatore"; // not exact, but fallback
          else if (lat>10.5 && lat<11.7 && lon>77.5 && lon<79) found = "Salem";
        }
        if (found && districtsData[found]){
          districtEl.value = found;
          renderCurrentSummary();
          alert((currentLang==='en' ? "Detected district:" : "கண்டறிந்த மாவட்டம்:") + " " + found);
        } else {
          alert(currentLang==='en' ? "Could not map location exactly to district. Please select manually." : "கிடைத்த இடத்தைச் சம்பந்தப்பட்ட மாவட்டமாக நினைவுபடுத்த முடியவில்லை. கையால் தேர்ந்தெடுக்கவும்.");
        }
      } catch (err) {
        alert(currentLang==='en' ? "Reverse geocode failed." : "இடமாற்ற அறிமுகம் தோல்வி.");
      } finally {
        detectBtn.textContent = currentLang==='en' ? "📍 Detect My Location" : "📍 தன்னியக்க மாவட்ட கண்டறிதல்";
      }
    }, (err)=>{
      alert(currentLang==='en' ? "Location permission denied or unavailable." : "இட அனுமதி மறுக்கப்பட்டது அல்லது கிடைப்பதில்லை.");
      detectBtn.textContent = currentLang==='en' ? "📍 Detect My Location" : "📍 தன்னியக்க மாவட்ட கண்டறிதல்";
    }, {timeout:10000});
  } catch(e){
    alert(currentLang==='en' ? "Location not supported." : "இடம் ஆதரிக்கப்படுகிறது இல்லை.");
    detectBtn.textContent = currentLang==='en' ? "📍 Detect My Location" : "📍 தன்னியக்க மாவட்ட கண்டறிதல்";
  }
});

// ---------- Init ----------
function init(){
  // set default UI language and texts
  languageEl.value = 'en';
  detectBtn.textContent = UI.en.detecting ? "📍 Detect My Location" : "📍 Detect My Location";
  renderCurrentSummary();
}
init();
