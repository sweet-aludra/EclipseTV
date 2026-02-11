//tela de carregamento
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  setTimeout(() => {
    loader.style.opacity = "0";

    setTimeout(() => {
      loader.style.display = "none";
    }, 400);
  }, 2000); // 1 segundos visível
});

//menu responsivo
const btnMobile = document.getElementById('btn-mobile');

function toggleMenu() {
  const nav = document.getElementById('nav');
  nav.classList.toggle('active');
}
btnMobile.addEventListener('click', toggleMenu);

//funcao para buscar videos para tela inicial
const ApiKey = '0bda17e7fd0e09b4a78d1224fa6b47f6'; //chave da api (https://www.themoviedb.org/settings/api)

async function carregarFilmesIniciais() {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${ApiKey}&language=pt-BR&page=1`; 

  const resp = await fetch(url);
  const data = await resp.json();

  const carrosel = document.getElementById('carrosel');
  carrosel.innerHTML = ''; //limpa o carrossel

  //limitar para os primeiros 5 filmes populares
  const filmes = data.results.slice(0, 5);

  for (const filme of filmes) {
    const idFilme = filme.id;
    const videoUrl = `https://api.themoviedb.org/3/movie/${idFilme}/videos?api_key=${ApiKey}`;

    const videoRes = await fetch(videoUrl);
    const videoData = await videoRes.json();

    const youtubeVideos = videoData.results.filter(v => v.site === 'YouTube');

    if (youtubeVideos.length > 0) {
      const container = document.createElement('div');
      container.className = 'video-item';

      const iframe = document.createElement('iframe');
      iframe.width = '360';
      iframe.height = '215';
      iframe.src = `https://www.youtube.com/embed/${youtubeVideos[0].key}`;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;

      container.appendChild(iframe);
      carrosel.appendChild(container);
    }
  }
}
window.addEventListener('load', carregarFilmesIniciais); //carrega junto com a pagina

//funcao para buscar o video que o usurio digitar
async function buscarTrailer() {
      const busca = document.getElementById('txtbusca').value; //onde o usuario busca
      const Url = `https://api.themoviedb.org/3/search/movie?api_key=${ApiKey}&query=${encodeURIComponent(busca)}`; //url da api 

      const resp = await fetch(Url); //pega a resposta
      const data = await resp.json(); //tranforma resposta em json

      if (!data.results || data.results.length === 0) { //se nao receber nenhum resultado
        document.getElementById('carrosel').innerHTML = '<p>Filme não encontrado.</p>';
        return;
      }

      const idFilme = data.results[0].id;
      const videoUrl = `https://api.themoviedb.org/3/movie/${idFilme}/videos?api_key=${ApiKey}`;

      const videoRes = await fetch(videoUrl); //pega respota da url de video
      const videoData = await videoRes.json(); //transforma resposta em json

      const carrosel = document.getElementById('carrosel'); 
      carrosel.innerHTML = ''; //deixa o espaço do carrosel em branco

      const youtubeVideos = videoData.results.filter(v => v.site === 'YouTube'); //filtra somente os do youtube

      if (youtubeVideos.length === 0) { //se nenhum trailer do filme for encontrado no youtube
        carousel.innerHTML = '<p>Trailer não disponível.</p>';
        return;
      }

      youtubeVideos.forEach(video => {
        const container = document.createElement('div'); //cria uma div
        container.className = 'video-item'; //cria classe passa div criada

        const iframe = document.createElement('iframe'); //cria um iframe
        iframe.width = '360'; //largura
        iframe.height = '215'; //altura
        iframe.src = `https://www.youtube.com/embed/${video.key}`; //coloca a url dos videos
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'; //propriedades do youtube
        iframe.allowFullscreen = true;
        //fazer um if aqui para dinamismo!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        container.appendChild(iframe);
        carrosel.appendChild(container);
      });
    }

    function scrollCarousel(direction) {
      const carrosel = document.getElementById('carrosel');
      const scrollAmount = 400;
      carrosel.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}
