const langToggle = document.getElementById("langToggle");
const title = document.getElementById("title");
const districtLabel = document.getElementById("districtLabel");
const chart1Title = document.getElementById("chart1Title");
const chart2Title = document.getElementById("chart2Title");
const footerText = document.getElementById("footerText");
const detectBtn = document.getElementById("detectBtn");
const districtSelect = document.getElementById("district");

let currentLang = "en";

const translations = {
  en: {
    title: "Our Voice, Our Rights",
    districtLabel: "Select District:",
    chart1Title: "Workers Engaged (2022–2024)",
    chart2Title: "Wages Disbursed (₹ in Crores)",
    footerText: "Empowering Citizens through Data Transparency 🇮🇳",
    detectBtn: "📍 Auto Detect District",
    toggle: "தமிழ்"
  },
  ta: {
    title: "எங்கள் குரல், எங்கள் உரிமைகள்",
    districtLabel: "மாவட்டத்தைத் தேர்ந்தெடுக்கவும்:",
    chart1Title: "பணியில் ஈடுபட்டோர் (2022–2024)",
    chart2Title: "வழங்கப்பட்ட கூலி (₹ கோடிகளில்)",
    footerText: "தகவல் வெளிப்படைத்தன்மையின் மூலம் குடிமக்களை அதிகாரப்படுத்துதல் 🇮🇳",
    detectBtn: "📍 தன்னியக்க மாவட்ட கண்டறிதல்",
    toggle: "English"
  }
};

langToggle.onclick = () => {
  currentLang = currentLang === "en" ? "ta" : "en";
  updateLanguage();
};

function updateLanguage() {
  const t = translations[currentLang];
  title.textContent = t.title;
  districtLabel.textContent = t.districtLabel;
  chart1Title.textContent = t.chart1Title;
  chart2Title.textContent = t.chart2Title;
  footerText.textContent = t.footerText;
  detectBtn.textContent = t.detectBtn;
  langToggle.textContent = t.toggle;
}

const data = {
  Salem: { workers: [20000, 25000, 28000], wages: [12, 15, 18] },
  Chennai: { workers: [15000, 17000, 20000], wages: [10, 12, 14] },
  Madurai: { workers: [18000, 20000, 23000], wages: [11, 13, 15] },
  Coimbatore: { workers: [22000, 25000, 27000], wages: [13, 15, 17] },
  Tiruchirappalli: { workers: [16000, 18000, 21000], wages: [9, 11, 13] },
  Thanjavur: { workers: [14000, 16000, 19000], wages: [8, 10, 12] }
};

const years = ["2022", "2023", "2024"];

const workersChartCtx = document.getElementById("workersChart").getContext("2d");
const wagesChartCtx = document.getElementById("wagesChart").getContext("2d");

let workersChart, wagesChart;

function renderCharts(district) {
  const districtData = data[district];

  if (workersChart) workersChart.destroy();
  if (wagesChart) wagesChart.destroy();

  workersChart = new Chart(workersChartCtx, {
    type: "bar",
    data: {
      labels: years,
      datasets: [{
        label: "Workers Engaged",
        data: districtData.workers,
        backgroundColor: ["#007bff", "#28a745", "#ffc107"]
      }]
    }
  });

  wagesChart = new Chart(wagesChartCtx, {
    type: "bar",
    data: {
      labels: years,
      datasets: [{
        label: "Wages Disbursed",
        data: districtData.wages,
        backgroundColor: ["#17a2b8", "#6f42c1", "#fd7e14"]
      }]
    }
  });
}

districtSelect.onchange = (e) => renderCharts(e.target.value);
renderCharts("Salem");

detectBtn.onclick = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      alert("Auto-detect feature active (demo only)");
      districtSelect.value = "Salem";
      renderCharts("Salem");
    });
  } else {
    alert("Geolocation not supported.");
  }
};



