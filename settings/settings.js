import "../style.css";

//Open Usage Guide window.
const usageGuide = document.getElementById("usageButton");
usageGuide.onclick = () => {
  onclick = window.open(
    "https://google.com",
    "mozillaWindow",
    "left=100,top=100,width=600,height=800"
  );
};
