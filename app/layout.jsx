import './globals.css';
import { Roboto } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Work JS | Home',
  description: 'Trabajo obligatorio del - Curso Superior en Programación de Páginas Web - (trabajoJS). Este trabajo en concreto, trata sobre una tienda ficticia de informática.',
  keywords: ['trabajo de desarrollo web', 'productos de informática', 'ordenadores', 'pc', 'componentes informáticos'],
}

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  style: ["italic", "normal"],
  subsets: ["latin"]
});

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`text-slate-700 tracking-[1.5px] font-medium ${roboto.className}`}>
        <header>
          <Navbar />
        </header>
        <main className='overflow-hidden bg-paint bg-cover bg-top bg-no-repeat bg-fixed'>
          { children }
        </main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  )
}
