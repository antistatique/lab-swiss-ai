import React from 'react';

const Divider = () => (
  <div className="flex items-center justify-between" aria-hidden>
    <svg
      viewBox="0 0 16 11"
      height="11"
      width="16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 11A5.5 5.5 0 1 0 0 0h16v11H6z" fill="#F5F4F2" />
    </svg>
    <div className="flex items-center h-[11px] grow bg-stone-100">
      <div className="w-full border-t border-dashed border-stone-900" />
    </div>
    <svg
      viewBox="0 0 16 11"
      height="11"
      width="16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 11a5.5 5.5 0 1 1 0-11H0v11h10z"
        fill="#F5F4F2"
      />
    </svg>
  </div>
);

export default Divider;
