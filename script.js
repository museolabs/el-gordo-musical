// Lista fictícia de faixas para teste inicial
const tracks = [
  {
    title: "Blue in Green",
    artist: "Miles Davis",
    playlist: "Jazz de fim de noite",
    url: "https://open.spotify.com/track/0000000001"
  },
  {
    title: "Marquee Moon",
    artist: "Television",
    playlist: "Post-punk essentials",
    url: "https://open.spotify.com/track/0000000002"
  },
  {
    title: "Pow R. Toc H.",
    artist: "Pink Floyd",
    playlist: "Psychedelic trips",
    url: "https://open.spotify.com/track/0000000003"
  },
  {
    title: "Hallogallo",
    artist: "NEU!",
    playlist: "Krautrock motorik",
    url: "https://open.spotify.com/track/0000000004"
  },
  {
    title: "Vento Bravo",
    artist: "Edu Lobo",
    playlist: "MPB profunda",
    url: "https://open.spotify.com/track/0000000005"
  },
  {
    title: "Dopesmoker",
    artist: "Sleep",
    playlist: "Doom monolitos",
    url: "https://open.spotify.com/track/0000000006"
  }
];

// Espera o HTML carregar antes de acessar os elementos
document.addEventListener("DOMContentLoaded", () => {
  const drawButton = document.getElementById("draw-button");
  const titleEl = document.getElementById("track-title");
  const artistEl = document.getElementById("track-artist");
  const playlistEl = document.getElementById("track-playlist");
  const linkEl = document.getElementById("track-link");  const loginButton = document.getElementById("login-button");
  const authStatusEl = document.getElementById("auth-status");

  // Por enquanto o botão não faz login real, só mostra uma mensagem
  loginButton.addEventListener("click", () => {
    alert(
      "Nesta versão, o login com Spotify ainda está em desenvolvimento. O sorteio usa uma lista local de teste."
    );
  });

  // Função que sorteia uma faixa aleatória
  function drawRandomTrack() {
    if (!tracks.length) {
      titleEl.textContent = "Nenhuma faixa disponível para sorteio.";
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

  // Liga o clique do botão à função de sorteio
  drawButton.addEventListener("click", drawRandomTrack);
});
