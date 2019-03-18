import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Filter from './Filter';
import { EQUAL_OPERATION, CONTAINING_OPERATION, TYPE } from '../constants';

import addIcon from '../icons/add.svg';

class Filters extends Component {
  static DEFAULT_NUMBER_OPERATION = EQUAL_OPERATION;

  static DEFAULT_TEXT_OPERATION = CONTAINING_OPERATION;

  constructor(props) {
    super(props);

    this.state = {
      filtersCount: 1,
      filters: [
        {
          type: TYPE.TEXT,
          operation: Filters.DEFAULT_TEXT_OPERATION,
          value: '',
          id: +Date.now(),
        },
      ],
    };
  }

  setType = (value, id) => {
    const { filters } = this.state;

    const newFilters = filters.map((item) => {
      if (item.id === +id) {
        return {
          ...item,
          type: value,
          value: '',
          operation:
            value === TYPE.TEXT
              ? Filters.DEFAULT_TEXT_OPERATION
              : Filters.DEFAULT_NUMBER_OPERATION,
        };
      }

      return item;
    });

    this.setState({ filters: newFilters });
  };

  setValue = (value, id) => {
    const { filters } = this.state;
    const newFilters = filters.map((item) => {
      if (item.id === +id) {
        return {
          ...item,
          value,
        };
      }

      return item;
    });

    this.setState({ filters: newFilters });
  };

  setOperation = (value, id) => {
    const { filters } = this.state;
    const newFilters = filters.map((item) => {
      if (item.id === +id) {
        return {
          ...item,
          operation: value,
        };
      }

      return item;
    });

    this.setState({ filters: newFilters });
  };

  getNewFilter = () => {
    const newFilter = {
      type: TYPE.TEXT,
      operation: Filters.DEFAULT_TEXT_OPERATION,
      value: '',
      id: +Date.now(),
    };
    return newFilter;
  };

  addFilter = () => {
    const { filters, filtersCount } = this.state;
    if (filtersCount === 10) return;
    const newFiltersCount = filtersCount + 1;
    const newFilter = {
      type: TYPE.TEXT,
      operation: Filters.DEFAULT_TEXT_OPERATION,
      value: '',
      id: +Date.now(),
    };

    const newFilters = [...filters, newFilter];

    this.setState({ filters: newFilters, filtersCount: newFiltersCount });
  };

  clearFilter = () => {
    const newFiltersCount = 1;
    this.setState({
      filters: [this.getNewFilter()],
      filtersCount: newFiltersCount,
    });
  };

  getInfo = () => {
    const { filters } = this.state;

    const newFilters = filters.reduce(
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

    console.log(newFilters);
  };

  deleteFilter = (id) => {
    const { filters, filtersCount } = this.state;
    const newFiltersCount = filtersCount - 1;
    const newFilterts = filters.filter((item) => item.id !== +id);

    this.setState({ filters: newFilterts, filtersCount: newFiltersCount });
  };

  render() {
    const { filters, filtersCount } = this.state;
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
              count={filtersCount}
              onTypeChange={({ target: { value } }) => {
                this.setType(value, id);
              }}
              onValueChange={({ target: { value } }) => {
                this.setValue(value, id);
              }}
              onOperationChange={({ target: { value } }) => {
                this.setOperation(value, id);
              }}
              onDeleteFilter={() => this.deleteFilter(id)}
            />
          ))}
        </div>
        <div className="condition">
          <img src={addIcon} alt="add" className="condition__add" />
          <Button color="link" onClick={this.addFilter}>
            Add condition
          </Button>
        </div>
        <div className="btns-group">
          <div className="wrapp-btn">
            <Button color="primary" onClick={this.getInfo}>
              Apply
            </Button>
          </div>
          <div className="wrapp-btn">
            <Button outline color="secondary" onClick={this.clearFilter}>
              Clear Filter
            </Button>
          </div>
        </div>
      </>
    );
  }
}

export default Filters;
