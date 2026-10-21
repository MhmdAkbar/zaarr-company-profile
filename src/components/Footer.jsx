import { footer } from '../data/content.js'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="text-center border-top border-light site-footer">
      <div className="container">
        <h5 className="fw-bold text-dark mb-3 footer-brand">{footer.brand}</h5>
        <p className="footer-tagline">{footer.tagline}</p>
        <p className="mt-4 mb-0 pb-3 footer-copyright">{footer.copyright}</p>
      </div>
    </footer>
  )
}
