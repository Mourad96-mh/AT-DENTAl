import SEO from '../components/SEO'
import Hero from '../components/sections/Hero'
import StatsBar from '../components/sections/StatsBar'
import Categories from '../components/sections/Categories'
import FeaturedProducts from '../components/sections/FeaturedProducts'
import WhyUs from '../components/sections/WhyUs'
import Brands from '../components/sections/Brands'
import ContactCTA from '../components/sections/ContactCTA'

const HOME_FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Quels types de produits dentaires distribuez-vous au Maroc ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AT Dental distribue une gamme complète de fournitures et équipements dentaires : matériaux d\'empreinte, produits d\'endodontie, composites de restauration, équipements de stérilisation, turbines, détartreurs, fauteuils dentaires et technologies CAD/CAM. Plus de 500 références disponibles.',
      },
    },
    {
      '@type': 'Question',
      name: 'Livrez-vous dans tout le Maroc ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, AT Dental assure la livraison de fournitures et équipements dentaires dans toutes les villes du Maroc. Nous sommes basés à Marrakech et desservons l\'ensemble du territoire national.',
      },
    },
    {
      '@type': 'Question',
      name: 'Proposez-vous un service après-vente pour les équipements dentaires ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, AT Dental dispose d\'un service après-vente dédié pour tous les équipements dentaires distribués. Notre équipe technique assure l\'installation, la maintenance et la réparation des équipements.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment obtenir un devis pour des fournitures dentaires ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vous pouvez demander un devis directement sur notre site via le formulaire de contact, par téléphone au 06 93 37 34 89, ou par WhatsApp. Nous répondons dans les plus brefs délais.',
      },
    },
  ],
}

export default function Home() {
  return (
    <>
      <SEO
        title="Fournitures & Équipements Dentaires au Maroc"
        description="AT Dental — Distributeur de fournitures et équipements dentaires au Maroc. +500 produits : composites, endodontie, turbines, fauteuils. Livraison nationale."
        keywords="fournitures dentaires maroc, équipements dentaires marrakech, distributeur dentaire maroc, matériaux dentaires, turbine dentaire, fauteuil dentaire maroc"
        canonical="/"
        schema={HOME_FAQ_SCHEMA}
      />
      <Hero />
      <StatsBar />
      <Categories />
      <FeaturedProducts />
      <WhyUs />
      <Brands />
      <ContactCTA />
    </>
  )
}
