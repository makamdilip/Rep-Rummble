import React from 'react';

type StoreButtonSize = 'md' | 'lg';

type StoreButtonProps = {
  size?: StoreButtonSize;
  href?: string;
  className?: string;
};

const sizeClassMap: Record<StoreButtonSize, string> = {
  md: 'store-outline--md',
  lg: 'store-outline--lg',
};

export function AppStoreButton({ size = 'md', href = '#', className = '' }: StoreButtonProps) {
  return (
    <a
      className={`store-outline store-outline--ios ${sizeClassMap[size]} ${className}`.trim()}
      href={href}
      aria-label="Download on the App Store"
    >
      <svg className="store-outline__icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17.56 13.9c.02 2.4 2.1 3.2 2.12 3.2-.02.05-.33 1.16-1.09 2.3-.66.99-1.36 1.98-2.44 2-1.06.02-1.4-.63-2.61-.63-1.2 0-1.58.61-2.57.65-1.05.04-1.86-1.06-2.53-2.05-1.38-2-2.43-5.64-1.02-8.1.7-1.22 1.95-2 3.3-2.02 1.03-.02 2 .7 2.61.7.62 0 1.79-.86 3.01-.73.51.02 1.95.2 2.87 1.5-.07.04-1.71 1-1.69 2.98zM14.52 4.24c.55-.66.92-1.58.82-2.49-.79.03-1.74.53-2.3 1.19-.51.58-.96 1.52-.84 2.41.89.07 1.77-.45 2.32-1.11z" />
      </svg>
      <span className="store-outline__text">
        <span className="store-outline__mini">Download on the</span>
        <span className="store-outline__name">App Store</span>
      </span>
    </a>
  );
}

export function GooglePlayButton({ size = 'md', href = '#', className = '' }: StoreButtonProps) {
  return (
    <a
      className={`store-outline store-outline--android ${sizeClassMap[size]} ${className}`.trim()}
      href={href}
      aria-label="Get it on Google Play"
    >
      <svg className="store-outline__icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3.5 2.5l14.6 9.2c.9.6.9 1.9 0 2.5L3.5 23.4V2.5z" />
      </svg>
      <span className="store-outline__text">
        <span className="store-outline__mini">Get it on</span>
        <span className="store-outline__name">Google Play</span>
      </span>
    </a>
  );
}
