import Hero from '../components/sections/Hero'
import StatsBar from '../components/sections/StatsBar'
import Categories from '../components/sections/Categories'
import FeaturedProducts from '../components/sections/FeaturedProducts'
import WhyUs from '../components/sections/WhyUs'
import Brands from '../components/sections/Brands'
import ContactCTA from '../components/sections/ContactCTA'

export default function Home() {
  return (
    <>
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
