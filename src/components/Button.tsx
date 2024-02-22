import React from 'react';

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

const Button = ({ children, onClick }: Props): JSX.Element => (
  <button
    type="button"
    onClick={onClick}
    className="relative flex items-center justify-between pl-4 pr-2 font-bold text-left bg-orange-500 w-[calc(100%-12px)] py-2.5 hover:bg-orange-600 text-stone-900 transition-colors after:content-[''] after:inline-block after:absolute after:left-full after:w-0 after:h-0 after:border-t-[20px] after:border-b-[20px] after:border-t-transparent after:border-b-transparent after:border-l-[12px] after:border-l-orange-500 after:transition-colors hover:after:border-l-orange-600"
  >
    {children}
    <img src="/vectors/hand.svg" alt="hand icon" />
  </button>
);

export default Button;
