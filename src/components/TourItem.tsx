import React from 'react';
import { motion } from 'framer-motion';

import cm from '@/utils/cm';

type Props = {
  i: number;
  duration: number;
  onClick: (i: number) => void;
  title: string;
  subtitle: string;
  thumbnail: string;
  active?: boolean;
  open: boolean;
};

const TourItem = ({
  i,
  duration,
  onClick,
  title,
  subtitle,
  thumbnail,
  active = false,
  open,
}: Props): JSX.Element => (
  <motion.button
    initial={{
      height: 0,
    }}
    animate={{ height: open ? 'auto' : 0 }}
    transition={{ duration }}
    type="button"
    onClick={() => onClick(i)}
    className="relative w-full overflow-hidden hover:text-orange-600 transition-colors group"
  >
    {/* Duplicate content to get the natural height of the item */}
    <div
      className="flex items-center w-full my-2 text-left opacity-0 gap-4"
      aria-hidden="true"
    >
      <img
        src={thumbnail}
        alt={title}
        className={cm(
          'border-4 border-white shadow w-[72px]',
          i % 2 === 0 && 'rotate-[-3deg]',
          i % 2 === 1 && 'rotate-[3deg]'
        )}
      />
      <div>
        <h3 className="font-serif text-lg font-bold">{title}</h3>
        <p className="mt-1 text-sm">{subtitle}</p>
      </div>
      {active && (
        <div className="ml-auto shrink-0">
          <img
            src="/images/pin.png"
            alt="pin active marker"
            className="w-[16px]"
          />
        </div>
      )}
    </div>

    <motion.div
      initial={{
        transform: i % 2 === 0 ? 'rotateX(90deg)' : 'rotateX(-90deg)',
      }}
      animate={{
        // eslint-disable-next-line no-nested-ternary
        transform: open
          ? 'rotateX(0deg)'
          : i % 2 === 0
            ? 'rotateX(90deg)'
            : 'rotateX(-90deg)',
      }}
      transition={{ duration }}
      style={{
        transformOrigin: 'center top',
        willChange: 'transform',
        transformStyle: 'preserve-3d',
      }}
      className="absolute inset-0 flex items-center w-full my-2 text-left gap-4"
    >
      <img
        src={thumbnail}
        alt={title}
        className={cm(
          'border-4 border-white shadow w-[72px] transition-transform',
          i % 2 === 0 && 'rotate-[-3deg] group-hover:rotate-[-6deg]',
          i % 2 === 1 && 'rotate-[3deg] group-hover:rotate-[6deg]'
        )}
      />
      <div>
        <h3 className="font-serif text-lg font-bold">{title}</h3>
        <p className="mt-1 text-sm">{subtitle}</p>
      </div>
      {active && (
        <div className="ml-auto shrink-0">
          <img
            src="/images/pin.png"
            alt="pin active marker"
            className="w-[16px]"
          />
        </div>
      )}
    </motion.div>
  </motion.button>
);

export default TourItem;
