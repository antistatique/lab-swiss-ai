import React from 'react';
import { keys } from 'ramda';

import routes from '@/config/routes';
import { RouteName } from '@/types/Routes';

type Props = {
  onSelect: (route: RouteName) => void;
  disabled?: boolean;
};

const Tour = ({ onSelect, disabled = false }: Props): JSX.Element => (
  <div className="flex p-4 gap-2">
    {keys(routes).map(r => (
      <button
        type="button"
        key={r}
        className="inline-block px-4 py-2 text-sm text-left text-gray-700 bg-white rounded-md hover:bg-gray-100 disabled:bg-gray-500"
        onClick={() => onSelect(r)}
        disabled={disabled}
      >
        {routes[r].name}
      </button>
    ))}
  </div>
);

export default Tour;
