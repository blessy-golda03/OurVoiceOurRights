// Dummy MGNREGA data for Tamil Nadu districts
const data = {
  "Chennai": { workers: "1.2 Lakh", households: "25,000", wages: "₹5.2 Cr" },
  "Salem": { workers: "95,000", households: "18,500", wages: "₹4.8 Cr" },
  "Madurai": { workers: "88,000", households: "17,200", wages: "₹4.3 Cr" },
  "Coimbatore": { workers: "1.1 Lakh", households: "20,000", wages: "₹5.0 Cr" },
  "Trichy": { workers: "92,000", households: "19,000", wages: "₹4.6 Cr" },
};

function showData() {
  const district = document.getElementById("district").value;
  const output = document.getElementById("output");

  if (!district || !data[district]) {
    output.innerHTML = "<p>Please select a district 👆</p>";
    return;
  }

  const info = data[district];
  output.innerHTML = `
    <div class="card">
      <h3>${district} District</h3>
      <p><b>👷 Workers Engaged:</b> ${info.workers}</p>
      <p><b>🏠 Households Completed:</b> ${info.households}</p>
      <p><b>💰 Total Wages Paid:</b> ${info.wages}</p>
    </div>
  `;
}
// Try to detect user's location automatically
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, error);
} else {
  console.log("Geolocation is not supported by this browser.");
}

function success(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  document.getElementById("output").innerHTML = `
    <p>📍 Your location detected!<br>
    Latitude: ${latitude.toFixed(2)}, Longitude: ${longitude.toFixed(2)}</p>
    <p>Select your district to view MGNREGA data 👇</p>
  `;
}

function error() {
  document.getElementById("output").innerHTML = `
    <p>⚠️ Unable to detect your location. Please select your district manually.</p>
  `;
}

