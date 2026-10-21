import { about } from '../data/content.js'
import './About.css'

export default function About() {
  return (
    <section
      id={about.id}
      className="py-5 bg-white border-top border-light about-section"
    >
      <div className="container py-5 about-container">
        <h2 className="section-title">{about.title}</h2>
        <div className="row justify-content-center about-row">
          <div className="col-md-8 text-center about-col">
            <p className="lead text-secondary fs-4 fw-light about-lead">
              {about.text}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
