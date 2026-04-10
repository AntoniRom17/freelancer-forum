/**
 * @typedef Freelancer
 * @property {string} name
 * @property {string} occupation
 * @property {number} rate
 */

const NAMES = ["Alice", "Bob", "Carol", "Dave", "Eve", "Frank", "Grace", "Hank", "Ivy", "Jack"];
const OCCUPATIONS = ["Writer", "Teacher", "Programmer", "Designer", "Engineer", "Analyst", "Developer", "Artist", "Consultant", "Researcher"];
const PRICE_RANGE = { min: 20, max: 200 };
const MAX_FREELANCERS = 30;

let freelancersState = [];
let averageRateState = 0;

let sortNameAsc = true;
let sortOccupationAsc = true;
let sortRateAsc = true;

function createFreelancer() {
  const name = NAMES[Math.floor(Math.random() * NAMES.length)];
  const occupation = OCCUPATIONS[Math.floor(Math.random() * OCCUPATIONS.length)];
  const rate = Math.floor(Math.random() * (PRICE_RANGE.max - PRICE_RANGE.min + 1)) + PRICE_RANGE.min;
  return { name, occupation, rate };
}

function regenerateFreelancers() {
  const input = document.querySelector("#countInput");
  let count = Number(input.value);
  if (count > MAX_FREELANCERS) count = MAX_FREELANCERS;
  if (count < 1) count = 1;
  input.value = count;

  freelancersState = Array.from({ length: count }, createFreelancer);
  averageRateState = getAverageRate(freelancersState);
  render();
}

function getAverageRate(freelancers) {
  const total = freelancers.reduce((sum, f) => sum + f.rate, 0);
  return (total / freelancers.length).toFixed(2);
}

function sortByName() {
  freelancersState.sort((a, b) =>
    sortNameAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  );
  sortNameAsc = !sortNameAsc;
  render();
}

function sortByOccupation() {
  freelancersState.sort((a, b) =>
    sortOccupationAsc ? a.occupation.localeCompare(b.occupation) : b.occupation.localeCompare(a.occupation)
  );
  sortOccupationAsc = !sortOccupationAsc;
  render();
}

function sortByRate() {
  freelancersState.sort((a, b) =>
    sortRateAsc ? a.rate - b.rate : b.rate - a.rate
  );
  sortRateAsc = !sortRateAsc;
  render();
}

function FreelancerRowComponent(freelancer, index) {
  const tr = document.createElement("tr");
  tr.classList.add(index % 2 === 0 ? "row-even" : "row-odd");

  const nameTd = document.createElement("td");
  nameTd.textContent = freelancer.name;

  const jobTd = document.createElement("td");
  jobTd.textContent = freelancer.occupation;

  const rateTd = document.createElement("td");
  rateTd.textContent = `$${freelancer.rate}`;

  tr.append(nameTd, jobTd, rateTd);
  return tr;
}

function FreelancerTableComponent(freelancers) {
  const table = document.createElement("table");
  table.classList.add("freelancer-table");

  const header = document.createElement("tr");

  const nameTh = document.createElement("th");
  nameTh.textContent = "Name";
  nameTh.classList.add("sortable");
  nameTh.addEventListener("click", sortByName);

  const jobTh = document.createElement("th");
  jobTh.textContent = "Occupation";
  jobTh.classList.add("sortable");
  jobTh.addEventListener("click", sortByOccupation);

  const rateTh = document.createElement("th");
  rateTh.textContent = "Rate";
  rateTh.classList.add("sortable");
  rateTh.addEventListener("click", sortByRate);

  header.append(nameTh, jobTh, rateTh);
  table.appendChild(header);

  freelancers.forEach((f, i) => {
    table.appendChild(FreelancerRowComponent(f, i));
  });

  return table;
}

function AverageRateComponent(average) {
  const p = document.createElement("p");
  p.classList.add("average-rate");
  p.textContent = `The average rate is $${average}`;
  return p;
}

function render() {
  const root = document.querySelector("#app");

  const container = document.createElement("div");

  const title = document.createElement("h1");
  title.textContent = "Freelancer Forum";

  const input = document.createElement("input");
  input.id = "countInput";
  input.type = "number";
  input.min = "1";
  input.max = "30";
  input.value = freelancersState.length || 10;

  const button = document.createElement("button");
  button.textContent = "Generate Freelancers";
  button.classList.add("generate-btn");
  button.addEventListener("click", regenerateFreelancers);

  container.append(
    title,
    input,
    button,
    AverageRateComponent(averageRateState),
    FreelancerTableComponent(freelancersState)
  );

  root.replaceChildren(container);
}

render();