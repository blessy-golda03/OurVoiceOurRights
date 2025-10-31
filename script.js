// Dummy MGNREGA data for Tamil Nadu districts
const data = {
  "Chennai": { workers: "1.2 Lakh", households: "25,000", wages: "₹5.2 Cr" },
  "Salem": { workers: "95,000", households: "18,500", wages: "₹4.8 Cr" },
  "Madurai": { workers: "88,000", households: "17,200", wages: "₹4.3 Cr" },
  "Coimbatore": { workers: "1.1 Lakh", households: "20,000", wages: "₹5.0 Cr" },
  "Trichy": { workers: "92,000", households: "19,000", wages: "₹4.6 Cr" }
};

function showData() {
  const district = document.getElementById("district").value;
  const output = document.getElementById("output");

  if (!district || !data[district]) {
    output.innerHTML = "<p>⚠️ Please select a district 👆</p>";
    return;
  }

  const info = data[district];
  output.innerHTML = `
    <div class="card">
      <h3>${district} District</h3>
      <p>👷‍♀️ <b>Workers Engaged:</b> ${info.workers}</p>
      <p>🏠 <b>Households Completed:</b> ${info.households}</p>
      <p>💰 <b>Total Wages Paid:</b> ${info.wages}</p>
    </div>
  `;
}

// 🌍 Auto-detect location (runs at start)
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, error);
} else {
  manualSelectMessage();
}

function success(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  let nearest = "Chennai";

  const districts = {
    "Chennai": [13.08, 80.27],
    "Salem": [11.65, 78.16],
    "Madurai": [9.93, 78.12],
    "Coimbatore": [11.01, 76.96],
    "Trichy": [10.79, 78.70]
  };

  let minDist = Infinity;
  for (const d in districts) {
    const [dLat, dLon] = districts[d];
    const dist = Math.sqrt((lat - dLat) ** 2 + (lon - dLon) ** 2);
    if (dist < minDist) {
      minDist = dist;
      nearest = d;
    }
  }

  document.getElementById("district").value = nearest;
  showData();

  document.getElementById("output").insertAdjacentHTML(
    "afterbegin",
    `<p>📍 Auto-detected nearest district: <b>${nearest}</b></p>`
  );
}

function error() {
  manualSelectMessage();
}

function manualSelectMessage() {
  const output = document.getElementById("output");
  output.innerHTML = `
    <p>⚠️ Unable to detect your location. Please select your district manually or try again below.</p>
    <button onclick="detectAgain()" style="padding:8px 15px;border:none;background:#007b7f;color:#fff;border-radius:8px;cursor:pointer;margin-top:10px;">📍 Detect My District</button>
  `;
}

// 🔁 Button function to re-detect manually
function detectAgain() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert("Geolocation not supported in your browser.");
  }
}



