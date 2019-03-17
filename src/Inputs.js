import React from 'react';
import { Input } from 'reactstrap';

const Inputs = ({
  operation,
  value,
  type,
  onTypeChange,
  id,
  onValueChange,
  onOperationChange,
}) => {
  const text = ['Containing', 'Exactly matching', 'Begins with', 'Ends with'];
  const numbers = ['Equal', 'Greater than', 'Less than'];

  return (
    <div className="inputs-group">
      <div className="wrapp-input">
        <Input type="select" name="select" onChange={onTypeChange} id={id}>
          <option>Text field</option>
          <option>Number field</option>
        </Input>
      </div>
      <div className="wrapp-input">
        <Input
          type="select"
          name="select"
          id={id}
          onChange={onOperationChange}
          defaultValue={operation}
        >
          {type === 'Text field'
            ? text.map((op) => <option>{op}</option>)
            : numbers.map((op) => <option>{op}</option>)}
        </Input>
      </div>
      <div className="wrapp-input">
        <Input
          type="text"
          defaultValue={value}
          onChange={onValueChange}
          id={id}
        />
      </div>
    </div>
  );
};

export default Inputs;
