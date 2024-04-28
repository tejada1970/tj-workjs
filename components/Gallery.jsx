"use client"
import React from 'react';
import Section from "@/components/Section";
import Image from "next/image";
import { textObject } from '@/utils/scripts-js/textObject';
import { useState } from "react";
import { FcNext, FcPrevious } from 'react-icons/fc';
import { FaTimes } from 'react-icons/fa';
import { motion } from "framer-motion";

const hiddenMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 30px, rgba(0,0,0,1) 30px, rgba(0,0,0,1) 30px)`;
const visibleMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 30px)`;

const imagesSlide = require.context('@/public/images/img-slide', true );
const imagesSlidePath = imagesSlide.keys();

const Gallery = () => {

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [isNextButtonVisible, setIsNextButtonVisible] = useState(true);
  const [isPrevButtonVisible, setIsPrevButtonVisible] = useState(true);
  const [modalFade, setModalFade] = useState(false);
  const [modalFadeOut, setFadeOut] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageAnimationKey, setImageAnimationKey] = useState(0);

  const openModal = (imageSrc, index) => {
    setTimeout(() => {
      setFadeOut(false);
      setIsLoaded(false);
      setSelectedImage(imageSrc);
      setCurrentImageIndex(index);
      setModalFade(true);
      setShowModal(true);
      setIsPrevButtonVisible(true);
      setIsNextButtonVisible(true);
    }, 800);
  };

  const closeModal = () => {
    setFadeOut(true);
    setTimeout(() => {
      setSelectedImage(null);
      setCurrentImageIndex(null);
      setModalFade(false);
      setShowModal(false);
      setIsLoaded(false);
    }, 1000);
  };

  const nextImage = () => {
    
    const newImageIndex = currentImageIndex + 1;

    if (newImageIndex >= 0 && newImageIndex < imagesSlidePath.length) {

      const newImageSrc = imagesSlide(imagesSlidePath[newImageIndex]);
      setIsLoaded(false);
      openModal(newImageSrc, newImageIndex);
      setIsPrevButtonVisible(true);
      setImageAnimationKey(prevKey => prevKey + 1);

    } else {
      /* Si el nuevo índice está fuera de rango,
        oculta el botón "Next". 
      */
      setIsNextButtonVisible(false);
    }
  };

  const prevImage = () => {

    const newImageIndex = currentImageIndex - 1;
  
    if (newImageIndex >= 0 && newImageIndex < imagesSlidePath.length) {

      const newImageSrc = imagesSlide(imagesSlidePath[newImageIndex]);
      setIsLoaded(false);
      openModal(newImageSrc, newImageIndex);
      setIsNextButtonVisible(true);
      setImageAnimationKey(prevKey => prevKey - 1);

    } else {
      /* 
        Si no hay más imágenes disponibles en la dirección "Previous", 
        oculta el botón "Previous".
      */
      setIsPrevButtonVisible(false);
    }
  };

  return (
    <Section
      classDivSection='
        section-galleryWorkjs min-h-[100%] max-w-[1400px] mx-auto
        flex justify-center items-center flex-wrap gap-12 md:mb-32
      '
      idSection='galleryWorkjs'
      classDivTitleSection='relative max-w-[400px] mx-auto'
      classContainerTitleSection='relative pt-20 w-full'
      classSpanTitleSection=''
      classTitleSection='
        text-center p-5 font-bold text-2xl text-blue-700 underline
      '
      textTitleSection={textObject.titleSections.gallery}
    >
      {/* Renderizar imágenes y agregar onClick para abrir el modal */}
      {imagesSlidePath.map(( path, index ) => (
        <div 
          key={index} 
          className='w-[400px] p-2' 
          onClick={() => openModal(imagesSlide(path), index)}
        >
          <Image
            src={imagesSlide(path)}
            alt={`image gallery ${[index + 1]}`}
            width={'100%'}
            height={'100%'}
            priority
            className=
            {`
              h-[${index % 2 === 0 ? 350 : 310}px] 
              object-cover shadow-custom cursor-pointer 
              transition-scale esae-in-out duration-300 
              hover:scale-110
            `}
          />
        </div>
      ))}
      {/* Modal */}
      <div className=
        {`
          ${
            modalFade 
            ? 'transition-opacity ease-in-out duration-1000 opacity-100' 
            : 'transition-opacity ease-in-out duration-1000 opacity-0'
          }
        `}
      >
        {showModal && (
          <div className=
            {`
              w-full h-full bg-black/80 fixed flex
              items-center justify-center z-50 inset-0
              ${
                modalFadeOut 
                ? 'transition-opacity ease-in-out duration-1000 opacity-0' 
                : 'transition-opacity ease-in-out duration-1000 opacity-100'
              }
            `}
          >
            <div className='
              lg:bg-transparent bg-slate-900 border-t-2 p-4
              border-t-orange-600 border-b-2 border-b-orange-600
            '
            >
              {/* buttons */}
              <div className='
                text-lg px-5 mt-2 text-slate-100 w-full
                flex justify-between items-center'
              >
                <button 
                  className='
                    relative hover:shadow-gray-400
                    hover:rounded-full hover:shadow-md
                  ' 
                  onClick={prevImage}
                  style={{ display: isPrevButtonVisible ? 'block' : 'none' }}
                >
                  <FcPrevious size={30} />
                </button>
                <button 
                  className='
                    relative rounded-full shadow-md shadow-gray-400 p-3
                  ' 
                  onClick={closeModal}
                >
                  <FaTimes size={22} className='hover:text-orange-600' />
                </button>
                <button 
                  className='
                    relative hover:shadow-gray-400  
                    hover:rounded-full hover:shadow-md
                  ' 
                  onClick={nextImage}
                  style={{ display: isNextButtonVisible ? 'block' : 'none' }}
                >
                  <FcNext size={30} />
                </button>
              </div>
              {/* image */}
              <motion.div
                key={imageAnimationKey}
                initial={false}
                animate={
                  isLoaded
                  ? { WebkitMaskImage: visibleMask, maskImage: visibleMask }
                  : { WebkitMaskImage: hiddenMask, maskImage: hiddenMask }
                }
                transition={{ duration: 1, delay: 1 }}
                viewport={{ once: true }}
              >
                <Image
                  src={selectedImage}
                  alt='Imagen modal'
                  width={'100%'}
                  height={'100%'}
                  priority
                  className='
                    mt-4 shadow-custom object-cover h-52 
                    md:w-[1200px] md:h-[450px] scale-100
                  '
                  onLoad={() => setIsLoaded(true)}
                />
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </Section>
  )
}
export default Gallery