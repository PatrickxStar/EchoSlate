// static/js/search.js

document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const lang = document.documentElement.lang || 'en';

  // Construct the index URL based on the language
  let indexURL = '';
  if (lang === 'en') {
    indexURL = '/index.json';
  } else {
    indexURL = `/${lang}/index.json`;
  }

  console.log('Fetching index from:', indexURL);

  // Fetch the search index
  fetch(indexURL)
    .then(response => response.json())
    .then(data => {
      // Initialize Fuse.js
      const fuse = new Fuse(data, {
        keys: ['title', 'content'],
        includeMatches: true,
        includeScore: true,
        threshold: 0.6,
        minMatchCharLength: 1,
        ignoreLocation: true,
      });

      // Event listener for search input
      searchInput.addEventListener('input', function () {
        const query = searchInput.value.trim();

        if (query.length > 0) {
          const results = fuse.search(query);
          console.log('Search results:', results);
          displayResults(results);
        } else {
          // Clear the results when the input is empty
          searchResults.innerHTML = '';
        }
      });
    })
    .catch(err => {
      console.error('Error fetching search index:', err);
    });

    function displayResults(results) {
      searchResults.innerHTML = '';
    
      if (results.length > 0) {
        results.forEach(result => {
          const item = result.item;
    
          const resultItem = document.createElement('div');
          resultItem.classList.add('p-4', 'bg-white', 'rounded', 'shadow');
    
          const title = document.createElement('h2');
          title.classList.add('text-xl', 'font-semibold', 'mb-2');
          title.innerHTML = `<a href="${item.permalink}" class="hover:underline text-black">${item.title}</a>`;
    
          const excerpt = document.createElement('p');
          excerpt.classList.add('text-black');
          excerpt.textContent = item.content.substring(0, 200) + '...';
    
          resultItem.appendChild(title);
          resultItem.appendChild(excerpt);
    
          searchResults.appendChild(resultItem);
        });
      } else {
        const noResults = document.createElement('p');
        noResults.classList.add('text-black');
        noResults.textContent = getTranslation('noResults', lang);
        searchResults.appendChild(noResults);
      }
    }
    
  function getTranslation(key, lang) {
    const translations = {
      en: {
        noResults: "No results found."
      },
      es: {
        noResults: "No se encontraron resultados."
      }
    };
    return translations[lang][key] || translations['en'][key];
  }
});
