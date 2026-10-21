import { services } from '../data/content.js'
import './Services.css'

const SERVICE_ICONS = ['bi-cpu', 'bi-sliders', 'bi-person-gear']

export default function Services() {
  return (
    <section id={services.id} className="services-section">
      <div className="container services-container">
        <h2 className="section-title">{services.title}</h2>
        <div className="services-row">
          {services.items.map((item, index) => (
            <div className="services-col" key={item.title}>
              <div className="apple-card">
                <i
                  className={`bi ${SERVICE_ICONS[index]} service-icon`}
                  aria-hidden="true"
                ></i>
                <h4 className="service-card-title">{item.title}</h4>
                <p className="service-card-text">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
