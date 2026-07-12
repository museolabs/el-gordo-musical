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

const drawButton = document.getElementById('draw-track-button');
const resultDiv = document.getElementById('track-result');

function drawRandomTrack() {
  if (!tracks || tracks.length === 0) {
    resultDiv.textContent = 'Nenhuma faixa carregada ainda. Tente novamente em alguns segundos.';
    return;
  }

  const randomIndex = Math.floor(Math.random() * tracks.length);
  const track = tracks[randomIndex];

  resultDiv.innerHTML = `
    <p><strong>Faixa sorteada:</strong></p>
    <p>Título: ${track.title}</p>
    <p>Artista: ${track.artist}</p>
    <p>Playlist: ${track.playlist}</p>
    <p><a href="${track.url}" target="_blank">Abrir no Spotify</a></p>
  `;
}

if (drawButton && resultDiv) {
  drawButton.addEventListener('click', drawRandomTrack);
}

// ------- LOGIN COM SPOTIFY (FUTURO) -------

// IMPORTANTE: ajuste estes dois valores para o seu projeto
// 1) Coloque aqui o SEU client_id do app Spotify
// 2) Coloque aqui a URL do SEU site no GitHub Pages como redirectUri

const clientId = 'SEU_CLIENT_ID_DO_SPOTIFY_AQUI';
const redirectUri = 'https://SEU-USUARIO.github.io/el-gordo-musical/';

const scopes = [
  'user-read-private',
  'user-read-email'
];

const spotifyLoginButton = document.getElementById('spotify-login-button');

function buildSpotifyAuthUrl() {
  const authEndpoint = 'https://accounts.spotify.com/authorize';

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'token',
    redirect_uri: redirectUri,
    scope: scopes.join(' '),
    show_dialog: 'true'
  });

  return `${authEndpoint}?${params.toString()}`;
}

function handleSpotifyLoginClick() {
  const url = buildSpotifyAuthUrl();
  // abre na mesma aba
  window.location.href = url;
  // se preferir nova aba, troque pela linha abaixo:
  // window.open(url, '_blank');
}

if (spotifyLoginButton) {
  spotifyLoginButton.addEventListener('click', handleSpotifyLoginClick);
}
