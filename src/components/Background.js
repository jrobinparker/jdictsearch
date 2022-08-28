import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Background() {
  const [bgImages] = useState([]);
  const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;

  useEffect(() => {
    async function getBgImages() {
      try {
        const req = axios.get(
          `https://api.unsplash.com/search/photos?query=tokyo&client_id=${ACCESS_KEY}`,
          {
            headers: {
              Authorization: `Client-ID ${ACCESS_KEY}`,
            },
          }
        );
        const res = await req;
        res.data.results.map((img) => {
          const imageWidth = img.width;
          const imageHeight = img.height;

          if (imageWidth > imageHeight) {
            const imgLink = document.createElement("link");
            imgLink.setAttribute("rel", "preload");
            imgLink.setAttribute("href", img.urls.regular);
            imgLink.setAttribute("as", "image");
            document.head.appendChild(imgLink);
            bgImages.push(img.urls.regular);
          }

          return null;
        });
      } catch (error) {
        console.log(error);
      }
    }

    getBgImages();
  }, [bgImages, ACCESS_KEY]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!bgImages.length) return;
      const img = bgImages[Math.floor(Math.random() * bgImages.length)];
      document.querySelector(".bg").style.backgroundImage = `url('${img}')`;
    }, 10000);
    return () => clearInterval(interval);
  }, [bgImages]);

  return <img className="bg" alt="" />;
}
