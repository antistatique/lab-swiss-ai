import React from 'react';

import cm from '@/utils/cm';

type Props = {
  children?: React.ReactNode;
  withClip?: boolean;
  className?: string;
};

const PaperFront = ({
  children,
  withClip = false,
  className,
}: Props): JSX.Element => (
  <div
    className={cm(
      "p-4 shadow bg-stone-100 before:bg-gradient-to-b before:from-stone-200 before:to-stone-500 before:content-[''] before:w-[90%] before:h-[10px] before:absolute before:left-[5%] before:bottom-full after:bg-gradient-to-b after:from-white after:to-stone-200 after:content-[''] after:w-[95%] after:h-[5px] after:absolute after:left-[2.5%] after:bottom-full",
      className
    )}
  >
    <div className="relative">
      {withClip && (
        <img
          src="/images/clip.png"
          alt="clip"
          className="absolute z-10 block right-8 top-[-38px] w-[26px] h-[61px]"
        />
      )}
      {children}
    </div>
  </div>
);

export default PaperFront;
