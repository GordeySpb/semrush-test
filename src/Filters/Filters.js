import React from 'react';
import Filter from './Filter';
import Controls from '../Controls';

import useFilters from './Filters.hooks';

const Filters = () => {
  const {
    filters,
    addNewFilter,
    updateValue,
    updateType,
    updateOperation,
    deleteFilter,
    getPublicData,
    clearFilters,
  } = useFilters();

  return (
    <>
      <div className="list">
        {filters.map(({ id, type, operation, value: newValue }) => (
          <Filter
            id={id}
            key={id}
            type={type}
            operation={operation}
            value={newValue}
            count={filters.length}
            onTypeChange={({ target: { value } }) => {
              updateType(value, id);
            }}
            onValueChange={({ target: { value } }) => {
              updateValue(value, id);
            }}
            onOperationChange={({ target: { value } }) => {
              updateOperation(value, id);
            }}
            onDeleteFilter={() => deleteFilter(id)}
          />
        ))}
      </div>
      <Controls
        count={filters.length}
        addFilter={addNewFilter}
        getData={() => console.log(getPublicData())}
        clearFilters={clearFilters}
      />
    </>
  );
};

export default Filters;
