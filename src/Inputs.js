import React from 'react';
import { Input } from 'reactstrap';
import { TRANSLATIONS, OPERATIONS, TYPE } from './constants';
import icon from './icons/delete.svg';

const Inputs = ({
  operation,
  value,
  type,
  onTypeChange,
  id,
  onValueChange,
  onOperationChange,
}) => {
  return (
    <div className="inputs-group">
      <div className="wrapp-input">
        <Input
          type="select"
          name="select"
          onChange={onTypeChange}
          id={`type-${id}`}
        >
          <option value={TYPE.TEXT}>{TRANSLATIONS.types.text}</option>
          <option value={TYPE.NUMBER}>{TRANSLATIONS.types.numbers}</option>
        </Input>
      </div>
      <div className="wrapp-input">
        <Input
          type="select"
          name="select"
          id={`operation-${id}`}
          onChange={onOperationChange}
          defaultValue={operation}
        >
          {OPERATIONS[type].map((op, i) => (
            <option key={`${op}${i}`}>{op}</option>
          ))}
        </Input>
      </div>
      <div className="wrapp-input wrapp-input--last">
        <Input
          type="text"
          defaultValue={value}
          onChange={onValueChange}
          id={`value-${id}`}
        />
      </div>

      <img src={icon} className="delete-img hidden" alt="delete" />
    </div>
  );
};

export default Inputs;
