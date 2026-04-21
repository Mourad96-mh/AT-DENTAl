import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FiClock, FiArrowRight } from 'react-icons/fi'
import { blogPosts, blogCategories } from '../data/blog'
import SEO from '../components/SEO'

function formatDate(dateStr, lang) {
  const d = new Date(dateStr)
  return d.toLocaleDateString(lang === 'en' ? 'en-GB' : 'fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
}

export default function Blog() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const [activeCategory, setActiveCategory] = useState('')

  const filtered = activeCategory
    ? blogPosts.filter((p) => p.category === activeCategory)
    : blogPosts

  return (
    <div className="blog-page">
      <SEO
        title="Blog Dentaire — Conseils, Actualités & Équipements Dentaires"
        description="Le blog AT Dental : conseils pratiques pour dentistes, actualités sur les équipements dentaires, guides d'utilisation des matériaux et innovations du secteur dentaire au Maroc."
        keywords="blog dentaire maroc, conseils dentistes, actualité équipements dentaires, matériaux dentaires guide"
        canonical="/blog"
      />
      {/* Page Hero */}
      <div className="page-hero page-hero--blog">
        <div className="container page-hero-content">
          <h1 className="page-hero-title">{t('blog.page_title')}</h1>
          <p className="page-hero-subtitle">{t('blog.page_subtitle')}</p>
        </div>
      </div>

      <div className="container blog-container">
        {/* Category tabs */}
        <div className="blog-tabs">
          <button
            className={`blog-tab${!activeCategory ? ' active' : ''}`}
            onClick={() => setActiveCategory('')}
          >
            {t('blog.all')}
          </button>
          {blogCategories.map((cat) => (
            <button
              key={cat.id}
              className={`blog-tab${activeCategory === cat.id ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {lang === 'en' ? cat.labelEn : cat.labelFr}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">📭</div>
            <h3>{t('blog.no_posts')}</h3>
          </div>
        ) : (
          <div className="blog-grid">
            {filtered.map((post) => (
              <article className="blog-card" key={post.id}>
                <Link to={`/blog/${post.slug}`} className="blog-card-img-link">
                  <div className="blog-card-img-wrap">
                    <img src={post.image} alt={lang === 'en' ? post.titleEn : post.titleFr} />
                  </div>
                </Link>
                <div className="blog-card-body">
                  <div className="blog-card-meta">
                    <span className="blog-card-cat">
                      {lang === 'en'
                        ? blogCategories.find((c) => c.id === post.category)?.labelEn
                        : blogCategories.find((c) => c.id === post.category)?.labelFr}
                    </span>
                    <span className="blog-card-date">
                      {formatDate(post.date, lang)}
                    </span>
                    <span className="blog-card-read">
                      <FiClock size={12} />
                      {post.readTime} {t('blog.min_read')}
                    </span>
                  </div>
                  <h2 className="blog-card-title">
                    <Link to={`/blog/${post.slug}`}>
                      {lang === 'en' ? post.titleEn : post.titleFr}
                    </Link>
                  </h2>
                  <p className="blog-card-excerpt">
                    {lang === 'en' ? post.excerptEn : post.excerptFr}
                  </p>
                  <Link to={`/blog/${post.slug}`} className="blog-card-cta">
                    {t('blog.read_more')} <FiArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
