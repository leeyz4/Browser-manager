document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("main");
  const sunIcon = document.querySelector(".sun");
  const body = document.body;
  const allBtn = document.querySelector(".all");
  const activeBtn = document.querySelector(".active");
  const inactiveBtn = document.querySelector(".inactive");

  let allExtensions = [];

  fetch("data.json")
    .then(response => response.json())
    .then(data => {
      allExtensions = data;
      renderCards(allExtensions); 
    })
    .catch(error => {
      container.innerHTML = "<p>Error loading data.json</p>";
      console.error("Error fetching data:", error);
    });

  function renderCards(data) {
    container.innerHTML = "";

    data.forEach(extension => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <div class="top">
          <div><img src="${extension.logo}" alt="${extension.name} logo"></div>
          <div class="content">
            <h3>${extension.name}</h3>
            <p>${extension.description}</p>
          </div>
        </div>
        <div class="bottom">
          <button>Remove</button>
          <i class="fa-solid ${extension.isActive ? 'fa-toggle-on' : 'fa-toggle-off'}"></i>
        </div>
      `;

      container.appendChild(card);
    });
  }

  sunIcon.addEventListener("click", () => {
    body.classList.toggle("light-mode");
  });

  allBtn.addEventListener("click", () => renderCards(allExtensions));
  activeBtn.addEventListener("click", () => {
    const filtered = allExtensions.filter(ext => ext.isActive);
    renderCards(filtered);
  });
  inactiveBtn.addEventListener("click", () => {
    const filtered = allExtensions.filter(ext => !ext.isActive);
    renderCards(filtered);
  });
});
