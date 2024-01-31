import React from 'react';
import { keys } from 'ramda';

import routes from '@/config/routes';

type Props = {
  onSelect: (route: RouteName) => void;
};

const Tour = ({ onSelect }: Props): JSX.Element => (
  <div className="flex p-4 gap-2">
    {keys(routes).map(route => (
      <button
        type="button"
        key={route}
        className="inline-block px-4 py-2 text-sm text-left text-gray-700 bg-white rounded-md hover:bg-gray-100"
        onClick={() => onSelect(route)}
      >
        {route}
      </button>
    ))}
  </div>
);

export default Tour;
