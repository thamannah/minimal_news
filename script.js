const newsTitle = document.getElementById('news-title');
const newsDescription = document.getElementById('news-description');
const newsLink = document.getElementById('news-link');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let articles = [];
let currentIndex = 0;

// Replace 'YOUR_API_KEY' with your actual API key
const apiKey = '7bd76c769949480399ce53655825f036';
const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

async function fetchNews() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        articles = data.articles;
        if (articles.length > 0) {
            displayArticle(currentIndex);
        } else {
            newsTitle.textContent = 'No news articles found.';
            newsDescription.textContent = '';
            newsLink.href = '#';
        }
    } catch (error) {
        newsTitle.textContent = 'Failed to load news.';
        newsDescription.textContent = '';
        newsLink.href = '#';
        console.error('Error fetching news:', error);
    }
}

function displayArticle(index) {
    const article = articles[index];
    newsTitle.textContent = article.title;
    newsDescription.textContent = article.description || 'No description available.';
    newsLink.href = article.url;
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === articles.length - 1;
}

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        displayArticle(currentIndex);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentIndex < articles.length - 1) {
        currentIndex++;
        displayArticle(currentIndex);
    }
});

// Fetch news on page load
fetchNews();
// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("clickMe");  // Get the button
    const message = document.getElementById("message");  // Get the paragraph to display the message
  
    // Add an event listener to the button
    button.addEventListener("click", function() {
      message.textContent = "Hello, you clicked the button!";
    });
  });
  