"use strict";

const chartContainer = document.querySelector(".expense_chart");
const fragment = document.createDocumentFragment();
const date = new Date();

const url = "data.json";
const xhr = new XMLHttpRequest();
xhr.open("GET", url, true);

xhr.onreadystatechange = function () {
  if (xhr.readyState === xhr.DONE) {
    if (xhr.status === 200) {
      const data = JSON.parse(this.responseText);
      console.log(data);

      updateUI(data);
    } else {
      console.error(`Error Loading Data ${this.status} - ${this.statusText}`);
    }
  }
};

xhr.onerror = function () {
  console.error("Error");
};
xhr.send();

function updateUI(data) {
  const amount = [];
  const days = [];
  for (let i = 0; i < data.length; i++) {
    amount.push(data[i].amount);
    days.push(data[i].day);
  }
  const heighestValue = Math.max(...amount);

  for (let i = 0; i < amount.length; i++) {
    const chartWrap = document.createElement("div");
    chartWrap.setAttribute("class", "chart-wrap");
    fragment.appendChild(chartWrap);

    const bar = document.createElement("div");
    bar.setAttribute("class", "bar");
    chartWrap.append(bar);
    bar.style.height = `${amount[i]}mm`;

    const tooltip = document.createElement("span");
    tooltip.textContent = `$${amount[i]}`;
    tooltip.setAttribute("class", "tooltip");
    bar.append(tooltip);

    const day = document.createElement("p");
    day.textContent = days[i];
    day.setAttribute("class", "days");
    chartWrap.appendChild(day);
  }
  chartContainer.appendChild(fragment);

  function highlightCurrentDay() {
    const element = document.querySelectorAll(".bar");

    let currentDay = element[date.getDay() - 1];
    currentDay.classList.add("current-day");
  }
  highlightCurrentDay();
}
