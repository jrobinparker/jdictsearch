import { useEffect, useState } from 'react';

export default function useSetSearchResults(weblio: string, eiNavi: string, eijiro: string) {
  const [results, setResults] = useState<{ [k: string]: string[] }>({
    weblio: [],
    eiNavi: [],
    eijiro: [],
  });

  useEffect(() => {    
    if (weblio.length) {
      setResults({
        ...results,
        weblio:  [...weblio.split('主な意味').toString().split('、')],
      });
    }

    if (eiNavi.length) {
      setResults({
        ...results,
        eiNavi: [...eiNavi.split('、')],
      });
    }

    if (eijiro.length) {
      setResults({
        ...results,
        eijiro: [...eijiro.split('<a')[0].split('【レベル】')[0].split('、')],
      });
    }
  }, [weblio, eiNavi, eijiro]);

  return [results];
}
