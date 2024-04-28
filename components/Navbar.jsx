"use client"
import React from 'react';
import { MyLinkWeb } from '@/components/MyLink';
import Link from 'next/link';
import { Link as ScrollLink } from "react-scroll";
import { FaTimes, FaBars, FaHouseUser } from 'react-icons/fa';
import { FaComputer } from 'react-icons/fa6';
import { BiSolidBookReader } from 'react-icons/bi';
import { MdHomeRepairService } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { Cinzel_Decorative } from 'next/font/google';
import { textObject } from '@/utils/scripts-js/textObject';
import { usePathname, useSearchParams } from 'next/navigation';
import Capa from '@/components/Capa';

const cinzel = Cinzel_Decorative({
  weight: ["700"],
  style: ["normal"],
  subsets: ["latin"]
});

const Navbar = () => {

  /* Obtener los array para mostrar los links e iconos del navbar */
  const arrayLinks = textObject.navbar.navbarLinks;
  const arrayIcons = textObject.navbar.navbarIcons;

  /* 
    Obtengo la ruta actual para compararla con la ruta del recorrido
    (arrayLinks.map) con el fin de marcar el link 'activo' de color 'naranja'
  */
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentUrl = `${pathname}?${searchParams}`;

  /* Obtengo los objetos (iconos) para combinarlos con 'arrayIcons' */
  const icons = [
    { icon: <FaComputer size={23} className='hover:text-orange-400' title={arrayIcons[0].tooltip} /> },
    { icon: <FaHouseUser size={22} className='hover:text-orange-400 hover:text-sm' title={arrayIcons[1].tooltip} /> },
    { icon: <BiSolidBookReader size={23} className='hover:text-orange-400 hover:text-sm' title={arrayIcons[2].tooltip} /> },
    { icon: <MdHomeRepairService size={23} className='hover:text-orange-400 hover:text-sm' title={arrayIcons[3].tooltip} /> },
  ];

  /* 
    Combino los arrays (icons y arrayIcons) para introducir
    cada icono en su respectivo 'ScrollLink' con su 'toUrl'
  */
  const combinedArray = arrayIcons.map((navItem, index) => ({
    ...navItem,
    icon: icons[index].icon,
  }));

  /* Estado para mostrar y ocultar el 'menu lateral' */
  const [nav, setNav] = useState(false);
  
  /* Función para cambiar el estado del 'menu lateral' */
  const handleNav = () => {
    setNav(!nav);
  }

  /* 
    Creo un estado para mostrar y ocultar los 
    iconos en la navegación de la página 'home'
  */
  const [myIcons, setMyIcons] = useState(false);

  /* Función para manejar la visibilidad de los iconos basada en la URL actual */
  const updateIconsVisibility = () => {
    if (currentUrl === '/?') {
      setMyIcons(true); /* muestra los 'iconos' */
    } else {
      setMyIcons(false); /* oculta los 'iconos' */
    }
  };

  useEffect(() => {
    /* Verificar la 'url actual' y actualizar la visibilidad de los iconos */
    updateIconsVisibility();

    /*
      Cuando el componente se monta (primera carga o después de un refresco),
      forzamos el desplazamiento a la parte superior de la página (Inicio)
    */
    window.scrollTo(0, 0);

    setCurrentSection("productsWorkjs"); /* marca en naranja el icono 'products' */
  },[]);

  const iconProducts = () => {
    if (currentUrl === '/?' && currentSection !== 'productsWorkjs') {
      setCurrentSection("productsWorkjs"); /* marca en naranja el icono 'products' */
    }
  }

  /* Estado para cambiar el color de los 'iconos' al seleccionarlo o haciendo scroll */
  const [currentSection, setCurrentSection] = useState("productsWorkjs");

  return (
    <nav className='
      fixed top-0 w-full h-20 shadow-xl z-[10000] 
      bg-black/90 text-slate-200'
    >
      <div className='
        relative z-20 flex justify-between 
        items-center w-full h-full px-4 shadow-custom'
      >
        {/* logo */}
        <div className='flex justify-center items-center gap-2'>
          <div>
            <h2 className={`text-4xl cursor-default ${cinzel.className}`}>
              {textObject.logo.title}
            </h2>
          </div>
          <h2 className={`spanOrange cursor-default ${cinzel.className}`}>
            {textObject.logo.subtitle}
          </h2>
        </div>
        {/* ul Link */}
        <div>
          <ul className='hidden uppercase lg:py-2 lg:flex lg:items-center'>
            {arrayLinks.map(({ id, url, name }) => (
              <Link
                key={id}
                href={url}
                className=
                {`
                  ml-10 text-sm font-normal hover:border-b hover:border-solid hover:border-orange-400
                  ${currentUrl === url+'?' ? 'text-orange-400 font-bold border-b' : ''} 
                `}
                onClick={() => iconProducts()}
              >
                <li>
                  { name }
                </li>
              </Link>
            ))}
          </ul>
        </div>
        {/* ul ScrollLink Icons, icon menu */}
        <div className='flex justify-between items-center gap-5'>
          <div className={`hidden ${currentUrl === '/?' && myIcons ? 'lg:block' : 'lg:hidden'}`}>
            <ul className='flex gap-x-5'>
              {combinedArray.map((navItem) => (
                <ScrollLink
                  key={navItem.id}
                  to={navItem.toUrl}
                  activeClass='active'
                  smooth={true}
                  spy={true}
                  duration={1000}
                  className='cursor-pointer'
                  onSetActive={() => setCurrentSection(navItem.toUrl)}
                >
                  <li className={`
                      ${currentSection === navItem.toUrl ? 'spanOrange' : ''}
                    `}
                  >
                    {navItem.icon}
                  </li>
                </ScrollLink>
              ))}
            </ul>
          </div>
          {/* icon menu */}
          <div onClick={handleNav} className='lg:hidden cursor-pointer'>
            <FaBars size={25} />
          </div>
        </div>
      </div>
      {/* menu lateral */}
      <div 
        className=
        {
          nav 
          ? 'lg:hidden fixed z-20 left-0 top-0 w-full h-screen bg-black/70 ease-in-all duration-1000' 
          : ''
        }
      >
        <div 
          className=
          {
            nav
            ? 'fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] min-h-screen p-2 ease-in-all duration-1000 text-center text-lg bg-slate-900 text-slate-200'
            : 'fixed left-[-200%] w-[75%] sm:w-[60%] md:w-[45%] p-2 h-screen top-0 ease-in-all duration-1000 text-center text-lg'
          }
        >
          {/* logo, icon menu, phrase */}
          <div>
            {/* logo, icon menu */}
            <div className='flex justify-between items-center w-full mt-5'>
              {/* logo */}
              <div className='flex justify-center items-center gap-x-2'>
                <h2 
                  className={`text-4xl cursor-pointer ${cinzel.className}`}
                >
                  {textObject.logo.title}
                </h2>
                <h2 className={`spanOrange ${cinzel.className}`}>
                  {textObject.logo.subtitle}
                </h2>
              </div>
              {/* icon menu */}
              <div 
                onClick={handleNav} 
                className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer'
              >
                <FaTimes />
              </div>
            </div>
            {/* phrase */}
            <div className='py-5 border-b border-gray-400'>
              <em>
                <span className='spanOrange'>
                  {textObject.phrase.text1}
                </span>
                <br />
                {textObject.phrase.text2}
                <br />
                <span className='spanOrange'>
                  {textObject.phrase.text3}
                </span>
                <br />
                {textObject.phrase.text4}
              </em>
            </div>
          </div>
          {/* ul Link */}
          <div className='p-8 -rotate-12 mt-5'>
            <ul className='uppercase flex justify-center flex-wrap gap-3'>
              {arrayLinks.map(({ id, url, name }) => (
                <Link
                  key={id}
                  href={url}
                  className=
                  {`
                    ${id === 1 || id === 3 ? 'relative rotate-45' : ''}
                  `}
                  onClick={(e) => {
                    handleNav(e);
                    iconProducts();
                  }}
                >
                  <li className=
                    {`
                      py-4 text-[15px] cursor-pointer font-semibold hover:text-orange-400 
                      ${currentUrl === url+'?' ? 'spanOrange relative before:absolute before:top-1/2 before:left-0 before:w-full before:h-[2px] before:bg-gray-400 before:transform before:-skew-y-12 before:-translate-y-1/2 before:origin-center' : ''}
                    `}
                  >
                    { name }
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          {/* ul ScrollLink Icons */}
          <div className=
            {`${currentUrl === '/?' && myIcons ? 'block pt-4 pb-6' : 'hidden'}`}
          >
            <ul className='flex justify-center gap-x-5'>
              {combinedArray.map((navItem) => (
                <ScrollLink
                  key={navItem.id}
                  to={navItem.toUrl} 
                  activeClass='active'
                  smooth={true}
                  spy={true}
                  duration={1000}
                  className='cursor-pointer'
                  onClick={(e) => {
                    handleNav(e);
                    iconProducts();
                  }}
                  onSetActive={() => setCurrentSection(navItem.toUrl)}
                >
                  <li className={currentSection === navItem.toUrl ? 'text-orange-400' : ''}>
                    {navItem.icon}
                  </li>
                </ScrollLink>
              ))}
            </ul>
          </div>
          {/* contact */}
          <div className='pt-2 border-t border-gray-400'>
            <p className='py-4 uppercase tracking-widest spanOrange'>
              <strong>
                {textObject.contact.text}
              </strong>
            </p>
            <p className='tracking-widest'>
              {textObject.contact.number}
            </p>
            <address className='py-2 pb-5 break-words tracking-widest'>
              {textObject.contact.mail}
            </address>
          </div>
        </div>
      </div>
      <Capa />
    </nav>
  )
}

export default Navbar