const main = document.getElementById('main'),
  form = document.getElementById('form');

const renderLoading = () => {
  const loadingEl = document.createElement('div');
  loadingEl.id = 'loading';
  loadingEl.textContent = '🕒';
  main.appendChild(loadingEl);
}

const renderCard = (title, snippet, pageid) => {
  const URL = `https://en.wikipedia.org/?curid=${pageid}`;
  const card = document.createElement('article');
  card.className = 'card';
  card.innerHTML = `
    <h2 class="card-title"><a href=${URL} target="_blank">${title}</a></h2>
    <a href=${URL} class="card-link" target="_blank">${URL}</a>
    <p class="card-description">${snippet}</p>
  `;
  return card;
}

const renderResults = results => {
  main.innerHTML = '';
  if (results.length > 0) {
    results.forEach(({title, pageid, snippet}) => { 
      const cardElement = renderCard(title, snippet, pageid);
      main.appendChild(cardElement);
    });
  } else {
    main.innerHTML = `<p class="text-center"><i>No se encontraron resultados</i></p>`;
  }
}

const searchInWikipedia = async (word) => {
  const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${word}`);
  const data = await res.json();
  const results = data.query.search;
  return results;
}

const handleFormSearch = async e => {
  main.innerHTML = '';
  renderLoading();
  
  e.preventDefault();
  let word = e.target.children[0].value;
  let results = await searchInWikipedia(word);
  renderResults(results);
}

form.addEventListener('submit', handleFormSearch);