
import './style.css'
import { createImageCard } from './components/ImageCard.js'
import { createHeader } from './components/Header.js'

const app = document.querySelector('#app')

app.append(createHeader())

app.insertAdjacentHTML('beforeend', `
  <main>
    <section class="welcome" id="explorar">
      <p class="eyebrow">TU INSPIRACIÓN, EN UN SOLO LUGAR</p>
      <h1>Encuentra tu próxima idea</h1>
      <p>Descubre imágenes, estilos y lugares que te inspiran.</p>
    </section>

    <div class="section-heading">
      <h2 id="results-title">Ideas para ti</h2>
      <span id="results-count">Cargando...</span>
    </div>

    <section class="gallery" id="gallery" aria-live="polite"></section>
    <p class="message" id="message" role="status"></p>
  </main>

  <footer>
    <span>Inspiración para todos los días</span>
    <span>Proyecto educativo Pinterest Async</span>
  </footer>
`)

const gallery = document.querySelector('#gallery')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
const resultsTitle = document.querySelector('#results-title')
const resultsCount = document.querySelector('#results-count')
const message = document.querySelector('#message')
const homeLogo = document.querySelector('#home-logo')

const INITIAL_QUERY = 'inspiración'

async function getImages(query) {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=12`,
    {
      headers: {
        Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
      }
    }
  )

  if (!response.ok) {
    throw new Error(`Error de Unsplash: ${response.status}`)
  }

  const data = await response.json()

  return data.results.map((photo) => ({
    id: photo.id,
    title: photo.alt_description || photo.description || query,
    category: query,
    url: photo.urls.regular,
    avatar: photo.user.profile_image?.medium || '',
    author: photo.user.name || 'Autor desconocido',
    likes: photo.likes ?? 0
  }))
}

function renderImages(images) {
  gallery.replaceChildren()

  resultsCount.textContent =
    `${images.length} ${images.length === 1 ? 'imagen' : 'imágenes'}`

  if (images.length === 0) {
    message.textContent = 'No hay resultados. Prueba con otra búsqueda.'
    return
  }

  message.textContent = ''

  images.forEach((image) => {
    gallery.append(createImageCard(image))
  })
}

async function loadGallery(query = INITIAL_QUERY) {
  resultsTitle.textContent =
    query === INITIAL_QUERY
      ? 'Ideas para ti'
      : `Resultados para «${query}»`

  message.textContent = 'Cargando imágenes...'
  gallery.replaceChildren()
  resultsCount.textContent = 'Cargando...'

  try {
    const images = await getImages(query)
    renderImages(images)
  } catch (error) {
    console.error(error)
    resultsCount.textContent = '0 imágenes'
    message.textContent =
      'No se pudieron cargar las imágenes. Comprueba tu conexión y la clave de Unsplash.'
  }
}

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault()

  const query = searchInput.value.trim()
  searchInput.value = ''

  await loadGallery(query || INITIAL_QUERY)
})

homeLogo.addEventListener('click', async (event) => {
  event.preventDefault()
  searchInput.value = ''
  await loadGallery(INITIAL_QUERY)
})

loadGallery()
