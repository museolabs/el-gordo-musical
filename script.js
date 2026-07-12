* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  background: #0f172a;
  color: #f9fafb;
}

.container {
  max-width: 640px;
  margin: 0 auto;
  padding: 1.5rem;
}

.header h1 {
  margin: 0 0 0.5rem;
}

.header p {
  margin: 0;
  color: #cbd5f5;
}

.playlists {
  margin-top: 1.5rem;
}

.playlists label {
  display: block;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
  color: #cbd5f5;
}

#playlists-input {
  width: 100%;
  min-height: 80px;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #1f2937;
  background: #020617;
  color: #f9fafb;
  resize: vertical;
}

.actions {
  margin-top: 1rem;
  text-align: center;
}

#draw-button {
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  border: none;
  background: #facc15;
  color: #1f2937;
  font-weight: 600;
  cursor: pointer;
}

#draw-button:hover {
  background: #fde047;
}

.result {
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 0.75rem;
  background: #020617;
  border: 1px solid #1f2937;
}

.result h2 {
  margin: 0 0 0.5rem;
}

.result p {
  margin: 0.15rem 0;
}

#track-link {
  display: inline-block;
  margin-top: 0.75rem;
  color: #22c55e;
  text-decoration: none;
}

#track-link:hover {
  text-decoration: underline;
}

.hidden {
  display: none;
}
