// === EL GORDO MUSICAL – SCRIPT COMPLETO ===

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

// ------- SORTEAR FAIXA -------

const drawButton = document.getElementById('draw-button');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const trackPlaylist = document.getElementById('track-playlist');
const trackLink = document.getElementById('track-link');

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

// ------- LOGIN COM SPOTIFY (FUTURO) -------

// Estes valores já estão ajustados para o seu app/site
const clientId = 'eef1c6de0c7349c19a15f0f41fc4001e';
const redirectUri = 'https://museolabs.github.io/el-gordo-musical/';

const scopes = [
  'user-read-private',
  'user-read-email'
];

const loginButton = document.getElementById('login-button');
const authStatus = document.getElementById('auth-status');

function buildSpotifyAuthUrl() {
  const authEndpoint = 'https://accounts.spotify.com/authorize';

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'token', // fluxo implícito
    redirect_uri: redirectUri,
    scope: scopes.join(' '),
    show_dialog: 'true'
  });

  return `${authEndpoint}?${params.toString()}`;
}

function handleSpotifyLoginClick() {
  const url = buildSpotifyAuthUrl();
  authStatus.textContent = 'Status: redirecionando para o Spotify...';
  // redireciona para a tela de login do Spotify usando window.location.href.[web:251][web:263]
  window.location.href = url;
}

if (loginButton && authStatus) {
  loginButton.addEventListener('click', handleSpotifyLoginClick);
}
