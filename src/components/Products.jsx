import { products } from '../data/content.js'
import './Products.css'

export default function Products() {
  return (
    <section id={products.id} className="py-5 bg-white products-section">
      <div className="container py-5 products-container">
        <h2 className="section-title mb-5 products-section-title">
          {products.title}
        </h2>
        <div className="row g-4 justify-content-center products-row">
          {products.items.map((item, index) => {
            const isDark = index % 2 === 1
            const isFullCentered = index === products.items.length - 1
            return (
              <div
                className={
                  isFullCentered
                    ? 'col-md-8 mt-4 products-col products-col-wide'
                    : 'col-md-6 products-col'
                }
                key={item.title}
              >
                <div
                  className={`apple-product-grid${isDark ? ' dark-theme' : ''}`}
                >
                  <h3>{item.title}</h3>
                  <p className="text-secondary product-text">{item.text}</p>
                  <div className="btn-group-product">
                    {products.actions.map((action, actionIdx) => (
                      <a
                        href={action.href}
                        className={
                          actionIdx === 0
                            ? 'btn-product-primary'
                            : 'btn-product-secondary'
                        }
                        key={action.label}
                      >
                        {action.label}
                      </a>
                    ))}
                  </div>
                  <div className="product-img-wrapper">
                    <img src={item.image.src} alt={item.image.alt} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
