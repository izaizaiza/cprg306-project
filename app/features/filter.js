


import React from 'react';

const Filter = ({ handleFilterChange }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Filter:</h3>
      <div className="mb-2">
        <input
          type="checkbox"
          id="chicagoFilter"
          className="mr-2"
          onChange={(e) => handleFilterChange('chicago', e.target.checked)}
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
    </div>
  );
};

export default Filter;

