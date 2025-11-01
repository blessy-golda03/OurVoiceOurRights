document.getElementById("feedbackForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const district = document.getElementById("district").value;
  const feedback = document.getElementById("feedback").value;

  document.getElementById("responseMsg").innerText = 
    `🙏 Thank you, ${name} from ${district}! Your feedback has been recorded.`;
  
  this.reset();
});
