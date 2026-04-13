import { Link, useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FiArrowLeft, FiClock, FiCalendar, FiArrowRight } from 'react-icons/fi'
import { blogPosts, blogCategories } from '../data/blog'

function formatDate(dateStr, lang) {
  const d = new Date(dateStr)
  return d.toLocaleDateString(lang === 'en' ? 'en-GB' : 'fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
}

export default function BlogPost() {
  const { slug } = useParams()
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const lang = i18n.language

  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div className="pd-not-found">
        <div className="container">
          <div className="pd-not-found-inner">
            <div className="pd-not-found-icon">📭</div>
            <h1>{t('blog.not_found')}</h1>
            <Link to="/blog" className="btn btn--primary" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
              <FiArrowLeft size={16} /> {t('blog.back')}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const title   = lang === 'en' ? post.titleEn   : post.titleFr
  const content = lang === 'en' ? post.contentEn  : post.contentFr
  const catInfo = blogCategories.find((c) => c.id === post.category)
  const catLabel = lang === 'en' ? catInfo?.labelEn : catInfo?.labelFr

  const related = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3)

  return (
    <div className="blogpost-page">
      {/* Hero */}
      <div className="blogpost-hero">
        <div className="container blogpost-hero-inner">
          <button className="pd-back-btn" onClick={() => navigate(-1)}>
            <FiArrowLeft size={15} /> {t('blog.back')}
          </button>
          <div className="blogpost-meta">
            <span className="blogpost-cat">{catLabel}</span>
            <span className="blogpost-date">
              <FiCalendar size={13} /> {formatDate(post.date, lang)}
            </span>
            <span className="blogpost-read">
              <FiClock size={13} /> {post.readTime} {t('blog.min_read')}
            </span>
          </div>
          <h1 className="blogpost-title">{title}</h1>
        </div>
      </div>

      <div className="container blogpost-layout">
        {/* Article */}
        <article className="blogpost-article">
          <img
            src={post.image}
            alt={title}
            className="blogpost-cover"
            onError={(e) => { e.target.src = 'https://placehold.co/800x450/e8f4f8/0d3b6e?text=Article' }}
          />
          <div className="blogpost-content">
            {content.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="blogpost-footer">
            <Link to="/blog" className="btn btn--outline">
              <FiArrowLeft size={15} /> {t('blog.back')}
            </Link>
            <Link to="/contact" className="btn btn--primary">
              {t('common.contact_us')} <FiArrowRight size={15} />
            </Link>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="blogpost-sidebar">
          {related.length > 0 && (
            <div className="blogpost-related">
              <h3 className="blogpost-related-title">{t('blog.related')}</h3>
              <div className="blogpost-related-list">
                {related.map((p) => (
                  <Link to={`/blog/${p.slug}`} key={p.id} className="blogpost-related-item">
                    <img
                      src={p.image}
                      alt={lang === 'en' ? p.titleEn : p.titleFr}
                      onError={(e) => { e.target.src = 'https://placehold.co/120x80/e8f4f8/0d3b6e?text=Article' }}
                    />
                    <div>
                      <span className="blogpost-related-cat">
                        {lang === 'en'
                          ? blogCategories.find((c) => c.id === p.category)?.labelEn
                          : blogCategories.find((c) => c.id === p.category)?.labelFr}
                      </span>
                      <p className="blogpost-related-name">{lang === 'en' ? p.titleEn : p.titleFr}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="blogpost-cta-box">
            <h4>{t('blog.sidebar_cta_title')}</h4>
            <p>{t('blog.sidebar_cta_sub')}</p>
            <Link to="/contact" className="btn btn--accent" style={{ display: 'flex', justifyContent: 'center' }}>
              {t('common.contact_us')}
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
