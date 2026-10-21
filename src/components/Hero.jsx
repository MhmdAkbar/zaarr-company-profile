import { Fragment } from 'react'
import { hero } from '../data/content.js'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero-section">
      <video className="hero-video" autoPlay loop muted playsInline>
        <source src={hero.video} type="video/mp4" />
        {hero.videoFallback}
      </video>

      <div className="hero-overlay"></div>

      <div className="container hero-content">
        <h1 className="hero-title">
          {hero.titleLines.map((line, i) => (
            <Fragment key={line}>
              {i > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </h1>
        <p className="hero-subtitle">
          {hero.taglineLines.map((line, i) => (
            <Fragment key={line}>
              {i > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </p>
        <a href={hero.cta.href} className="btn-apple">
          {hero.cta.label}
        </a>
      </div>
    </section>
  )
}
