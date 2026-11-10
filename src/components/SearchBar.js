
export function createSearchBar() {
  const form = document.createElement('form')
  form.className = 'search-form'
  form.id = 'search-form'

  form.innerHTML = `
    <span aria-hidden="true">⌕</span>
    <input
      id="search-input"
      type="search"
      placeholder="Buscar imágenes e ideas"
      aria-label="Buscar imágenes"
    >
    <button type="submit">Buscar</button>
  `

  return form
}
