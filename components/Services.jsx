"use client"
import Section from "@/components/Section";
import { textObject } from '@/utils/scripts-js/textObject';
import Card from "@/components/Card";
import { motion } from 'framer-motion';
import { FadeIn } from '@/utils/scripts-js/variants';
import Image from "next/image";
import Collapse from "@/components/Collapse";

/* Obtengo las imagenes y las keys de los servicios workjs */
const imgSevices = require.context('@/public/images/img-illustrations', true );
const servicesImgPaths = imgSevices.keys();

const Services = () => {
  const arrayServices = textObject.services.cards;
  return (
    <Section
      classDivSection='
        section-servicesWorkjs min-h-[100%] 
        max-w-[1200px] mx-auto pb-20
      '
      idSection='servicesWorkjs'
      classDivTitleSection='relative pt-16 max-w-[400px] mx-auto'
      classContainerTitleSection='relative w-full'
      classSpanTitleSection=''
      classTitleSection='
        text-center p-10 font-bold text-2xl text-blue-700 underline
      '
      textTitleSection={textObject.titleSections.services}
    >
      <div 
        className='
          grid grid-cols-1 gap-y-32 gap-12 place-items-center 
          h-[100%] max-w-[1400px] mx-auto md:grid-cols-2 mt-20
        '
      >
        {arrayServices.map((service, index) => (
          <Card
            cardClassName='
              relative w-[330px] h-[100%] text-slate-700 shadow-md 
              group hover:shadow-custom2 hover:border-t-2 
              hover:border-blue-700 shadow-gray-900 border-t-2
              border-orange-400
            '
            bgCardAll=''
            cardHeaderClassName='
              relative p-5 flex justify-center items-center h-10
            '
            bgCardHeader=''
            cardBodyClassName='bg-slate-200'
            key={index}
            id={index}
          >
            {/* children[0] CardHeader */}
            <Image
              src={imgSevices(servicesImgPaths[index])}
              alt={`illustration service ${[index + 1]}`}
              width={'100%'}
              height={'100%'}
              priority
              className='object-fill'
            />

            {/* children[1] CardBody */}
            <p className='
              text-slate-700 text-xl mb-10 mt-32
              group-hover:text-blue-700 text-center'
            >
              {service.nameSevice}
            </p>

            {/* children[2] lastChildren Collapse */}
            <motion.div
              variants={FadeIn('up', 0.3)}
              initial='hidden'
              whileInView='show' 
              viewport={{once: true, amount: 0.2}}
              className='
              bg-orange-600 w-full p-5 flex justify-center
              items-center flex-col gap-5 group-hover:bg-blue-700'
            >
              <Collapse
                bgButton='bg-orange-600 w-full h-10 text-start p-2 group-hover:bg-blue-700'
                colorSpan='text-slate-200'
              >
                <p className='text-base p-2'>
                  {service.text}
                </p>
              </Collapse>
            </motion.div>
          </Card>
        ))}
      </div>
    </Section>
  )
}

export default Services