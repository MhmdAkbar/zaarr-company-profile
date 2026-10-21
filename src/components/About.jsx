import { about } from '../data/content.js'
import './About.css'

export default function About() {
  return (
    <section id={about.id} className="about-section">
      <div className="container about-container">
        <h2 className="section-title">{about.title}</h2>
        <div className="about-row">
          <div className="about-col">
            <p className="about-lead">{about.text}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
