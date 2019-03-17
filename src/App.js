import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Inputs from './Inputs';
import './App.css';

class App extends Component {
  static OPERATIONS = {
    text: ['Containing', 'Exactly matching', 'Begins with', 'Ends with'],
    numbers: ['Equal', 'Greater than', 'Less than'],
  };

  constructor(props) {
    super(props);

    this.state = {
      filters: [
        {
          type: 'Text field',
          operation: 'Containing',
          value: '',
          id: +Date.now(),
        },
      ],
    };
  }

  setType = ({ target: { value, id: targetId } }) => {
    const { text, numbers } = App.OPERATIONS;
    const { filters } = this.state;

    const newFilters = filters.map((item) => {
      if (item.id === +targetId) {
        return {
          ...item,
          type: value,
          operation: value === 'Text field' ? text[0] : numbers[0],
        };
      }
    });

    this.setState({ filters: newFilters }, () => console.log(this.state));
  };

  setValue = ({ target: { value, id: targetId } }) => {
    const { filters } = this.state;
    const newFilters = filters.map((item) => {
      if (item.id === +targetId) {
        return {
          ...item,
          value,
        };
      }
    });

    this.setState({ filters: newFilters });
  };

  setOperation = ({ target: { value, id: targetId } }) => {
    const { filters } = this.state;
    const newFilters = filters.map((item) => {
      if (item.id === +targetId) {
        return {
          ...item,
          operation: value,
        };
      }
    });

    this.setState({ filters: newFilters });
  };

  addFilter = () => {
    const {filters} = this.state;
    const { text } = App.OPERATIONS;
    const newFilter = {
      type: 'Text field',
      operation: text[0],
      value: '',
      id: +Date.now(),
    };

    const newFilters = [...filters, newFilter];

    this.setState({filters: newFilters});
  }

  // clearFilter = () => {
  //   const {filters} = this.state;
  //   const { text } = App.OPERATIONS;
  //   const newFilter = filters.map(item => {
  //     return {
  //       type: 'Text field',
  //       operation: text[0],
  //       value: '',
  //     }
  //   })

  //   this.setState({filters: newFilter})
  // }

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
            onTypeChange={this.setType}
            onValueChange={this.setValue}
            onOperationChange={this.setOperation}
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
