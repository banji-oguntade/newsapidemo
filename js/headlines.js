const API_KEY = import.meta.env.VITE_API_KEY;
const container = document.getElementById("headlines");

async function loadHeadlines() {
  try {
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();

    container.innerHTML = data.articles
      .map(article => `
        <div class="card">
          <img src="${article.urlToImage || 'assets/placeholder.jpg'}">
          <h3>${article.title}</h3>
          <p>${article.description || ''}</p>
          <a href="${article.url}" target="_blank">Read More →</a>
        </div>
      `)
      .join("");

  } catch (error) {
    container.innerHTML = "<p>Error loading headlines.</p>";
  }
}

loadHeadlines();
