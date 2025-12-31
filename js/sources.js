const API_KEY = import.meta.env.VITE_API_KEY;
const sourcesContainer = document.getElementById("sources");

async function loadSources() {
  try {
    const url = `https://newsapi.org/v2/top-headlines/sources?apiKey=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();

    sourcesContainer.innerHTML = data.sources
      .map(src => `
        <div class="card">
          <h2>${src.name}</h2>
          <p>${src.description}</p>
          <button onclick="viewSource('${src.id}')">View Articles</button>
        </div>
      `)
      .join("");

  } catch (error) {
    sourcesContainer.innerHTML = "<p>Error loading sources.</p>";
  }
}

function viewSource(id) {
  window.location.href = `source-news.html?source=${id}`;
}

loadSources();
