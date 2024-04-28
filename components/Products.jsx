"use client"
import Section from "@/components/Section";
import { textObject } from '@/utils/scripts-js/textObject';
import SlideShow from '@/components/SlideShow';
import Image from "next/image";
import Capa from "@/components/Capa";
import { Cinzel_Decorative } from 'next/font/google';
import ArrayProducts from '@/components/ArrayProducts';

const cinzel = Cinzel_Decorative({
  weight: ["700"],
  style: ["normal"],
  subsets: ["latin"]
});

/* Obtengo las imagenes y las keys de los productos workjs */
const imgProductsWorkjs = require.context('@/public/images/img-productsWorkjs/img-products', true );
const productsImgPathsWorkjs = imgProductsWorkjs.keys();

const Products = () => {
  const arrayProducts = textObject.products.cards;
  return (
    <Section
      classDivSection='
        section-productsWorkjs min-h-[100%]
      '
      idSection='productsWorkjs'
      classDivTitleSection='relative max-w-[400px] mx-auto'
      classContainerTitleSection='relative pt-20 w-full'
      classTitleSection='
        text-center font-bold text-2xl 
        text-blue-700 underline p-5
      '
      textTitleSection={textObject.titleSections.products}
    >
      <div>
        <SlideShow />
      </div>
      {/* title aside */}
      <div>
        <h3 className='
          w-full my-16 text-center font-bold text-lg
          text-slate-200 bg-orange-600 p-5 uppercase'
        >
          {textObject.products.aside.title}
        </h3>
      </div>
      {/* aside, products */}
      <div className='my-16 relative'>
        {/* aside */}
        <aside className='
          flex flex-wrap justify-center items-center py-12 text-center
          text-slate-300 bg-moon bg-cover bg-top bg-no-repeat bg-fixed
          gap-16 relative z-20'
        >
          {/* aside-1 */}
          <div className='relative z-20'>
            <div className='py-2'>
              <p className='py-2'>
                <span className='text-lg spanOrange uppercase'>
                  {textObject.products.aside.span1}
                </span>
              </p>
            </div>
            {/* image */}
            <div className='m-4'>
              <Image
                src='/images/img-productsWorkjs/product-aside-1.png'
                alt='image-1-aside'
                width={600}
                height={400}
                priority
                className='w-full h-[350px] object-cover object-center border-solid border-2 border-yellow-500 p-3 rounded-top-left'
              />
            </div>
            <div>
              <p>
                <span className='spanOrange text-xl uppercase pt-4'>
                  {textObject.products.aside.span3}
                </span>
              </p>
            </div>
          </div>
          {/* aside-2 */}
          <div className='relative z-20 xl:pb-16'>
            <div className='p-2'>
              <p className={`text-4xl ${cinzel.className}`}>
                <span className='spanOrange text-lg uppercase'>
                  {textObject.products.aside.span4}
                </span><br />
                {textObject.products.aside.p3}
                <span className='spanOrange ml-3 text-lg uppercase'>
                  {textObject.products.aside.span5}
                </span>
              </p>
            </div>
            {/* image */}
            <div className='m-4'>
              <Image
                src='/images/img-productsWorkjs/product-aside-2.jpg'
                alt='image-1-aside'
                width={600}
                height={400}
                priority
                className='w-full h-[350px] object-cover object-center border-solid border-2 border-yellow-500 p-3 rounded-top-right'
              />
            </div>
          </div>
          <Capa />
        </aside>
        {/* products */}
        <ArrayProducts
          array={arrayProducts}
          images={imgProductsWorkjs}
          imagesPaths={productsImgPathsWorkjs}
          cardClassName='
            relative border-t-2 border-orange-600 
            bg-slate-100 w-[320px] h-[420px] shadow-custom 
            hover:shadow-custom2 hover:border-t-2 
            hover:border-blue-700 group
          '
          cardHeaderClassName='relative h-[240px] p-[7px]'
          cardBodyClassName='
            relative flex flex-col justify-end p-2 pb-0 mt-4
          '
        >
          {/* children[0] title infoCards*/}
          <div className='
            max-w-[500px] mt-16 mb-6 bg-orange-600 
            md:col-span-2 md:rounded-lg lg:col-span-3
            xl:col-span-4'
          >
            <p className='text-center md:text-start p-4'>
              <span className='text-lg text-slate-100'>
                {textObject.products.infoCards.span1}
              </span>
            </p>
          </div>
        </ArrayProducts>
      </div>
    </Section>
  )
}

export default Products