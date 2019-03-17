import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Inputs from './Inputs';
import { EQUAL_OPERATION, CONTAINING_OPERATION, TYPE } from './constants';
import './App.css';


class App extends Component {
  static DEFAULT_NUMBER_OPERATION = EQUAL_OPERATION;

  static DEFAULT_TEXT_OPERATION = CONTAINING_OPERATION;

  constructor(props) {
    super(props);

    this.state = {
      filters: [
        {
          type: TYPE.TEXT,
          operation: App.DEFAULT_TEXT_OPERATION,
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
          operation: value === TYPE.TEXT ? App.DEFAULT_TEXT_OPERATION : App.DEFAULT_NUMBER_OPERATION,
        };
      }

      return item;
    });

    this.setState({ filters: newFilters }, () => console.log(this.state));
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

    this.setState({ filters: newFilters }, () => console.log(this.state));
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
    });

    this.setState({ filters: newFilters });
  };

  addFilter = () => {
    const { filters } = this.state;
    const newFilter = {
      type: TYPE.TEXT,
      operation: App.DEFAULT_TEXT_OPERATION,
      value: '',
      id: +Date.now(),
    };

    const newFilters = [...filters, newFilter];

    this.setState({ filters: newFilters });
  }

  render() {
    const { filters } = this.state;
    return (
      <div className="App">
        {filters.map(({ id, type, operation, value }) => (
          <Inputs
            id={id}
            key={id}
            type={type}
            operation={operation}
            value={value}
            onTypeChange={({ target: { value } }) => {
              this.setType(value, id);
            }}
            onValueChange={({ target: { value } }) => {
              this.setValue(value, id);
            }}
            onOperationChange={({ target: { value } }) => {
              this.setOperation(value, id);
            }}
          />
        ))}
        <div className="condition">
          <Button color="link" onClick={this.addFilter}>Add condition</Button>
        </div>
        <div className="btns-group">
          <div className="wrapp-btn">
            <Button color="primary">Apply</Button>
          </div>
          <div className="wrapp-btn">
            <Button outline color="secondary">
              Clear Filter
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
