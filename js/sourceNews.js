const API_KEY = process.env.API_KEY;

const params = new URLSearchParams(window.location.search);
const sourceId = params.get("source");

const titleEl = document.getElementById("source-title");
const articlesEl = document.getElementById("articles");

titleEl.textContent = `Articles from: ${sourceId}`;

async function loadSourceNews() {
  try {
    const url = `https://newsapi.org/v2/top-headlines?sources=${sourceId}&apiKey=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();

    articlesEl.innerHTML = data.articles
      .map(a => `
        <div class="card">
          <img src="${a.urlToImage || 'assets/placeholder.jpg'}">
          <h3>${a.title}</h3>
          <p>${a.description || ''}</p>
          <a href="${a.url}" target="_blank">Read More →</a>
        </div>
      `)
      .join("");

  } catch (error) {
    articlesEl.innerHTML = "<p>Error loading news for this source.</p>";
  }
}

loadSourceNews();
