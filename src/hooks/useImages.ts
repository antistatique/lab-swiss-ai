import { useEffect, useState } from 'react';
import { isNotNil } from 'ramda';

import type { Image } from '@/types/Image';

const useImages = () => {
  const [query, setQuery] = useState<string | null>(null);
  const [images, setImages] = useState<Image[]>([]);

  const fetchImages = async (q: string) => {
    const newImages = await fetch(`/api/images?query=${q}`).then(res =>
      res.status === 200 ? res.json() : []
    );
    setImages(newImages);
  };

  useEffect(() => {
    setImages([]);
    if (isNotNil(query)) {
      fetchImages(query);
    }
  }, [query]);

  return { images, setQuery };
};

export default useImages;
