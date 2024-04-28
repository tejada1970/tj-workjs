/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      backgroundImage: {
        'fotoPersonal': "url('/images/fotos/foto-personal.png')",
        'moon': "url('/images/img-fondo/fondo-moon.jpg')",
        'paint': "url('/images/img-fondo/fondo-paint.jpg')",
        'pc': "url('/images/img-fondo/fondo-pc.jpg')",
      },
      rotate: {
        '360': '360deg',
      },
      borderRadius: {
        'top-left': '50px 0',
        'top-right': '0 50px',
      },
      boxShadow: {
        'custom': '0px 10px 20px rgba(0, 0, 0, 0.5)',
        'custom2': '0px 10px 20px rgba(0, 0, 0, 0.95)',
      },
    },
  },
  plugins: [],
}
