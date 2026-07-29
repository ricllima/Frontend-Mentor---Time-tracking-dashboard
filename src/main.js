import data from "./assets/data.json";
import "./style.css";

function getTimeframeDescription(timeframe) {
  switch (timeframe) {
    case "daily":
      return "Day";
    case "monthly":
      return "Month";
    case "weekly":
    default:
      return "Week";
  }
}

function displayData(timeframe) {
  data.forEach(({ title, timeframes }) => {
    const activityTitle = title.toLocaleLowerCase().replace(" ", "-");
    const times = timeframes[timeframe];
    const timeframeDescription = getTimeframeDescription(timeframe);

    const activity = document.querySelector(`.activity.${activityTitle}`);

    activity.querySelector(".current-time > p").textContent =
      `${times.current}hrs`;

    activity.querySelector(".previous-time > p").textContent =
      `Last ${timeframeDescription} - ${times.previous}hrs`;
  });
}

document.addEventListener("DOMContentLoaded", async function () {
  displayData("weekly");

  document.querySelectorAll(".timeframes>button").forEach((button) => {
    button.addEventListener("click", function () {
      if (this.hasAttribute("data-selected")) return;

      document
        .querySelector(".timeframes > button[data-selected]")
        .removeAttribute("data-selected");

      this.setAttribute("data-selected", "");

      displayData(button.textContent.toLocaleLowerCase());
    });
  });
});
