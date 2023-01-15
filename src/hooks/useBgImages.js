import { useEffect } from 'react';
import axios from 'axios';

const LOCAL_CACHE = {};
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
const QUERY_KEYS = ['japan', 'tokyo', 'kyoto', 'yokohama', 'osaka', 'sapporo', 'fukuoka'];

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
                  res.data.results.forEach((img) => {
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
            const images = Object.values(LOCAL_CACHE);
            const img = images[Math.floor(Math.random() * images.length)];
            document.querySelector('.bg').style.backgroundImage = `url('${img}')`;
            if (img.width > img.height) {
                document.querySelector('.bg').style.overflow = 'hidden';
            }
          }, 10000);
          
          return () => clearInterval(interval);
      }

  }, []);

  return;
}
