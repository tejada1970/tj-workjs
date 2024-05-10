"use client"
import React, { useState, useEffect } from 'react';
import { textObject } from '@/utils/scripts-js/textObject';
import Section from "@/components/Section";
import axios from 'axios';

const News = () => {

  const [articles, setArticles] = useState([]);

  const messageApiKey = () => {
    setArticles([
      { 'webTitle': 'Para mostrar las noticias de la página (The Guardian) en esta sección, debes ingresar en la "url" de tu navegador y escribir: "theguardian.com". En la página (The Guardian), pinchar en "Sign In" y registrarte. Cuando ya estes registrado, se te proporcionará una "ApiKey" que tendrás que sustituir por el texto predeterminado en la linea (const apiKey ="pon aquí tu ApiKey") del componente News.jsx de este proyecto (tj-workjs). De esta forma, se mostrarán las noticias y podrás acceder a cada una de ellas a través de su "Link". Recuerda ejecutar el proyecto desde un servidor, en mi caso utilizo xampp.' },
    ]);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = 'pon aquí tu ApiKey'; // pon aquí tu ApiKey
        if (apiKey === 'pon aquí tu ApiKey') {
          messageApiKey();
        }
        else {
          const apiUrl = `https://content.guardianapis.com/search?api-key=${apiKey}`;
          const response = await axios.get(apiUrl);
          const articlesData = response.data.response.results;
          setArticles(articlesData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Section
      classDivSection='
        section-newsWorkjs min-h-[100%] max-w-[1200px] mx-auto
      '
      idSection='newsWorkjs'
      classDivTitleSection='relative max-w-[400px] mx-auto'
      classContainerTitleSection='relative pt-16 w-full'
      classTitleSection='
        text-center p-10 font-bold text-2xl text-blue-700 underline
      '
      textTitleSection={textObject.titleSections.news}
    >
      <div className='flex flex-col justify-center items-center mt-10 p-4 bg-white/70'>
        <h1 className='text-2xl text-center pt-6'>Últimas noticias: The Guardian</h1>
          <ul>
            {articles.map((article, index) => (
              <div key={article.id}>
                <li className='text-blue-700 m-10 text-lg'>
                  <span className="mr-2 text-blue-900">{index+ 1}.</span>
                  <a href={article.webUrl} target="_blank">{article.webTitle}</a>
                </li>
              </div>
            ))}
          </ul>
        </div>
    </Section>
  )
}

export default News