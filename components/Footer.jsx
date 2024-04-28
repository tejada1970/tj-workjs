import React from 'react';
import { FaFacebook, FaInstagramSquare, FaYoutube } from 'react-icons/fa';
import Link from 'next/link';
import { textObject } from '@/utils/scripts-js/textObject';

const Socials = () => {
  return (
    <div>
      <div>
        <p>
          {textObject.footer.socials.p}
        </p>
      </div>
      <div className='
        pt-4 flex justify-center items-center gap-6 spanOrange
      '
      >
        <Link
          href='https://es-es.facebook.com/'
          target='_blank'
          title= {textObject.footer.socials.tooltip1}
          rel='noreferrer'
        >
          <FaFacebook size={25} className='hover:text-blue-600'/>
        </Link>
        <Link
          href='https://www.instagram.com/?hl=es'
          target='_blank'
          title= {textObject.footer.socials.tooltip2}
          rel='noreferrer'
        >
          <FaInstagramSquare size={25} className='hover:text-blue-600'/>
        </Link>
        <Link
          href='https://www.youtube.com/'
          target='_blank'
          title= {textObject.footer.socials.tooltip3}
          rel='noreferrer'
        >
          <FaYoutube size={25} className='hover:text-blue-600'/>
        </Link>
      </div>
    </div>
  )
}
export { Socials }

const Location = () => {
  return (
    <div className='py-10'>
      <p>
        {textObject.footer.location.p1}
      </p>
      <div className='lg:flex justify-center items-center gap-6'>
        <div>
          <p className='spanOrange pt-2'>
            {textObject.footer.location.p2}
          </p>
          <p>
            {textObject.footer.location.p3}
          </p>
        </div>
      </div>
    </div>
  )
}
export { Location }

const Legal = () => {
  return (
    <div>
      <div className='pb-5'>
        <p>
          {textObject.legalWarning.p}
        </p>
        <div>
          <Link
            href={textObject.legalWarning.url}
            target='_self'
            title= {textObject.legalWarning.tooltip}
          >
            <span className='spanOrange hover:text-blue-600 underline'>
              {textObject.legalWarning.span}
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
export { Legal }

const Copy = () => {
  return (
    <div className='relative h-20 flex flex-col justify-center items-center text-slate-400'
    >
      <p>
        &copy;2023 César Tejada Lorente
      </p>
      <address>
        cesartejada353@gmail.com
      </address>
    </div>
  )
}
export { Copy }

const Footer = () => {
  return (
    <div className='
      relative w-full text-lg text-center py-5
      bg-black/90 text-slate-50 font-bold'
    >
      {/* socials, stores, legal */}
      <div className='md:flex justify-center items-center gap-14'>
        {/* socials */}
        <Socials />
        {/* location */}
        <Location />
        {/* legal */}
        <Legal />
      </div>
      {/* copy */}
      <Copy />
    </div>
  )
}

export default Footer