import { useEffect, useState } from 'react';

export default function useDisplayIcon(loading: string) {
    const [displayIcon, setDisplayIcon] = useState<string>('fa-search');

    useEffect(() => {
      if (loading === 'inactive') setDisplayIcon('fa-search');
      if (loading === 'loading') setDisplayIcon('fa-spinner spin-animation');
      if (loading === 'loaded') setDisplayIcon('fa-times');
    }, [loading]);

    return [displayIcon, setDisplayIcon];
}