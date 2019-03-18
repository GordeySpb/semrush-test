import { useReducer } from 'react';

import { TYPE, CONTAINING_OPERATION, EQUAL_OPERATION } from '../constants';

const DEFAULT_TEXT_OPERATION = CONTAINING_OPERATION;
const DEFAULT_NUMBER_OPERATION = EQUAL_OPERATION;

const ADD_FILTER = 'ADD_FILTER';
const UPDATE_VALUE = 'UPDATE_VALUE';
const UPDATE_TYPE = 'UPDATE_TYPE';
const UPDATE_OPERATION = 'UPDATE_OPERATION';
const DELETE_FILTER = 'DELETE_FILTER';
const GET_DATA = 'GET_DATA';
const CLEAR_FILTERS = 'CLEAR_FILTERS';

const getNewFilter = () => ({
  type: TYPE.TEXT,
  operation: DEFAULT_TEXT_OPERATION,
  value: '',
  id: +Date.now(),
});

const getFiltersByCategory = (filters) => {
  return filters.reduce(
    (res, cur) => {
      const { type, id, ...restData } = cur;

      if (type === TYPE.TEXT) {
        res.text.push(restData);
      }

      if (type === TYPE.NUMBER) {
        res.number.push(restData);
      }

      return res;
    },
    { number: [], text: [] }
  );
};

function filterReducer(state, action) {
  switch (action.type) {
    case ADD_FILTER: {
      return [...state, getNewFilter()];
    }

    case UPDATE_VALUE: {
      return state.map((filter) => {
        if (filter.id === +action.payload.id) {
          return {
            ...filter,
            value: action.payload.value,
          };
        }

        return filter;
      });
    }

    case UPDATE_TYPE: {
      return state.map((filter) => {
        if (filter.id === +action.payload.id) {
          return {
            ...filter,
            type: action.payload.type,
            value: '',
            operation:
              action.payload.type === TYPE.TEXT
                ? DEFAULT_TEXT_OPERATION
                : DEFAULT_NUMBER_OPERATION,
          };
        }

        return filter;
      });
    }

    case UPDATE_OPERATION: {
      return state.map((filter) => {
        if (filter.id === +action.payload.id) {
          return {
            ...filter,
            operation: action.payload.operation,
          };
        }

        return filter;
      });
    }

    case DELETE_FILTER: {
      return state.filter((filter) => filter.id !== +action.payload.id);
    }

    case CLEAR_FILTERS: {
      return [getNewFilter()];
    }

    default:
      return state;
  }
}

export default function useFilters() {
  const [filters, dispatch] = useReducer(filterReducer, [getNewFilter()]);

  const addNewFilter = () => dispatch({ type: ADD_FILTER });
  const updateValue = (value, id) => {
    dispatch({
      type: UPDATE_VALUE,
      payload: { value, id },
    });
  };

  const updateType = (type, id) => {
    dispatch({
      type: UPDATE_TYPE,
      payload: { type, id },
    });
  };

  const updateOperation = (type, id) => {
    dispatch({
      type: UPDATE_OPERATION,
      payload: { type, id },
    });
  };

  const deleteFilter = (id) => {
    dispatch({
      type: DELETE_FILTER,
      payload: { id },
    });
  };

  const getData = () => {
    dispatch({
      type: GET_DATA,
    });
  };

  const clearFilters = () => {
    dispatch({
      type: CLEAR_FILTERS,
    });
  };

  const getPublickData = () => {
    console.log(getFiltersByCategory(filters));
  };

  return {
    addNewFilter,
    filters,
    updateValue,
    updateType,
    updateOperation,
    deleteFilter,
    getData,
    clearFilters,
    getPublickData,
  };
}
