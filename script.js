// ===============================
// CONFIGURAÇÕES DO SPOTIFY
// ===============================

// Substitua esta string pelo seu Client ID verdadeiro do app Spotify
const SPOTIFY_CLIENT_ID = "SEU_CLIENT_ID_AQUI";
const SPOTIFY_REDIRECT_URI = "https://museolabs.github.io/el-gordo-musical/";

// Escopo mínimo: ler playlists do usuário (podemos ajustar depois)
const SPOTIFY_SCOPES = [
  "playlist-read-private",
  "playlist-read-collaborative"
].join(" ");

// ===============================
// SUPORTE A PKCE (code_verifier / code_challenge)
// ===============================

// Gera uma string aleatória (code_verifier)
function generateCodeVerifier(length = 128) {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let verifier = "";
  for (let i = 0; i < length; i++) {
    verifier += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return verifier;
}

// Converte string para ArrayBuffer
function stringToArrayBuffer(str) {
  const encoder = new TextEncoder();
  return encoder.encode(str);
}

// Converte ArrayBuffer para base64url
function arrayBufferToBase64Url(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

// Gera o code_challenge a partir do code_verifier
async function generateCodeChallenge(codeVerifier) {
  const data = stringToArrayBuffer(codeVerifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return arrayBufferToBase64Url(digest);
}

// ===============================
// CARREGAMENTO DE TRACKS A PARTIR DO JSON
// ===============================

let tracks = [];

// Função para carregar o arquivo JSON com as faixas
async function loadTracks() {
  try {
    const response = await fetch("tracks.json");
    if (!response.ok) {
      throw new Error("Não foi possível carregar tracks.json");
    }
    const data = await response.json();

    // Garante que seja um array
    if (!Array.isArray(data)) {
      throw new Error("Formato inválido de tracks.json");
    }

    tracks = data;
  } catch (error) {
    console.error(error);
  }
}

// ===============================
// LÓGICA PRINCIPAL DA PÁGINA
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const drawButton = document.getElementById("draw-button");
  const titleEl = document.getElementById("track-title");
  const artistEl = document.getElementById("track-artist");
  const playlistEl = document.getElementById("track-playlist");
  const linkEl = document.getElementById("track-link");

  const loginButton = document.getElementById("login-button");
  const authStatusEl = document.getElementById("auth-status");

  // Carrega as faixas locais assim que a página abrir
  loadTracks();

  // Função que sorteia uma faixa aleatória
  function drawRandomTrack() {
    if (!tracks.length) {
      titleEl.textContent =
        "Nenhuma faixa disponível para sorteio (talvez o tracks.json não tenha carregado).";
      artistEl.textContent = "";
      playlistEl.textContent = "";
      linkEl.classList.add("hidden");
      return;
    }

    const randomIndex = Math.floor(Math.random() * tracks.length);
    const track = tracks[randomIndex];

    titleEl.textContent = `Música: ${track.title}`;
    artistEl.textContent = `Artista: ${track.artist}`;
    playlistEl.textContent = `Playlist: ${track.playlist}`;
    linkEl.href = track.url;
    linkEl.textContent = "Abrir no Spotify";
    linkEl.classList.remove("hidden");
  }

  drawButton.addEventListener("click", drawRandomTrack);

  // ===============================
  // LOGIN COM SPOTIFY (apenas redirecionar para autorização)
  // ===============================

  loginButton.style.cursor = "pointer";

  loginButton.addEventListener("click", async () => {
    try {
      // 1) Gerar code_verifier e guardar no localStorage
      const codeVerifier = generateCodeVerifier();
      localStorage.setItem("spotify_code_verifier", codeVerifier);

      // 2) Gerar code_challenge
      const codeChallenge = await generateCodeChallenge(codeVerifier);

      // 3) Montar a URL de autorização
      const params = new URLSearchParams({
        client_id: SPOTIFY_CLIENT_ID,
        response_type: "code",
        redirect_uri: SPOTIFY_REDIRECT_URI,
        scope: SPOTIFY_SCOPES,
        code_challenge_method: "S256",
        code_challenge: codeChallenge
      });

      const authUrl =
        "https://accounts.spotify.com/authorize?" + params.toString();

      // 4) Atualizar status (opcional) e redirecionar
      authStatusEl.textContent =
        "Redirecionando para o Spotify para login/autorização...";
      window.location.href = authUrl;
    } catch (error) {
      console.error(error);
      alert(
        "Ocorreu um erro ao preparar o login com o Spotify. Veja o console para detalhes."
      );
    }
  });
});
