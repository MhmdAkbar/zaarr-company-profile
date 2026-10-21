import { footer } from '../data/content.js'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <h5 className="footer-brand">{footer.brand}</h5>
        <p className="footer-tagline">{footer.tagline}</p>
        <p className="footer-copyright">{footer.copyright}</p>
      </div>
    </footer>
  )
}
