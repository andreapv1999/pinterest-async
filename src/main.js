import './style.css'
import { createImageCard } from './components/ImageCard.js'

const app = document.querySelector('#app')

app.innerHTML = `
<header class="topbar" id="inicio">
    <a class="brand" href="#inicio" aria-label="Inicio Pinterest">
      <span class="brand-icon">P</span>
      <span>Pinterest</span>
    </a>

    <nav class="main-nav" aria-label="Navegación principal">
      <a class="nav-active" href="#">Inicio</a>
      <a href="#explorar">Explorar</a>
      <a href="#guardados">Guardados</a>
    </nav>

    <form class="search-form" id="search-form">
      <span aria-hidden="true">⌕</span>
      <input
        id="search-input"
        type="search"
        placeholder="Buscar imágenes e ideas"
        aria-label="Buscar imágenes"
      >
      <button type="submit">Buscar</button>
    </form>

    <button class="profile-button" type="button" aria-label="Perfil">A</button>
  </header>

  <main>
    <section class="welcome" id="explorar">
      <p class="eyebrow">TU INSPIRACIÓN, EN UN SOLO LUGAR</p>
      <h1>Encuentra tu próxima idea</h1>
      <p>Descubre imágenes, estilos y lugares que te inspiran.</p>
    </section>

    <div class="section-heading">
      <h2 id="results-title">Ideas para ti</h2>
      <span id="results-count">12 imágenes</span>
    </div>

    <section class="gallery" id="gallery" aria-live="polite"></section>

    <p class="message" id="message" role="status"></p>
  </main>

  <footer>
    <span>Inspiración para todos los días</span>
    <span>Proyecto educativo Pinterest Async</span>
  </footer>
`

const gallery = document.querySelector('#gallery')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
const resultsTitle = document.querySelector('#results-title')
const resultsCount = document.querySelector('#results-count')
const message = document.querySelector('#message')

const initialImages = [
  { id: 1, title: 'Arquitectura minimalista', category: 'Arquitectura', color: 'e8ded1' },
  { id: 2, title: 'Rincón acogedor', category: 'Decoración', color: 'd9c7b2' },
  { id: 3, title: 'Flores naturales', category: 'Naturaleza', color: 'ead4d8' },
  { id: 4, title: 'Paisaje de montaña', category: 'Viajes', color: 'c8d9e6' },
  { id: 5, title: 'Moda sencilla', category: 'Moda', color: 'deded6' },
  { id: 6, title: 'Café y lectura', category: 'Estilo de vida', color: 'cbb49b' },
  { id: 7, title: 'Plantas de interior', category: 'Naturaleza', color: 'cbd8c2' },
  { id: 8, title: 'Detalles de diseño', category: 'Diseño', color: 'e7d9c7' },
  { id: 9, title: 'Escapada a la costa', category: 'Viajes', color: 'b9dce2' },
  { id: 10, title: 'Espacios luminosos', category: 'Decoración', color: 'eee5d8' },
  { id: 11, title: 'Arte contemporáneo', category: 'Arte', color: 'd5cbe8' },
  { id: 12, title: 'Jardín tranquilo', category: 'Naturaleza', color: 'd0ddcb' },
]

function renderImages(images) {
  gallery.replaceChildren()

  resultsCount.textContent =
    `${images.length} ${images.length === 1 ? 'imagen' : 'imágenes'}`

  if (images.length === 0) {
    message.textContent = 'No hay resultados. Prueba con otra búsqueda.'
    return
  }

  message.textContent = ''

  images.forEach((image, index) => {
    const card = document.createElement('article')
    card.className = 'image-card'

  const picture = document.createElement('img')
picture.src = image.url || `https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=700&q=80`
    picture.alt = image.title
    picture.loading = 'lazy'

    const details = document.createElement('div')
    details.className = 'image-details'

    const title = document.createElement('h3')
    title.textContent = image.title

    const category = document.createElement('p')
    category.textContent = image.category

    const saveButton = document.createElement('button')
    saveButton.className = 'save-button'
    saveButton.type = 'button'
    saveButton.textContent = 'Guardar'

    saveButton.addEventListener('click', () => {
      const saved = saveButton.classList.toggle('is-saved')
      saveButton.textContent = saved ? 'Guardado ✓' : 'Guardar'
    })

    gallery.append(createImageCard(image))
  })
}

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault()

  const query = searchInput.value.trim()
  searchInput.value = ''

  if (!query) {
    resultsTitle.textContent = 'Ideas para ti'
    renderImages(initialImages)
    return
  }

  resultsTitle.textContent = `Resultados para «${query}»`
  message.textContent = 'Buscando imágenes...'
  gallery.replaceChildren()

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=12`,
      {
        headers: {
          Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
        }
      }
    )

    if (!response.ok) {
      throw new Error('No se pudieron cargar las imágenes')
    }

    const data = await response.json()

    const images = data.results.map((photo) => ({
      id: photo.id,
      title: photo.alt_description || photo.description || query,
      category: query,
      url: photo.urls.regular
    }))

    renderImages(images)
  } catch (error) {
    message.textContent = 'No se pudieron cargar las imágenes. Comprueba tu conexión y la clave de Unsplash.'
    resultsCount.textContent = '0 imágenes'
    console.error(error)
  }
})

searchInput.value = 'inspiración'
searchForm.requestSubmit()
