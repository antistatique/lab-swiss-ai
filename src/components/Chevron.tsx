import React from 'react';

import cm from '@/utils/cm';

type Props = {
  direction?: 'left' | 'right' | 'up' | 'down';
  className?: string;
};

const Divider = ({ direction = 'left', className }: Props): JSX.Element => (
  <div
    className={cm(
      direction === 'up' && 'rotate-90',
      direction === 'right' && 'rotate-180',
      direction === 'down' && '-rotate-90',
      className
    )}
    aria-hidden
  >
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.58578 9.99997L12 3.58576L13.4142 4.99997L8.41421 9.99997L13.4142 15L12 16.4142L5.58578 9.99997Z"
        fill="currentColor"
      />
    </svg>
  </div>
);

export default Divider;
