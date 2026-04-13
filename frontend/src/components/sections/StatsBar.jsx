import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiPackage, FiAward, FiClock, FiTruck } from 'react-icons/fi'

const STATS = [
  { Icon: FiPackage, numKey: 'statsbar.s1_num', labelKey: 'statsbar.s1_label' },
  { Icon: FiAward,   numKey: 'statsbar.s2_num', labelKey: 'statsbar.s2_label' },
  { Icon: FiClock,   numKey: 'statsbar.s3_num', labelKey: 'statsbar.s3_label' },
  { Icon: FiTruck,   numKey: 'statsbar.s4_num', labelKey: 'statsbar.s4_label' },
]

export default function StatsBar() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
      },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="stats-bar" ref={ref}>
      <div className="container">
        <div className={`stats-bar-grid${visible ? ' visible' : ''}`}>
          {STATS.map(({ Icon, numKey, labelKey }, i) => (
            <div
              className="stats-bar-item"
              key={numKey}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="stats-bar-icon-wrap">
                <Icon size={22} />
              </div>
              <div className="stats-bar-num">{t(numKey)}</div>
              <div className="stats-bar-label">{t(labelKey)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
