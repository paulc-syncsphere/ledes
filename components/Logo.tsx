'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function Logo() {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    // Fallback: Show nothing if image fails to load
    return null;
  }

  return (
    <Image 
      src="/ledes-logo.png" 
      alt="LEDES Logo" 
      width={50} 
      height={50}
      className="rounded-lg"
      onError={() => setImageError(true)}
    />
  );
}


