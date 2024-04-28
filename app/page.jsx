import Products from '@/components/Products';
import About from '@/components/About';
import News from '@/components/News';
import Services from '@/components/Services';

async function HomePage () { 
  return (
    <div>
      <Products />
      <About />
      <News />
      <Services />
    </div>
  )
}

export default HomePage