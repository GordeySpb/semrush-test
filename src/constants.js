export const TYPE = {
  TEXT: 'text',
  NUMBERS: 'numbers',
};

export const CONTAINING_OPERATION = 'Containing';
export const EXACTLY_MATCHING_OPERATION = 'Exactly matching';
export const BEGINS_WITH_OPERATION = 'Begins whith';
export const ENDS_WHITH_OPERATION = 'Ends whith';
export const EQUAL_OPERATION = 'Equal';
export const GREATER_THEN_OPERATION = 'Greater than';
export const LESS_THAN_OPERATION = 'Less than';

export const OPERATIONS = {
  [TYPE.TEXT]: [
    ENDS_WHITH_OPERATION,
    BEGINS_WITH_OPERATION,
    EXACTLY_MATCHING_OPERATION,
    CONTAINING_OPERATION,
  ],
  [TYPE.NUMBERS]: [
    EQUAL_OPERATION,
    GREATER_THEN_OPERATION,
    LESS_THAN_OPERATION,
  ],
};

export const TRANSLATIONS = {
  types: {
    [TYPE.TEXT]: 'Text field',
    [TYPE.NUMBERS]: 'Number field',
  },
};
