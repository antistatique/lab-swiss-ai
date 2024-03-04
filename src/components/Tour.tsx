import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { isNotNil } from 'ramda';

import Chevron from '@/components/Chevron';
import Divider from '@/components/Divider';
import MenuButton from '@/components/MenuButton';
import PaperFront from '@/components/PaperFront';
import TourItem from '@/components/TourItem';
import tours from '@/config/tours';
import cm from '@/utils/cm';

const duration = 0.4;

type Props = {
  currentTour: string;
  currentRoute: string | null;
  onSelect: (tour: string, route: string) => void;
  disabled?: boolean;
};

const Tour = ({
  currentTour,
  currentRoute,
  disabled,
  onSelect,
}: Props): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [tour, setTour] = useState(currentTour);
  const [childView, setChildView] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setTour(currentTour);
  }, [currentTour]);

  return (
    <div className="fixed top-0 left-0 z-50 m-4 w-[340px]">
      <button
        type="button"
        className="inline-flex items-center px-4 font-bold shadow gap-2 py-2.5 bg-stone-100 hover:text-orange-600 transition-colors disabled:bg-stone-200 disabled:text-stone-500 disabled:cursor-not-allowed group"
        onClick={() => {
          setOpen(i => !i);
          setChildView(!open);
        }}
        disabled={disabled}
      >
        <div className="relative w-5 h-5 text-orange-500 group-disabled:text-stone-500">
          <AnimatePresence>
            {!open && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute top-0 left-0"
              >
                <MenuButton />
              </motion.span>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {open && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute top-0 left-0"
              >
                <Chevron direction="up" />
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        {open ? t('navigation.close') : t('navigation.locations')}
      </button>

      {/* Tours */}
      <motion.div
        className="absolute w-full top-16 w-[340px]"
        initial={{ opacity: 0 }}
        animate={{
          opacity: !childView && open ? 1 : 0,
        }}
        transition={{
          duration: duration / 2,
          delay: !open || !childView || childView ? duration : 0,
        }}
      >
        <PaperFront className="py-0" />
        {Object.keys(tours).map((tourKey, i) => (
          <motion.div
            key={tours[tourKey].title}
            initial={{
              height: 0,
            }}
            animate={{ height: open && !childView ? 'auto' : 0 }}
            transition={{
              duration: !open || childView ? duration : 0,
            }}
            className={cm('relative overflow-hidden')}
          >
            <AnimatePresence>
              {(!open || childView) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration }}
                  className={cm(
                    'absolute inset-0 from-transparent to-stone-300',
                    i % 2 === 0 ? 'bg-gradient-to-b' : 'bg-gradient-to-t'
                  )}
                />
              )}
            </AnimatePresence>
            {i !== 0 && <Divider />}
            <div className="px-4 shadow bg-stone-100">
              <TourItem
                i={i}
                duration={duration}
                title={tours[tourKey].title}
                subtitle={tours[tourKey].subtitle}
                thumbnail={tours[tourKey].thumbnail}
                onClick={() => {
                  setChildView(true);
                  setTour(tour);
                }}
                active={tour === currentTour}
                open={open && !childView}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Routes */}
      <motion.div
        className={cm(
          'absolute top-16 w-[340px]',
          (!childView || !open) && 'pointer-events-none'
        )}
        initial={{ opacity: 0 }}
        animate={{
          opacity: childView && open ? 1 : 0,
        }}
        transition={{
          duration: duration / 2,
          delay: !open || !childView ? duration : 0,
        }}
      >
        <PaperFront className="py-0" />
        <button
          type="button"
          className="flex items-center w-full px-4 py-2 font-bold shadow gap-2 hover:text-orange-600 transition-colors bg-stone-100"
          onClick={() => setChildView(false)}
        >
          <Chevron className="text-orange-500" />
          {t('navigation.tours')}
        </button>
        {Object.keys(tours[tour].routes).map((route, i) => (
          <motion.div
            key={tours[tour].routes[route].title}
            initial={{
              height: 0,
            }}
            animate={{ height: open && childView ? 'auto' : 0 }}
            transition={{
              duration: !open || !childView ? duration : 0,
            }}
            className={cm('relative overflow-hidden')}
          >
            <AnimatePresence>
              {(!open || !childView) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration }}
                  className={cm(
                    'absolute inset-0 from-transparent to-stone-300',
                    i % 2 === 0 ? 'bg-gradient-to-b' : 'bg-gradient-to-t'
                  )}
                />
              )}
            </AnimatePresence>
            <Divider />
            <div className="px-4 shadow bg-stone-100">
              <TourItem
                i={i}
                duration={duration}
                title={tours[tour].routes[route].title}
                subtitle={tours[tour].routes[route].subtitle}
                thumbnail={tours[tour].routes[route].thumbnail}
                onClick={() => {
                  onSelect(tour, route);
                  setTimeout(() => {
                    setOpen(false);
                  }, 200);
                }}
                active={isNotNil(currentRoute) && route === currentRoute}
                open={open && childView}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Tour;
