"use client"
import React from 'react';
import Section from '@/components/Section';
import { textObject } from '@/utils/scripts-js/textObject';
import MapView from '@/components/MapView';
import { Cinzel_Decorative } from 'next/font/google';

const cinzel = Cinzel_Decorative({
  weight: ["700"],
  style: ["normal"],
  subsets: ["latin"]
});

const Contact = () => {
  return (
    <Section
      classDivSection='
        section-contactWorkjs h-[100%] max-w-[1200px] 
        mx-auto relative xl:h-[100vh]
      '
      idSection='contactWorkjs'
      classDivTitleSection='relative max-w-[400px] mx-auto'
      classContainerTitleSection='relative pt-16 w-full'
      classTitleSection='
        relative z-20 text-center font-bold
        text-2xl text-blue-700 underline p-10
      '
      textTitleSection={textObject.titleSections.contact}
    >
      <div className='
        mb-10 w-[100%] flex flex-col gap-10 lg:h-[700px] lg:p-3
        lg:flex-row-reverse lg:justify-center lg:items-center'
      >
        {/* companyData */}
        <div className='
          p-3 flex flex-col gap-4 bg-slate-100/70 font-bold
          md:text-lg lg:border-2 lg:border-orange-600 text-lg'
        >
          {/* title */}
          <div className='text-xl text-blue-700'>
            <h3>{textObject.mapWiew.companyData.h3}</h3>
          </div>
          {/* logo */}
          <div>
            <p className={cinzel.className}>
              {textObject.mapWiew.companyData.p1} 
              <span className=
                {`
                  text-orange-600 text-sm ${cinzel.className}
                `}
              >
                {textObject.mapWiew.companyData.span1}
              </span>
            </p>
          </div>
          {/* address */}
          <div className='mt-3'>
            <p>
              {textObject.mapWiew.companyData.p2}
            </p>
            <p>
              {textObject.mapWiew.companyData.p3}
            </p>
          </div>
          {/* phone */}
          <div>
            <p>
              {textObject.mapWiew.companyData.p4}
            </p>
          </div>
          {/* email */}
          <div>
            <p>
              {textObject.mapWiew.companyData.p5}
            </p>
            <address>
              {textObject.mapWiew.companyData.address}
            </address>
          </div>
        </div>
        {/* mapWiew */}
        <div className='h-[555px] lg:w-[70%]'>
          <MapView 
            lat={textObject.mapWiew.map.lat}
            lng={textObject.mapWiew.map.lng}
            titleStartingPoint={textObject.mapWiew.map.titleStartingPoint}
            titleFinalPoint={textObject.mapWiew.map.titleFinalPoint}
          />
        </div>
      </div>
    </Section>
  )
}

export default Contact