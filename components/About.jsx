"use client"
import Section from '@/components/Section';
import { motion } from 'framer-motion';
import { FadeIn } from '@/utils/scripts-js/variants';
import { textObject } from '@/utils/scripts-js/textObject';
import fotoPersonal from '@/public/images/fotos/foto-personal.png';
import { MyLinkWeb } from '@/components/MyLink';
import Image from 'next/image';

const About = () => {
  return (
    <Section
      classDivSection='
        section-aboutWorkjs h-[100%] max-w-[1200px] mx-auto
        flex flex-col gap-6 justify-center items-center
      '
      idSection='aboutWorkjs'
      classDivTitleSection='relative max-w-[400px] mx-auto'
      classContainerTitleSection='relative pt-16 w-full'
      classTitleSection='
        relative z-20 text-center font-bold 
        text-2xl text-blue-700 underline p-10
      '
      textTitleSection={textObject.titleSections.about}
    >
      <motion.div 
        variants={FadeIn('down', 0.7)}
        initial='hidden'
        whileInView={'show'}
        viewport={{once: true, amount: 0.7}}
        className='
        flex flex-col gap-6 justify-center items-center
        text-slate-400 p-5 max-w-[600px] mx-auto shadow-lg
        shadow-gray-900 bg-black/90 md:m-4 xl:flex-row
        xl:max-w-[1400px] xl:p-8 xl:gap-16'
      >
        {/* image small */}
        <div className='
          w-44 h-44 rounded-full border-t-2 border-t-gray-200 
          border-b-2 border-b-orange-400 mx-auto my-5 xl:hidden'
        >
          <Image 
            src={fotoPersonal}
            alt='mi foto personal'
            width={'100%'}
            height={'100%'}
            priority
            className='w-44 h-44 p-1.5 rounded-full object-cover object-center'
          />
        </div>
        {/* image big */}
        <div className='
          hidden z-20 xl:flex xl:justify-center xl:items-center'
        >
          <div>
            <motion.div 
              variants={FadeIn('down', 0.9)}
              initial='hidden'
              whileInView={'show'}
              viewport={{once: true, amount: 0.7}}
              className='
                relative block w-[350px] h-[350px] mx-auto
              '
            >
              <div 
                className='
                  relative top-0 left-0 z-10 rounded-xl flex 
                  items-end justify-center bg-fotoPersonal bg-cover 
                  bg-no-repeat shadow-lg border-t-2 border-slate-200
                  -skew-y-2 shadow-gray-700 w-[350px] h-[350px]
                '
              >
                <motion.span
                  variants={FadeIn('up', 2.0)}
                  initial='hidden'
                  whileInView='show' 
                  viewport={{once: true, amount: 0.9}}
                  className='
                    text-sm text-slate-300 bg-black/80 
                    w-full text-center rounded-b-xl p-4
                  '
                >
                  &lt; {textObject.about.titleBgFoto.title1} /&gt;
                  <br />
                  &lt; {textObject.about.titleBgFoto.title2} /&gt;
                </motion.span>
                <div className='
                  absolute top-0 left-0 w-full 
                  h-full z-20 bg-blue-900/30'
                >
                  {/* capa para la imagen background */}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        {/* text */}
        <div className='text-slate-300'>
          <p className='mb-5'>
            {textObject.about.text.p1} <span className='spanOrange text-xl'>
            {textObject.about.text.span1}</span>
          </p>
          <p>
            {textObject.about.text.p2} <span className='spanOrange'> 
            {textObject.about.text.span2}</span> {textObject.about.text.p3}
          </p>
          <p className='my-5'>
            {textObject.about.text.p4}
          </p>
          <p className='mb-5 lg:mb-0'>
            {textObject.about.text.p5}
          </p>
          {/* Links */}
          <div className='
            flex flex-col justify-center items-center
            gap-x-6 lg:flex lg:flex-row mt-10 lg:mt-0'
          >
            <div>
              <MyLinkWeb
                linkUrl={textObject.about.links[0].url}
                divClassName='text-center'
                linkClassName='border'
                linkText={textObject.about.links[0].text}
                leftValue = 'group-hover:left-[82%]'
              />
            </div>
            <div className='py-6'>
              <MyLinkWeb
                linkUrl={textObject.about.links[1].url}
                divClassName='text-center'
                linkClassName='border'
                linkText={textObject.about.links[1].text}
                leftValue = 'group-hover:left-[82%]'
              />
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}

export default About