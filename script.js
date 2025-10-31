let chart;

const dataText = {
  en: {
    title: "2025 – Current Year Performance",
    workers: "Workers Engaged: 30,500",
    wages: "Total Wages Disbursed: ₹20 Crores",
    days: "Persondays Generated: 4.2 Lakhs",
    completed: "Completed Works: 1,250",
    ongoing: "Ongoing Works: 320",
    chartTitle: "District-wise MGNREGA Performance (2020–2025)",
    yAxis: "Work Completion (%)",
    legend: "Year-wise Data",
    labels: ["Salem", "Namakkal", "Erode", "Dharmapuri", "Coimbatore"],
    locationMsg: "You are currently in"
  },
  ta: {
    title: "2025 – தற்போதைய ஆண்டின் செயல்திறன்",
    workers: "வேலைக்காரர்கள் ஈடுபட்டவர்கள்: 30,500",
    wages: "மொத்த கூலி வழங்கப்பட்டது: ₹20 கோடி",
    days: "மனிதநாள் உருவாக்கப்பட்டது: 4.2 லட்சம்",
    completed: "முடிக்கப்பட்ட பணிகள்: 1,250",
    ongoing: "நடப்பு பணிகள்: 320",
    chartTitle: "மாவட்ட வாரியான மநேர்கா செயல்திறன் (2020–2025)",
    yAxis: "பணி நிறைவு (%)",
    legend: "ஆண்டு வாரியான தரவுகள்",
    labels: ["சேலம்", "நாமக்கல்", "ஈரோடு", "தர்மபுரி", "கோயம்புத்தூர்"],
    locationMsg: "நீங்கள் தற்போது உள்ள இடம்"
  }
};

const performanceData = {
  "2020": [55, 48, 42, 39, 46],
  "2021": [60, 54, 49, 43, 51],
  "2022": [63, 57, 52, 46, 55],
  "2023": [66, 61, 56, 49, 59],
  "2024": [69, 64, 58, 52, 62],
  "2025": [72, 67, 61, 54, 65]
};

function changeLanguage() {
  const lang = document.getElementById("language").value;
  const t = dataText[lang];

  // Text section
  document.getElementById("currentYearData").innerHTML = `
    <h2>${t.title}</h2>
    <p>${t.workers}</p>
    <p>${t.wages}</p>
    <p>${t.days}</p>
    <p>${t.completed}</p>
    <p>${t.ongoing}</p>
  `;

  // Chart
  if (chart) chart.destroy();
  const ctx = document.getElementById("performanceChart").getContext("2d");
  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: t.labels,
      datasets: Object.keys(performanceData).map(year => ({
        label: year,
        data: performanceData[year],
        borderWidth: 1
      }))
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: t.chartTitle
        },
        legend: {
          title: {
            display: true,
            text: t.legend
          }
        }
      },
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: t.yAxis
          }
        }
      }
    }
  });
}

// Bonus Feature: Detect User Location
function detectLocation() {
  const lang = document.getElementById("language").value;
  const t = dataText[lang];
  const result = document.getElementById("locationResult");

  if (navigator.geolocation) {
    result.innerText = "Detecting location...";
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    result.innerText = "Geolocation not supported by this browser.";
  }

  function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
      .then(response => response.json())
      .then(data => {
        const district = data.city || data.locality || data.principalSubdivision || "Unknown";
        result.innerText = `${t.locationMsg}: ${district}`;
      })
      .catch(() => {
        result.innerText = "Unable to get district name.";
      });
  }

  function error() {
    result.innerText = "Location access denied.";
  }
}

// Default English on load
changeLanguage();
