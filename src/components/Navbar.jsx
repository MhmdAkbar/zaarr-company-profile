import { useState } from 'react'
import { site, navLinks } from '../data/content.js'
import './Navbar.css'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="navbar navbar-expand-lg fixed-top border-bottom border-light">
      <div className="container">
        <a className="navbar-brand" href={site.logo.href}>
          <img src={site.logo.src} alt={site.logo.alt} height="35" />
        </a>
        <button
          className="navbar-toggler border-0"
          type="button"
          aria-controls="navbarNav"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse justify-content-end${menuOpen ? ' show' : ''}`}
          id="navbarNav"
        >
          <ul className="navbar-nav">
            {navLinks.map((link) => (
              <li className="nav-item" key={link.href}>
                <a className="nav-link" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
