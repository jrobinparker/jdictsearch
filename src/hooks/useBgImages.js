import { useEffect, useState } from 'react';
import axios from 'axios';

const localCache = {};

export default function useBgImages() {
  const [bgImages, setBgImages] = useState([]);
  const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

  useEffect(() => {

    if (Object.values(localCache).length) {
        setBgImages([...bgImages, Object.values(localCache)]);
        return;
    }

    getBgImages();

    async function getBgImages() {
        try {
          const req = axios.get(`https://api.unsplash.com/search/photos?query=tokyo&client_id=${ACCESS_KEY}`, {
            headers: {
              Authorization: `Client-ID ${ACCESS_KEY}`,
            },
          });
          const res = await req;
          res.data.results.map((img) => {
            const imageWidth = img.width;
            const imageHeight = img.height;
    
            if (imageWidth > imageHeight) {
              const imgLink = document.createElement('link');
              imgLink.setAttribute('rel', 'preload');
              imgLink.setAttribute('href', img.urls.regular);
              imgLink.setAttribute('as', 'image');
              document.head.appendChild(imgLink);
              setBgImages([...bgImages, img.urls.regular]);
            }
    
          });

          const interval = setInterval(() => {
            console.log(bgImages);
            if (!bgImages.length) return;
            const img = bgImages[Math.floor(Math.random() * bgImages.length)];
            document.querySelector('.bg').style.backgroundImage = `url('${img}')`;
          }, 10000);
          
          return () => clearInterval(interval);

        } catch (error) {
          console.log(error);
        }
      }

  }, [bgImages, ACCESS_KEY]);

  return [];
}
