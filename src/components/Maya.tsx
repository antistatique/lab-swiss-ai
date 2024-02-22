import React, { useEffect, useState } from 'react';

import useInterval from '@/hooks/useInterval';
import cm from '@/utils/cm';

type Props = {
  speak?: boolean;
};

const Maya = ({ speak = false }: Props): JSX.Element => {
  const [open, setOpen] = useState(false);

  useInterval(() => {
    if (speak) setOpen(i => !i);
  }, 80);

  useEffect(() => {
    if (!speak) setOpen(false);
  }, [speak]);

  return (
    <div className="relative w-12 h-12">
      <img
        src="/images/maya-closed.png"
        alt="Maya"
        className={cm('absolute top-0 left-0 w-full h-full', open && 'hidden')}
      />
      <img
        src="/images/maya-open.png"
        alt="Maya"
        className={cm(
          'absolute top-0 left-0 hidden w-full h-full',
          open && 'block'
        )}
      />
    </div>
  );
};

export default Maya;
