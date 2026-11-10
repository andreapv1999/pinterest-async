
export function createImageCard(image) {
  const card = document.createElement('article')
  card.className = 'image-card'

  const picture = document.createElement('img')
  picture.src = image.url || image.urls?.regular || image.urls?.small || ''
  picture.alt = image.title || image.alt_description || 'Imagen de inspiración'
  picture.loading = 'lazy'

  const details = document.createElement('div')
  details.className = 'image-details'

  const title = document.createElement('h3')
  title.textContent = image.title || image.alt_description || 'Inspiración'

  const authorInfo = document.createElement('div')
  authorInfo.className = 'author-info'

  const avatar = document.createElement('img')
  avatar.className = 'author-avatar'
  avatar.src = image.avatar || image.user?.profile_image?.medium || ''
  avatar.alt = ''
  avatar.loading = 'lazy'

  const author = document.createElement('span')
  author.textContent = image.author || image.user?.name || 'Autor desconocido'

  authorInfo.append(avatar, author)

  const likes = document.createElement('p')
  likes.className = 'image-likes'
  likes.textContent = `♥ ${Number(image.likes ?? 0).toLocaleString('es-ES')} likes`

  const saveButton = document.createElement('button')
  saveButton.className = 'save-button'
  saveButton.type = 'button'
  saveButton.textContent = 'Guardar'

  saveButton.addEventListener('click', () => {
    const saved = saveButton.classList.toggle('is-saved')
    saveButton.textContent = saved ? 'Guardado ✓' : 'Guardar'
    saveButton.setAttribute('aria-pressed', String(saved))
  })

  details.append(title, authorInfo, likes, saveButton)
  card.append(picture, details)

  return card
}
