import { services } from '../data/content.js'
import './Services.css'

const SERVICE_ICONS = ['bi-cpu', 'bi-sliders', 'bi-person-gear']

export default function Services() {
  return (
    <section id={services.id} className="py-5 services-section">
      <div className="container py-5 services-container">
        <h2 className="section-title">{services.title}</h2>
        <div className="row g-4 services-row">
          {services.items.map((item, index) => (
            <div className="col-md-4 services-col" key={item.title}>
              <div className="apple-card text-center">
                <i
                  className={`bi ${SERVICE_ICONS[index]} fs-1 text-zaar-green d-block mb-3 service-icon`}
                  aria-hidden="true"
                ></i>
                <h4 className="fw-semibold mb-3 service-card-title">
                  {item.title}
                </h4>
                <p className="text-secondary mb-0 service-card-text">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
