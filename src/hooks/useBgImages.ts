import { useEffect } from 'react';
import axios from 'axios';
import type { Photo } from '../types';

const LOCAL_CACHE: { [k: string]: string } = {};
const ACCESS_KEY: string = import.meta.env.VITE_APP_ACCESS_KEY;
const QUERY_KEYS: string[] = ['japan', 'tokyo', 'kyoto', 'osaka', 'sapporo', 'fukuoka'];

export default function useBgImages() {
  useEffect(() => {
    getBgImages();
    setBackground();
    async function getBgImages() {
        try {
            if (!Object.keys(LOCAL_CACHE).length) {
                const randomQuery = QUERY_KEYS[Math.floor(Math.random() * QUERY_KEYS.length)];
                const req = axios.get(`https://api.unsplash.com/search/photos?query=${randomQuery}&count=30&client_id=${ACCESS_KEY}`, {
                    headers: {
                      Authorization: `Client-ID ${ACCESS_KEY}`,
                    },
                  });
                  const res = await req;
                  res.data.results.forEach((img: Photo) => {
                    const imageWidth = img.width;
                    const imageHeight = img.height;
            
                    if (imageWidth > imageHeight) {
                      const imgLink = document.createElement('link');
                      imgLink.setAttribute('rel', 'preload');
                      imgLink.setAttribute('href', img.urls.regular);
                      imgLink.setAttribute('as', 'image');
                      document.head.appendChild(imgLink);

                      if (!LOCAL_CACHE[img.urls.regular]) LOCAL_CACHE[img.urls.regular] = img.urls.regular;
                    }
                });
            }
        } catch (error) {
          console.log(error);
        }
      }

      async function setBackground() {
        const interval = setInterval(() => {
            const images: string[] = Object.values(LOCAL_CACHE);
            const img: string = images[Math.floor(Math.random() * images.length)];
            const bgClass: HTMLElement | null = document.querySelector('.bg');

            if (!bgClass) return;

            bgClass.style.backgroundImage = `url('${img}')`;
          }, 10000);
          
          return () => clearInterval(interval);
      }

  }, []);

  return;
}
