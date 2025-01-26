import { useEffect, useState } from 'react';

export default function useSetSearchResults(weblio: string[], eiNavi: string[], eijiro: string[], isEngTerm: boolean) {
  const [results, setResults] = useState<{ [k: string]: string[] }>({
    weblio: [],
    eiNavi: [],
    eijiro: [],
  });

  function cleanJeResults(result: string[]): string[] {
    return result.map(str => {
      if (!str.match(/[a-zA-Z0-9]/)) return '';
  
      const cleanedResult = str.trim().replace(/[^\w\s]/gi, '');

      return cleanedResult + '　';
    }).filter(Boolean);
  }
  
  useEffect(() => {    
    if (weblio.length) {
      setResults({
        ...results,
        weblio,
      });
    }

    if (eiNavi.length) {
      let eiNaviResults = isEngTerm ? eiNavi : cleanJeResults(eiNavi);

      if (!isEngTerm) {
        eiNaviResults = eiNaviResults[0].split('\n').map(str => str.replace(/\t/gi, '')).filter(Boolean);
      }
      setResults({
        ...results,
        eiNavi: eiNaviResults,
      });
    }

    if (eijiro.length) {      
      setResults({
        ...results,
        eijiro,
      });
    }
  }, [weblio, eiNavi, eijiro]);

  return [results];
}
