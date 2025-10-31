// 🌐 Main Page Script — OurVoiceOurRights

const languageSelect = document.getElementById("languageSelect");
const districtSelect = document.getElementById("districtSelect");
const proceedBtn = document.getElementById("proceedBtn");
const locationBtn = document.getElementById("detectLocation");

let selectedLanguage = "English";
let selectedDistrict = "";

// 🈁 Language change
languageSelect.addEventListener("change", (e) => {
  selectedLanguage = e.target.value;

  if (selectedLanguage === "Tamil") {
    document.querySelector("h1").textContent = "எங்கள் குரல் எங்கள் உரிமைகள்";
    document.querySelector("p").textContent =
      "உங்கள் மாவட்டத்தைத் தேர்ந்தெடுக்கவும் அல்லது உங்கள் இடத்தை கண்டறியவும்";
    proceedBtn.textContent = "தொடர்க";
    locationBtn.textContent = "இடத்தை கண்டறி";
  } else {
    document.querySelector("h1").textContent = "Our Voice Our Rights";
    document.querySelector("p").textContent =
      "Select your district or detect your location";
    proceedBtn.textContent = "Continue";
    locationBtn.textContent = "Detect Location";
  }
});

// 📍 Detect user location
locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert("Geolocation is not supported in your browser.");
  }
});

function success(position) {
  const { latitude, longitude } = position.coords;

  // Rough location mapping for TN districts (can expand)
  if (latitude >= 11.6 && latitude <= 11.8 && longitude >= 78.0 && longitude <= 78.3) {
    selectedDistrict = "Salem";
  } else if (latitude >= 13.0 && latitude <= 13.2
