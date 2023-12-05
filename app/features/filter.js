

import Sort from './sort';
import React from 'react';

const Filter = ({ handleFilterChange, handleSortChange }) => {
  return (
    <div className="w-3/4 mb-10 mx-auto p-5 text-center">
      <h3 className="text-lg font-semibold mb-2">Filter:</h3>
      <div className="mb-2">
        <input
          type="checkbox"
          id="chicagoFilter"
          className="mr-2"
          onChange={(e) => handleFilterChange('chicago', e.target.checked)}
          defaultChecked
        />
        <label htmlFor="chicagoFilter" className="text-sm">Chicago Art Museum</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="harvardFilter"
          className="mr-2"
          onChange={(e) => handleFilterChange('harvard', e.target.checked)}
        />
        <label htmlFor="harvardFilter" className="text-sm">Harvard Art Museum</label>
      </div>

      <Sort handleSortChange={handleSortChange} />
    </div>
  );
};

export default Filter;

