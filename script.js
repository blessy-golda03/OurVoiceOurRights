const districts = ["Chennai", "Salem", "Coimbatore", "Madurai", "Erode", "Tirunelveli", "Thanjavur"];
const select = document.getElementById("district");
const dataDisplay = document.getElementById("dataDisplay");
const chartCanvas = document.getElementById("chart");
let chart;

districts.forEach(d => {
  const opt = document.createElement("option");
  opt.value = d;
  opt.textContent = d;
  select.appendChild(opt);
});

async function loadData(district) {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    const districtData = data[district];
    if (!districtData) throw new Error("No data found");
    document.getElementById("districtName").textContent = `${district}`;
    document.getElementById("workers").textContent = districtData.workers;
    document.getElementById("households").textContent = districtData.households;
    document.getElementById("works").textContent = districtData.works;
    document.getElementById("wages").textContent = districtData.wages;
    dataDisplay.classList.remove("hidden");
    createChart(districtData);
  } catch {
    alert("Data not available. Please try again later.");
  }
}

function createChart(d) {
  if (chart) chart.destroy();
  chart = new Chart(chartCanvas, {
    type: "bar",
    data: {
      labels: ["Workers", "Households", "Works", "Wages (₹ in Lakh)"],
      datasets: [{
        label: "District Performance",
        data: [d.workers, d.households, d.works, d.wages / 100000],
        backgroundColor: ["#00796b", "#43a047", "#fbc02d", "#ef5350"]
      }]
    }
  });
}

select.addEventListener("change", e => loadData(e.target.value));

document.getElementById("detectLocation").addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(pos => {
    alert("Auto-detect feature (Mock): Using your location to find nearest district!");
    loadData("Salem"); // Mock detection for demo
  });
});
