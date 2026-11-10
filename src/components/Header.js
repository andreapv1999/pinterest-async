
import { createSearchBar } from './SearchBar.js'

export function createHeader() {
  const header = document.createElement('header')
  header.className = 'topbar'
  header.id = 'inicio'

  const brand = document.createElement('a')
  brand.className = 'brand'
  brand.href = '#inicio'
  brand.id = 'home-logo'
  brand.setAttribute('aria-label', 'Volver al inicio de Pinterest')

  brand.innerHTML = `
    <span class="brand-icon">P</span>
    <span>Pinterest</span>
  `

  const nav = document.createElement('nav')
  nav.className = 'main-nav'
  nav.setAttribute('aria-label', 'Navegación principal')

  nav.innerHTML = `
    <a class="nav-active" href="#inicio">Inicio</a>
    <a href="#explorar">Explorar</a>
    <a href="#guardados">Guardados</a>
  `

  const profile = document.createElement('button')
  profile.className = 'profile-button'
  profile.type = 'button'
  profile.setAttribute('aria-label', 'Perfil')
  profile.textContent = 'A'

  header.append(brand, nav, createSearchBar(), profile)

  return header
}
