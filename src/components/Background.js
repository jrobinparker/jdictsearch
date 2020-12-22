import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Background() {
  const [ bgImages ] = useState([]);
  const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY

  useEffect(() => {
    axios.get(`https://api.unsplash.com/search/photos?query=tokyo&client_id=${ACCESS_KEY}`, {
      headers: {
        'Authorization': `Client-ID ${ACCESS_KEY}`
      }
    })
      .then(res => {
        res.data.results.map(img => {
          const imageWidth = img.width;
          const imageHeight = img.height;

          if (imageWidth > imageHeight) bgImages.push(img.urls.regular)
      })
    })
      .catch(err => console.log(err))
  }, [bgImages, ACCESS_KEY])

  useEffect(() => {
    const interval = setInterval(() => {
      const img = bgImages[Math.floor(Math.random() * bgImages.length)]
      document.querySelector('.bg').style.backgroundImage = `url('${img}')`
    }, 10000);
    return () => clearInterval(interval);
  }, []);


  return (
    <img className="bg" />
  )
}
