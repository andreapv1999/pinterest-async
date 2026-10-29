export function createImageCard(image) {
  const card = document.createElement('article')
  card.className = 'image-card'

  const picture = document.createElement('img')
picture.src = image.url || image.urls?.regular || image.urls?.small || ''
  picture.alt = image.alt_description || 'Imagen de inspiración'
  picture.loading = 'lazy'

  const details = document.createElement('div')
  details.className = 'image-details'

  const title = document.createElement('h3')
  title.textContent = image.alt_description || 'Inspiración'

  const saveButton = document.createElement('button')
  saveButton.className = 'save-button'
  saveButton.textContent = 'Guardar'
  saveButton.type = 'button'

  saveButton.addEventListener('click', () => {
    const saved = saveButton.classList.toggle('is-saved')
    saveButton.textContent = saved ? 'Guardado ✓' : 'Guardar'
  })

  details.append(title, saveButton)
  card.append(picture, details)

  return card
}
