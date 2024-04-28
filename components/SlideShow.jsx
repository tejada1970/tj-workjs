import React from 'react';
import styled from 'styled-components';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { MdArrowBackIosNew } from 'react-icons/md';
import { textObject } from '@/utils/scripts-js/textObject';
import { Link as ScrollLink } from "react-scroll";

const imagesSlide = require.context('@/public/images/img-slide', true );
const imagesSlidePath = imagesSlide.keys();

const Title = styled.p`
  text-align: center;
  padding: 10px;
  font-weigth: bold;
  font-size: 22px;
  line-height: 32px;
  color: #ff4500;
`
const Subtitle = styled.p`
  font-size: 19px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-right: 7px;
`
const ContainerOne = styled.div`
  position: relative;
  overflow: hidden;
`
const ContainerSlideShow = styled.div`
  display: flex;
  flex-wrap: nowrap;
`
const Slide = styled.div`
  min-width: 100%;
  overflow: hidden;
  transition: .3s ease all;
  z-index: 10;
  max-height: 530px;
  position: relative;
  cursor: pointer;
`
const TextoSlide = styled.div`
  background: rgba(0,0,0,0.5);
  color: #fff;
  width: 100%;
  padding: 20px;
  text-align: center;
  position: absolute;
  cursor: default;
  bottom: 0;
  @media screen and (max-width: 700px) {
    position: relative;
    background: #a45411;
  }
`
const ContainerButton = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
const Button = styled.button`
  background: rgba(0,0,0,0.5);
  color: #f5f5f5;
  margin-bottom: 7px;
  border-radius: 100%;
  padding: 5px;
  text-align: center;
  outline: none;
  transition: .9s ease all;
  &:hover {
    background: rgba(0,0,0,0.5);
    color: #ec7c26;
  }
`
const TextButton = styled.p`
  font-size: 18px;
  font-weight: bold;
`

const SlideShow = () => {

  const [selectedImageName, setSelectedImageName] = useState('');

  const slideshow = useRef(null);

  const next = () => {

    /* Comprueba que se accede correctamente a 'ContainerSlideShow' */
    // console.log(slideshow.current);

    /* Comprobamos que el 'slideshow' tenga elementos */
    if(slideshow.current.children.length > 0) {

      /* Obtenemos el primer elemento del 'slideshow' */
      const firstElement = slideshow.current.children[0];

      /* Establecemos la transición para el 'slideshow' */
      slideshow.current.style.transition = `3000ms ease-out all`;

      /* Obtenemos el tamaño del 'slideshow' */
      const sizeSlide = slideshow.current.children[0].offsetWidth;
      
      /* Movemos el 'slideshow' */
      slideshow.current.style.transform = `translateX(-${sizeSlide}px)`;

      const Mytransition = () => {
        /* Reiniciamos la posición del 'slideshow' a 0 */
        slideshow.current.style.transition = 'none';
        slideshow.current.style.transform = `translateX(0)`;

        /* Tomamos el primer elemento y lo ponemos al final */
        slideshow.current.appendChild(firstElement);

        /* Eliminamos el 'EventListener' cuando termina la ejecución de esta función */
        slideshow.current.removeEventListener('transitionend', Mytransition);
      }

      /* 'EventListener' para cuando termina la animación */
      slideshow.current.addEventListener('transitionend', Mytransition);
    }
  }
  
  const previous = () => {

    /* Comprobamos que el 'slideshow' tenga elementos */
    if(slideshow.current.children.length > 0) {
      /* Obtenemos el ultimo elemento del 'slideshow' */
      const index = slideshow.current.children.length -1;
      const lastElement = slideshow.current.children[index];
      slideshow.current.insertBefore(lastElement, slideshow.current.firstChild);
      
      slideshow.current.style.transition = 'none';
      const sizeSlide = slideshow.current.children[0].offsetWidth;
      slideshow.current.style.transform = `translateX(-${sizeSlide}px)`;

      setTimeout(() => {
        slideshow.current.style.transition = '300ms ease-out all';
        slideshow.current.style.transform = `translateX(0)`;
      }, 10);
    }
  }

  useEffect(() => {
    /* Declara la variable del intervalo fuera del alcance de useEffect */
    let intervalId;
  
    /* Llama a la función next() para empezar el 'slideshow' automaticamente */
    const startSlideshow = () => {
      intervalId = setInterval(() => {
        next();
      }, 5000);
    };
  
    /* Inicia el 'slideshow' al cargar el componente */
    startSlideshow();
  
    return () => {
      /* Limpia el intervalo al desmontar el componente */
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className='
      max-w-[1400px] mx-auto border-t-2 border-t-orange-400 
      border-b-2 border-b-orange-400 py-5 mt-5'
    >
      <div className='flex flex-col justify-center items-center'>
        <Title>
          {textObject.products.slideShow.title}
        </Title>
        <Subtitle>
          {textObject.products.slideShow.subtitle}
        </Subtitle>
        <ContainerButton>
          <Button 
              className='left' 
              onClick={previous}
            >
              <MdArrowBackIosNew size={25} />
          </Button>
          <TextButton>
            {textObject.products.slideShow.textButton}
          </TextButton>
        </ContainerButton>
      </div>
      <ContainerOne>
        <ContainerSlideShow ref={slideshow}>
            {imagesSlidePath.map((imagePath, index) => {
              /* 
                Obtengo los nombres de las imagenes para usarlos como 'id' 
                en las cards de los productos y desde aqui en el link 
                introduzco cada nombre de imagen para que al pinchar en la
                imagen del slideshow vaya al producto correspondiente 
                de las cards.
              */
              const modifiedImageName = imagePath.substring(2, imagePath.length - 4);
              
              return (
                <Slide
                  key={index} 
                  id={index}
                >
                  <ScrollLink
                    to={modifiedImageName}
                    activeClass='active'
                    smooth={true}
                    spy={true}
                    duration={1000}
                    onClick={() => {
                      /* Obtengo del array solo el nombre de la imagen actual */
                      setSelectedImageName(modifiedImageName);
                    }}
                  >
                    <Image 
                      src={imagesSlide(imagePath)}
                      alt={`logo de ${imagePath}`}
                      width={'100%'}
                      height={700}
                      priority
                      className='w-full object-cover object-top'
                    />
                  </ScrollLink>
                  <TextoSlide>
                    <p>
                      {textObject.products.slideShow.textSlide}
                    </p>
                  </TextoSlide>
                </Slide>
              );
            })}
        </ContainerSlideShow>
      </ContainerOne>
    </div>
  )
}

export default SlideShow