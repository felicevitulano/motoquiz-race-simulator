import React from 'react';
import { Bike } from '../types';

interface BikeImageProps {
  bike: Bike;
  className?: string;
}

/**
 * Renders the bike image with a 3-tier strategy:
 *  1. Try the URL declared in constants.ts
 *  2. If it fails (many Wikimedia links in constants are 404), ask the
 *     Wikipedia REST API for the page thumbnail using "Brand Name" as title
 *  3. If that also fails, fall back to a deterministic placeholder
 */
export default function BikeImage({ bike, className }: BikeImageProps) {
  const [src, setSrc] = React.useState(bike.imageUrl);
  const [stage, setStage] = React.useState<'primary' | 'wiki' | 'placeholder'>('primary');

  const handleError = async () => {
    if (stage === 'primary') {
      try {
        const q = encodeURIComponent(`${bike.brand} ${bike.name}`);
        const res = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages&pithumbsize=800&generator=search&gsrlimit=1&gsrsearch=${q}`
        );
        if (res.ok) {
          const data = await res.json();
          const pages = data?.query?.pages;
          const first = pages && Object.values(pages)[0] as any;
          const thumb: string | undefined = first?.thumbnail?.source;
          if (thumb) {
            setSrc(thumb);
            setStage('wiki');
            return;
          }
        }
      } catch {
        // fall through to placeholder
      }
      setSrc(`https://picsum.photos/seed/${bike.id}/800/600`);
      setStage('placeholder');
    } else if (stage === 'wiki') {
      setSrc(`https://picsum.photos/seed/${bike.id}/800/600`);
      setStage('placeholder');
    }
  };

  return (
    <img
      src={src}
      alt={`${bike.brand} ${bike.name}`}
      className={className}
      referrerPolicy="no-referrer"
      onError={handleError}
    />
  );
}
