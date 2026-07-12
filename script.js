// === EL GORDO MUSICAL – SCRIPT COMPLETO ===
//
// 1) Carrega faixas de tracks.json e sorteia
// 2) Faz login básico com Spotify (abre tela de autorização)
// 3) Lê o "code" que o Spotify envia na URL na volta

// ------- CARREGAR FAIXAS DO ARQUIVO JSON -------

let tracks = [];

// Busca o arquivo tracks.json hospedado junto com o site
fetch('tracks.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao carregar tracks.json');
    }
    return response.json();
  })
  .then(data => {
    tracks = data;
    console.log('Faixas carregadas:', tracks);
  })
  .catch(error => {
    console.error('Erro ao buscar tracks.json:', error);
  });

// ------- ELEMENTOS DA INTERFACE -------

const drawButton = document.getElementById('draw-button');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const trackPlaylist = document.getElementById('track-playlist');
const trackLink = document.getElementById('track-link');

const loginButton = document.getElementById('login-button');
const authStatus = document.getElementById('auth-status');

// ------- SORTEAR FAIXA -------

function drawRandomTrack() {
  if (!tracks || tracks.length === 0) {
    trackTitle.textContent = 'Nenhuma faixa carregada ainda. Tente novamente em alguns segundos.';
    trackArtist.textContent = '';
    trackPlaylist.textContent = '';
    trackLink.classList.add('hidden');
    trackLink.href = '#';
    return;
  }

  const randomIndex = Math.floor(Math.random() * tracks.length);
  const track = tracks[randomIndex];

  trackTitle.textContent = `Faixa sorteada: ${track.title}`;
  trackArtist.textContent = `Artista: ${track.artist}`;
  trackPlaylist.textContent = `Playlist: ${track.playlist}`;

  if (track.url) {
    trackLink.href = track.url;
    trackLink.classList.remove('hidden');
  } else {
    trackLink.classList.add('hidden');
    trackLink.href = '#';
  }
}

if (drawButton && trackTitle && trackArtist && trackPlaylist && trackLink) {
  drawButton.addEventListener('click', drawRandomTrack);
}

// ------- LOGIN COM SPOTIFY -------

// Valores do seu app/site
const clientId = 'eef1c6de0c7349c19a15f0f41fc4001e';
const redirectUri = 'https://museolabs.github.io/el-gordo-musical/';

const scopes = [
  'user-read-private',
  'user-read-email'
];

// Monta a URL de autorização do Spotify (Authorization Code Flow).[web:274]
function buildSpotifyAuthUrl() {
  const authEndpoint = 'https://accounts.spotify.com/authorize';

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'code', // Spotify exige "code".[web:274]
    redirect_uri: redirectUri,
    scope: scopes.join(' '),
    show_dialog: 'true'
  });

  return `${authEndpoint}?${params.toString()}`;
}

// Dispara o redirecionamento quando clica no botão
function handleSpotifyLoginClick() {
  const url = buildSpotifyAuthUrl();
  if (authStatus) {
    authStatus.textContent = 'Status: redirecionando para o Spotify...';
  }
  // redireciona para a tela de login do Spotify
  window.location.href = url;
}

// ------- LER O "CODE" NA VOLTA -------

// Quando a página carrega, checa se a URL tem ?code=...
function checkSpotifyCallback() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  const error = params.get('error');

  if (!authStatus) {
    console.log('auth-status não encontrado no DOM.');
    return;
  }

  if (error) {
    authStatus.textContent = `Status: erro do Spotify (${error}).`;
    console.log('Erro retornado pelo Spotify:', error);
    return;
  }

  if (code) {
    // Aqui, num app real, você trocaria o code por tokens num backend.[web:274][web:277]
    authStatus.textContent = 'Status: autorizado com Spotify (code recebido).';
    console.log('Code recebido do Spotify:', code);

    // Limpa o ?code= da URL para não ficar feio
    if (window.history && window.history.replaceState) {
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  } else {
    authStatus.textContent = 'Status: não conectado ao Spotify.';
  }
}

// ------- REGISTRAR EVENTOS -------

if (loginButton) {
  loginButton.addEventListener('click', handleSpotifyLoginClick);
}

// Chama SEMPRE quando o script carregar
checkSpotifyCallback();
