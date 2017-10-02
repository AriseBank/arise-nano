import React from 'react';
import { fromRawLsk } from '../../utils/aco';
import FormattedNumber from '../formattedNumber';

const roundTo = (value, places) => {
  if (!places) {
    return value;
  }
  const x = 10 ** places;
  return Math.round(value * x) / x;
};

const AriseAmount = props => (<FormattedNumber val={
  roundTo(parseFloat(fromRawLsk(props.val)), props.roundTo)} />);

export default AriseAmount;

