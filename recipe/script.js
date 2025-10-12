let recipes = [];
let sortMode = "popular";

// JSONファイル読み込み
fetch("recipes.json")
  .then((res) => res.json())
  .then((data) => {
    recipes = data;
    renderRecipes(recipes);
  });

const list = document.getElementById("recipe-list");
const search = document.getElementById("search");

// 🔍 検索
search.addEventListener("input", () => {
  const keyword = search.value.toLowerCase();
  const filtered = recipes.filter(r =>
    r.name.toLowerCase().includes(keyword) ||
    r.tags.some(tag => tag.toLowerCase().includes(keyword))
  );
  renderRecipes(filtered);
});

// 🔄 ソート
document.querySelectorAll(".sort-buttons button").forEach(btn => {
  btn.addEventListener("click", () => {
    sortMode = btn.dataset.sort;
    renderRecipes(recipes);
  });
});

function renderRecipes(data) {
  let sorted = [...data];

  if (sortMode === "popular") {
    sorted.sort((a, b) => (b.clicks || 0) - (a.clicks || 0));
  } else if (sortMode === "recent") {
    sorted.sort((a, b) => (b.lastViewed || 0) - (a.lastViewed || 0));
  }

  list.innerHTML = "";
  sorted.forEach(r => {
    const div = document.createElement("div");
    div.className = "recipe-card";
    div.innerHTML = `
      <img src="${r.image}" alt="${r.name}">
      <h3>${r.name}</h3>
      <div class="tags">${r.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
      <button class="view-btn">見る</button>
    `;
    div.querySelector(".view-btn").addEventListener("click", () => openRecipe(r));
    list.appendChild(div);
  });
}

function openRecipe(recipe) {
  window.open(recipe.url, "_blank");
  recipe.clicks = (recipe.clicks || 0) + 1;
  recipe.lastViewed = Date.now();
  localStorage.setItem(recipe.name, JSON.stringify({
    clicks: recipe.clicks,
    lastViewed: recipe.lastViewed
  }));
  renderRecipes(recipes);
}
